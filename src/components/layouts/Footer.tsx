'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/ONE',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/onecampaign',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Bluesky',
      href: 'https://bsky.app/profile/onecampaign.bsky.social',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-2.67-.296-5.568.628-6.383 3.364C.378 17.601 0 22.561 0 23.25c0 .688.139 1.86.902 2.203.659.299 1.664.621 4.3-1.239C7.954 22.272 10.913 18.333 12 16.219c1.087 2.114 4.046 6.053 6.798 7.995 2.636 1.86 3.641 1.538 4.3 1.239.763-.343.902-1.515.902-2.203 0-.689-.378-5.649-.624-6.478-.815-2.736-3.713-3.66-6.383-3.364-.139.016-.277.034-.415.056.138-.017.276-.036.415-.056 2.67.296 5.568-.628 6.383-3.364.246-.829.624-5.789.624-6.478 0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.239C16.046 4.747 13.087 8.686 12 10.8z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/one/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.01 7.102.048 4.789.167 3.043 1.66 2.01 3.421 1.566 4.226 1.285 5.150 1.098 6.7c-.085.703-.097 1.021-.097 4.317s.012 3.614.097 4.317c.187 1.55.468 2.474.912 3.279 1.033 1.761 2.779 3.254 5.092 3.373.827.038 1.294.048 4.915.048s4.088-.01 4.915-.048c2.313-.119 4.059-1.612 5.092-3.373.444-.805.725-1.729.912-3.279.085-.703.097-1.021.097-4.317s-.012-3.614-.097-4.317c-.187-1.55-.468-2.474-.912-3.279C20.977 1.66 19.231.167 16.918.048 16.091.01 15.624 0 12.017 0zm0 2.16c3.408 0 3.821.012 5.173.072 1.291.06 2.126.264 2.62.437a4.392 4.392 0 0 1 1.62 1.056 4.392 4.392 0 0 1 1.056 1.62c.173.494.377 1.329.437 2.62.06 1.352.072 1.765.072 5.173s-.012 3.821-.072 5.173c-.06 1.291-.264 2.126-.437 2.62a4.392 4.392 0 0 1-1.056 1.62 4.392 4.392 0 0 1-1.62 1.056c-.494.173-1.329.377-2.62.437-1.352.06-1.765.072-5.173.072s-3.821-.012-5.173-.072c-1.291-.06-2.126-.264-2.62-.437a4.392 4.392 0 0 1-1.62-1.056 4.392 4.392 0 0 1-1.056-1.62c-.173-.494-.377-1.329-.437-2.62-.06-1.352-.072-1.765-.072-5.173s.012-3.821.072-5.173c.06-1.291.264-2.126.437-2.62a4.392 4.392 0 0 1 1.056-1.62 4.392 4.392 0 0 1 1.62-1.056c.494-.173 1.329-.377 2.62-.437 1.352-.06 1.765-.072 5.173-.072zM12.017 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.846-10.405a1.441 1.441 0 1 1-2.883 0 1.441 1.441 0 0 1 2.883 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@one.org',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.154-1.996-1.154-3.338h-2.794v13.591c0 2.264-1.837 4.1-4.1 4.1s-4.1-1.836-4.1-4.1 1.837-4.1 4.1-4.1c.373 0 .734.05 1.074.145V7.636a6.985 6.985 0 0 0-1.074-.083c-3.87 0-7.006 3.136-7.006 7.006s3.136 7.006 7.006 7.006 7.006-3.136 7.006-7.006V9.66a9.045 9.045 0 0 0 5.227 1.636V8.402c-1.35 0-2.587-.528-3.522-1.487-.302-.31-.568-.648-.796-1.006-.216-.34-.4-.7-.545-1.076z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/TheONECampaign',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.560.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-one-primary-black text-white">
        {/* Main Footer Content */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            
            {/* Logo and Mission Statement */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <img 
                    src="/one_logo/ONE-logo-white.svg" 
                    alt="ONE Academy" 
                    className="h-16 lg:h-20 w-auto"
                  />
                </div>
                <div>
                  <h2 className="font-italian-plate font-bold text-xl lg:text-2xl text-white">
                    Academy
                  </h2>
                  <div className="text-xs text-one-primary-neon font-colfax font-medium tracking-wider uppercase">
                    Learn • Act • Change
                  </div>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="max-w-2xl">
                <p className="text-gray-300 text-base lg:text-lg leading-relaxed font-colfax">
                  ONE Academy is a digital learning platform <span className="text-white font-semibold">by the ONE Campaign</span> designed to equip individuals with the knowledge and skills needed to tackle today's most urgent social issues.
                </p>
              </div>

              {/* Social Media Links */}
              <div className="mt-6">
                <h3 className="text-white font-colfax font-semibold text-sm uppercase tracking-wider mb-4">
                  Follow Our Movement
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-white/10 text-gray-300 hover:bg-one-primary-plum hover:text-white rounded-xl transition-all duration-300 hover:scale-110 group"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links & Support */}
            <div className="grid grid-cols-2 gap-8">
              
              {/* Navigation Links */}
              <div>
                <h3 className="text-white font-colfax font-semibold text-sm uppercase tracking-wider mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Home', href: '/' },
                    { name: 'Learn', href: '/learn' },
                    { name: 'About', href: '/about' },
                    { name: 'Get Involved', href: 'https://www.one.org/get-involved/' },
                    { name: 'One.org', href: 'https://www.one.org' }
                  ].map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block text-gray-300 hover:text-one-primary-neon transition-colors duration-200 font-colfax"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-white font-colfax font-semibold text-sm uppercase tracking-wider mb-4">
                  Support
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:support@oneacademy.org"
                    className="block text-gray-300 hover:text-one-primary-neon transition-colors duration-200 font-colfax"
                  >
                    Contact Support
                  </a>
                  <Link
                    href="/help"
                    className="block text-gray-300 hover:text-one-primary-neon transition-colors duration-200 font-colfax"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              
              {/* Copyright */}
              <div className="text-gray-400 text-sm font-colfax">
                © {currentYear} ONE Academy. All rights reserved.
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-6 text-sm">
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors duration-200 font-colfax"
                >
                  Privacy Policy
                </Link>
                <div className="h-4 w-px bg-white/20"></div>
                <Link
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-white transition-colors duration-200 font-colfax"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </>
  );
}

// Scroll to Top Button Component
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-4 bg-one-primary-plum hover:bg-one-primary-plum/90 text-white rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-one-primary-plum/30 focus:ring-offset-2 transition-all duration-300 group ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-4 scale-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg 
        className="w-5 h-5 transform transition-transform group-hover:-translate-y-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2.5} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
}