import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

import Prompt from '../components/prompt';
import Pomodoro from '../components/pomodoro';
import Music from '../components/music';
import LaptopMenu from '../components/laptop';
import '../components/UI.css';

const animations = {
  idle_frente: [0, 1, 2, 3],
  idle_espalda: [4, 5, 6, 7],
  idle_perfil: [8, 9, 10, 11],
  walk_down: [12, 13, 14, 15],
  walk_up: [16, 17, 18, 19],
  walk_side: [20, 21, 22, 23],
};

const interactionZones = {
  music: {
    xPercent: 18,
    yPercent: 58,
    prompt: 'Presiona ENTER para abrir los Parlantes',
  },
  laptop: {
    xPercent: 43,
    yPercent: 42,
    prompt: 'Presiona ENTER para abrir la Laptop',
  },
  coffee: {
    xPercent: 77,
    yPercent: 73,
    prompt: 'Presiona ENTER para abrir la Cafetera',
  },
};

const GatitoSprite = ({ frame, isMirror }) => {
  const SIZE = 32;
  const x = (frame % 5) * SIZE;
  const y = Math.floor(frame / 5) * SIZE;

  return (
    <div
      className="gatito-contenedor"
      style={{
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        backgroundImage: 'url("/gatito.png")',
        backgroundPosition: `-${x}px -${y}px`,
        transform: `scale(4) scaleX(${isMirror ? -1 : 1})`,
      }}
    />
  );
};

function RoomPage() {
  const [roomSize, setRoomSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [pos, setPos] = useState({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.65,
  });

  const [anim, setAnim] = useState('idle_frente');
  const [frame, setFrame] = useState(0);
  const [isMirror, setIsMirror] = useState(false);
  const [activeZone, setActiveZone] = useState(null);
  const [openWidget, setOpenWidget] = useState(null);

  const teclas = useRef({
    arrowup: false,
    arrowdown: false,
    arrowleft: false,
    arrowright: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setRoomSize({ width, height });

      setPos((prev) => ({
        x: Math.max(70, Math.min(width - 70, prev.x)),
        y: Math.max(90, Math.min(height - 70, prev.y)),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getZonePosition = (zoneKey) => {
    const zone = interactionZones[zoneKey];
    return {
      x: (zone.xPercent / 100) * roomSize.width,
      y: (zone.yPercent / 100) * roomSize.height,
    };
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (key in teclas.current && !openWidget) {
        e.preventDefault();
        teclas.current[key] = true;
      }

      if (key === 'enter' && activeZone && !openWidget) {
        setOpenWidget(activeZone);
      }

      if (key === 'escape') {
        setOpenWidget(null);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (key in teclas.current) {
        teclas.current[key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeZone, openWidget]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (openWidget) return;

      const t = teclas.current;
      const speed = 5;

      setPos((prev) => {
        let nx = prev.x;
        let ny = prev.y;

        if (t.arrowup) ny -= speed;
        if (t.arrowdown) ny += speed;
        if (t.arrowleft) nx -= speed;
        if (t.arrowright) nx += speed;

        nx = Math.max(70, Math.min(roomSize.width - 70, nx));
        ny = Math.max(90, Math.min(roomSize.height - 70, ny));

        const dist = (ax, ay, bx, by) => Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);

        const musicPos = getZonePosition('music');
        const laptopPos = getZonePosition('laptop');
        const coffeePos = getZonePosition('coffee');

        if (dist(nx, ny, musicPos.x, musicPos.y) < 95) {
          setActiveZone('music');
        } else if (dist(nx, ny, laptopPos.x, laptopPos.y) < 95) {
          setActiveZone('laptop');
        } else if (dist(nx, ny, coffeePos.x, coffeePos.y) < 95) {
          setActiveZone('coffee');
        } else {
          setActiveZone(null);
        }

        return { x: nx, y: ny };
      });

      setIsMirror((prev) => {
        if (t.arrowleft) return true;
        if (t.arrowright) return false;
        return prev;
      });

      setAnim((prev) => {
        if (t.arrowup) return 'walk_up';
        if (t.arrowdown) return 'walk_down';
        if (t.arrowleft || t.arrowright) return 'walk_side';

        if (prev === 'walk_up') return 'idle_espalda';
        if (prev === 'walk_down') return 'idle_frente';
        if (prev === 'walk_side') return 'idle_perfil';

        return prev;
      });
    }, 16);

    return () => clearInterval(moveInterval);
  }, [openWidget, roomSize]);

  useEffect(() => {
    const animInterval = setInterval(() => {
      setFrame((prev) => {
        const frames = animations[anim];

        if (!frames || frames.length === 0) {
          return 0;
        }

        const currentIndex = frames.indexOf(prev);
        if (currentIndex === -1) return frames[0];

        return frames[(currentIndex + 1) % frames.length];
      });
    }, 150);

    return () => clearInterval(animInterval);
  }, [anim]);

  return (
    <div className="sala-estudio">
      <div className="room-light" />

      <div className="hud-top">
        <h1 className="titulo-sala">Study Room</h1>
        <p className="subtitulo-sala">
          Muévete con las flechas y presiona ENTER para interactuar
        </p>
      </div>

      <div
        className="zone-marker music-marker"
        style={{
          left: `${interactionZones.music.xPercent}%`,
          top: `${interactionZones.music.yPercent}%`,
        }}
      >
        🎵
      </div>

      <div
        className="zone-marker laptop-marker"
        style={{
          left: `${interactionZones.laptop.xPercent}%`,
          top: `${interactionZones.laptop.yPercent}%`,
        }}
      >
        💻
      </div>

      <div
        className="zone-marker coffee-marker"
        style={{
          left: `${interactionZones.coffee.xPercent}%`,
          top: `${interactionZones.coffee.yPercent}%`,
        }}
      >
        ☕
      </div>

      <div
        className="player-wrapper"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <GatitoSprite frame={frame} isMirror={isMirror} />
      </div>

      <Prompt
        visible={activeZone !== null && openWidget === null}
        message={activeZone ? interactionZones[activeZone].prompt : ''}
      />

      <Music isOpen={openWidget === 'music'} onClose={() => setOpenWidget(null)} />
      <LaptopMenu isOpen={openWidget === 'laptop'} onClose={() => setOpenWidget(null)} />
      <Pomodoro isOpen={openWidget === 'coffee'} onClose={() => setOpenWidget(null)} />
    </div>
  );
}

export default RoomPage;