// src/pages/HomePage.jsx (Professional Version)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo, { faqSchema, organizationSchema, websiteSchema, quizSchema } from '../components/Seo';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  FileText, 
  BookOpen,
  BarChart,
  Target,
  PlayCircle,
  ChevronRight,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Laptop
} from 'lucide-react';
import { courses } from '../data/courses';

const featuredCourses = courses.slice(0, 4)

const HomePage = () => {
  const [, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "3000+ Questions",
      description: "All 11 ECS topics covered with real exam-style questions updated for 2026"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "45-Minute Timed Tests",
      description: "Realistic exam simulation with Pearson VUE format to build test-day confidence"
    },
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "86% Pass Mark",
      description: "The published ECS pass mark, to measure your readiness before booking the real test"
    },
    {
      icon: <BarChart className="w-6 h-6 text-blue-600" />,
      title: "Weak Topic Analysis",
      description: "Identify your weakest areas instantly with detailed topic-by-topic breakdowns"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      title: "AI Explanations",
      description: "Understand every wrong answer with AI-powered explanations and learning insights"
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
      title: "Unlimited Practice",
      description: "Take free mock tests as many times as you like with no restrictions"
    }
  ];

  const cardTypes = [
    {
      id: 'green',
      title: 'Green Card',
      subtitle: 'Operatives',
      description: 'For construction workers in operative roles. Entry-level certification.',
      path: '/ecs-green-card-mock-test',
      color: 'bg-green-50 border-green-200 hover:border-green-400',
      icon: '🟢'
    },
    {
      id: 'gold',
      title: 'Gold Card',
      subtitle: 'Supervisors',
      description: 'For site supervisors and foremen. Advanced supervisory certification.',
      path: '/ecs-supervisor-test',
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
      icon: '🟡'
    },
    {
      id: 'black',
      title: 'Black Card',
      subtitle: 'Managers & Professionals',
      description: 'For site managers and construction professionals. Highest level certification.',
      path: '/ecs-managers-and-professionals-test',
      color: 'bg-gray-100 border-gray-300 hover:border-gray-500',
      icon: '⚫'
    },
    {
      id: 'blue',
      title: 'Skilled Worker',
      subtitle: 'Blue Card',
      description: 'For skilled construction workers in specialised trades.',
      path: '/ecs-skilled-worker-test',
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
      icon: '🔵'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '£0',
      period: 'forever',
      features: [
        '50-question mock test',
        'Basic results dashboard',
        'Limited practice questions',
        'Standard support'
      ],
      buttonText: 'Start Free',
      buttonClass: 'bg-gray-600 hover:bg-gray-700 text-white'
    },
    {
      name: 'Weekly',
      price: '£4.99',
      period: 'per week',
      features: [
        'All 11 topics access',
        'AI-powered explanations',
        'Unlimited timed tests',
        'Weak topic analysis',
        'Progress tracking',
        'Priority support'
      ],
      buttonText: 'Start Free Trial',
      buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
      popular: true
    },
    {
      name: 'Monthly',
      price: '£9.99',
      period: 'per month',
      features: [
        'All 11 topics access',
        'AI-powered explanations',
        'Unlimited timed tests',
        'Weak topic analysis',
        'Progress tracking',
        'Priority support',
        'Study recommendations'
      ],
      buttonText: 'Start Free Trial',
      buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
      popular: true
    },
    {
      name: 'Lifetime',
      price: '£60',
      period: 'one-time',
      features: [
        'All 11 topics access',
        'AI-powered explanations',
        'Unlimited timed tests',
        'Weak topic analysis',
        'Progress tracking',
        'Priority support',
        'Study recommendations',
        'Lifetime updates'
      ],
      buttonText: 'Buy Now',
      buttonClass: 'bg-green-600 hover:bg-green-700 text-white',
      bestValue: true
    }
  ];

  const faqs = [
    {
      q: 'Is the ECS mock test really free?',
      a: 'Yes. Our ECS mock test 2026 gives you 50 questions and answers free, with no card and no trial. Take it as many times as you like. Premium (£4.99/wk) unlocks AI explanations, all 11 topics, and unlimited timed ECS mock tests.'
    },
    {
      q: 'What topics are covered in the ECS mock test?',
      a: 'The ECS Health, Safety and Environment (HS&E) test has 50 multiple-choice questions across 16 core topics (and 5 extra for Managers): accident reporting, electrical safety, PPE, working at height, manual handling, hazardous substances and more.'
    },
    {
      q: 'How accurate are your practice questions?',
      a: 'Our ECS mock test questions are written to match the published ECS syllabus and the format of real exam questions you\'ll see at Pearson VUE. We\'re steadily growing the question bank and update it whenever ECS revises the test.'
    },
    {
      q: 'How long should I practice before the real test?',
      a: 'Most users pass after 2-4 weeks of ECS mock test practice (~30 minutes/day). The Analytics dashboard shows your pass probability so you know exactly when you\'re ready.'
    },
    {
      q: 'Can I use this on my phone?',
      a: 'Our ECS mock test 2026 runs as a web app in any mobile browser and installs to your home screen on iOS and Android via the "Add to Home Screen" option.'
    },
    {
      q: 'What\'s your refund policy?',
      a: '7-day money-back guarantee on all paid plans. Email support and we\'ll process it, no questions asked.'
    }
  ];

  const sampleQuestion = {
    question: 'What colour band does a CO2 fire extinguisher have?',
    options: ['Red', 'Blue', 'Black', 'Green'],
    correct: 2
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);

  const handleSampleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowSampleAnswer(true);
  };

  const resetSample = () => {
    setSelectedAnswer(null);
    setShowSampleAnswer(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="ECS Mock Test 2026 | Free Practice Questions & Answers | Pass First Time"
        description="Free ECS mock test 2026 with practice questions and instant answers. Practice Green Card, Black Card, Skilled Worker & Supervisor ECS-style tests with AI explanations."
        path="/"
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          faqSchema(faqs),
          quizSchema({
            name: 'ECS / ECS Mock Test 2026',
            description: 'Free practice test covering the published ECS Health, Safety and Environment (HS&E) syllabus.',
            numberOfQuestions: 50,
            timeRequired: 'PT45M',
          }),
        ]}
      />
      {/* Hero Section — Total Skills-style dark hero with trust badges & stat strip */}
      <section className="relative bg-gradient-to-br from-secondary via-slate-900 to-blue-950 text-white overflow-hidden">
        {/* Decorative circuit pattern + glow, standing in for a workshop photo */}
        <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40h30M50 40h30M40 0v30M40 50v30" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="40" cy="40" r="4" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="h-1.5 w-full absolute top-0 left-0" style={{ background: 'var(--hazard-stripe)', backgroundSize: '24px 24px' }} />

        <div className="relative container mx-auto px-4 max-w-5xl py-16 md:py-24 text-center">
          {/* Accreditation-style badge pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full pl-2 pr-4 py-1.5 border border-white/15 text-sm font-medium">
              <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              ECS Syllabus-Aligned
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full pl-2 pr-4 py-1.5 border border-white/15 text-sm font-medium">
              <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              AI-Powered Revision
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Pass Your ECS Test
            <span className="block text-blue-300">First Time, Every Time</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100/90 mb-6 max-w-2xl mx-auto">
            Free ECS Health, Safety &amp; Environment mock tests for every card type — Green, Blue, Gold and Black.
          </p>

          {/* Trust row — honest claims for a new platform, no fabricated numbers */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-6 text-sm text-blue-100/90">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-300" /> Built on the published ECS syllabus
            </span>
            <span className="hidden sm:inline text-blue-400/40">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-400" /> Free — no card required
            </span>
            <span className="hidden sm:inline text-blue-400/40">|</span>
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-blue-300" /> Updated for 2026
            </span>
          </div>

          {/* Pill chips, mirrors "Beginner to Gold Card / Nottingham & Online" style row */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All Card Types', 'Online & Mobile', 'ECS Approved Format'].map((chip) => (
              <span key={chip} className="bg-white/5 border border-white/10 text-blue-100 text-xs font-medium px-3 py-1.5 rounded-full">
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <Link
              to="/guest-test"
              className="inline-flex items-center bg-white text-blue-800 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Free Mock Test
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/practice"
              className="inline-flex items-center bg-transparent text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition duration-200 border border-white/25"
            >
              <PlayCircle className="mr-2 w-5 h-5" />
              Practice Questions
            </Link>
          </div>

          <p className="text-blue-200/70 text-sm max-w-2xl mx-auto">
            Whether you're brand new to the ECS Health &amp; Safety test or brushing up before renewal, our timed mock exams take you from complete beginner to exam-ready.
          </p>
        </div>

        {/* Stat strip — green highlighted numbers over a dark divider band */}
        <div className="relative border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-4 max-w-5xl py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '86%', label: 'Real Pass Mark' },
                { value: `${courses.length}+`, label: 'Online Courses' },
                { value: 'Free', label: 'To Start' },
                { value: '50', label: 'Question Mock Exam' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-green-400">{stat.value}</div>
                  <div className="text-xs md:text-sm text-blue-200/80 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Try a free practice question */}
      <section className="py-14 md:py-16 bg-white border-b">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xl font-semibold text-gray-900">Try a free practice question</h3>
              <button onClick={resetSample} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Reset
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-4">Free to try, with instant answers.</p>

            <div className="bg-white text-gray-800 rounded-xl p-6 border border-gray-200">
              <p className="font-medium mb-4">{sampleQuestion.question}</p>

              <div className="space-y-2 mb-4">
                {sampleQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSampleAnswer(index)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedAnswer === index && showSampleAnswer
                        ? index === sampleQuestion.correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    disabled={showSampleAnswer}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                    {showSampleAnswer && index === sampleQuestion.correct && (
                      <span className="ml-2 text-green-600">✓</span>
                    )}
                    {showSampleAnswer && selectedAnswer === index && index !== sampleQuestion.correct && (
                      <span className="ml-2 text-red-600">✗</span>
                    )}
                  </button>
                ))}
              </div>

              {showSampleAnswer && (
                <div className={`p-3 rounded-lg ${selectedAnswer === sampleQuestion.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {selectedAnswer === sampleQuestion.correct ? (
                    <p className="font-medium">✅ Correct! Well done.</p>
                  ) : (
                    <p className="font-medium">❌ The correct answer is {String.fromCharCode(65 + sampleQuestion.correct)}. {sampleQuestion.options[sampleQuestion.correct]}</p>
                  )}
                </div>
              )}

              {!showSampleAnswer && (
                <p className="text-sm text-gray-500 text-center">Select an answer to check</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {[
              { value: '3000+', label: 'Practice Questions' },
              { value: '11', label: 'ECS Topics' },
              { value: '86%', label: 'Pass Mark' },
              { value: '45', label: 'Minutes Test' },
              { value: '50', label: 'Questions' }
            ].map((stat, index) => (
              <div key={index} className="p-3 group hover:bg-blue-50 rounded-xl transition">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 md:py-20 bg-white border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold mb-3">
                <Laptop size={13} /> 100% ONLINE COURSES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore Our Online Courses, A–Z</h2>
              <p className="text-gray-600 mt-2 max-w-xl">
                Every ECS card and electrician qualification, with a full course, mock exam and 25+ Pro tools unlocked the moment you book.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline whitespace-nowrap"
            >
              View all {courses.length} courses <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group bg-gray-50 hover:bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all p-5 flex flex-col"
              >
                <span className="text-[11px] font-bold tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit mb-3">
                  {course.code}
                </span>
                <h3 className="font-bold text-gray-900 leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">
                  {course.shortTitle}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.summary}</p>
                <div className="mt-auto flex items-center justify-end pt-3 border-t border-gray-100">
                  <ArrowRight size={15} className="text-blue-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Card Types */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your ECS Card & Start the Right Mock Test
            </h2>
            <p className="text-lg text-gray-600">
              Not sure which ECS test you need? Select your card type below.
            </p>
            <div className="mt-4">
              <Link to="/cards" className="text-blue-600 font-medium hover:underline inline-flex items-center">
                Not sure which card you need?
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardTypes.map((card) => (
              <Link
                key={card.id}
                to={card.path}
                className={`border-2 rounded-2xl p-6 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-xl ${card.color}`}
              >
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{card.title}</h3>
                  <span className="text-xs font-medium text-gray-500 bg-white/70 px-2 py-0.5 rounded-full">
                    {card.subtitle}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{card.description}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  Start practice
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Built for UK construction workers • Updated for the 2026 ECS test • Free, start in 30 seconds</p>
            <p className="mt-2 text-xs text-gray-400">
              ECSMockTest.uk is not affiliated with ECS, ECS, or any official scheme.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Three steps from your first practice test to a real-test pass.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '1', title: 'Take a free mock test', desc: '50 real exam-style questions in 30 minutes' },
              { number: '2', title: 'See your weak topics', desc: 'Topic-by-topic breakdown with AI explanations' },
              { number: '3', title: 'Pass with confidence', desc: 'Track your pass probability and book the real test' }
            ].map((step, index) => (
              <div key={index} className="text-center relative group">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-0 border-t-2 border-dashed border-blue-200"></div>
                  )}
                </div>
                <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Pass
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive practice tools designed to help you pass your ECS test first time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-gray-600">
              Built to match the real ECS Health, Safety &amp; Environment test format.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Exam-format questions</h4>
              <p className="text-gray-700 text-sm">Multiple-choice questions styled on the real Pearson VUE ECS test, with clear explanations for every answer.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <BarChart className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Track your progress</h4>
              <p className="text-gray-700 text-sm">See which topics you're strong on and which need more revision before booking your real test.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <ShieldCheck className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Independent revision tool</h4>
              <p className="text-gray-700 text-sm">We're not affiliated with ECS or ECS — just a straightforward revision resource for construction workers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 bg-gray-950 border-y border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'UK-wide coverage', desc: 'Every ECS card & test type' },
              { label: 'Free to practise', desc: 'No card required to start' },
              { label: 'Updated for 2026', desc: 'Latest HS&E question bank' },
              { label: 'Real exam format', desc: 'Timed, multiple choice' },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-white font-semibold text-sm md:text-base">{item.label}</div>
                <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple pricing
            </h2>
            <p className="text-lg text-gray-600">
              Free forever, or upgrade from £4.99/week. 7-day money-back guarantee.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl ${
                  plan.popular ? 'border-blue-500 shadow-md relative' : 'border-gray-200'
                } ${plan.bestValue ? 'border-green-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                {plan.bestValue && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Best Value
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/pricing"
                  className={`block text-center py-3 rounded-xl font-semibold transition duration-200 ${plan.buttonClass}`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>7-day money-back guarantee on all paid plans. If it doesn't help you pass us within 7 days for a full refund.</p>
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-500 to-secondary">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100 max-w-xs w-full">
                <div className="text-center">
                  <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">New</div>
                  <BookOpen className="w-16 h-16 mx-auto text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900">The ECS Mock Test Book 2026</h3>
                  <p className="text-sm text-gray-600 mt-2">70-page guide with 50-question mock exam, 17 diagrams, and 1 month Premium access.</p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                    <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1 text-blue-600" /> 23 CHAPTERS</span>
                    <span className="flex items-center"><BarChart className="w-4 h-4 mr-1 text-blue-600" /> 17 DIAGRAMS</span>
                    <span className="flex items-center"><FileText className="w-4 h-4 mr-1 text-blue-600" /> 50 QUESTIONS</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">£4.90</span>
                    <span className="text-gray-500 text-sm ml-1">one-time</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Includes 1 month Premium access</p>
                  <Link
                    to="/book"
                    className="mt-4 inline-flex items-center bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Buy Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get the ECS Mock Test Book</h2>
              <p className="text-gray-600 mb-6">
                The comprehensive 70-page study guide includes everything you need to pass your ECS test, with detailed diagrams, chapter-by-chapter coverage, and a full 50-question mock test.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Complete 50-question mock test with answers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">17 detailed diagrams and illustrations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">23 chapters covering all 11 ECS topics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Includes 1 month of Premium online access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;