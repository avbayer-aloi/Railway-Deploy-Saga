'use client';

import { motion } from 'framer-motion';

interface D20DiceProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function D20Dice({ size = 'lg', className = '' }: D20DiceProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-40 h-40'
  };

  return (
    <div className={`${sizes[size]} ${className} relative perspective-1000`}>
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ 
          rotateX: 360,
          rotateY: 360,
          rotateZ: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* D20 Icosahedron faces */}
        {[...Array(20)].map((_, i) => {
          // Calculate face positions for icosahedron approximation
          const angle = (i * 18) * Math.PI / 180;
          const secondaryAngle = ((i % 5) * 72) * Math.PI / 180;
          
          return (
            <motion.div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `
                  rotateX(${Math.sin(angle) * 60}deg) 
                  rotateY(${Math.cos(angle) * 60}deg) 
                  rotateZ(${Math.sin(secondaryAngle) * 30}deg)
                  translateZ(60px)
                `,
                backfaceVisibility: "hidden",
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              <div 
                className={`
                  w-12 h-12 flex items-center justify-center text-xs font-bold
                  border border-gray-600/50 text-gray-300
                  ${i % 4 === 0 ? 'bg-gradient-to-br from-purple-900/60 to-violet-800/60' :
                    i % 4 === 1 ? 'bg-gradient-to-br from-slate-700/60 to-gray-800/60' :
                    i % 4 === 2 ? 'bg-gradient-to-br from-emerald-900/60 to-teal-800/60' :
                    'bg-gradient-to-br from-indigo-900/60 to-blue-800/60'
                  }
                `}
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                }}
              >
                {(i % 20) + 1}
              </div>
            </motion.div>
          );
        })}
        
        {/* Central core glow */}
        <motion.div
          className="absolute inset-4 bg-gradient-to-br from-purple-500/20 via-slate-600/20 to-emerald-500/20 rounded-full"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          style={{
            filter: 'blur(8px)',
          }}
        />
        
        {/* Outer mystical aura */}
        <motion.div
          className="absolute -inset-8 bg-gradient-to-br from-purple-600/10 via-transparent to-emerald-600/10 rounded-full"
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          style={{
            filter: 'blur(16px)',
          }}
        />
      </motion.div>
    </div>
  );
}