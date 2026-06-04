// ─── SERVER COMPONENT — no 'use client' here ─────────────────────────────────
// Metadata, structured data, and the SEO text block all render server-side.
// The filter buttons (ALL / INSIGHTS / ENGINEERING / ANNOUNCEMENTS) are the
// only interactive piece — moved to BlogClient below.

import type { Metadata } from 'next'
import { BlogClient } from '@/features/blog/components/BlogClient'

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Blog — Vehicle Rental Tips, Crypto Payments & Web3 Guides',

  description:
    'The RideFlow blog covers vehicle rental guides, how to pay with cryptocurrency via MetaMask, blockchain payment explainers, and electric car tips. New articles weekly.',

  alternates: {
    canonical: '/blog',
  },

  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Blog — Vehicle Rental Tips, Crypto Payments & Web3 Guides | RideFlow',
    description:
      'Guides on renting vehicles, paying with ETH via MetaMask, comparing cars, and understanding blockchain payments. Read the RideFlow blog.',
    images: [
      {
        url: 'https://ride-flow-seo-6iej.vercel.app/og-homepage.jpg', // 🔧 Create a 1200x630px blog OG image in /public
        width: 1200,
        height: 630,
        alt: 'RideFlow Blog — Vehicle Rental & Crypto Payment Guides',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'RideFlow Blog — Rental Guides & Crypto Payment Tips',
    description:
      'How to rent with crypto, MetaMask guides, vehicle comparisons, and Web3 payment explainers.',
    images: ['/og-blog.jpg'],
  },
}

// ─── Structured Data ──────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rideflow.com'

// Blog schema — tells Google this is a blog listing page
const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog`,
  name: 'The RideFlow Blog',
  description:
    'Guides on vehicle rentals, crypto payments, blockchain transactions, and smart mobility. Published by the RideFlow team.',
  url: `${SITE_URL}/blog`,
  publisher: {
    '@type': 'Organization',
    name: 'RideFlow',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
  },
  // ── Blog posts listed here so Google indexes them from the listing page ──
  // 🔧 Replace with real data fetched from your API in production
  blogPost: [
    {
      '@type': 'BlogPosting',
      headline: 'How to Rent a Car Using MetaMask in 2026',
      url: `${SITE_URL}/blog/b001`,
      datePublished: '2026-05-18',
      author: { '@type': 'Person', name: 'RideFlow Team' },
      description:
        'Step-by-step guide to renting a vehicle on RideFlow using your MetaMask wallet and paying with ETH.',
    },
    {
      '@type': 'BlogPosting',
      headline: 'How Blockchain Payments Work for Vehicle Rentals',
      url: `${SITE_URL}/blog/b002`,
      datePublished: '2026-05-24',
      author: { '@type': 'Person', name: 'Kidus Tilahun' },
      description:
        'An explanation of how ETH transactions are recorded on-chain and attached to your RideFlow booking as verifiable payment proof.',
    },
    {
      '@type': 'BlogPosting',
      headline: 'RideFlow Now Accepts Crypto Payments for All Vehicle Bookings',
      url: `${SITE_URL}/blog/b003`,
      datePublished: '2026-05-29',
      author: { '@type': 'Person', name: 'RideFlow Operations' },
      description:
        'RideFlow launches instant crypto checkout for vehicle rentals, allowing customers to pay with ETH via MetaMask on any booking.',
    },
  ],
}

// BreadcrumbList schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
  ],
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function BlogPage() {
  return (
    <>
      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogSchema, breadcrumbSchema]),
        }}
      />

      {/*
        ── SEO text block ─────────────────────────────────────────────────────
        Server-rendered, Google reads this before JavaScript loads.
        Contains the H1 and intro paragraph with target keywords.
        Visible above the blog grid — better for SEO than sr-only.
      */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 pt-12 pb-0">
        <div className="border-b border-admin-border pb-6 mb-0">
          {/* H1 — primary keyword: 'vehicle rental blog' + 'crypto payments' */}
          <h1 className="text-[42px] font-bold uppercase text-brand-ink tracking-tight">
            The RideFlow Blog
          </h1>
          <p className="text-sm font-light text-brand-muted mt-2 max-w-2xl">
            Guides on renting vehicles with cryptocurrency, how blockchain
            payments work, MetaMask tutorials, vehicle comparison tips, and
            updates from the RideFlow team. New articles every week.
          </p>
        </div>
      </div>

      {/* All interactive logic — filter buttons + article grid */}
      <BlogClient />
    </>
  )
}