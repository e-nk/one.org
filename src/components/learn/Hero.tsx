'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../layouts/Container';

export default function LearnHero() {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
  }, []);

  return (
    <section className="relative min-h-screen bg-one-secondary-fuchsia/20 flex items-center overflow-hidden -mt-27 lg:-mt-54 pt-20 lg:pt-54">
      
      {/* Background decorative elements - Different color scheme */}
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

          {/* Visual Side - Enhanced Knowledge/Learning Theme */}
          <div className={`hidden lg:block relative transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              
              {/* Main Visual Container */}
              <div className="aspect-[4/3] rounded-2xl bg-white border-2 border-one-primary-plum/20 overflow-hidden relative shadow-xl">
                
                {/* Animated Knowledge Grid Background */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                    {/* Grid Pattern */}
                    <defs>
                      <pattern id="learningGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-one-primary-plum"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#learningGrid)" />
                    
                    {/* Floating Learning Icons */}
                    <circle cx="80" cy="60" r="15" className="fill-one-secondary-peach opacity-20" />
                    <circle cx="320" cy="90" r="12" className="fill-one-secondary-fuchsia opacity-25" />
                    <circle cx="150" cy="180" r="18" className="fill-one-primary-teal opacity-15" />
                    <circle cx="280" cy="220" r="14" className="fill-one-primary-plum opacity-20" />
                  </svg>
                </div>

                {/* Floating Question/Exclamation Marks */}
                <div className="absolute top-6 left-6 text-2xl text-one-secondary-fuchsia opacity-40 animate-bounce">?</div>
                <div className="absolute top-12 right-12 text-3xl text-one-secondary-peach opacity-35 animate-pulse">!</div>
                <div className="absolute bottom-16 left-12 text-2xl text-one-primary-teal opacity-30 animate-bounce delay-1000">?</div>
                <div className="absolute bottom-8 right-8 text-2xl text-one-primary-plum opacity-40 animate-pulse delay-500">!</div>

                {/* Central Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    
                    {/* Main Icon with Pulsing Ring */}
                    <div className="relative">
                      <div className="absolute inset-0 w-20 h-20 bg-one-primary-plum/20 rounded-full animate-ping"></div>
                      <div className="relative w-20 h-20 bg-one-primary-plum rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-one-secondary-fuchsia rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-xs font-bold text-white">!</span>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-one-primary-plum font-italian-plate">
                        Question Everything
                      </h3>
                      <p className="text-sm text-gray-600 font-colfax max-w-xs mx-auto">
                        Challenge assumptions and discover the truth behind global issues
                      </p>
                    </div>

                    {/* Learning Stats */}
                    <div className="flex items-center justify-center space-x-6 pt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-one-secondary-peach font-italian-plate">10+</div>
                        <div className="text-xs text-gray-500 font-colfax">Myths</div>
                      </div>
                      <div className="w-px h-8 bg-gray-300"></div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-one-secondary-fuchsia font-italian-plate">5min</div>
                        <div className="text-xs text-gray-500 font-colfax">Each</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Learning Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-one-secondary-fuchsia rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-one-secondary-peach rounded-bl-lg"></div>
              </div>

              {/* Floating Learning Cards */}
              <div className="absolute -top-3 -left-3 bg-white rounded-xl p-3 shadow-lg border border-one-secondary-peach/20 animate-bounce delay-1000">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-one-secondary-peach rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-700 font-colfax">Myth Busted</span>
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-white rounded-xl p-3 shadow-lg border border-one-secondary-fuchsia/20 animate-bounce delay-1500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-one-secondary-fuchsia rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-700 font-colfax">Truth Revealed</span>
                </div>
              </div>

              <div className="absolute top-1/3 -right-4 bg-white rounded-xl p-2 shadow-lg border border-one-primary-teal/20 animate-pulse">
                <div className="text-center">
                  <div className="text-sm font-bold text-one-primary-teal font-italian-plate">?→!</div>
                  <div className="text-xs text-gray-500 font-colfax">Learn</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Learning Categories Banner */}
      <div className="hidden lg:block absolute bottom-8 left-0 right-0">
        <Container>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-one-primary-plum/10">
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <span className="text-sm font-medium text-one-primary-black font-colfax">Explore Topics:</span>
              {[
                'Global Poverty Myths',
                'Climate Misconceptions', 
                'Health System Truths',
                'Economic Justice Facts',
                'Social Change Reality'
              ].map((topic, index) => (
                <div key={topic} className="flex items-center">
                  <span className="text-sm font-semibold text-one-primary-plum font-colfax">{topic}</span>
                  {index < 4 && <div className="w-1 h-1 bg-one-primary-teal rounded-full ml-4"></div>}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}