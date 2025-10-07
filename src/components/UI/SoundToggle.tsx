'use client';

import { motion } from 'framer-motion';
import { useGlobalAudio } from '@/components/Game';

export default function SoundToggle() {
  const { isMuted, toggleMute } = useGlobalAudio();

  const handleToggle = () => {
    toggleMute();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center text-xl hover:bg-black/80 transition-all duration-300"
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 0 20px rgba(245, 158, 11, 0.1)',
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.5), 0 0 30px rgba(245, 158, 11, 0.2)',
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <motion.span
        animate={{ 
          rotate: isMuted ? 0 : 360,
          scale: isMuted ? 0.9 : 1 
        }}
        transition={{ duration: 0.3 }}
        style={{
          filter: isMuted 
            ? 'grayscale(100%) opacity(0.6)' 
            : 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.3))',
        }}
      >
        {isMuted ? '🔇' : '🔊'}
      </motion.span>
    </motion.button>
  );
}