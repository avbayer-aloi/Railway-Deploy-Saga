'use client';

import { motion } from 'framer-motion';

interface CinematicD20Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CinematicD20({ size = 'lg', className = '' }: CinematicD20Props) {
  const sizes = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32', 
    lg: 'w-48 h-48'
  };

  // D20 vertices for proper icosahedron (commented out as unused)
  // const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
  // const vertices = [
  //   [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
  //   [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
  //   [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1]
  // ];

  return (
    <div className={`${sizes[size]} ${className} relative perspective-1000`}>
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ 
          rotateX: 360,
          rotateY: 360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main D20 structure */}
        <div className="absolute inset-0 preserve-3d">
          {/* Front pyramid faces */}
          {[...Array(10)].map((_, i) => {
            const elevation = i % 2 === 0 ? 45 : -45;
            
            return (
              <motion.div
                key={`face-${i}`}
                className="absolute"
                style={{
                  width: '60px',
                  height: '60px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-30px',
                  marginTop: '-30px',
                  transform: `
                    rotateY(${i * 36}deg) 
                    rotateX(${elevation}deg) 
                    translateZ(80px)
                  `,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <div 
                  className={`
                    w-full h-full flex items-center justify-center text-xs font-bold
                    ${i % 4 === 0 ? 'bg-gradient-to-br from-indigo-800/60 to-purple-900/70 border-indigo-600/40' :
                      i % 4 === 1 ? 'bg-gradient-to-br from-slate-700/60 to-gray-800/70 border-slate-500/40' :
                      i % 4 === 2 ? 'bg-gradient-to-br from-emerald-800/60 to-teal-900/70 border-emerald-600/40' :
                      'bg-gradient-to-br from-violet-800/60 to-purple-900/70 border-violet-600/40'
                    }
                    border-2 text-gray-200 backdrop-blur-sm
                  `}
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 86.6%, 100% 86.6%)',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
                  }}
                >
                  {(i % 20) + 1}
                </div>
              </motion.div>
            );
          })}
          
          {/* Back pyramid faces */}
          {[...Array(10)].map((_, i) => {
            const elevation = i % 2 === 0 ? 135 : -135;
            
            return (
              <motion.div
                key={`back-face-${i}`}
                className="absolute"
                style={{
                  width: '60px',
                  height: '60px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-30px',
                  marginTop: '-30px',
                  transform: `
                    rotateY(${i * 36 + 18}deg) 
                    rotateX(${elevation}deg) 
                    translateZ(80px)
                  `,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 5 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <div 
                  className={`
                    w-full h-full flex items-center justify-center text-xs font-bold
                    ${i % 4 === 0 ? 'bg-gradient-to-br from-blue-900/50 to-indigo-800/60 border-blue-700/30' :
                      i % 4 === 1 ? 'bg-gradient-to-br from-gray-800/50 to-slate-900/60 border-gray-600/30' :
                      i % 4 === 2 ? 'bg-gradient-to-br from-teal-800/50 to-emerald-900/60 border-teal-600/30' :
                      'bg-gradient-to-br from-purple-900/50 to-indigo-800/60 border-purple-700/30'
                    }
                    border-2 text-gray-300 backdrop-blur-sm
                  `}
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 86.6%, 100% 86.6%)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
                  }}
                >
                  {((i + 10) % 20) + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Inner mystical core */}
        <motion.div
          className="absolute inset-8 bg-gradient-radial from-purple-500/20 via-slate-600/15 to-transparent rounded-full"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          style={{
            filter: 'blur(12px)',
          }}
        />
        
        {/* Outer ethereal aura */}
        <motion.div
          className="absolute -inset-12 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
}