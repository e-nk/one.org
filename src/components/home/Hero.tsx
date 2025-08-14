'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPinPlusInside, X } from 'lucide-react';
import Container from '../layouts/Container';

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activePin, setActivePin] = useState(null); // No default active pin

  // Pin data with campaigns
  const mapPins = [
    {
      id: 1,
      region: "North America",
      position: { top: "38%", left: "15%" },
      campaign: "African Diaspora Development Institute",
      description: "Mobilizes African diaspora communities in North America to support African development projects."
    },
    {
      id: 2,
      region: "Europe",
      position: { top: "30%", left: "43%" },
      campaign: "Fairtrade Foundation",
      description: "Promotes fair trade practices to empower African farmers and producers."
    },
    {
      id: 3,
      region: "Europe",
      position: { top: "27%", left: "47%" },
      campaign: "Refugee Support Network",
      description: "Provides mentorship and support to African refugees resettled in Europe."
    },
    {
      id: 4,
      region: "Global",
      position: { top: "66%", left: "85%" },
      campaign: "Global Partnership for Education (GPE)",
      description: "Supports education systems in developing countries, with many programs across Africa."
    },
    {
      id: 5,
      region: "East Africa",
      position: { top: "55%", left: "57%" },
      campaign: "Sauti East Africa",
      description: "Builds youth capacity through entrepreneurship and innovation hubs to foster economic growth."
    },
    {
      id: 6,
      region: "Africa",
      position: { top: "51%", left: "47%" },
      campaign: "African Youth Climate Hub",
      description: "Empowers young Africans to lead climate change solutions through advocacy, education, and innovation."
    },
    {
      id: 7,
      region: "Africa",
      position: { top: "68%", left: "52%" },
      campaign: "Amref Health Africa",
      description: "Works to improve health outcomes through community health worker programs and maternal health initiatives."
    },
    {
      id: 8,
      region: "Global",
      position: { top: "60%", left: "28%" },
      campaign: "Malaria No More",
      description: "Works globally to eradicate malaria, focusing heavily on Africa."
    }
  ];

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
      
      {/* World Map Background - Right Side, Positioned Closer to Content */}
      <div className="absolute inset-0 hidden lg:block">
        <div 
          className="absolute top-16 right-0 w-3/5 h-[calc(100%-4rem)] bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/map-1.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'left center'
          }}
        >
          {/* Subtle overlay for better text contrast */}
          <div className="absolute inset-0 bg-white/30"></div>
          
          {/* Interactive Map Pins */}
          {mapPins.map((pin) => (
            <div
              key={pin.id}
              className={`absolute cursor-pointer group ${
                activePin === pin.id ? 'z-[70]' : 'z-40'
              }`}
              style={{ 
                top: pin.position.top, 
                left: pin.position.left,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => {
                console.log(`Hovering pin ${pin.id}`); // Debug log
                setActivePin(pin.id);
              }}
              onMouseLeave={() => {
                console.log(`Left pin ${pin.id}`); // Debug log
                setActivePin(null);
              }}
            >
              {/* Pin Icon - Always Visible */}
              <div className={`relative transition-all duration-300 ${
                activePin === pin.id 
                  ? 'scale-125' 
                  : 'scale-100 hover:scale-110'
              }`}>
                <MapPinPlusInside 
                  className={`w-8 h-8 transition-all duration-300 ${
                    activePin === pin.id
                      ? 'text-one-primary-plum drop-shadow-lg'
                      : 'text-one-tertiary-orange hover:text-one-primary-plum'
                  }`}
                  strokeWidth={2.5}
                />
                
                {/* Pulse ring - Always visible for discoverability */}
                <div className={`absolute inset-0 w-8 h-8 border-2 rounded-full animate-ping ${
                  activePin === pin.id 
                    ? 'border-one-primary-plum opacity-40' 
                    : 'border-one-tertiary-orange opacity-20'
                }`}></div>
              </div>

              {/* Info Card - Show only on hover */}
              {activePin === pin.id && (
                <div 
                  className="absolute top-10 left-1/2 transform -translate-x-1/2 w-80 bg-white rounded-xl shadow-2xl border border-one-primary-plum/20 p-6 animate-fadeIn z-[80]"
                  onMouseEnter={() => setActivePin(pin.id)} // Keep card open when hovering over it
                  onMouseLeave={() => setActivePin(null)}
                >
                  
                  {/* Region Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-one-primary-plum/10 rounded-full mb-4">
                    <div className="w-2 h-2 bg-one-primary-plum rounded-full mr-2 animate-pulse"></div>
                    <span className="text-xs font-semibold text-one-primary-plum font-colfax uppercase tracking-wider">
                      {pin.region}
                    </span>
                  </div>

                  {/* Campaign Title */}
                  <h3 className="text-lg font-bold text-one-primary-black font-italian-plate mb-3 leading-tight">
                    {pin.campaign}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 font-colfax leading-relaxed">
                    {pin.description}
                  </p>

                  {/* Decorative bottom border */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-one-primary-teal rounded-full"></div>
                        <span className="text-xs text-gray-500 font-colfax">Active Campaign</span>
                      </div>
                      <div className="text-xs text-one-primary-plum font-semibold font-colfax">
                        #{pin.id.toString().padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  {/* Arrow pointing to pin */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-white border-l border-t border-one-primary-plum/20 transform rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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

          {/* Right side content - This will be overlaid on the map background */}
          <div className="hidden lg:block relative">
            {/* This space intentionally left minimal - the map is now part of the background */}
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