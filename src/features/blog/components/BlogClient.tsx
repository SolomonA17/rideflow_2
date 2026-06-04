'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────
interface BlogPost {
  id: string
  title: string
  category: 'INSIGHTS' | 'ENGINEERING' | 'ANNOUNCEMENTS'
  publishedDate: string
  author: string
  excerpt: string
  coverUrl: string
}

type FilterType = 'ALL' | 'INSIGHTS' | 'ENGINEERING' | 'ANNOUNCEMENTS'

// ─── Article Data ─────────────────────────────────────────────────────────────
// ⚠️  Content rewritten with real search keywords.
// Original titles used zero-search jargon ("multi-chain decentralized mobility
// architecture", "cryptographic signatures fleet allocation").
// These rewrites target actual queries from the keyword research document.

const articles: BlogPost[] = [
  {
    id: 'B001',
    title: 'How to Rent a Car Using MetaMask in 2026',
    category: 'INSIGHTS',
    publishedDate: 'May 18, 2026',
    author: 'RideFlow Team',
    excerpt:
      'A step-by-step guide to connecting your MetaMask wallet on RideFlow, approving an ETH transaction, and receiving your booking confirmation with a verifiable transaction hash.',
    coverUrl:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'B002',
    title: 'How Blockchain Payments Work for Vehicle Rentals',
    category: 'ENGINEERING',
    publishedDate: 'May 24, 2026',
    author: 'Kidus Tilahun',
    excerpt:
      'When you pay with ETH on RideFlow, your transaction is recorded permanently on the Ethereum blockchain. Here is exactly how that works and why it protects your booking.',
    coverUrl:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'B003',
    title: 'RideFlow Now Accepts Crypto Payments for All Vehicle Bookings',
    category: 'ANNOUNCEMENTS',
    publishedDate: 'May 29, 2026',
    author: 'RideFlow Operations',
    excerpt:
      'Starting today, every vehicle rental on RideFlow can be paid with ETH via MetaMask. Here is how the checkout flow works and what your transaction hash means for your booking.',
    coverUrl:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
  },
]

// ─── BlogClient Component ─────────────────────────────────────────────────────
export function BlogClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL')

  const filteredArticles = articles.filter(
    (art) => activeFilter === 'ALL' || art.category === activeFilter
  )

  const featuredPost   = articles[0]
  const showFeatured   = activeFilter === 'ALL' && featuredPost
  const gridPosts      = showFeatured
    ? filteredArticles.filter((p) => p.id !== featuredPost.id)
    : filteredArticles

  return (
    <div className="w-full min-h-screen bg-admin-surface text-brand-ink pb-24 px-4 md:px-12 selection:bg-brand-primary/20">
      <div className="max-w-[1440px] mx-auto space-y-12 pt-8">

        {/* ── Category Filter Bar ──────────────────────────────────────── */}
        {/* Note: H1 is rendered server-side in page.tsx above this component */}
        <div className="flex justify-end border-b border-admin-border pb-6">
          <div className="flex flex-wrap gap-2">
            {(['ALL', 'INSIGHTS', 'ENGINEERING', 'ANNOUNCEMENTS'] as const).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                  className={`px-4 py-2 border rounded-none uppercase transition-all cursor-pointer text-xs font-bold tracking-wide ${
                    activeFilter === cat
                      ? 'bg-brand-ink border-brand-ink text-white'
                      : 'bg-admin-surface border-admin-border text-brand-muted hover:text-brand-ink hover:border-admin-border-strong'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* ── Featured Post ────────────────────────────────────────────── */}
        {showFeatured && (
          <Link
            href={`/blog/${featuredPost.id.toLowerCase()}`}
            className="w-full grid grid-cols-1 lg:grid-cols-12 border border-admin-border hover:border-admin-border-strong transition-all no-underline bg-admin-surface cursor-pointer group rounded-none overflow-hidden"
          >
            <div className="lg:col-span-7 bg-admin-surface-muted overflow-hidden border-b lg:border-b-0 lg:border-r border-admin-border">
              {/* ✅ Next.js Image — lazy load, correct alt text, no CLS */}
              <Image
                src={featuredPost.coverUrl}
                alt={featuredPost.title}
                width={1200}
                height={480}
                className="w-full h-[320px] lg:h-[480px] object-cover group-hover:scale-[1.01] transition-transform duration-300"
                priority // above-the-fold featured image — load eagerly
              />
            </div>
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-8 bg-admin-surface">
              <div className="space-y-4">
                <span className="text-[11px] font-bold tracking-wide text-brand-primary uppercase block">
                  Featured Article
                </span>
                {/*
                  H2 here — not H1. The H1 is in the Server Component above.
                  Each article title is a keyword signal at H2/H3 level.
                */}
                <h2 className="text-[26px] font-bold leading-tight uppercase text-brand-ink group-hover:text-brand-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-sm font-light leading-relaxed text-brand-muted line-clamp-4 pt-2">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-admin-border-muted text-brand-ink">
                <span className="font-mono text-xs font-medium">
                  BY {featuredPost.author.toUpperCase()}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider group-hover:underline">
                  Read Article →
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* ── Article Grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id.toLowerCase()}`}
              className="border border-admin-border hover:border-admin-border-strong bg-admin-surface no-underline transition-all cursor-pointer group flex flex-col justify-between rounded-none overflow-hidden"
            >
              <div className="space-y-4">
                <div className="w-full h-48 bg-admin-surface-muted border-b border-admin-border overflow-hidden">
                  <Image
                    src={post.coverUrl}
                    alt={post.title}
                    width={800}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold tracking-wide text-brand-primary uppercase block">
                    {post.category}
                  </span>
                  <h3 className="text-[18px] font-bold leading-tight uppercase text-brand-ink line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[13px] font-light leading-relaxed text-brand-muted line-clamp-3 pt-1">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-admin-border-muted flex items-center justify-between text-xs text-brand-muted">
                <span className="font-mono uppercase tracking-tight text-[11px]">
                  BY {post.author}
                </span>
                <time
                  dateTime={post.publishedDate}
                  className="font-mono text-[11px]"
                >
                  {post.publishedDate}
                </time>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Empty State ───────────────────────────────────────────────── */}
        {filteredArticles.length === 0 && (
          <div className="w-full text-center py-24 border border-dashed border-admin-border bg-admin-surface-muted">
            <span className="text-[13px] font-bold text-brand-muted uppercase tracking-wider block">
              No articles in this category yet
            </span>
            <p className="text-brand-subtle text-[13px] font-light mt-1">
              Check back soon — new articles are published weekly.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}