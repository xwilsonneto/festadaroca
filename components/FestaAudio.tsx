'use client';

import { useEffect, useRef } from 'react';

export default function FestaAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.2;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // autoplay bloqueado pelo navegador
        });
      }
    }
  }, []);

  return (
    <audio ref={audioRef} loop autoPlay>
      <source src="/festajunina.mp3" type="audio/mpeg" />
    </audio>
  );
}
