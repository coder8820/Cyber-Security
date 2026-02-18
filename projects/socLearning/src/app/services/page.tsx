'use client'

import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/providers/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { 
  Shield, Code, Zap, Users, BookOpen, Award, CheckCircle2, ArrowRight, 
  Rocket, Star, AlertCircle
} from 'lucide-react'

export default function ServicesPage() {
  const { user } = useAuth()
  const { theme } = useTheme()

  const services = [
    {
      icon: Code,
      title: 'Interactive Labs',
      description: 'Hands-on practical exercises with real-world scenarios',
      features: ['Live command execution', 'Real-time feedback', 'Progressive difficulty'],
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Lessons',
      description: 'In-depth tutorials covering SOC fundamentals to advanced topics',
      features: ['Video tutorials', 'Code examples', 'Downloadable resources'],
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Security Challenges',
      description: 'Capture-the-flag style challenges to test your skills',
      features: ['Scoring system', 'Leaderboards', 'Certificate rewards'],
      color: 'from-green-600 to-emerald-600'
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Connect with SOC professionals and get mentorship',
      features: ['Forums', 'Live Q&A sessions', 'Networking events'],
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: Zap,
      title: 'Quiz & Assessments',
      description: 'Test your knowledge with comprehensive quizzes',
      features: ['Instant feedback', 'Performance tracking', 'Detailed reports'],
      color: 'from-yellow-600 to-orange-600'
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn industry-recognized certifications upon completion',
      features: ['Digital badges', 'LinkedIn integration', 'Resume-ready credentials'],
      color: 'from-indigo-600 to-blue-600'
    },
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for beginners',
      features: [
        'Access to 5 lessons',
        '2 labs per month',
        'Basic quizzes',
        'Community forum access',
        'Standard support'
      ],
      highlighted: false,
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'For serious learners',
      features: [
        'All lessons & labs',
        'Unlimited quizzes',
        'Personal mentor access',
        'Priority support',
        'Certification eligibility',
        'Excel progress tracking'
      ],
      highlighted: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations',
      features: [
        'Team management',
        'Custom courses',
        'Dedicated support',
        'Analytics dashboard',
        'SSO/LDAP integration',
        'On-premise option'
      ],
      highlighted: false,
      cta: 'Contact Sales'
    }
  ]

  const stats = [
    { label: 'Active Learners', value: '50K+' },
    { label: 'Courses Available', value: '200+' },
    { label: 'Success Rate', value: '94%' },
    { label: 'Expert Mentors', value: '500+' }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'SOC Analyst at TechCorp',
      image: '👩‍💼',
      text: 'The interactive labs and mentorship transformed my career. Went from junior analyst to senior in just 8 months!'
    },
    {
      name: 'Mike Chen',
      role: 'Security Engineer at DataSecure',
      image: '👨‍💼',
      text: 'Best investment I made for my professional development. Real-world scenarios and expert guidance made all the difference.'
    },
    {
      name: 'Emma Davis',
      role: 'Incident Response Lead at SecureNet',
      image: '👩‍💼',
      text: 'The platform\'s certification program is Now recognized by our industry. Highly recommend for anyone in cybersecurity.'
    }
  ]

  const comparisonFeatures = [
    { name: 'Video Lessons', starter: true, pro: true, enterprise: true },
    { name: 'Interactive Labs', starter: false, pro: true, enterprise: true },
    { name: 'Personal Mentor', starter: false, pro: true, enterprise: true },
    { name: 'Certifications', starter: false, pro: true, enterprise: true },
    { name: 'API Access', starter: false, pro: false, enterprise: true },
    { name: 'Custom Training', starter: false, pro: false, enterprise: true },
    { name: 'Team Management', starter: false, pro: false, enterprise: true },
    { name: 'Priority Support', starter: false, pro: true, enterprise: true },
  ]

  const faqItems = [
    {
      q: 'How long does it take to complete a course?',
      a: 'Most courses take 4-12 weeks depending on your pace. You can learn at your own speed with lifetime access to materials.'
    },
    {
      q: 'Do I get a certificate after completion?',
      a: 'Yes! All Professional and Enterprise plans include industry-recognized certificates upon course completion.'
    },
    {
      q: 'Is there a money-back guarantee?',
      a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your full payment.'
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Yes, you can cancel anytime without penalties. No long-term contracts required.'
    },
    {
      q: 'Do you offer corporate training?',
      a: 'Yes! Our Enterprise plan includes custom training, team management, and dedicated support for organizations.'
    },
    {
      q: 'What support is available?',
      a: 'All plans include community support. Professional and Enterprise plans get priority email and chat support.'
    }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {user && <Navbar />}

      {/* Hero Section */}
      <div className={`relative overflow-hidden border-b ${theme === 'dark' ? 'border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'border-slate-200 bg-gradient-to-br from-slate-50 to-white'}`}>
        <div className="absolute inset-0 opacity-50">
          <div className={`absolute top-0 right-0 w-96 h-96 ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/5'} rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-0 left-0 w-96 h-96 ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/5'} rounded-full blur-3xl`}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold">
              🚀 Premium Learning Platform
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Master SOC Skills with Professional Training
            </h1>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              Comprehensive cybersecurity training designed for blue team professionals. Learn from industry experts with hands-on labs and real-world scenarios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={user ? "/dashboard" : "/register"}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
              >
                {user ? 'Go to Dashboard' : 'Start Free Trial'} <ArrowRight size={20} className="inline ml-2" />
              </Link>
              <button
                className={`px-8 py-3 rounded-lg font-semibold border transition ${
                  theme === 'dark'
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`text-center p-6 rounded-lg border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            What We Offer
          </h2>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Comprehensive services designed for your cybersecurity success
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className={`p-6 rounded-lg border transition hover:shadow-lg overflow-hidden group ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`inline-block p-3 rounded-lg mb-4 bg-gradient-to-br ${service.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {service.title}
                </h3>

                <p className={`mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className={`text-sm flex items-center gap-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      <CheckCircle2 size={16} className="text-green-500" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pricing Section */}
      <div className={`border-t ${theme === 'dark' ? 'border-slate-800 bg-slate-800/30' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Simple, Transparent Pricing
            </h2>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
              Choose the perfect plan for your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-8 border transition transform hover:scale-105 ${
                  plan.highlighted
                    ? theme === 'dark'
                      ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-600/50 shadow-lg shadow-blue-600/20'
                      : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-400 shadow-lg'
                    : theme === 'dark'
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-white border-slate-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold mb-4">
                    Popular ⭐
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  {plan.period && <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{plan.period}</span>}
                </div>

                <button
                  className={`w-full py-2 rounded-lg font-semibold transition mb-6 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                      : theme === 'dark'
                        ? 'bg-slate-700 text-white hover:bg-slate-600'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-3 text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Feature Comparison
          </h2>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            See what's included in each plan
          </p>
        </div>

        <div className={`rounded-lg border overflow-x-auto ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
          <table className="w-full">
            <thead>
              <tr className={theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}>
                <th className={`px-6 py-4 text-left font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Feature
                </th>
                <th className={`px-6 py-4 text-center font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Starter
                </th>
                <th className={`px-6 py-4 text-center font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Professional
                </th>
                <th className={`px-6 py-4 text-center font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, idx) => (
                <tr key={idx} className={`border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                  <td className={`px-6 py-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {feature.starter ? <CheckCircle2 size={20} className="text-green-500 mx-auto" /> : <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-300'}>—</span>}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {feature.pro ? <CheckCircle2 size={20} className="text-green-500 mx-auto" /> : <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-300'}>—</span>}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {feature.enterprise ? <CheckCircle2 size={20} className="text-green-500 mx-auto" /> : <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-300'}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Testimonials */}
      <div className={`border-t ${theme === 'dark' ? 'border-slate-800 bg-slate-800/30' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              What Our Learners Say
            </h2>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
              Success stories from professionals who advanced their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{testimonial.text}"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Frequently Asked Questions
          </h2>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Everything you need to know about our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-slate-800/50 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <h4 className={`font-bold mb-3 flex items-start gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <AlertCircle size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                {item.q}
              </h4>
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <div className={`border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Ready to Transform Your Career?
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            Join thousands of professionals who've advanced their cybersecurity careers with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={user ? "/dashboard" : "/register"}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              {user ? 'Go to Dashboard' : 'Start Your Journey'} <Rocket size={20} className="inline ml-2" />
            </Link>
            <Link
              href="/"
              className={`px-8 py-3 rounded-lg font-semibold border transition ${
                theme === 'dark'
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
