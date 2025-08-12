'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Users, Lightbulb, Globe, ArrowRight, ExternalLink, Play, Sparkles, MessageCircle, BookOpen } from 'lucide-react';
import Container from '../layouts/Container';

export default function AboutDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const questions = [
    "Why does poverty still exist?",
    "Can one voice really make a difference?", 
    "What can I do to help?",
    "How do I start creating change?"
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

    const element = document.getElementById('about-details');
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
      setActiveQuestion((prev) => (prev + 1) % questions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Play, text: "Short, self-paced lessons" },
    { icon: Sparkles, text: "Tips for small, meaningful actions" },
    { icon: MessageCircle, text: "Videos + stories from real people" },
    { icon: Users, text: "A global network of learners + doers" }
  ];

  return (
    <section id="about-details" className="py-16 lg:py-24 bg-one-primary-white/20 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-one-primary-plum/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-one-primary-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-one-primary-neon/15 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <Container className="relative z-10">
        


        {/* Mission Story Section */}
        <div className={`mb-12 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            
            {/* Left: Mission Story */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-one-primary-black font-italian-plate">
                Education That <span className="text-one-primary-plum">Transforms</span>
              </h3>
              
              <div className="space-y-4 text-base lg:text-lg text-gray-700 leading-relaxed font-colfax">
                <p>
                  At ONE, we believe in the transformative power of education to create a more just and equitable world. 
                  ONE Academy is our digital learning platform designed to equip you with the knowledge and skills needed 
                  to tackle today's most urgent social issues.
                </p>
                <p>
                  Our goal is simple: make high-quality education accessible to everyone. We're helping learners at all 
                  stages become catalysts for real-world change through courses, interactive training, and practical resources.
                </p>
              </div>

              <div className="bg-one-primary-plum/10 rounded-xl p-6 border-l-4 border-one-primary-plum">
                <p className="text-lg text-one-primary-plum font-semibold font-colfax italic">
                  "Whether you're a seasoned advocate or just beginning your journey, ONE Academy provides the tools you need to make an impact."
                </p>
              </div>
            </div>

            {/* Right: What You Get */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-one-primary-teal/10 rounded-xl mr-4">
                    <BookOpen className="w-6 h-6 text-one-primary-teal" />
                  </div>
                  <h4 className="text-xl font-bold text-one-primary-black font-italian-plate">What You Get</h4>
                </div>
                
                <div className="space-y-4">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 group">
                        <div className="p-2 bg-one-primary-plum/10 rounded-lg group-hover:bg-one-primary-plum/20 transition-colors">
                          <IconComponent className="w-4 h-4 text-one-primary-plum" />
                        </div>
                        <span className="text-gray-700 font-colfax">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                  <span className="inline-flex items-center px-4 py-2 bg-one-primary-neon/20 text-one-primary-black rounded-full text-sm font-bold font-colfax">
                    100% Free Forever
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Areas - Interactive Cards */}
        <div className={`mb-12 transform transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          <div className="mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-one-primary-black font-italian-plate mb-3">
              What You'll <span className="text-one-primary-teal">Master</span>
            </h3>
            <p className="text-base text-gray-600 font-colfax">Four key areas that turn knowledge into action</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Global Issues */}
            <div className="group bg-gradient-to-br from-one-primary-plum/5 to-one-primary-plum/10 rounded-xl p-6 border-2 border-one-primary-plum/20 hover:border-one-primary-plum/40 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-one-primary-plum/20 rounded-lg flex-shrink-0">
                  <Globe className="w-5 h-5 text-one-primary-plum" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-one-primary-black font-italian-plate mb-2">Global Issues</h4>
                  <p className="text-sm text-gray-600 font-colfax">Understand complex social challenges affecting communities worldwide.</p>
                </div>
              </div>
            </div>

            {/* Action Framework */}
            <div className="group bg-gradient-to-br from-one-primary-teal/5 to-one-primary-teal/10 rounded-xl p-6 border-2 border-one-primary-teal/20 hover:border-one-primary-teal/40 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-one-primary-teal/20 rounded-lg flex-shrink-0">
                  <Target className="w-5 h-5 text-one-primary-teal" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-one-primary-black font-italian-plate mb-2">Action Framework</h4>
                  <p className="text-sm text-gray-600 font-colfax">Develop personal action plans with concrete steps for meaningful change.</p>
                </div>
              </div>
            </div>

            {/* Advocacy Skills */}
            <div className="group bg-gradient-to-br from-one-secondary-fuchsia/5 to-one-secondary-fuchsia/10 rounded-xl p-6 border-2 border-one-secondary-fuchsia/20 hover:border-one-secondary-fuchsia/40 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-one-secondary-fuchsia/20 rounded-lg flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-one-secondary-fuchsia" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-one-primary-black font-italian-plate mb-2">Advocacy Skills</h4>
                  <p className="text-sm text-gray-600 font-colfax">Learn practical techniques for storytelling, organizing, and digital campaigning.</p>
                </div>
              </div>
            </div>

            {/* Leadership */}
            <div className="group bg-gradient-to-br from-one-secondary-peach/5 to-one-secondary-peach/10 rounded-xl p-6 border-2 border-one-secondary-peach/20 hover:border-one-secondary-peach/40 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-one-secondary-peach/20 rounded-lg flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-one-secondary-peach" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-one-primary-black font-italian-plate mb-2">Leadership</h4>
                  <p className="text-sm text-gray-600 font-colfax">Build skills to mobilize others and sustain social change initiatives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards - Compact */}
        <div className={`transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Join Network */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-one-secondary-fuchsia/30 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-one-secondary-fuchsia/10 rounded-full transform translate-x-12 -translate-y-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-one-secondary-fuchsia/15 rounded-lg flex-shrink-0">
                    <Users className="w-6 h-6 text-one-secondary-fuchsia" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-one-primary-black font-italian-plate mb-2">Join Global Network</h4>
                    <p className="text-sm text-gray-600 font-colfax mb-4">
                      Connect with advocates worldwide and take action on critical issues.
                    </p>
                    
                    <Link
                      href="https://www.one.org/get-involved/"
                      target="_blank"
                      className="inline-flex items-center px-4 py-2 bg-one-secondary-fuchsia text-white font-semibold rounded-lg hover:bg-one-secondary-fuchsia/90 transition-colors duration-200 text-sm font-colfax group"
                    >
                      Join Network
                      <ExternalLink className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Take Action */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-one-primary-teal/30 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-one-primary-teal/10 rounded-full transform translate-x-12 -translate-y-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-one-primary-teal/15 rounded-lg flex-shrink-0">
                    <Target className="w-6 h-6 text-one-primary-teal" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-one-primary-black font-italian-plate mb-2">Take Action</h4>
                    <p className="text-sm text-gray-600 font-colfax mb-4">
                      Turn learning into impact through petitions, advocacy, and campaigns.
                    </p>
                    
                    <Link
                      href="/learn"
                      className="inline-flex items-center px-4 py-2 bg-one-primary-teal text-white font-semibold rounded-lg hover:bg-one-primary-teal/90 transition-colors duration-200 text-sm font-colfax group"
                    >
                      Start Learning
                      <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}