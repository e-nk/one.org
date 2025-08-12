'use client';

import { useState, useEffect } from 'react';
import Container from '../../layouts/Container';
import { Users } from 'lucide-react';

export default function PathwaysEquityHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-one-primary-plum/20 flex items-center overflow-hidden -mt-27 lg:-mt-54 pt-30 lg:pt-24">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-one-primary-neon/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-one-primary-teal/20 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-10rem)]">
          
          {/* Content Side */}
          <div className={`space-y-6 lg:space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
              
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 bg-one-primary-neon/10 rounded-full border border-one-primary-neon/30">
                <div className="w-2 h-2 bg-one-primary-neon rounded-full mr-2 lg:mr-3 animate-pulse"></div>
                <span className="text-xs lg:text-sm font-semibold text-one-primary-plum font-colfax">Available Now</span>
              </div>

              {/* Course Title */}
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-one-primary-black leading-tight font-italian-plate">
                  <span className="text-one-primary-plum">Pathways</span> to Equity
                </h1>
                
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-700 font-italian-plate">
                  Understanding and Addressing Systemic Inequalities
                </h2>
              </div>

              {/* Course Description */}
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed font-colfax">
                Explore the root causes of inequality and learn practical frameworks for creating more equitable systems. This interactive course combines theory with real-world applications.
              </p>

              {/* Course Stats - Horizontal Layout Like Screenshot */}
              <div className="flex items-center space-x-8 flex-wrap gap-y-4">
                
                {/* Rating */}
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <svg className="w-4 h-4" style={{ color: '#C4710D' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="text-lg lg:text-xl font-bold text-one-primary-black font-colfax">4.8</span>
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500 font-colfax">average course rating</div>
                </div>

                {/* Practice Exercises */}
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <svg className="w-4 h-4 text-one-primary-plum" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span className="text-lg lg:text-xl font-bold text-one-primary-black font-colfax">12</span>
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500 font-colfax">practice exercises</div>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <svg className="w-4 h-4 text-one-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-lg lg:text-xl font-bold text-one-primary-black font-colfax">2hrs</span>
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500 font-colfax">hours of content</div>
                </div>
              </div>

              {/* Get Started Button */}
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="group px-6 py-3 lg:px-8 lg:py-4 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-black transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-one-primary-plum/20 focus:ring-offset-2 inline-flex items-center text-sm lg:text-base font-colfax"
              >
                Get Started
                <svg className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Enrolled Count */}
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-xs lg:text-sm text-gray-500 font-colfax">
                  <strong className="text-one-primary-black">342</strong> learners already enrolled
                </span>
              </div>
            </div>

            {/* Right Side - Course Image (Desktop Only) */}
            <div className="hidden lg:block">
              <div className="relative">
                
                {/* Course Image Container */}
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 relative">
                  <img 
                    src="/images/pathways-to-equity-course.jpg" 
                    alt="Pathways to Equity course - diverse group of young people collaborating on social justice initiatives" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Course Preview Overlay - ALWAYS VISIBLE */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <button className="p-4 bg-white text-one-primary-plum rounded-full hover:bg-one-primary-neon hover:text-one-primary-black transition-all duration-200 shadow-xl transform hover:scale-110">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                      <p className="text-white font-semibold font-colfax text-sm">Course Preview</p>
                    </div>
                  </div>
                </div>

                {/* Modern Floating Elements */}
                <div className="absolute -top-6 -left-6 bg-one-primary-neon text-one-primary-black rounded-2xl p-4 shadow-xl font-colfax transform rotate-3">
                  <div className="text-sm font-bold">FREE</div>
                  <div className="text-xs">Course</div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border-2 border-one-primary-plum/20">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3" style={{ color: '#C4710D' }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span style={{ color: '#C4710D' }} className="text-sm font-bold font-colfax">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>

      {/* Registration Modal Placeholder */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-one-primary-black mb-4 font-italian-plate">
                Registration Form
              </h3>
              <p className="text-base lg:text-lg text-gray-600 mb-6 font-colfax">
                Registration form will be implemented here.
              </p>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="px-6 py-3 lg:px-8 lg:py-4 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-plum/90 transition-colors duration-200 text-sm lg:text-base font-colfax"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}