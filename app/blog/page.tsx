import Link from 'next/link'
import { Metadata } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { ArrowRight, BookOpen, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Kenya Tax, PAYE, NSSF & Financial Guides',
  description: 'Expert guides on Kenyan tax, PAYE calculations, NSSF contributions, housing levy, salary breakdowns, and financial planning. Stay informed with our comprehensive resources.',
  openGraph: {
    title: 'Blog - Kenya Tax, PAYE, NSSF & Financial Guides',
    description: 'Expert guides on Kenyan tax, PAYE calculations, NSSF contributions, and financial planning.',
  }
}

// Get unique categories
const categories = Array.from(new Set(blogPosts.map(post => post.category)))

// Category colors
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

export default function BlogPage() {
  // Featured posts (first 3)
  const featuredPosts = blogPosts.slice(0, 3)
  const otherPosts = blogPosts.slice(3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Transfer.co.ke Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Kenya Tax & Finance Guides
          </h1>
          <p className="text-xl text-stone-400 max-w-2xl">
            Expert guides on PAYE, NSSF, housing levy, salary breakdowns, and everything Kenyan employees and employers need to know.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <span 
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${categoryColors[category] || 'bg-stone-500/20 text-stone-400 border-stone-500/30'}`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className="p-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${categoryColors[post.category] || 'bg-stone-500/20 text-stone-400 border-stone-500/30'}`}>
                    {post.category}
                  </span>
                  <h3 className={`font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                    {post.title}
                  </h3>
                  <p className={`text-stone-400 mb-4 ${index === 0 ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
                    {post.metaDescription}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
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
        </div>
      </section>
    </div>
  )
}
