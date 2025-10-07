'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export function useAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and start the background music
  const startBackgroundMusic = useCallback(() => {
    if (typeof window === 'undefined' || isPlaying) return;

    const audio = new Audio(`/audio/home-ambient.mp3?v=${Date.now()}`);
    audio.loop = true;
    audio.volume = isMuted ? 0 : 0.3;
    
    audio.play().then(() => {
      setIsPlaying(true);
      audioRef.current = audio;
    }).catch(error => {
      // Silently handle audio errors
    });
  }, [isPlaying, isMuted]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      
      if (audioRef.current) {
        audioRef.current.volume = newMuted ? 0 : 0.3;
      }

      return newMuted;
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    isMuted,
    isPlaying,
    toggleMute,
    startBackgroundMusic,
  };
}