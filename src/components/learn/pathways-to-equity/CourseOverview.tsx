'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Users, Target, Eye, Lightbulb, MapPin, Award, Clock, CheckCircle, Play } from 'lucide-react';
import Container from '../../layouts/Container';

interface Module {
  id: number;
  title: string;
  description: string;
  activities: {
    type: string;
    title: string;
  }[];
  topics?: string[];
}

export default function CourseOverview() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]); // Start with first module expanded

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('course-overview');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const modules: Module[] = [
    {
      id: 1,
      title: "The Journey Begins — Understanding Equity",
      description: "In this module, you'll explore what equity really means and why it's different from equality. Through a simple moment at lunch with friends, you'll start to notice how not everyone has access to the same tools or opportunities, even in everyday situations.",
      activities: [
        { type: "Interactive Content", title: "Equity vs. Equality" }
      ],
      topics: ["Recognizing social inequalities", "Why equity matters"]
    },
    {
      id: 2,
      title: "Systems at Work — Why Inequity Persists",
      description: "Inequity persists because of systems that are deeply rooted in society, shaping the opportunities and challenges people face. These systems are often built on historical patterns of discrimination and bias.",
      activities: [
        { type: "Interactive Activity", title: "Match Systemic Barriers with their Impacts" }
      ]
    },
    {
      id: 3,
      title: "My Movement Match – What Kind of Changemaker Are You?",
      description: "This module helps you figure out your changemaking style through a fun, reflective quiz and introduces you to young global activists who match your approach.",
      activities: [
        { type: "Quiz", title: "What Kind of Changemaker Are You?" },
        { type: "Interactive Content", title: "Who's Your Changemaker Twin?" },
        { type: "Assignment", title: "Reflection Prompt" }
      ]
    },
    {
      id: 4,
      title: "The Intersections of Identity — Privilege, Power, and Oppression",
      description: "In this module, you'll literally step into someone else's shoes. By navigating a 'day in the life' of Amina, you'll make decisions based on situations many people face every day.",
      activities: [
        { type: "Game Map", title: "Day in the Life of Amina" }
      ]
    },
    {
      id: 5,
      title: "Creating Change — The Power of Advocacy and Action",
      description: "This module helps learners move from awareness to concrete action by understanding how small steps in advocacy can build momentum for real change.",
      activities: [
        { type: "Interactive Video", title: "How To Move From Awareness To Action" }
      ]
    },
    {
      id: 6,
      title: "Your Pathway to Equity",
      description: "You've explored what equity means, how it shows up globally and locally, and what you can do about it. Now, let's bring it all together.",
      activities: [
        { type: "Interactive Content", title: "Looking Back, Moving Forward" },
        { type: "Interactive Content", title: "Action Match-Up – Find Your Next Move" },
        { type: "Interactive Content", title: "Plan a Weekly Recharge Ritual" },
        { type: "Interactive Content", title: "Global Changemaker Map" },
        { type: "Interactive Content", title: "Connection Quest Prompt" }
      ]
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Quiz': return <Target className="w-4 h-4" />;
      case 'Game Map': return <MapPin className="w-4 h-4" />;
      case 'Interactive Video': return <Play className="w-4 h-4" />;
      case 'Assignment': return <BookOpen className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getModuleColor = (id: number) => {
    const colors = [
      'one-primary-plum',
      'one-primary-teal', 
      'one-secondary-fuchsia',
      'one-secondary-peach',
      'one-primary-neon',
      'one-primary-plum'
    ];
    return colors[id - 1] || 'one-primary-plum';
  };

  const getModuleIcon = (id: number) => {
    const icons = [BookOpen, Users, Target, Eye, Lightbulb, MapPin];
    const IconComponent = icons[id - 1] || BookOpen;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <section id="course-overview" className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-48 h-48 bg-one-primary-teal/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-16 w-64 h-64 bg-one-primary-plum/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-one-primary-neon/8 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        
        {/* Header Section */}
        <div className={`mb-12 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 bg-one-primary-plum/10 rounded-full border border-one-primary-plum/20 mb-6">
            <div className="w-2 h-2 bg-one-primary-neon rounded-full mr-2 lg:mr-3 animate-pulse"></div>
            <span className="text-xs lg:text-sm font-semibold text-one-primary-plum font-colfax">Course Overview</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-one-primary-black mb-6 font-italian-plate">
            What You'll Learn
          </h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left: Learning Objectives */}
            <div className="lg:col-span-2">
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed font-colfax mb-6">
                By the end of this short course, you will be able to:
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Understand the difference between equity and equality",
                  "Recognize historical and ongoing systems of inequality", 
                  "Reflect on how identity, privilege, and oppression intersect",
                  "Envision your role in building a more equitable future"
                ].map((objective, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-one-primary-teal/30 transition-colors">
                    <CheckCircle className="w-5 h-5 text-one-primary-teal mt-0.5 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-gray-700 font-colfax leading-relaxed">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Course Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 h-fit">
              <h3 className="text-lg font-bold text-one-primary-black font-italian-plate mb-4">Course Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-one-primary-teal/5 rounded-lg">
                  <Clock className="w-5 h-5 text-one-primary-teal flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-one-primary-black font-colfax">2 Hours</div>
                    <div className="text-xs text-gray-500 font-colfax">Total Duration</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-one-primary-plum/5 rounded-lg">
                  <Award className="w-5 h-5 text-one-primary-plum flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-one-primary-black font-colfax">Certificate</div>
                    <div className="text-xs text-gray-500 font-colfax">Upon Completion</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-one-secondary-fuchsia/5 rounded-lg">
                  <BookOpen className="w-5 h-5 text-one-secondary-fuchsia flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-one-primary-black font-colfax">6 Modules</div>
                    <div className="text-xs text-gray-500 font-colfax">Interactive Content</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className={`transform transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Modules Title */}
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-one-primary-black mb-8 font-italian-plate">
            Course Modules
          </h3>

          {/* Modules List */}
          <div className="space-y-4">
            {modules.map((module, index) => {
              const isExpanded = expandedModules.includes(module.id);
              const moduleColor = getModuleColor(module.id);
              
              return (
                <div
                  key={module.id}
                  className={`bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? `border-${moduleColor}/40 shadow-lg` 
                      : 'border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 lg:p-6 text-left hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Module Number & Icon */}
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-${moduleColor} rounded-xl flex items-center justify-center text-white font-bold font-colfax text-sm lg:text-base`}>
                          {module.id}
                        </div>
                        <div className={`hidden sm:flex p-2 bg-${moduleColor}/10 rounded-lg text-${moduleColor}`}>
                          {getModuleIcon(module.id)}
                        </div>
                      </div>
                      
                      {/* Module Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0 pr-4">
                            <h4 className="text-base lg:text-lg font-bold text-one-primary-black font-italian-plate mb-2 leading-tight">
                              {module.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-xs lg:text-sm text-gray-500 font-colfax mb-2">
                              <span>{module.activities.length} Activities</span>
                              {module.topics && (
                                <span>{module.topics.length} Topics</span>
                              )}
                            </div>
                            
                            {/* Mobile Description Preview */}
                            <p className="text-sm text-gray-600 font-colfax line-clamp-2 lg:hidden">
                              {module.description}
                            </p>
                          </div>

                          {/* Expand/Collapse Icon */}
                          <div className="flex-shrink-0 ml-2">
                            {isExpanded ? (
                              <ChevronDown className={`w-5 h-5 text-${moduleColor} transition-transform duration-200`} />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-200" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Module Content - Collapsible */}
                  {isExpanded && (
                    <div className={`border-t border-${moduleColor}/20 p-4 lg:p-6 bg-${moduleColor}/5 animate-fadeIn`}>
                      
                      {/* Module Description */}
                      <div className="mb-6">
                        <p className="text-sm lg:text-base text-gray-700 leading-relaxed font-colfax">
                          {module.description}
                        </p>
                      </div>

                      {/* Activities & Topics Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Activities */}
                        <div>
                          <h5 className="text-sm lg:text-base font-semibold text-one-primary-black mb-3 font-italian-plate">
                            Activities & Content
                          </h5>
                          <div className="space-y-2">
                            {module.activities.map((activity, actIndex) => (
                              <div key={actIndex} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                                <div className={`p-2 bg-${moduleColor}/10 rounded-lg text-${moduleColor} flex-shrink-0`}>
                                  {getActivityIcon(activity.type)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-semibold text-one-primary-black font-colfax truncate">
                                    {activity.title}
                                  </div>
                                  <div className="text-xs text-gray-500 font-colfax">
                                    {activity.type}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key Topics */}
                        {module.topics && (
                          <div>
                            <h5 className="text-sm lg:text-base font-semibold text-one-primary-black mb-3 font-italian-plate">
                              Key Topics Covered
                            </h5>
                            <div className="space-y-2">
                              {module.topics.map((topic, topicIndex) => (
                                <div key={topicIndex} className={`px-3 py-2 bg-${moduleColor}/10 text-${moduleColor} rounded-lg text-sm font-medium font-colfax`}>
                                  {topic}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Certificate Module */}
            <div className="bg-gradient-to-r from-one-primary-plum/5 to-one-primary-neon/5 rounded-xl border-2 border-one-primary-plum/20 p-4 lg:p-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-one-primary-neon rounded-xl flex items-center justify-center text-one-primary-black font-bold font-colfax flex-shrink-0">
                  <Award className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base lg:text-lg font-bold text-one-primary-black font-italian-plate">
                    Certificate of Completion
                  </h4>
                  <p className="text-sm lg:text-base text-gray-600 font-colfax">
                    Earn your certificate upon successful completion of all modules
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}