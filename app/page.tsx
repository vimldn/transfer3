import Link from 'next/link'
import { 
  Smartphone, 
  Building2, 
  Globe, 
  Car, 
  Home, 
  Ship, 
  Zap, 
  PiggyBank, 
  Phone,
  ArrowRight,
  Calculator,
  TrendingUp,
  Shield,
  BookOpen
} from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

const tools = [
  {
    title: 'M-Pesa Fee Calculator',
    description: 'Calculate send money, withdraw, and Paybill fees instantly',
    href: '/mpesa-calculator',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-600',
    category: 'Money Transfer'
  },
  {
    title: 'Bank Transfer Comparison',
    description: 'Compare Pesalink, RTGS, and EFT fees across all banks',
    href: '/bank-transfer',
    icon: Building2,
    color: 'from-blue-500 to-blue-600',
    category: 'Money Transfer'
  },
  {
    title: 'International Remittance',
    description: 'Compare Wise, WorldRemit, Remitly & M-Pesa Global rates',
    href: '/remittance',
    icon: Globe,
    color: 'from-purple-500 to-purple-600',
    category: 'Money Transfer'
  },
  {
    title: 'Vehicle Logbook Transfer',
    description: 'NTSA fees, stamp duty, and total cost to transfer ownership',
    href: '/vehicle-transfer',
    icon: Car,
    color: 'from-orange-500 to-orange-600',
    category: 'Asset Transfer'
  },
  {
    title: 'Property Transfer Calculator',
    description: 'Stamp duty, legal fees, land search, and conveyancing costs',
    href: '/property-transfer',
    icon: Home,
    color: 'from-red-500 to-red-600',
    category: 'Asset Transfer'
  },
  {
    title: 'Import Duty Calculator',
    description: 'Calculate taxes and duties for importing vehicles to Kenya',
    href: '/import-duty',
    icon: Ship,
    color: 'from-cyan-500 to-cyan-600',
    category: 'Asset Transfer'
  },
  {
    title: 'KPLC Meter Transfer',
    description: 'Process and costs to transfer electricity meter ownership',
    href: '/kplc-transfer',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
    category: 'Utilities'
  },
  {
    title: 'Pension Transfer Calculator',
    description: 'Calculate costs to transfer NSSF to private pension schemes',
    href: '/pension-transfer',
    icon: PiggyBank,
    color: 'from-pink-500 to-pink-600',
    category: 'Financial'
  },
  {
    title: 'Mobile Number Portability',
    description: 'Keep your number when switching networks - process guide',
    href: '/mobile-portability',
    icon: Phone,
    color: 'from-teal-500 to-teal-600',
    category: 'Utilities'
  },
]

const stats = [
  { label: 'Calculators', value: '9+', icon: Calculator },
  { label: 'Monthly Users', value: '50K+', icon: TrendingUp },
  { label: 'Accurate Data', value: '100%', icon: Shield },
]

// Category colors for blog posts
const categoryColors: Record<string, string> = {
  'Tax': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Salary': 'bg-green-500/20 text-green-400 border-green-500/30',
  'NSSF': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Pension': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Housing Levy': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Health Insurance': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Employers': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Tax Relief': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'HELB': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'KRA': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
}

export default function HomePage() {
  // Get latest 6 blog posts
  const latestPosts = blogPosts.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6 animate-fadeIn">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">Kenya's #1 Transfer Calculator Hub</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 animate-fadeIn animate-delay-100">
            <span className="text-white">Calculate Any</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              Transfer Fee
            </span>
            <br />
            <span className="text-white">in Kenya</span>
          </h1>

          <p className="text-xl text-stone-400 max-w-2xl mx-auto mb-10 animate-fadeIn animate-delay-200">
            M-Pesa fees, bank transfers, remittance rates, vehicle transfers, property stamp duty — all in one place.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 mb-12 animate-fadeIn animate-delay-300">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <span className="text-stone-500 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">All Transfer Calculators</h2>
            <p className="text-stone-400">Choose a calculator to get started</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`tool-card group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-emerald-500/50 animate-fadeIn`}
                style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
              >
                {/* Category badge */}
                <span className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                  {tool.category}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center my-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-stone-400 text-sm mb-4">
                  {tool.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  Calculate Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-stone-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-medium">Latest from Blog</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Kenya Tax & Finance Guides</h2>
            </div>
            <Link 
              href="/blog" 
              className="hidden sm:flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-emerald-500/50 transition-all"
              >
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3 ${categoryColors[post.category] || 'bg-stone-500/20 text-stone-400 border-stone-500/30'}`}>
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-stone-400 text-sm mb-4 line-clamp-2">
                  {post.metaDescription}
                </p>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">Why Use Transfer.co.ke?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Instant Calculations</h3>
                <p className="text-stone-400 text-sm">Get accurate fee estimates in seconds, not hours of research</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Always Updated</h3>
                <p className="text-stone-400 text-sm">Rates and fees updated to reflect latest 2026 charges</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Trusted by Thousands</h3>
                <p className="text-stone-400 text-sm">Kenyans trust us for accurate transfer cost estimates</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
