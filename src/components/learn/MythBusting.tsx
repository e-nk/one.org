'use client';

import { useState, useEffect } from 'react';
import Container from '../layouts/Container';

export default function MythBusting() {
  const [currentMythIndex, setCurrentMythIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  const myths = [
    {
      statement: "Charity is always the best way to help people in need.",
      answer: false,
      explanation: "Sometimes, charity can unintentionally keep people dependent. Long-term change comes from justice, policy change, and empowering communities.",
      category: "Global Development"
    },
    {
      statement: "People in rural areas are always poorer than people in cities.",
      answer: false,
      explanation: "Urban poverty can be extreme: overcrowded slums, job scarcity, and invisible homelessness often go unnoticed in major cities.",
      category: "Urban vs Rural"
    },
    {
      statement: "Access to the internet means access to opportunity.",
      answer: false,
      explanation: "Even with a phone or internet, many lack digital literacy, local content, or the power to use it effectively. The digital divide is about much more than a signal.",
      category: "Digital Divide"
    },
    {
      statement: "If women and men are both allowed to work, then gender equality has been achieved.",
      answer: false,
      explanation: "Women globally still do 3x more unpaid labor (like caregiving) and often earn less for the same work—even when both genders \"can\" work.",
      category: "Gender Equality"
    },
    {
      statement: "People with disabilities are a small minority.",
      answer: false,
      explanation: "Over 1 billion people globally live with disabilities—and most face double or triple discrimination when it comes to jobs, education, and rights.",
      category: "Disability Rights"
    },
    {
      statement: "We'll end poverty if we just raise more money.",
      answer: false,
      explanation: "Money helps, but redistribution of power, fair policies, and breaking cycles of exploitation matter more. Without system change, poverty keeps bouncing back.",
      category: "Poverty Solutions"
    },
    {
      statement: "People in poverty don't pay taxes.",
      answer: false,
      explanation: "In many countries, the poorest pay a greater proportion of their income in indirect taxes (like VAT or sales tax) than the wealthy do in income tax.",
      category: "Tax Systems"
    },
    {
      statement: "Discrimination in Canada isn't as bad as in the U.S.",
      answer: false,
      explanation: "Canada has its own deep history of residential schools, anti-Black racism, Islamophobia, and ongoing systemic inequality—often less visible, but just as harmful.",
      category: "Canadian Context"
    },
    {
      statement: "Everyone in Canada has equal access to healthcare.",
      answer: false,
      explanation: "While Canada has public healthcare, barriers still exist for undocumented people, rural communities, and marginalized populations—especially in mental health services.",
      category: "Healthcare Access"
    },
    {
      statement: "Youth can't really do much about global inequality.",
      answer: false,
      explanation: "Youth movements have led revolutions, started global campaigns, and changed laws. You are the future—and the now.",
      category: "Youth Power"
    }
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

    const element = document.getElementById('myth-busting');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleAnswer = (userAnswer: boolean) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentMythIndex] = userAnswer;
    setUserAnswers(newAnswers);
    setIsRevealed(true);
  };

  const nextMyth = () => {
    if (currentMythIndex < myths.length - 1) {
      setCurrentMythIndex(currentMythIndex + 1);
      setIsRevealed(false);
    }
  };

  const previousMyth = () => {
    if (currentMythIndex > 0) {
      setCurrentMythIndex(currentMythIndex - 1);
      setIsRevealed(userAnswers[currentMythIndex - 1] !== undefined);
    }
  };

  const resetQuiz = () => {
    setCurrentMythIndex(0);
    setIsRevealed(false);
    setUserAnswers([]);
  };

  const currentMyth = myths[currentMythIndex];
  const userAnswer = userAnswers[currentMythIndex];
  const isCorrect = userAnswer === currentMyth.answer;
  const progress = ((currentMythIndex + 1) / myths.length) * 100;

  return (
    <section id="myth-busting" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      
      {/* Background decorative elements - Different from hero */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-48 h-48 bg-one-primary-neon/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-16 w-64 h-64 bg-one-primary-plum/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-one-primary-teal/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-one-secondary-peach/12 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        
        {/* Header - Left Aligned */}
        <div className={`mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 bg-one-primary-plum/10 rounded-full border border-one-primary-plum/20 mb-6">
            <div className="w-2 h-2 bg-one-primary-neon rounded-full mr-2 lg:mr-3 animate-pulse"></div>
            <span className="text-xs lg:text-sm font-semibold text-one-primary-plum font-colfax">Myth-Busting Quiz: Think Again!</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-one-primary-black mb-6 font-italian-plate">
            What if the biggest problems in the world <span className="text-one-primary-plum">aren't what you think?</span>
          </h2>
          
          <div className="max-w-4xl">
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed font-colfax">
              Click through these 10-second truths to challenge what you <em>thought</em> you knew. 
              Get ready for some "wait—WHAT?" moments.
            </p>
          </div>
        </div>

        {/* Quiz Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Side - Progress and Navigation */}
          <div className={`lg:col-span-4 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-one-primary-black font-italian-plate">
                  Progress
                </h3>
                <span className="text-xs lg:text-sm text-one-primary-plum font-bold font-colfax">
                  {currentMythIndex + 1} of {myths.length}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="h-3 bg-one-primary-plum rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Question Indicators */}
              <div className="grid grid-cols-5 gap-2">
                {myths.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-colors duration-300 ${
                      index === currentMythIndex
                        ? 'bg-one-primary-plum'
                        : index < currentMythIndex
                        ? 'bg-one-primary-teal'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="bg-one-primary-teal/10 text-one-primary-teal px-4 py-2 rounded-full text-xs lg:text-sm font-semibold font-colfax">
                {currentMyth.category}
              </span>
            </div>

            {/* Navigation Buttons - Mobile Hidden, Desktop Visible */}
            <div className="hidden lg:block space-y-4">
              <button
                onClick={previousMyth}
                disabled={currentMythIndex === 0}
                className="w-full px-6 py-3 border-2 border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm lg:text-base font-colfax flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Question
              </button>

              {currentMythIndex === myths.length - 1 && isRevealed ? (
                <button
                  onClick={resetQuiz}
                  className="w-full px-6 py-3 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-plum/90 transition-all duration-200 text-sm lg:text-base font-colfax"
                >
                  Start Over
                </button>
              ) : isRevealed ? (
                <button
                  onClick={nextMyth}
                  className="w-full px-6 py-3 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-plum/90 transition-all duration-200 text-sm lg:text-base font-colfax flex items-center justify-center"
                >
                  Next Question
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>

          {/* Right Side - Question and Answer */}
          <div className={`lg:col-span-8 transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border-2 border-gray-100 relative overflow-hidden">
              
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <div className="w-full h-full bg-one-primary-plum rounded-full transform translate-x-16 -translate-y-16"></div>
              </div>

              {/* Question */}
              <div className="mb-8 relative z-10">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-one-primary-black mb-6 font-italian-plate leading-relaxed">
                  "{currentMyth.statement}"
                </h3>

                {!isRevealed && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleAnswer(true)}
                      className="flex-1 px-6 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transform transition-all duration-200 hover:scale-105 text-sm lg:text-base font-colfax shadow-lg"
                    >
                      TRUE
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className="flex-1 px-6 py-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transform transition-all duration-200 hover:scale-105 text-sm lg:text-base font-colfax shadow-lg"
                    >
                      FALSE
                    </button>
                  </div>
                )}
              </div>

              {/* Answer Reveal */}
              {isRevealed && (
                <div className="space-y-6 animate-fadeIn relative z-10">
                  
                  {/* Result */}
                  <div className="flex items-start space-x-4">
                    <div className={`inline-flex items-center px-4 py-2 rounded-xl ${
                      isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isCorrect ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                      <span className="font-semibold font-colfax text-xs lg:text-sm">
                        {isCorrect ? 'Correct!' : 'Not quite right'}
                      </span>
                    </div>
                    
                    <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold font-italian-plate">
                      <span className={currentMyth.answer ? 'text-green-600' : 'text-red-600'}>
                        {currentMyth.answer ? 'TRUE' : 'FALSE'}
                      </span>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-one-primary-plum">
                    <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-colfax">
                      {currentMyth.explanation}
                    </p>
                  </div>

                  {/* Mobile Navigation - Only visible on mobile */}
                  <div className="lg:hidden flex items-center justify-between pt-4">
                    <button
                      onClick={previousMyth}
                      disabled={currentMythIndex === 0}
                      className="px-4 py-2 border border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-colfax"
                    >
                      Previous
                    </button>

                    {currentMythIndex === myths.length - 1 ? (
                      <button
                        onClick={resetQuiz}
                        className="px-4 py-2 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-plum/90 transition-all duration-200 text-sm font-colfax"
                      >
                        Start Over
                      </button>
                    ) : (
                      <button
                        onClick={nextMyth}
                        className="px-4 py-2 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-plum/90 transition-all duration-200 text-sm font-colfax"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA - Only show at the end */}
        {currentMythIndex === myths.length - 1 && isRevealed && (
          <div className="mt-16 bg-one-primary-plum/5 rounded-2xl p-8 lg:p-12 border border-one-primary-plum/10">
            <div className="max-w-3xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-one-primary-black mb-4 font-italian-plate">
                Ready to dive deeper?
              </h3>
              <p className="text-base lg:text-lg text-gray-600 font-colfax mb-8">
                These myth-busting moments are just the beginning. Join our comprehensive course to explore the full picture behind global issues and learn how to create real change.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/learn/pathways-to-equity"
                  className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 bg-one-primary-plum text-white font-semibold rounded-xl hover:bg-one-primary-plum/90 transform transition-all duration-200 hover:scale-105 text-sm lg:text-base font-colfax"
                >
                  Start Full Course
                  <svg className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 lg:px-8 lg:py-4 border-2 border-one-primary-teal text-one-primary-teal font-semibold rounded-xl hover:bg-one-primary-teal hover:text-white transition-all duration-200 text-sm lg:text-base font-colfax"
                >
                  Try Quiz Again
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}