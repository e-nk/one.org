'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const pathname = usePathname();

  const fullText = "Empowering the next generation of changemakers";

  // Typewriter effect
  useEffect(() => {
    if (!mounted) return;
    
    let currentIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 80);

    return () => clearInterval(typewriterInterval);
  }, [mounted]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  // Handle scroll effect for header background
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Handle dropdown hover
  const handleDropdownEnter = (item: string) => {
    setActiveDropdown(item);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const isActivePage = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-one-primary-plum text-white text-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center space-x-6">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-one-primary-neon rounded-full animate-pulse"></div>
                <span className="font-colfax">
                  {typewriterText}
                  <span className={`inline-block w-0.5 h-4 bg-one-primary-neon ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
                </span>
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <a 
                href="mailto:support@oneacademy.org"
                className="flex items-center space-x-1 hover:text-one-primary-neon transition-colors duration-200"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Support</span>
              </a>
              <div className="h-4 w-px bg-white/30"></div>
              <span>Global Impact Starts Here</span>
              <div className="h-4 w-px bg-white/30"></div>
              <Link 
                href="https://www.one.org" 
                target="_blank"
                className="hover:text-one-primary-neon transition-colors duration-200"
              >
                Visit ONE.org
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-one-primary-plum/5 top-0' 
          : 'bg-white lg:bg-transparent lg:top-12 top-0'
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 lg:h-28">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/one_logo/ONE-logo-black.svg" 
                  alt="ONE Academy" 
                  className="h-14 lg:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-one-primary-plum scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div>
                <h1 className="font-italian-plate font-bold text-lg sm:text-xl lg:text-2xl text-one-primary-black group-hover:text-one-primary-plum transition-colors duration-300">
                  Academy
                </h1>
                <div className="text-xs text-one-primary-teal font-colfax font-medium tracking-wider uppercase">
                  Learn • Act • Change
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              
              {/* Home */}
              <Link 
                href="/"
                className={`relative font-colfax font-medium text-base transition-all duration-300 hover:text-one-primary-plum group ${
                  isActivePage('/') ? 'text-one-primary-plum' : 'text-one-primary-black'
                }`}
              >
                Home
                <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-one-primary-plum transition-all duration-300 ${
                  isActivePage('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>

              {/* Learn */}
              <Link 
                href="/learn"
                className={`relative font-colfax font-medium text-base transition-all duration-300 hover:text-one-primary-plum group ${
                  isActivePage('/learn') ? 'text-one-primary-plum' : 'text-one-primary-black'
                }`}
              >
                Learn
                <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-one-primary-plum transition-all duration-300 ${
                  isActivePage('/learn') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>

              {/* About */}
              <Link 
                href="/about"
                className={`relative font-colfax font-medium text-base transition-all duration-300 hover:text-one-primary-plum group ${
                  isActivePage('/about') ? 'text-one-primary-plum' : 'text-one-primary-black'
                }`}
              >
                About
                <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-one-primary-plum transition-all duration-300 ${
                  isActivePage('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>

              {/* Get Involved - Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleDropdownEnter('get-involved')}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center space-x-1 font-colfax font-medium text-base text-one-primary-black hover:text-one-primary-plum transition-all duration-300 group">
                  <span>Get Involved</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === 'get-involved' ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl shadow-one-primary-plum/10 border border-gray-100 overflow-hidden transition-all duration-300 ${
                  activeDropdown === 'get-involved' 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 -translate-y-2 invisible'
                }`}>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="font-italian-plate font-bold text-lg text-one-primary-plum mb-2">
                        Make Your Impact
                      </h3>
                      <p className="text-sm text-gray-600 font-colfax">
                        Join thousands of young changemakers worldwide
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { name: 'Join', href: 'https://www.one.org/get-involved/join/', desc: 'Become part of our community' },
                        { name: 'Take Action', href: 'https://www.one.org/get-involved/take-action/', desc: 'Start making a difference today' },
                        { name: 'Your Voice', href: 'https://www.one.org/get-involved/your-voice/', desc: 'Share your story and inspire others' },
                        { name: 'Become a Youth Ambassador', href: 'https://www.one.org/get-involved/become-a-youth-ambassador/', desc: 'Lead change in your community' },
                        { name: 'Partner with Us', href: 'https://www.one.org/get-involved/partner-with-us/', desc: 'Collaborate for greater impact' }
                      ].map((item, index) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-one-primary-plum/5 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-one-primary-plum rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-colfax font-semibold text-one-primary-black group-hover:text-one-primary-plum transition-colors duration-200">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 font-colfax">
                              {item.desc}
                            </div>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-one-primary-plum transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ONE.ORG */}
              <Link 
                href="https://www.one.org"
                target="_blank"
                className="font-colfax font-medium text-base text-one-primary-black hover:text-one-primary-plum transition-all duration-300 group flex items-center space-x-1"
              >
                <span>One.org</span>
                <svg className="w-3 h-3 text-gray-400 group-hover:text-one-primary-plum transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </nav>

            {/* Enroll Now Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              
              {/* Enroll Now Button */}
              <Link 
                href="/learn/pathways-to-equity"
                className="hidden sm:inline-flex items-center px-6 py-3 bg-one-primary-plum text-white font-colfax font-semibold rounded-full hover:bg-one-primary-plum/90 hover:shadow-lg hover:shadow-one-primary-plum/25 transform hover:scale-105 transition-all duration-300 group"
              >
                <span>Enroll Now</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-1 group"
                aria-label="Toggle mobile menu"
              >
                <span className={`w-6 h-0.5 bg-one-primary-plum transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}></span>
                <span className={`w-6 h-0.5 bg-one-primary-plum transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`w-6 h-0.5 bg-one-primary-plum transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              
              <Link href="/" className="block py-3 font-colfax font-medium text-one-primary-black hover:text-one-primary-plum transition-colors duration-200">
                Home
              </Link>
              
              <Link href="/learn" className="block py-3 font-colfax font-medium text-one-primary-black hover:text-one-primary-plum transition-colors duration-200">
                Learn
              </Link>
              
              <Link href="/about" className="block py-3 font-colfax font-medium text-one-primary-black hover:text-one-primary-plum transition-colors duration-200">
                About
              </Link>

              {/* Mobile Get Involved */}
              <div className="py-3">
                <div className="font-colfax font-semibold text-one-primary-plum mb-3">Get Involved</div>
                <div className="pl-4 space-y-3">
                  {[
                    { name: 'Join', href: 'https://www.one.org/get-involved/join/' },
                    { name: 'Take Action', href: 'https://www.one.org/get-involved/take-action/' },
                    { name: 'Your Voice', href: 'https://www.one.org/get-involved/your-voice/' },
                    { name: 'Become a Youth Ambassador', href: 'https://www.one.org/get-involved/become-a-youth-ambassador/' },
                    { name: 'Partner with Us', href: 'https://www.one.org/get-involved/partner-with-us/' }
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      className="block py-2 font-colfax text-sm text-gray-600 hover:text-one-primary-plum transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                href="https://www.one.org" 
                target="_blank"
                className="block py-3 font-colfax font-medium text-one-primary-black hover:text-one-primary-plum transition-colors duration-200"
              >
                One.org
              </Link>

              <Link 
                href="/learn/pathways-to-equity"
                className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 bg-one-primary-plum text-white font-colfax font-semibold rounded-full hover:bg-one-primary-plum/90 transition-all duration-300"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}