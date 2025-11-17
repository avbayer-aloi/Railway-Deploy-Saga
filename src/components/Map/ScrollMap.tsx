'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { realms } from '@/lib/data';
import { BossRealm } from '@/types';
import Button from '@/components/UI/Button';
import SoundToggle from '@/components/UI/SoundToggle';

interface BossMarker {
  id: BossRealm;
  name: string;
  x: number;
  y: number;
  description: string;
  completed: boolean;
  unlocked: boolean;
}

export default function ScrollMap() {
  const { setScreen, setCurrentRealm, completedRealms, selectedCharacter } = useGameState();
  const [scrollUnrolled, setScrollUnrolled] = useState(false);
  const [mapScale, setMapScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedBoss, setSelectedBoss] = useState<BossRealm | null>(null);
  const [showEncounter, setShowEncounter] = useState(false);
  const [showPowerUp, setShowPowerUp] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Define the boss progression order
  const bossOrder: BossRealm[] = useMemo(() => [
    'docker-tiamat',
    'proxy-valheim', 
    'shadowcloud',
    'silent-watcher',
    'terraform-lich'
  ], []);

  // Boss marker positions on the map (percentage-based) - memoized for performance
  const bossMarkers: BossMarker[] = useMemo(() => {

    return realms.map(realm => {
      const bossIndex = bossOrder.indexOf(realm.id);
      const isCompleted = completedRealms.includes(realm.id);
      
      // Boss is unlocked if it's the first boss OR the previous boss is completed
      const isUnlocked = bossIndex === 0 || 
        (bossIndex > 0 && completedRealms.includes(bossOrder[bossIndex - 1]));
      
      return {
        id: realm.id,
        name: realm.name,
        x: realm.position.x,
        y: realm.position.y,
        description: realm.description,
        completed: isCompleted,
        unlocked: isUnlocked
      };
    });
  }, [completedRealms, bossOrder]);

  useEffect(() => {
    // Start scroll animation after component mounts
    const timer = setTimeout(() => {
      setScrollUnrolled(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const handleBossClick = useCallback((bossId: BossRealm, isUnlocked: boolean, isCompleted: boolean) => {
    if (!isUnlocked || isCompleted) return; // Don't allow clicking locked or completed bosses
    setSelectedBoss(bossId);
    setShowEncounter(true);
  }, []);

  const handleFight = useCallback(() => {
    if (selectedBoss) {
      setCurrentRealm(selectedBoss);
      setScreen('quest');
    }
    setShowEncounter(false);
  }, [selectedBoss, setCurrentRealm, setScreen]);

  const handleCompleteBoss = useCallback(() => {
    if (selectedBoss) {
      setCurrentRealm(selectedBoss);
      setScreen('quest');
    }
    setShowPowerUp(false);
    setSelectedBoss(null);
  }, [selectedBoss, setCurrentRealm, setScreen]);

  const handleCloseDialogue = useCallback(() => {
    setShowEncounter(false);
    setShowPowerUp(false);
    setSelectedBoss(null);
  }, []);

  const handleZoomIn = useCallback(() => {
    setMapScale(prev => Math.min(prev + 0.2, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setMapScale(prev => Math.max(prev - 0.2, 0.5));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - mapPosition.x,
      y: e.clientY - mapPosition.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const allRealmsCompleted = completedRealms.length === realms.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-900/20 via-yellow-800/10 to-amber-700/15"
    >
      <SoundToggle />
      
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        {/* Subtle dust particles - optimized calculations */}
        {[...Array(30)].map((_, i) => {
          const left = (i * 12.3 + 8.7) % 100;
          const top = (i * 17.9 + 5.1) % 100;
          const duration = 15 + (i % 8);
          const delay = (i * 0.4) % 12;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-300/30 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -200],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
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
        
        {/* Ambient light rays */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="absolute w-0.5 h-full opacity-5"
            style={{
              left: `${20 + i * 20}%`,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(251, 191, 36, 0.2) 30%, rgba(217, 119, 6, 0.1) 70%, transparent 100%)',
              transform: 'skew(-10deg)',
              filter: 'blur(2px)',
            }}
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scaleY: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Top navigation */}
      <motion.div
        className="absolute top-8 left-8 right-8 flex justify-between items-center z-30"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-amber-600/30">
          <span className="text-amber-300 font-medieval font-bold text-lg">
            {selectedCharacter ? 
              `${selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1)} Adventurer` : 
              'Adventurer'
            }
          </span>
        </div>
        
        <div className="flex gap-4">
          {allRealmsCompleted && (
            <Button onClick={() => setScreen('finale')} size="sm">
              Enter Vault
            </Button>
          )}
        </div>
      </motion.div>

      {/* Scroll animation container - vertically centered */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden pt-16">
        {/* Horizontal unfurling scroll animation */}
        <motion.div
          className="relative"
          initial={{ 
            scaleX: 0,
            opacity: 0
          }}
          animate={scrollUnrolled ? { 
            scaleX: 1,
            opacity: 1
          } : {}}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            scaleX: { 
              duration: 0.6, 
              ease: [0.12, 0, 0.39, 0]
            },
            opacity: { 
              duration: 0.5, 
              delay: 0.1,
              ease: "easeOut" 
            }
          }}
          style={{ transformOrigin: "center center" }}
        >
          {/* Left scroll curl edge with frayed appearance and deep shadows */}
          <motion.div
            className="absolute left-0 top-0 w-12 h-full z-30 pointer-events-none"
            initial={{ x: "50%" }}
            animate={scrollUnrolled ? { x: "0%" } : {}}
            transition={{ 
              duration: 0.5, 
              delay: 0.1,
              ease: [0.12, 0, 0.39, 0]
            }}
            style={{
              background: `
                linear-gradient(to right, rgba(45, 35, 25, 0.95) 0%, rgba(74, 54, 41, 0.8) 30%, rgba(93, 74, 53, 0.5) 60%, rgba(139, 115, 85, 0.2) 80%, transparent 100%),
                radial-gradient(ellipse at left, rgba(245, 158, 11, 0.1) 0%, transparent 70%)
              `,
              borderRadius: '0 8px 8px 0',
              boxShadow: `
                inset -15px 0 30px rgba(0, 0, 0, 0.7),
                inset -8px 0 20px rgba(0, 0, 0, 0.5),
                -5px 0 25px rgba(0, 0, 0, 0.6),
                -2px 0 10px rgba(0, 0, 0, 0.4),
                0 0 15px rgba(245, 158, 11, 0.1)
              `,
              clipPath: 'polygon(0% 0%, 65% 1%, 80% 6%, 88% 12%, 94% 22%, 98% 32%, 96% 42%, 92% 52%, 96% 62%, 98% 72%, 94% 82%, 88% 90%, 80% 96%, 65% 99%, 0% 100%)',
            }}
          />
          
          {/* Right scroll curl edge with frayed appearance and deep shadows */}
          <motion.div
            className="absolute right-0 top-0 w-12 h-full z-30 pointer-events-none"
            initial={{ x: "-50%" }}
            animate={scrollUnrolled ? { x: "0%" } : {}}
            transition={{ 
              duration: 0.5, 
              delay: 0.1,
              ease: [0.12, 0, 0.39, 0]
            }}
            style={{
              background: `
                linear-gradient(to left, rgba(45, 35, 25, 0.95) 0%, rgba(74, 54, 41, 0.8) 30%, rgba(93, 74, 53, 0.5) 60%, rgba(139, 115, 85, 0.2) 80%, transparent 100%),
                radial-gradient(ellipse at right, rgba(245, 158, 11, 0.1) 0%, transparent 70%)
              `,
              borderRadius: '8px 0 0 8px',
              boxShadow: `
                inset 15px 0 30px rgba(0, 0, 0, 0.7),
                inset 8px 0 20px rgba(0, 0, 0, 0.5),
                5px 0 25px rgba(0, 0, 0, 0.6),
                2px 0 10px rgba(0, 0, 0, 0.4),
                0 0 15px rgba(245, 158, 11, 0.1)
              `,
              clipPath: 'polygon(100% 0%, 35% 1%, 20% 6%, 12% 12%, 6% 22%, 2% 32%, 4% 42%, 8% 52%, 4% 62%, 2% 72%, 6% 82%, 12% 90%, 20% 96%, 35% 99%, 100% 100%)',
            }}
          />
          {/* Ancient aged parchment background with magical glow */}
          <motion.div
            className="relative w-[90vw] max-w-6xl h-[80vh] overflow-hidden"
            style={{
              background: `
                radial-gradient(ellipse at center, #8b6f47 0%, #7d6142 30%, #6b5139 60%, #5d4a35 85%, #4a3629 100%),
                linear-gradient(135deg, #a67c52 0%, #8b6f47 15%, #7d6142 35%, #6b5139 55%, #8a6e4a 75%, #5d4a35 100%)
              `,
              backgroundSize: '100% 100%, 350% 350%',
              borderRadius: '4px',
              boxShadow: `
                0 30px 60px rgba(0, 0, 0, 0.8),
                0 20px 40px rgba(93, 74, 53, 0.6),
                inset 0 4px 8px rgba(166, 124, 82, 0.2),
                inset 0 -4px 8px rgba(93, 74, 53, 0.6),
                inset -20px 0 40px rgba(0, 0, 0, 0.4),
                inset 20px 0 40px rgba(0, 0, 0, 0.4),
                inset 0 -20px 30px rgba(0, 0, 0, 0.3),
                inset 0 20px 30px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(93, 74, 53, 0.9),
                0 0 20px rgba(0, 0, 0, 0.5),
                0 0 40px rgba(245, 158, 11, 0.15),
                0 0 60px rgba(245, 158, 11, 0.08)
              `,
              border: '2px solid #5d4a35',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Torn and frayed edges with cracks */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: `
                  radial-gradient(ellipse at 0% 0%, transparent 55%, rgba(74, 54, 41, 0.6) 80%),
                  radial-gradient(ellipse at 100% 0%, transparent 55%, rgba(74, 54, 41, 0.6) 80%),
                  radial-gradient(ellipse at 0% 100%, transparent 55%, rgba(74, 54, 41, 0.6) 80%),
                  radial-gradient(ellipse at 100% 100%, transparent 55%, rgba(74, 54, 41, 0.6) 80%),
                  radial-gradient(ellipse at 50% 0%, transparent 65%, rgba(93, 74, 53, 0.4) 90%),
                  radial-gradient(ellipse at 50% 100%, transparent 65%, rgba(93, 74, 53, 0.4) 90%),
                  radial-gradient(ellipse at 0% 50%, transparent 65%, rgba(93, 74, 53, 0.4) 90%),
                  radial-gradient(ellipse at 100% 50%, transparent 65%, rgba(93, 74, 53, 0.4) 90%)
                `,
              }}
            />
            
            {/* Subtle cracks and fissures */}
            <div 
              className="absolute inset-0 opacity-25"
              style={{
                background: `
                  linear-gradient(23deg, transparent 48%, rgba(74, 54, 41, 0.3) 49%, rgba(74, 54, 41, 0.3) 50%, transparent 51%),
                  linear-gradient(67deg, transparent 48%, rgba(74, 54, 41, 0.25) 49%, rgba(74, 54, 41, 0.25) 50%, transparent 51%),
                  linear-gradient(134deg, transparent 48%, rgba(74, 54, 41, 0.2) 49%, rgba(74, 54, 41, 0.2) 50%, transparent 51%),
                  linear-gradient(89deg, transparent 48%, rgba(74, 54, 41, 0.15) 49%, rgba(74, 54, 41, 0.15) 50%, transparent 51%),
                  linear-gradient(156deg, transparent 48%, rgba(74, 54, 41, 0.2) 49%, rgba(74, 54, 41, 0.2) 50%, transparent 51%)
                `,
                backgroundSize: '80% 100%, 60% 100%, 90% 100%, 70% 100%, 50% 100%',
                backgroundPosition: '10% 0%, 30% 0%, 5% 0%, 60% 0%, 80% 0%',
              }}
            />
            
            {/* Ancient scroll texture with papyrus grain */}
            <div 
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `
                  url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b7355' fill-opacity='0.12'%3E%3Cpath d='M20 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zm20 0c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zm20 0c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zm20 0c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zM20 40c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zm40 0c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zm20 0c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zM20 60c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zm20 0c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zm40 0c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zM20 80c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zm40 0c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zm20 0c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
                  linear-gradient(30deg, transparent 40%, rgba(166, 130, 79, 0.08) 80%),
                  linear-gradient(-30deg, transparent 40%, rgba(139, 115, 85, 0.06) 80%)
                `,
                backgroundSize: '90px 90px, 180px 180px, 140px 140px',
              }}
            />
            
            {/* Deep age marks and ancient stains */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  radial-gradient(ellipse 280px 140px at 25% 30%, rgba(93, 74, 53, 0.35) 0%, transparent 70%),
                  radial-gradient(ellipse 200px 100px at 75% 70%, rgba(107, 81, 57, 0.25) 0%, transparent 65%),
                  radial-gradient(ellipse 140px 200px at 80% 20%, rgba(93, 74, 53, 0.3) 0%, transparent 70%),
                  radial-gradient(ellipse 120px 160px at 15% 80%, rgba(107, 81, 57, 0.28) 0%, transparent 60%),
                  radial-gradient(ellipse 80px 100px at 85% 85%, rgba(93, 74, 53, 0.32) 0%, transparent 55%),
                  radial-gradient(ellipse 100px 60px at 45% 10%, rgba(75, 58, 40, 0.25) 0%, transparent 65%),
                  radial-gradient(ellipse 90px 120px at 60% 90%, rgba(75, 58, 40, 0.2) 0%, transparent 70%)
                `,
              }}
            />
            
            {/* Authentic papyrus fiber texture */}
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    3deg,
                    transparent,
                    transparent 2px,
                    rgba(166, 130, 79, 0.08) 2px,
                    rgba(166, 130, 79, 0.08) 3px
                  ),
                  repeating-linear-gradient(
                    87deg,
                    transparent,
                    transparent 2px,
                    rgba(139, 115, 85, 0.06) 2px,
                    rgba(139, 115, 85, 0.06) 3px
                  ),
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 4px,
                    rgba(180, 149, 106, 0.04) 4px,
                    rgba(180, 149, 106, 0.04) 5px
                  )
                `,
              }}
            />
            
            {/* Enhanced scroll curl shadows for deeper 3D effect */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: `
                  linear-gradient(to right, rgba(93, 74, 53, 0.5) 0%, rgba(107, 81, 57, 0.3) 3%, transparent 10%),
                  linear-gradient(to left, rgba(93, 74, 53, 0.5) 0%, rgba(107, 81, 57, 0.3) 3%, transparent 10%),
                  linear-gradient(to bottom, rgba(93, 74, 53, 0.3) 0%, rgba(107, 81, 57, 0.2) 2%, transparent 8%),
                  linear-gradient(to top, rgba(93, 74, 53, 0.3) 0%, rgba(107, 81, 57, 0.2) 2%, transparent 8%)
                `,
              }}
            />
            
            {/* Magical amber glow border */}
            <motion.div 
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to right, rgba(245, 158, 11, 0.4) 0%, transparent 4%),
                  linear-gradient(to left, rgba(245, 158, 11, 0.4) 0%, transparent 4%),
                  linear-gradient(to bottom, rgba(245, 158, 11, 0.3) 0%, transparent 3%),
                  linear-gradient(to top, rgba(245, 158, 11, 0.3) 0%, transparent 3%)
                `,
                borderRadius: '4px',
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Subtle shimmer effect */}
            <motion.div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `
                  linear-gradient(45deg, transparent 30%, rgba(251, 191, 36, 0.1) 50%, transparent 70%),
                  linear-gradient(-45deg, transparent 30%, rgba(245, 158, 11, 0.08) 50%, transparent 70%)
                `,
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Map content */}
            <div
              ref={mapRef}
              className="relative w-full h-full cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`,
                transition: isDragging ? 'none' : 'transform 0.3s ease',
              }}
            >
              {/* Map title */}
              <motion.div
                className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-medieval font-bold mb-2 text-amber-200"
                    style={{ 
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(251, 191, 36, 0.4)' 
                    }}>
                  The Realm of Forgotten Infrastructure
                </h1>
                <p className="text-xl font-story text-amber-100"
                   style={{ 
                     textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' 
                   }}>
                  Five ancient curses block the path to the Ultimate Vault
                </p>
              </motion.div>

              {/* Mystical path lines connecting bosses */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {bossMarkers.map((boss, index) => {
                  const nextBoss = bossMarkers[index + 1] || bossMarkers[0];
                  return (
                    <motion.line
                      key={`${boss.id}-${nextBoss.id}`}
                      x1={`${boss.x}%`}
                      y1={`${boss.y}%`}
                      x2={`${nextBoss.x}%`}
                      y2={`${nextBoss.y}%`}
                      stroke="url(#pathGradient)"
                      strokeWidth="3"
                      strokeDasharray="8,4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.4 }}
                      transition={{ delay: 3 + index * 0.5, duration: 1.5 }}
                    />
                  );
                })}
                
                <defs>
                  <linearGradient id="pathGradient">
                    <stop offset="0%" stopColor="#92400e" />
                    <stop offset="50%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#92400e" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Boss markers */}
              {bossMarkers.map((boss, index) => {
                const realm = realms.find(r => r.id === boss.id)!;
                
                return (
                  <motion.div
                    key={boss.id}
                    className="absolute z-20"
                    style={{
                      left: `${boss.x}%`,
                      top: `${boss.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.4, type: "spring" }}
                  >
                    {/* Boss marker glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        scale: boss.unlocked ? [1, 1.5, 1] : [1, 1.1, 1],
                        opacity: boss.unlocked ? [0.3, 0.6, 0.3] : [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        duration: boss.unlocked ? 2 : 4,
                        repeat: Infinity,
                        delay: index * 0.4,
                      }}
                      style={{
                        width: '80px',
                        height: '80px',
                        marginLeft: '-40px',
                        marginTop: '-40px',
                        backgroundColor: boss.completed 
                          ? 'rgba(251, 191, 36, 0.3)' // gold
                          : boss.unlocked 
                          ? `${realm.color}30` // boss color with opacity
                          : 'rgba(107, 114, 128, 0.2)', // gray
                        boxShadow: boss.completed
                          ? '0 0 30px rgba(251, 191, 36, 0.5)'
                          : boss.unlocked
                          ? `0 0 25px ${realm.color}80`
                          : '0 0 10px rgba(107, 114, 128, 0.3)',
                      }}
                    />
                    
                    {/* Boss marker */}
                    <motion.button
                      className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl shadow-lg transition-all duration-300 ${
                        boss.completed
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-300 text-yellow-900 cursor-default'
                          : boss.unlocked
                          ? 'bg-gradient-to-br from-slate-700 to-slate-900 border-slate-500 text-white hover:scale-110 cursor-pointer'
                          : 'bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-60'
                      }`}
                      onClick={() => handleBossClick(boss.id, boss.unlocked, boss.completed)}
                      whileHover={boss.unlocked && !boss.completed ? { scale: 1.15, rotateY: 10 } : {}}
                      whileTap={boss.unlocked && !boss.completed ? { scale: 0.95 } : {}}
                      style={{
                        boxShadow: boss.completed 
                          ? '0 0 25px rgba(251, 191, 36, 0.6), inset 0 2px 10px rgba(255, 255, 255, 0.2)' 
                          : boss.unlocked
                          ? `0 0 20px ${realm.color}60, inset 0 2px 8px rgba(255, 255, 255, 0.1)`
                          : '0 0 10px rgba(107, 114, 128, 0.3)',
                      }}
                    >
                      {boss.completed ? '👑' : boss.unlocked ? realm.emoji : '🔒'}
                    </motion.button>


                    {/* Enhanced boss label with magical glow */}
                    <motion.div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 z-30 pointer-events-none"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.0 + index * 0.1 + 0.2, duration: 0.4 }}
                    style={{
                      // Dynamic positioning to keep labels on screen
                      left: boss.x > 80 ? 'auto' : boss.x < 20 ? '20px' : '50%',
                      right: boss.x > 80 ? '20px' : 'auto',
                      transform: boss.x > 80 ? 'translateX(0)' : boss.x < 20 ? 'translateX(0)' : 'translateX(-50%)',
                    }}
                  >
                    <div className="relative">
                      {/* Magical glow background */}
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: boss.completed 
                            ? 'radial-gradient(ellipse, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.1) 50%, transparent 80%)'
                            : boss.unlocked
                            ? 'radial-gradient(ellipse, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 80%)'
                            : 'radial-gradient(ellipse, rgba(107, 114, 128, 0.2) 0%, rgba(107, 114, 128, 0.05) 50%, transparent 80%)',
                          filter: 'blur(8px)',
                        }}
                        animate={{
                          scale: boss.unlocked ? [1, 1.1, 1] : [1, 1.05, 1],
                          opacity: boss.unlocked ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: boss.unlocked ? 3 : 5,
                          repeat: Infinity,
                          delay: index * 0.5,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Label content */}
                      <div 
                        className="relative bg-black/75 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-amber-600/40 shadow-xl"
                        style={{
                          minWidth: 'max-content',
                          maxWidth: '200px',
                          boxShadow: boss.completed 
                            ? '0 0 20px rgba(34, 197, 94, 0.4), 0 4px 12px rgba(0, 0, 0, 0.6)'
                            : boss.unlocked
                            ? '0 0 20px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.6)'
                            : '0 0 10px rgba(107, 114, 128, 0.3), 0 4px 8px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        <h3 className={`font-medieval font-bold text-sm leading-tight whitespace-nowrap ${
                              boss.completed 
                                ? 'text-green-200' 
                                : boss.unlocked 
                                ? 'text-amber-200' 
                                : 'text-gray-400'
                            }`}
                            style={{ 
                              textShadow: boss.unlocked 
                                ? '1px 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(251, 191, 36, 0.4)' 
                                : '1px 1px 2px rgba(0, 0, 0, 0.6)',
                              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                            }}>
                          {boss.unlocked ? boss.name : `${boss.name} (Locked)`}
                        </h3>
                      </div>
                      
                      {/* Label arrow pointing to boss */}
                      <div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-4"
                        style={{
                          borderLeftColor: 'transparent',
                          borderRightColor: 'transparent',
                          borderTopColor: 'rgba(0, 0, 0, 0.75)',
                          filter: boss.completed 
                            ? 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.6))'
                            : boss.unlocked
                            ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))'
                            : 'drop-shadow(0 0 2px rgba(107, 114, 128, 0.4))',
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )
              })}

              {/* Party illustration */}
              <motion.div
                className="absolute bottom-16 right-16 z-15"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <div className="relative">
                  <div className="flex space-x-2">
                    {/* Three party members */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-blue-400 flex items-center justify-center text-white text-xs font-bold"
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      >
                        {['⚔', '🏹', '✨'][i]}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm font-story text-amber-100 mt-2 text-center"
                     style={{ 
                       textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)' 
                     }}>
                    Your Party
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Map controls */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col gap-2 z-30"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <Button onClick={handleZoomIn} size="sm" variant="secondary">
          🔍+
        </Button>
        <Button onClick={handleZoomOut} size="sm" variant="secondary">
          🔍-
        </Button>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.4 }}
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-lg px-6 py-3 border border-amber-600/30">
          <div className="text-center">
            <p className="text-amber-300 font-story mb-2">
              Realms Conquered: {completedRealms.length} / {realms.length}
            </p>
            <div className="w-48 h-2 bg-amber-900/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 to-yellow-500"
                initial={{ width: 0 }}
                animate={{ width: `${(completedRealms.length / realms.length) * 100}%` }}
                transition={{ duration: 1, delay: 5.8 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Boss Encounter Dialogue Panel */}
      <AnimatePresence>
        {showEncounter && selectedBoss && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDialogue}
          >
            <motion.div
              className="relative max-w-2xl mx-4 bg-gradient-to-br from-amber-900/95 to-amber-800/95 rounded-xl border-4 border-amber-600/50 shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    3deg,
                    transparent,
                    transparent 2px,
                    rgba(166, 130, 79, 0.1) 2px,
                    rgba(166, 130, 79, 0.1) 3px
                  )
                `,
              }}
            >
              {/* Parchment texture overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 50%, rgba(139, 115, 85, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(160, 135, 95, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(120, 100, 70, 0.1) 0%, transparent 50%)
                  `,
                }}
              />

              {/* Header */}
              <div className="relative p-6 border-b border-amber-600/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">
                      {realms.find(r => r.id === selectedBoss)?.emoji}
                    </div>
                    <div>
                      <h2 className="text-2xl font-medieval font-bold text-amber-100">
                        {realms.find(r => r.id === selectedBoss)?.name}
                      </h2>
                      <p className="text-amber-300/80 font-story text-sm">
                        {realms.find(r => r.id === selectedBoss)?.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseDialogue}
                    className="text-amber-400 hover:text-amber-200 transition-colors text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Encounter Text */}
              <div className="relative p-6">
                <h3 className="text-lg font-medieval font-bold text-amber-200 mb-4">
                  The Encounter
                </h3>
                <p className="text-amber-100/90 font-story leading-relaxed text-base mb-6">
                  {realms.find(r => r.id === selectedBoss)?.encounterText}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={handleCloseDialogue}
                    variant="secondary"
                    size="sm"
                  >
                    Retreat
                  </Button>
                  <Button
                    onClick={handleFight}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-6 py-2 rounded-lg border-2 border-red-400 shadow-lg transition-all duration-300"
                  >
                    ⚔️ Fight!
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Railway Power-Up Reveal Panel */}
      <AnimatePresence>
        {showPowerUp && selectedBoss && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-2xl mx-4 bg-gradient-to-br from-blue-900/95 to-purple-900/95 rounded-xl border-4 border-blue-500/50 shadow-2xl overflow-hidden"
              initial={{ scale: 0.5, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 5 }}
            >
              {/* Power-up glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-300 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-20, -60, -20],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative p-8 text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {realms.find(r => r.id === selectedBoss)?.powerUpIcon}
                </motion.div>

                <h2 className="text-3xl font-medieval font-bold text-blue-200 mb-2">
                  Victory!
                </h2>

                <h3 className="text-xl font-medieval text-purple-200 mb-4">
                  {realms.find(r => r.id === selectedBoss)?.powerUpTitle}
                </h3>

                <p className="text-blue-100/90 font-story leading-relaxed text-lg mb-8">
                  {realms.find(r => r.id === selectedBoss)?.powerUpDescription}
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Button
                    onClick={handleCompleteBoss}
                    className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-bold px-8 py-3 rounded-lg border-2 border-green-400 shadow-lg transition-all duration-300"
                  >
                    🎉 Claim Victory!
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}