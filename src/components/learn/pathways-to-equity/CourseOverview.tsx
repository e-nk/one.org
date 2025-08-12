'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Users, Target, Eye, Lightbulb, MapPin, Award, Clock, CheckCircle } from 'lucide-react';
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
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

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
      description: "In this module, you'll explore what equity really means and why it's different from equality. Through a simple moment at lunch with friends, you'll start to notice how not everyone has access to the same tools or opportunities, even in everyday situations. This module helps you reflect on assumptions we often make about people around us, and why those assumptions can lead to unfair outcomes. This is your starting point, a chance to shift how you see fairness and to begin asking deeper questions about the world around you.",
      activities: [
        { type: "Interactive Content", title: "Equity vs. Equality" }
      ],
      topics: ["Recognizing social inequalities", "Why equity matters"]
    },
    {
      id: 2,
      title: "Systems at Work — Why Inequity Persists",
      description: "Inequity persists because of systems that are deeply rooted in society, shaping the opportunities and challenges people face. These systems, including education, healthcare, financial systems, and more, are often built on historical patterns of discrimination and bias. While individual actions can contribute to change, the real transformation comes when we address the structural barriers that disproportionately affect certain groups. These systemic barriers are not always visible, but they significantly impact the lives of marginalized communities.",
      activities: [
        { type: "Interactive Activity", title: "Match Systemic Barriers with their Impacts" }
      ]
    },
    {
      id: 3,
      title: "My Movement Match – What Kind of Changemaker Are You?",
      description: "This module helps you figure out your changemaking style through a fun, reflective quiz and introduces you to young global activists who match your approach. Whether you're bold and outspoken, strategic and focused, curious and analytical, or imaginative and creative, you'll find your place in the movement for equity.",
      activities: [
        { type: "Quiz", title: "What Kind of Changemaker Are You?" },
        { type: "Interactive Content", title: "Who's Your Changemaker Twin?" },
        { type: "Assignment", title: "Reflection Prompt" }
      ]
    },
    {
      id: 4,
      title: "The Intersections of Identity — Privilege, Power, and Oppression",
      description: "In this module, you'll literally step into someone else's shoes. By navigating a 'day in the life' of Amina, you'll make decisions based on situations many people face every day, shaped by things like race, gender, class, and religion. This module is about intersectionality, how different parts of who you are overlap to create unique challenges or privileges. Every choice you make in the game comes with a cost, helping you feel what it's like to move through the world with visible and invisible barriers.",
      activities: [
        { type: "Game Map", title: "Day in the Life of Amina" }
      ]
    },
    {
      id: 5,
      title: "Creating Change — The Power of Advocacy and Action",
      description: "This module helps learners move from awareness to concrete action by understanding how small steps in advocacy can build momentum for real change. It shows how grassroots organizing works — including the challenges and rewards — and empowers learners to create their own SMART action plans for issues they care about.",
      activities: [
        { type: "Interactive Video", title: "How To Move From Awareness To Action" }
      ]
    },
    {
      id: 6,
      title: "Your Pathway to Equity",
      description: "You've explored what equity means, how it shows up globally and locally, and what you can do about it. Now, let's bring it all together. This module is about you — reflecting, recharging, and choosing what's next. There's no one way to be a changemaker. Just your way.",
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
      case 'Interactive Video': return <Eye className="w-4 h-4" />;
      case 'Assignment': return <BookOpen className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
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
        
        {/* Header Section - Left Aligned */}
        <div className={`mb-16 transform transition-all duration-1000 ${
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

          {/* Learning Objectives */}
          <div className="max-w-4xl mb-8">
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed font-colfax mb-6">
              By the end of this short course, you will be able to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Understand the difference between equity and equality",
                "Recognize historical and ongoing systems of inequality", 
                "Reflect on how identity, privilege, and oppression intersect",
                "Envision your role in building a more equitable future"
              ].map((objective, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-one-primary-teal mt-0.5 flex-shrink-0" />
                  <span className="text-base lg:text-lg text-gray-700 font-colfax">{objective}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Stats */}
          <div className="flex items-center space-x-8 flex-wrap gap-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-one-primary-teal" />
              <span className="text-base lg:text-lg font-bold text-one-primary-black font-colfax">2 Hours</span>
              <span className="text-xs lg:text-sm text-gray-500 font-colfax">Duration</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-one-primary-plum" />
              <span className="text-base lg:text-lg font-bold text-one-primary-black font-colfax">Yes</span>
              <span className="text-xs lg:text-sm text-gray-500 font-colfax">Certificate</span>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className={`transform transition-all duration-1000 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Modules Title */}
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-one-primary-black mb-8 font-italian-plate">
            Course Modules
          </h3>

          {/* Modules List */}
          <div className="space-y-4">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-one-primary-plum/30 transition-all duration-300 overflow-hidden"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-6 text-left hover:bg-gray-50/50 transition-colors duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Module Number & Icon */}
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-one-primary-plum rounded-xl flex items-center justify-center text-white font-bold font-colfax">
                        {module.id}
                      </div>
                      <div className="p-2 bg-one-primary-teal/10 rounded-lg text-one-primary-teal">
                        {getModuleIcon(module.id)}
                      </div>
                    </div>
                    
                    {/* Module Title */}
                    <div className="flex-1">
                      <h4 className="text-lg lg:text-xl font-bold text-one-primary-black font-italian-plate mb-1">
                        Module {module.id}: {module.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-xs lg:text-sm text-gray-500 font-colfax">
                        <span>{module.activities.length} Activities</span>
                        {module.topics && (
                          <span>{module.topics.length} Key Topics</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className="ml-4">
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="w-5 h-5 text-one-primary-plum transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-200" />
                    )}
                  </div>
                </button>

                {/* Module Content - Collapsible */}
                {expandedModules.includes(module.id) && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50/30 animate-fadeIn">
                    
                    {/* Module Description */}
                    <div className="mb-6">
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-colfax">
                        {module.description}
                      </p>
                    </div>

                    {/* Activities */}
                    <div className="mb-6">
                      <h5 className="text-base lg:text-lg font-semibold text-one-primary-black mb-4 font-italian-plate">
                        Activities & Content
                      </h5>
                      <div className="space-y-3">
                        {module.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                            <div className="p-2 bg-one-primary-neon/10 rounded-lg text-one-primary-plum">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div>
                              <div className="text-sm lg:text-base font-semibold text-one-primary-black font-colfax">
                                {activity.title}
                              </div>
                              <div className="text-xs lg:text-sm text-gray-500 font-colfax">
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
                        <h5 className="text-base lg:text-lg font-semibold text-one-primary-black mb-3 font-italian-plate">
                          Key Topics Covered
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic, topicIndex) => (
                            <span 
                              key={topicIndex}
                              className="px-3 py-1 bg-one-primary-teal/10 text-one-primary-teal rounded-lg text-xs lg:text-sm font-medium font-colfax"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Certificate Module */}
            <div className="bg-gradient-to-r from-one-primary-plum/5 to-one-primary-neon/5 rounded-2xl border-2 border-one-primary-plum/20 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-one-primary-neon rounded-xl flex items-center justify-center text-one-primary-black font-bold font-colfax">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-bold text-one-primary-black font-italian-plate">
                    Certificate of Completion
                  </h4>
                  <p className="text-base lg:text-lg text-gray-600 font-colfax">
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
      `}</style>
    </section>
  );
}