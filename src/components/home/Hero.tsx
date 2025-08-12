'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../layouts/Container';

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const textRotations = [
    { main: 'Learn to Lead', sub: 'Education • Advocacy • Global Impact' },
    { main: 'Drive Change', sub: 'Social Justice • Equity • Activism' },
    { main: 'Fight Poverty', sub: 'Global Development • Economic Justice' },
    { main: 'Climate Action', sub: 'Environmental Justice • Sustainability' },
    { main: 'Health Equity', sub: 'Global Health • Healthcare Access' },
    { main: 'Gender Equality', sub: 'Women\'s Rights • Social Change' },
    { main: 'Transform Lives', sub: 'Youth Empowerment • Community Building' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textRotations.length);
    }, 4000); // 4 seconds rotation
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setCurrentText(0);
  }, []);

  return (
    <section className="relative min-h-screen bg-white flex items-center overflow-hidden -mt-30 lg:-mt-54 pt-20 lg:pt-24">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-one-primary-plum/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-one-primary-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-one-primary-neon/5 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)]">
          
          {/* Content Side */}
          <div className={`space-y-6 lg:space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            
            {/* Badge */}
            {/* <div className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 bg-one-primary-plum/10 rounded-full border border-one-primary-plum/20">
              <div className="w-2 h-2 bg-one-primary-neon rounded-full mr-2 lg:mr-3 animate-pulse"></div>
              <span className="text-xs lg:text-sm font-semibold text-one-primary-plum font-colfax">Digital Learning Platform</span>
            </div> */}

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
                          {word === 'Lead' || word === 'Change' || word === 'Poverty' || word === 'Action' || word === 'Equity' || word === 'Equality' || word === 'Lives' ? 
                            <span className="text-one-primary-plum">{word}</span> : word
                          }
                        </span>
                      ))}
                    </span>
                  </h1>
                ))}
              </div>
              
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-one-primary-black font-italian-plate">
                Education That Empowers Action
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
              Join thousands of changemakers worldwide learning to tackle urgent social issues. From poverty and climate change to health equity and social justice — transform your passion into powerful action.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Link
                href="/learn/pathways-to-equity"
                className="group px-6 py-3 lg:px-8 lg:py-4 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-plum/90 transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-one-primary-plum/20 focus:ring-offset-2 inline-flex items-center justify-center text-sm lg:text-base font-colfax"
              >
                Start Learning Now
                <svg className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="https://www.one.org/get-involved/"
                target="_blank"
                className="group px-6 py-3 lg:px-8 lg:py-4 border-2 border-one-primary-plum text-one-primary-plum font-semibold rounded-xl hover:bg-one-primary-plum hover:text-white transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-one-primary-plum/20 focus:ring-offset-2 inline-flex items-center justify-center text-sm lg:text-base font-colfax"
              >
                Join the Movement
                <svg className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>

            {/* Key Stats */}
            <div className="flex items-center space-x-6 lg:space-x-8 pt-4">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-one-primary-plum font-italian-plate">50K+</div>
                <div className="text-xs lg:text-sm text-gray-500 font-colfax">Global Learners</div>
              </div>
              <div className="w-px h-8 lg:h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-one-primary-plum font-italian-plate">15+</div>
                <div className="text-xs lg:text-sm text-gray-500 font-colfax">Course Topics</div>
              </div>
              <div className="w-px h-8 lg:h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-one-primary-plum font-italian-plate">190+</div>
                <div className="text-xs lg:text-sm text-gray-500 font-colfax">Countries</div>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className={`hidden lg:block relative transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              
              {/* Main Visual - Global Impact Network */}
              <div className="aspect-[4/3] rounded-2xl bg-one-primary-black/95 overflow-hidden relative">
                
                {/* World Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-one-primary-neon"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Animated Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                  {/* Connection lines with animation */}
                  <line x1="50" y1="80" x2="150" y2="120" stroke="currentColor" strokeWidth="1" className="text-one-primary-neon opacity-60">
                    <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0;0,100" dur="3s" repeatCount="indefinite" />
                  </line>
                  <line x1="200" y1="60" x2="300" y2="140" stroke="currentColor" strokeWidth="1" className="text-one-primary-teal opacity-60">
                    <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0;0,100" dur="4s" repeatCount="indefinite" />
                  </line>
                  <line x1="150" y1="200" x2="280" y2="80" stroke="currentColor" strokeWidth="1" className="text-one-primary-plum opacity-60">
                    <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0;0,100" dur="3.5s" repeatCount="indefinite" />
                  </line>
                </svg>

                {/* Impact Nodes */}
                <div className="absolute top-6 left-12 w-3 h-3 bg-one-primary-neon rounded-full animate-pulse"></div>
                <div className="absolute top-16 right-20 w-2 h-2 bg-one-primary-teal rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-20 w-2.5 h-2.5 bg-one-primary-plum rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-12 right-16 w-3 h-3 bg-one-primary-neon rounded-full animate-pulse delay-1500"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full animate-pulse delay-2000"></div>

                {/* Central Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    
                    {/* Main Icon */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-one-primary-plum rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-one-primary-neon rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-one-primary-black">+</span>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white font-italian-plate">
                        Global Impact Network
                      </h3>
                      <p className="text-sm text-gray-300 font-colfax max-w-xs mx-auto">
                        Connect with changemakers worldwide and turn learning into real action
                      </p>
                    </div>

                    {/* Mini Stats */}
                    <div className="flex items-center justify-center space-x-6 pt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-one-primary-neon font-italian-plate">50K+</div>
                        <div className="text-xs text-gray-400 font-colfax">Activists</div>
                      </div>
                      <div className="w-px h-8 bg-gray-600"></div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-one-primary-teal font-italian-plate">190+</div>
                        <div className="text-xs text-gray-400 font-colfax">Countries</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-one-primary-plum rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-one-primary-teal rounded-bl-lg"></div>
              </div>

              {/* Course Progress Indicator */}
              {/* <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-lg border border-one-primary-plum/20">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-one-primary-neon rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-one-primary-black font-colfax">Live Learning</span>
                  <div className="w-2 h-2 bg-one-primary-plum rounded-full animate-pulse delay-500"></div>
                </div>
              </div> */}

              {/* Impact Metrics - Minimal and Elegant */}
              {/* <div className="absolute -top-4 -right-4 bg-one-primary-plum text-white rounded-xl p-3 shadow-lg">
                <div className="text-center">
                  <div className="text-sm font-bold font-italian-plate">Real Impact</div>
                  <div className="text-xs opacity-90 font-colfax">Every Course</div>
                </div>
              </div> */}

              {/* <div className="absolute top-1/3 -left-4 bg-white rounded-xl p-3 shadow-lg border border-one-primary-teal/20">
                <div className="text-center">
                  <div className="text-lg font-bold text-one-primary-teal font-italian-plate">Learn</div>
                  <div className="text-xs text-gray-500 font-colfax">→ Act</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Container>

      {/* Course Categories Banner */}
      <div className="hidden lg:block absolute bottom-8 left-0 right-0">
        <Container>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-one-primary-plum/10">
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <span className="text-sm font-medium text-one-primary-black font-colfax">Featured Courses:</span>
              {[
                'Pathways to Equity',
                'Climate Leadership', 
                'Global Health Advocacy',
                'Economic Justice',
                'Youth Empowerment'
              ].map((course, index) => (
                <div key={course} className="flex items-center">
                  <span className="text-sm font-semibold text-one-primary-plum font-colfax">{course}</span>
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