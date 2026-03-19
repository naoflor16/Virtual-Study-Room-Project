import React, { useEffect, useRef, useState } from 'react';

export default function Pomodoro({ isOpen, onClose }) {
  const alarmRef = useRef(null);
  const timerRef = useRef(null);

  const [minutes, setMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);

          if (alarmRef.current) {
            alarmRef.current.currentTime = 0;
            alarmRef.current.play().catch((error) => {
              console.error('No se pudo reproducir la alarma:', error);
            });
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const startBreak = () => {
    const total = minutes * 60;
    setSecondsLeft(total);
    setIsRunning(true);
  };

  const pauseBreak = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetBreak = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setSecondsLeft(minutes * 60);
  };

  useEffect(() => {
    if (!isRunning) {
      setSecondsLeft(minutes * 60);
    }
  }, [minutes]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="widget-overlay">
      <div className="widget-box coffee-box pro-break-box">
        <div className="widget-header">
          <div>
            <p className="widget-tag">Zona de descanso</p>
            <h2 className="widget-title coffee-title">☕ BREAK TIMER</h2>
          </div>
          <button className="close-x" onClick={onClose}>
            ✕
          </button>
        </div>

        <audio ref={alarmRef} src="/audio/alarm-soft.mp3" preload="auto" />

        <div className="break-pro-layout">
          <div className="break-left-panel">
            <p className="coffee-main-text">Descansa un momento</p>

            <div className="time-circle-card">
              <div className="time-circle-inner">
                <span>{formatTime(secondsLeft)}</span>
              </div>
            </div>

            <div className="break-actions-pro">
              <button className="pixel-button" onClick={startBreak}>
                Iniciar
              </button>
              <button className="pixel-button secondary-button" onClick={pauseBreak}>
                Pausar
              </button>
              <button className="pixel-button danger-button" onClick={resetBreak}>
                Reiniciar
              </button>
            </div>
          </div>

          <div className="break-right-panel">
            <h3>Elige tu tiempo</h3>

            <div className="break-time-options">
              {[5, 10, 15, 20].map((value) => (
                <button
                  key={value}
                  className={`break-time-chip ${minutes === value ? 'active-break-chip' : ''}`}
                  onClick={() => setMinutes(value)}
                >
                  {value} min
                </button>
              ))}
            </div>

            <div className="break-info-card">
              <p>✨ El temporizador sonará al terminar.</p>
              <p>🎵 Usa un audio suave en <strong>public/audio/alarm-soft.mp3</strong></p>
              <p>💛 Ideal para pausas cortas entre sesiones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}