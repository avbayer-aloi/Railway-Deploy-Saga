'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import SoundToggle from '@/components/UI/SoundToggle';

const crawlParagraphs = [
  "In the age of digital decay, stories began to fade.",
  
  "We, the archivists of Arygoden Digital Preservation, uncovered a forgotten vault: fifty lost reels from the dawn of cinema, trapped in time and dust.",
  
  "To restore them is to rewrite history itself.",
  
  "Yet our machines faltered. Uploads failed. Renders froze. Servers crumbled.",
  
  "From this chaos, five realms of broken infrastructure emerged, each ruled by a DevOps Lord born of failure.",
  
  "Now, a small team ventures into the code to reclaim the lost tales, one battle at a time.",
  
  "Their journey begins…"
];

export default function OpeningCrawl() {
  const { setScreen } = useGameState();
  const [showFadeOut, setShowFadeOut] = useState(false);

  useEffect(() => {
    // Calculate when final text reaches 80% up the screen
    // Text starts at 80vh and moves to -250vh over 60 seconds (330vh total travel)
    // 80% up means at 20vh (20% from top)
    // This happens at: (80vh - 20vh) / 330vh * 60s = 60vh/330vh * 60s ≈ 10.9s into animation
    // Plus 1.5s start delay + 21s for final text (6 paragraphs * 3.5s) = 33.4s total
    const fadeStartTime = 33500; // When final text is 80% up screen
    
    const fadeTimer = setTimeout(() => {
      setShowFadeOut(true);
    }, fadeStartTime);

    const transitionTimer = setTimeout(() => {
      setScreen('character-select');
    }, fadeStartTime + 2000); // 2 second fade duration

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(transitionTimer);
    };
  }, [setScreen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showFadeOut ? 0 : 1 }}
      transition={{ duration: showFadeOut ? 2 : 1.5 }}
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-950 via-indigo-950 to-black"
    >
      <SoundToggle />
      
      {/* Starfield background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => {
          const left = (i * 17.3 + 5.7) % 100;
          const top = (i * 13.1 + 8.3) % 100;
          const size = (i % 3) + 1;
          const opacity = 0.2 + (i % 4) * 0.2;
          const duration = 15 + (i % 10);
          
          return (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
              }}
              animate={{
                opacity: [opacity, opacity * 0.3, opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i * 0.1) % 5,
              }}
            />
          );
        })}
      </div>

      {/* Particle fog */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => {
          const left = (i * 23.7 + 11.2) % 100;
          const top = (i * 31.1 + 7.8) % 100;
          const duration = 8 + (i % 5);
          const delay = (i * 0.5) % 3;
          
          return (
            <motion.div
              key={i}
              className="absolute w-32 h-32 bg-purple-400/5 rounded-full blur-xl"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [(i % 2 === 0 ? -20 : 20), 0, (i % 2 === 0 ? -20 : 20)],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />

      {/* Opening Crawl Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          perspective: '1200px',
        }}
      >
        <motion.div
          className="text-center max-w-5xl mx-auto"
          style={{
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
          }}
          initial={{ 
            y: '80vh',
            rotateX: 15,
            scale: 1.0
          }}
          animate={{ 
            y: '-250vh',
            rotateX: 15,
            scale: 0.1
          }}
          transition={{ 
            duration: 60, 
            ease: "linear",
            scale: {
              duration: 60,
              ease: "easeOut"
            }
          }}
        >
          {/* Crawl Text */}
          <div className="space-y-16 md:space-y-20 px-8">
            {crawlParagraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif text-slate-100 leading-relaxed"
                style={{
                  fontStyle: 'italic',
                  textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
                  letterSpacing: '0.02em'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: 1.5 + (index * 3.5),
                  duration: 1.0,
                  ease: "easeInOut"
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}