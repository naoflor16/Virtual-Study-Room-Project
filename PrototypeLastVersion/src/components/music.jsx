import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function Music({ isOpen, onClose }) {
  const audioRef = useRef(null);

  const songs = useMemo(
    () => [
      {
        id: 1,
        title: 'Calm Synth',
        artist: 'Sample Demo',
        file: 'https://download.samplelib.com/mp3/sample-15s.mp3',
      },
      {
        id: 2,
        title: 'Soft Melody',
        artist: 'Sample Demo',
        file: 'https://download.samplelib.com/mp3/sample-12s.mp3',
      },
      {
        id: 3,
        title: 'Light Background',
        artist: 'Sample Demo',
        file: 'https://download.samplelib.com/mp3/sample-9s.mp3',
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState('');

  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setAudioError('');

      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    setAudioError('');
    setCurrentTime(0);
    setDuration(0);

    audio.load();

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('No se pudo reproducir el audio:', error);
        setIsPlaying(false);
        setAudioError('No se pudo reproducir este link de audio.');
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime || 0);
    const updateDuration = () => setDuration(audio.duration || 0);

    const onEnded = async () => {
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentIndex(nextIndex);
    };

    const onError = () => {
      setIsPlaying(false);
      setAudioError('El link de esta canción falló o no permite reproducción.');
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [currentIndex, songs.length]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setAudioError('');
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('No se pudo reproducir el audio:', error);
        setAudioError('El navegador bloqueó o no pudo reproducir el audio.');
      }
    }
  };

  const changeSong = (index) => {
    setCurrentIndex(index);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="widget-overlay">
      <div className="widget-box music-player-box">
        <div className="widget-header">
          <div>
            <p className="widget-tag">Zona de música</p>
            <h2 className="widget-title music-title">🎵 MUSIC PLAYER</h2>
          </div>
          <button className="close-x" onClick={onClose}>
            ✕
          </button>
        </div>

        <audio ref={audioRef} src={currentSong.file} preload="metadata" />

        <div className="music-visual-card">
          <div className="music-top-line">
            <div>
              <p className="music-song-title">{currentSong.title}</p>
              <p className="music-song-artist">{currentSong.artist}</p>
            </div>
            <div className="music-badge">{isPlaying ? 'Playing' : 'Paused'}</div>
          </div>

          <div className="waveform">
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                className={`wave-bar ${isPlaying ? 'animate-wave' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>

          <div className="progress-block">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="music-slider"
            />
            <div className="time-row">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="music-controls">
            <button
              className="circle-control"
              onClick={() => changeSong((currentIndex - 1 + songs.length) % songs.length)}
            >
              ⏮
            </button>

            <button className="main-play-button" onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button
              className="circle-control"
              onClick={() => changeSong((currentIndex + 1) % songs.length)}
            >
              ⏭
            </button>
          </div>

          {audioError && (
            <p
              style={{
                marginTop: '14px',
                color: '#ffb8b8',
                fontSize: '13px',
                textAlign: 'center',
              }}
            >
              {audioError}
            </p>
          )}
        </div>

        <div className="playlist-panel">
          <h3>Playlist online</h3>
          <ul className="music-list modern-list">
            {songs.map((song, index) => (
              <li
                key={song.id}
                className={`music-item ${currentIndex === index ? 'active-song' : ''}`}
                onClick={() => changeSong(index)}
              >
                <div>
                  <strong>{song.title}</strong>
                  <p>{song.artist}</p>
                </div>
                <span>{currentIndex === index ? '●' : '○'}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="widget-tip">
          Esta versión usa links directos de audio online.
        </p>
      </div>
    </div>
  );
}