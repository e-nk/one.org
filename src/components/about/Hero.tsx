'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Container from '../layouts/Container';

export default function AboutHero() {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const textRotations = [
    { main: 'For Everyone', sub: 'Students • Creators • Professionals • Dreamers' },
    { main: 'Real Impact', sub: 'Global Issues • Social Justice • System Change' },
    { main: 'Clear Learning', sub: 'Interactive • Engaging • Evidence-Based' },
    { main: 'Action Ready', sub: 'Practical Tools • Community • Real Change' },
    { main: 'Your Voice', sub: 'Advocacy • Leadership • Movement Building' },
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
    <section className="relative min-h-screen bg-one-secondary-peach/20 flex items-center overflow-hidden -mt-18 lg:-mt-26 pt-20 lg:pt-24">
      
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
            <div className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 bg-one-secondary-peach/10 rounded-full border border-one-secondary-peach/20">
              <div className="w-2 h-2 bg-one-secondary-fuchsia rounded-full mr-2 lg:mr-3 animate-pulse"></div>
              <span className="text-xs lg:text-sm font-semibold text-one-primary-plum font-colfax">About ONE Academy</span>
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
                          {word === 'Everyone' || word === 'Impact' || word === 'Learning' || word === 'Ready' || word === 'Voice' ? 
                            <span className="text-one-secondary-fuchsia">{word}</span> : word
                          }
                        </span>
                      ))}
                    </span>
                  </h1>
                ))}
              </div>
              
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-one-primary-black font-italian-plate">
                Education That Creates Changemakers
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
              We break down complex global issues into clear, relatable learning that empowers you to take meaningful action. From understanding poverty to climate change — discover your role in creating change.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Link
                href="/learn"
                className="group px-6 py-3 lg:px-8 lg:py-4 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-plum/90 transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-one-primary-plum/20 focus:ring-offset-2 inline-flex items-center justify-center text-sm lg:text-base font-colfax"
              >
                Start Learning
                <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="https://www.one.org/get-involved/"
                target="_blank"
                className="group px-6 py-3 lg:px-8 lg:py-4 border-2 border-one-secondary-fuchsia text-one-secondary-fuchsia font-semibold rounded-xl hover:bg-one-secondary-fuchsia hover:text-white transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-one-secondary-fuchsia/20 focus:ring-offset-2 inline-flex items-center justify-center text-sm lg:text-base font-colfax"
              >
                Join Movement
                <ExternalLink className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Key Stats */}
            <div className="flex items-center space-x-6 lg:space-x-8 pt-4">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-one-secondary-fuchsia font-italian-plate">10M+</div>
                <div className="text-xs lg:text-sm text-gray-500 font-colfax">Lives Impacted</div>
              </div>
              <div className="w-px h-8 lg:h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-one-primary-teal font-italian-plate">190+</div>
                <div className="text-xs lg:text-sm text-gray-500 font-colfax">Countries</div>
              </div>
              <div className="w-px h-8 lg:h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-one-secondary-peach font-italian-plate">15+</div>
                <div className="text-xs lg:text-sm text-gray-500 font-colfax">Years Impact</div>
              </div>
            </div>
          </div>

          {/* Visual Side - Academy Building/Institution Theme */}
          <div className={`hidden lg:block relative transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              
              {/* Main Academy Visual */}
              <div className="aspect-[4/3] rounded-2xl bg-white border-2 border-one-primary-plum/20 overflow-hidden relative shadow-xl">
                
                {/* Academy Grid Background */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                    <defs>
                      <pattern id="academyGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-one-primary-plum"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#academyGrid)" />
                  </svg>
                </div>

                {/* Knowledge Network Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 300">
                  <line x1="60" y1="60" x2="180" y2="120" stroke="currentColor" strokeWidth="1" className="text-one-secondary-fuchsia">
                    <animate attributeName="stroke-dasharray" values="0,200;100,100;200,0;0,200" dur="4s" repeatCount="indefinite" />
                  </line>
                  <line x1="220" y1="80" x2="340" y2="140" stroke="currentColor" strokeWidth="1" className="text-one-primary-teal">
                    <animate attributeName="stroke-dasharray" values="0,200;100,100;200,0;0,200" dur="3.5s" repeatCount="indefinite" />
                  </line>
                  <line x1="140" y1="180" x2="280" y2="240" stroke="currentColor" strokeWidth="1" className="text-one-secondary-peach">
                    <animate attributeName="stroke-dasharray" values="0,200;100,100;200,0;0,200" dur="4.5s" repeatCount="indefinite" />
                  </line>
                </svg>

                {/* Learning Nodes */}
                <div className="absolute top-12 left-16 w-3 h-3 bg-one-secondary-fuchsia rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-2.5 h-2.5 bg-one-primary-teal rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-20 w-3.5 h-3.5 bg-one-secondary-peach rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-12 right-16 w-3 h-3 bg-one-primary-plum rounded-full animate-pulse delay-1500"></div>

                {/* Central Academy Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    
                    {/* Academy Icon */}
                    <div className="relative">
                      <div className="absolute inset-0 w-20 h-20 bg-one-primary-plum/10 rounded-full animate-ping"></div>
                      <div className="relative w-20 h-20 bg-one-primary-plum rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-one-secondary-fuchsia rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-xs font-bold text-white">!</span>
                      </div>
                    </div>

                    {/* Academy Text */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-one-primary-plum font-italian-plate">
                        ONE Academy
                      </h3>
                      <p className="text-sm text-gray-600 font-colfax max-w-xs mx-auto">
                        Where learning meets action for global change
                      </p>
                    </div>

                    {/* Academy Stats */}
                    <div className="flex items-center justify-center space-x-6 pt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-one-secondary-fuchsia font-italian-plate">10M+</div>
                        <div className="text-xs text-gray-500 font-colfax">Learners</div>
                      </div>
                      <div className="w-px h-8 bg-gray-300"></div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-one-primary-teal font-italian-plate">190+</div>
                        <div className="text-xs text-gray-500 font-colfax">Countries</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Academy Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-one-secondary-fuchsia rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-one-secondary-peach rounded-bl-lg"></div>
              </div>

              {/* Floating Achievement Cards */}
              <div className="absolute -top-3 -left-3 bg-white rounded-xl p-3 shadow-lg border border-one-secondary-fuchsia/20 animate-bounce delay-1000">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-one-secondary-fuchsia rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-700 font-colfax">Free Learning</span>
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-white rounded-xl p-3 shadow-lg border border-one-primary-teal/20 animate-bounce delay-1500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-one-primary-teal rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-700 font-colfax">Real Impact</span>
                </div>
              </div>

              <div className="absolute top-1/3 -right-4 bg-white rounded-xl p-2 shadow-lg border border-one-secondary-peach/20 animate-pulse">
                <div className="text-center">
                  <div className="text-sm font-bold text-one-secondary-peach font-italian-plate">15+</div>
                  <div className="text-xs text-gray-500 font-colfax">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}