'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../layouts/Container';

export default function LearnHero() {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  const textRotations = [
    { main: 'Challenge Everything', sub: 'Question • Discover • Transform Understanding' },
    { main: 'Uncover Truth', sub: 'Research • Evidence • Global Perspectives' },
    { main: 'Break Myths', sub: 'Critical Thinking • Real Data • New Insights' },
    { main: 'Think Deeper', sub: 'Beyond Headlines • Systemic Change • Root Causes' },
    { main: 'Learn Differently', sub: 'Interactive • Engaging • Impact-Focused' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textRotations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setCurrentText(0);
    
    // Start the dot animation sequence
    const animationTimer = setTimeout(() => {
      setAnimationPhase(1);
    }, 1000);

    return () => clearTimeout(animationTimer);
  }, []);

  // Define dot positions for each letter
  const letterO = [
    { x: 15, y: 25 }, { x: 25, y: 20 }, { x: 35, y: 25 },
    { x: 12, y: 35 }, { x: 38, y: 35 },
    { x: 12, y: 45 }, { x: 38, y: 45 },
    { x: 12, y: 55 }, { x: 38, y: 55 },
    { x: 15, y: 65 }, { x: 25, y: 70 }, { x: 35, y: 65 }
  ];

  const letterN = [
    { x: 55, y: 25 }, { x: 75, y: 25 },
    { x: 55, y: 35 }, { x: 60, y: 35 }, { x: 75, y: 35 },
    { x: 55, y: 45 }, { x: 65, y: 45 }, { x: 75, y: 45 },
    { x: 55, y: 55 }, { x: 70, y: 55 }, { x: 75, y: 55 },
    { x: 55, y: 65 }, { x: 75, y: 65 }
  ];

  const letterE = [
    { x: 95, y: 25 }, { x: 105, y: 25 }, { x: 115, y: 25 },
    { x: 95, y: 35 },
    { x: 95, y: 45 }, { x: 105, y: 45 },
    { x: 95, y: 55 },
    { x: 95, y: 65 }, { x: 105, y: 65 }, { x: 115, y: 65 }
  ];

  // Scattered starting positions for dots
  const getRandomStartPosition = () => ({
    x: Math.random() * 200 + 50,
    y: Math.random() * 150 + 100
  });

  return (
    <section className="relative min-h-screen bg-one-secondary-fuchsia/20 flex items-center overflow-hidden -mt-27 lg:-mt-54 pt-20 lg:pt-54">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-one-secondary-fuchsia/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-one-secondary-peach/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-one-primary-plum/8 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-1/3 w-48 h-48 bg-one-primary-teal/10 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-10rem)]">
          
          {/* Content Side */}
          <div className={`space-y-6 lg:space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 bg-one-primary-plum/10 rounded-full border border-one-primary-plum/20">
              <div className="w-2 h-2 bg-one-primary-neon rounded-full mr-2 lg:mr-3 animate-pulse"></div>
              <span className="text-xs lg:text-sm font-semibold text-one-primary-plum font-colfax">Knowledge Hub</span>
            </div>

            {/* Dynamic Headline */}
            <div className="space-y-3 lg:space-y-4">
              <div className="min-h-[5rem] lg:h-20 xl:h-24 overflow-hidden relative">
                {textRotations.map((item, index) => (
                  <h1 
                    key={index} 
                    className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-one-primary-black leading-tight absolute inset-0 flex items-start lg:items-center transition-all duration-1000 ease-in-out font-italian-plate ${
                      index === currentText 
                        ? 'opacity-100 transform translate-y-0' 
                        : index === (currentText - 1 + textRotations.length) % textRotations.length
                        ? 'opacity-0 transform -translate-y-full'
                        : index === (currentText + 1) % textRotations.length
                        ? 'opacity-0 transform translate-y-full'
                        : 'opacity-0 transform translate-y-full'
                    }`}
                  >
                    <span className="block lg:flex lg:flex-wrap lg:items-center">
                      {item.main.split(' ').map((word, wordIndex) => (
                        <span key={wordIndex} className="block lg:inline lg:mr-3 xl:mr-4">
                          {word === 'Everything' || word === 'Truth' || word === 'Myths' || word === 'Deeper' || word === 'Differently' ? 
                            <span className="text-one-primary-plum">{word}</span> : word
                          }
                        </span>
                      ))}
                    </span>
                  </h1>
                ))}
              </div>
              
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-one-primary-black font-italian-plate">
                What You Know Might Surprise You
              </h2>
            </div>

            {/* Dynamic Subtitle */}
            <div className="min-h-[2rem] lg:h-8 overflow-hidden relative">
              {textRotations.map((item, index) => (
                <p 
                  key={index}
                  className={`text-sm sm:text-base lg:text-lg text-gray-600 font-medium absolute inset-0 flex items-start lg:items-center transition-all duration-1000 ease-in-out font-colfax ${
                    index === currentText 
                      ? 'opacity-100 transform translate-y-0' 
                      : index === (currentText - 1 + textRotations.length) % textRotations.length
                      ? 'opacity-0 transform -translate-y-full'
                      : index === (currentText + 1) % textRotations.length
                      ? 'opacity-0 transform translate-y-full'
                      : 'opacity-0 transform translate-y-full'
                  }`}
                >
                  {item.sub}
                </p>
              ))}
            </div>

            {/* Main Description */}
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg font-colfax">
              Think you understand the world's biggest problems? Prepare to question everything you thought you knew. 
              Our interactive learning experience will challenge assumptions, break down myths, and reveal the surprising truths behind global issues.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Link
                href="/learn/pathways-to-equity"
                className="group px-6 py-3 lg:px-8 lg:py-4 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-plum/90 transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-one-primary-plum/20 focus:ring-offset-2 inline-flex items-center justify-center text-sm lg:text-base font-colfax"
              >
                Enroll Now
                <svg className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="#myth-busting"
                className="group px-6 py-3 lg:px-8 lg:py-4 border-2 border-one-primary-plum text-one-primary-plum font-semibold rounded-xl hover:bg-one-primary-plum hover:text-white transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-one-primary-plum/20 focus:ring-offset-2 inline-flex items-center justify-center text-sm lg:text-base font-colfax"
              >
                Challenge Your Knowledge
                <svg className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>

            {/* Key Learning Points */}
            <div className="flex items-center space-x-6 lg:space-x-8 pt-4">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-one-primary-plum font-italian-plate">10+</div>
                <div className="text-xs lg:text-sm text-gray-500 font-colfax">Myth-Busters</div>
              </div>
              <div className="w-px h-8 lg:h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-one-primary-plum font-italian-plate">5 min</div>
                <div className="text-xs lg:text-sm text-gray-500 font-colfax">Quick Reads</div>
              </div>
              <div className="w-px h-8 lg:h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-one-primary-plum font-italian-plate">100%</div>
                <div className="text-xs lg:text-sm text-gray-500 font-colfax">Eye-Opening</div>
              </div>
            </div>
          </div>

          {/* Visual Side - Decrypted Text Animation */}
          <div className={`hidden lg:block relative transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              
              {/* Main Container with Decrypted Text */}
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-one-primary-black via-one-primary-black/95 to-one-primary-black overflow-hidden relative shadow-xl border border-one-primary-plum/30">
                
                {/* Matrix-style background effect */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(transparent 0%, rgba(116, 88, 138, 0.1) 50%, transparent 100%)`,
                    backgroundSize: '100% 2px',
                    animation: 'scan 3s linear infinite'
                  }}></div>
                </div>

                {/* Decrypted Text Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center font-mono text-green-400">
                  
                  {/* Terminal Header */}
                  <div className="text-xs mb-4 text-one-primary-neon">
                    <span className="animate-pulse">█</span> DECRYPTING GLOBAL MYTHS...
                  </div>

                  {/* Main Decrypted Messages */}
                  <div className="space-y-3 text-sm leading-relaxed">
                    
                    {/* Line 1 */}
                    <div className="group">
                      <span className="text-red-400">[MYTH]</span>
                      <span className="ml-2 line-through text-gray-500">Poverty is inevitable</span>
                      <div className="text-one-primary-neon mt-1 ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        → FALSE: Extreme poverty has decreased by 80% since 1990
                      </div>
                    </div>

                    {/* Line 2 */}
                    <div className="group delay-500">
                      <span className="text-red-400">[MYTH]</span>
                      <span className="ml-2 line-through text-gray-500">Climate change is natural</span>
                      <div className="text-one-primary-neon mt-1 ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        → FALSE: 97% of scientists confirm human cause
                      </div>
                    </div>

                    {/* Line 3 */}
                    <div className="group delay-1000">
                      <span className="text-red-400">[MYTH]</span>
                      <span className="ml-2 line-through text-gray-500">Aid doesn't work</span>
                      <div className="text-one-primary-neon mt-1 ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        → FALSE: Vaccines alone saved 20M+ lives
                      </div>
                    </div>

                    {/* Line 4 */}
                    <div className="group delay-1500">
                      <span className="text-red-400">[MYTH]</span>
                      <span className="ml-2 line-through text-gray-500">Inequality is getting worse</span>
                      <div className="text-one-primary-neon mt-1 ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        → COMPLEX: Global inequality down, local up
                      </div>
                    </div>

                    {/* Line 5 */}
                    <div className="group delay-2000">
                      <span className="text-red-400">[MYTH]</span>
                      <span className="ml-2 line-through text-gray-500">Population explosion</span>
                      <div className="text-one-primary-neon mt-1 ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        → FALSE: Growth rate peaked in 1960s
                      </div>
                    </div>

                  </div>

                  {/* Status Bar */}
                  <div className="mt-6 pt-4 border-t border-one-primary-plum/30">
                    <div className="flex items-center justify-between text-xs">
                      <div className="text-one-primary-neon">
                        <span className="animate-pulse">●</span> MYTHS DECODED: 5/10
                      </div>
                      <div className="text-one-secondary-fuchsia">
                        TRUTH LEVEL: 
                        <span className="ml-2 text-white font-bold">VERIFIED</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-gradient-to-r from-one-primary-neon to-one-secondary-fuchsia h-1 rounded-full transition-all duration-3000"
                        style={{ width: animationPhase >= 1 ? '50%' : '0%' }}
                      ></div>
                    </div>
                  </div>

                  {/* Bottom Command */}
                  <div className="mt-4 text-xs text-gray-400">
                    <span className="text-one-primary-plum">oneacademy@global:~$</span>
                    <span className="ml-2">learn --challenge-myths --reveal-truth</span>
                    <span className="animate-pulse ml-1">█</span>
                  </div>
                </div>

                {/* Glitch Effects */}
                <div className="absolute top-4 right-4 text-one-primary-neon text-xs font-mono animate-pulse">
                  [DECRYPTING...]
                </div>
                
                <div className="absolute bottom-4 left-4 text-one-secondary-fuchsia text-xs font-mono">
                  SYSTEM: TRUTH_REVEALED.exe
                </div>

                {/* Scanning Line */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-one-primary-neon to-transparent opacity-60"
                    style={{
                      animation: 'scanLine 4s linear infinite'
                    }}
                  ></div>
                </div>
              </div>

              {/* Terminal-style Floating Cards */}
              <div className="absolute -top-3 -left-3 bg-one-primary-black border border-one-primary-neon rounded-lg p-2 shadow-lg animate-pulse">
                <div className="text-xs font-mono text-one-primary-neon">
                  MYTH_BUSTER.exe
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-one-primary-black border border-one-secondary-fuchsia rounded-lg p-2 shadow-lg">
                <div className="text-xs font-mono text-one-secondary-fuchsia">
                  STATUS: ONLINE
                </div>
              </div>

              <div className="absolute top-1/3 -right-4 bg-one-primary-black border border-one-primary-teal rounded-lg p-2 shadow-lg animate-bounce">
                <div className="text-xs font-mono text-one-primary-teal text-center">
                  TRUTH<br/>LEVEL
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes scanLine {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes scan {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </section>
  );
}