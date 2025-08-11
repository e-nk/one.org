'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../layouts/Container';

export default function FeaturedCourses() {
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentRotatingText, setCurrentRotatingText] = useState(0);

  const rotatingTexts = [
    "Want to Understand the World — and Your Place in It?",
    "Ready to Turn Learning Into Real Action?",
    "Curious About Creating Meaningful Change?",
    "Passionate About Building a Better Future?"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('featured-courses');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRotatingText((prev) => (prev + 1) % rotatingTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const courses = [
    {
      title: 'Pathways to Equity',
      description: 'Understanding and addressing systemic inequalities in our world.',
      status: 'available',
      duration: '4 weeks',
      level: 'Beginner',
      topics: ['Social Justice', 'Equity', 'System Change'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      title: 'Poverty and Inequality: Understanding the Basics',
      description: 'An introduction to why these issues exist and why they matter.',
      status: 'coming-soon',
      duration: '3 weeks',
      level: 'Beginner',
      topics: ['Poverty', 'Economics', 'Global Issues'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
        </svg>
      )
    },
    {
      title: 'Simple Ways to Make a Difference',
      description: 'Everyday actions that can create real change, wherever you are.',
      status: 'coming-soon',
      duration: '2 weeks',
      level: 'All Levels',
      topics: ['Action', 'Impact', 'Community'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Climate Change: What You Should Know',
      description: 'A clear look at the climate crisis and what it means for all of us.',
      status: 'coming-soon',
      duration: '4 weeks',
      level: 'Beginner',
      topics: ['Climate', 'Environment', 'Science'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Health for All: Why It Matters',
      description: 'Why equal access to healthcare is important, and what\'s being done.',
      status: 'coming-soon',
      duration: '3 weeks',
      level: 'Beginner',
      topics: ['Health', 'Equity', 'Global Health'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="featured-courses" className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      
      {/* Background decorative elements - more subtle on gray background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-one-primary-plum/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-one-primary-teal/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-one-secondary-peach/8 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        
        {/* Header with Badge, Title, and Rotating Subtitle */}
        <div className={`mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Badge - same as hero */}
          <div className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 bg-one-primary-plum/10 rounded-full border border-one-primary-plum/20 mb-6">
            <div className="w-2 h-2 bg-one-primary-neon rounded-full mr-2 lg:mr-3 animate-pulse"></div>
            <span className="text-xs lg:text-sm font-semibold text-one-primary-plum font-colfax">Our Learning Platform</span>
          </div>

          {/* Main Title - same size as hero h1 */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-one-primary-black mb-6 font-italian-plate">
            Featured Courses
          </h2>
          
          {/* Rotating Subtitle - same size as hero h2 */}
          <div className="max-w-4xl">
            <div className="min-h-[2rem] lg:h-8 overflow-hidden relative mb-6">
              {rotatingTexts.map((text, index) => (
                <h3
                  key={index}
                  className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-one-primary-plum leading-tight absolute inset-0 flex items-start lg:items-center transition-all duration-1000 ease-in-out font-italian-plate ${
                    index === currentRotatingText 
                      ? 'opacity-100 transform translate-y-0' 
                      : index === (currentRotatingText - 1 + rotatingTexts.length) % rotatingTexts.length
                      ? 'opacity-0 transform -translate-y-full'
                      : 'opacity-0 transform translate-y-full'
                  }`}
                >
                  {text}
                </h3>
              ))}
            </div>
            
            {/* Description - same size as hero */}
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed font-colfax">
              ONE Academy is a free, interactive learning platform from ONE.org that helps young people 
              make sense of big global issues — poverty, climate change, health, inequality — and shows 
              how small actions can create big change. No experience needed. Just curiosity.
            </p>
          </div>
        </div>

        {/* Active Course - Full Width Featured */}
        <div className={`mb-16 transform transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border-2 border-one-primary-plum relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
              <div className="w-full h-full bg-one-primary-plum rounded-full transform translate-x-32 -translate-y-32"></div>
            </div>

            {/* Available Badge */}
            <div className="absolute -top-4 left-8">
              <span className="bg-one-primary-neon text-one-primary-black px-6 py-2 rounded-full text-xs lg:text-sm font-bold font-colfax shadow-lg">
                AVAILABLE NOW
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
              
              {/* Course Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-one-primary-plum/10 rounded-xl text-one-primary-plum">
                    {courses[0].icon}
                  </div>
                  <div>
                    {/* Course title - same as hero stats size */}
                    <h4 className="text-2xl lg:text-3xl font-bold text-one-primary-black font-italian-plate">
                      {courses[0].title}
                    </h4>
                    {/* Meta info - same as hero small text */}
                    <div className="flex items-center space-x-4 text-xs lg:text-sm text-gray-500 font-colfax mt-2">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {courses[0].duration}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {courses[0].level}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Description - same as hero */}
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed font-colfax">
                  {courses[0].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {courses[0].topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-one-primary-plum/10 text-one-primary-plum rounded-lg text-xs lg:text-sm font-semibold font-colfax"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA - same size as hero buttons */}
              <div className="text-center lg:text-right">
                <Link
                  href="/learn/pathways-to-equity"
                  className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-plum/90 transform transition-all duration-200 hover:scale-105 shadow-lg group text-sm lg:text-base font-colfax"
                >
                  Start Learning
                  <svg className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                {/* Supporting text - same as hero */}
                <p className="text-xs lg:text-sm text-gray-500 mt-3 font-colfax">
                  Free • Interactive • Impact-Focused
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Courses */}
        <div className={`transform transition-all duration-1000 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Section title - same as hero h2 */}
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-one-primary-black mb-8 font-italian-plate">
            Coming Soon
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.slice(1).map((course, index) => (
              <div
                key={index + 1}
                className="group bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-one-primary-teal/50 transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => setHoveredCourse(index + 1)}
                onMouseLeave={() => setHoveredCourse(null)}
              >
                {/* Coming Soon Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-one-primary-teal/10 rounded-lg text-one-primary-teal">
                    {course.icon}
                  </div>
                  <span className="bg-one-primary-teal text-white px-3 py-1 rounded-full text-xs lg:text-sm font-semibold font-colfax">
                    COMING SOON
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    {/* Course title - smaller than main course */}
                    <h4 className="text-lg lg:text-xl font-bold text-one-primary-black mb-2 font-italian-plate group-hover:text-one-primary-plum transition-colors duration-200">
                      {course.title}
                    </h4>
                    {/* Description - same as hero */}
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-colfax">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Meta info - same as hero small text */}
                    <div className="flex items-center space-x-3 text-xs lg:text-sm text-gray-500 font-colfax">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {course.level}
                      </span>
                    </div>

                    <button className="px-4 py-2 border border-one-primary-teal text-one-primary-teal font-semibold rounded-lg hover:bg-one-primary-teal/10 transition-colors duration-200 text-xs lg:text-sm font-colfax">
                      Get Notified
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}