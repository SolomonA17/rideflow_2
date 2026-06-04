// ─── SERVER COMPONENT — no 'use client' here ─────────────────────────────────
// This file handles metadata + SEO. The interactive catalog is a separate
// Client Component. Googlebot reads the metadata and structured data from
// this server-rendered shell before any JavaScript loads.

import type { Metadata } from 'next'
import { FleetCatalogClient } from '@/features/fleet-catalog/components/FleetCatalogClient'

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Browse All Vehicles — Filter by Type, Brand & Price',

  description:
    'Rent or buy from our full fleet. Filter by SUV, sedan, electric, or luxury. Sort by price, fuel type, and transmission. Secure crypto payment via MetaMask. Available now.',

  alternates: {
    canonical: '/fleetcatalog',
  },

  // Tells Next.js this page always reads live filter params — never serve stale cache
  // (also set below via generateStaticParams / dynamic export)

  openGraph: {
    type: 'website',
    url: 'https://ride-flow-seo-6iej.vercel.app/og-homepage.jpg',
    title: 'Browse All Vehicles — Filter by Type, Brand & Price | RideFlow',
    description:
      'Browse SUVs, sedans, electric cars, and luxury vehicles. Filter by type, fuel, price, and transmission. Pay securely with ETH via MetaMask.',
    images: [
      {
        url: '/og-fleet.jpg', // 🔧 Create a 1200x630px fleet image for /public
        width: 1200,
        height: 630,
        alt: 'RideFlow Fleet Catalog — Browse and Filter All Vehicles',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Browse All Vehicles — Filter by Type, Brand & Price | RideFlow',
    description:
      'Filter SUVs, sedans, electric and luxury vehicles. Pay with ETH via MetaMask. Book instantly.',
    images: ['/og-fleet.jpg'],
  },
}

// ─── Force dynamic — filter params change per request ────────────────────────
// Without this, Next.js may cache a stale page that ignores ?type=suv params.
// Googlebot also needs a fresh response for each filtered URL it crawls.
export const dynamic = 'force-dynamic'

// ─── Structured Data ──────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rideflow.com'

// CollectionPage schema — tells Google this page is a curated list of items
const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/fleetcatalog`,
  name: 'RideFlow Vehicle Fleet Catalog',
  description:
    'Browse, filter, and compare vehicles available for rental and purchase on RideFlow. Filter by SUV, sedan, electric, luxury, fuel type, transmission, and price.',
  url: `${SITE_URL}/fleetcatalog`,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',          item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Fleet Catalog', item: `${SITE_URL}/fleetcatalog` },
    ],
  },
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function FleetCatalogPage() {
  return (
    <>
      {/* Structured data — read by Google from the server-rendered HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />

      {/*
        ── SEO text block ───────────────────────────────────────────────────
        This paragraph is CRITICAL. It is the only human-readable text Google
        sees on this page before JavaScript loads. It must contain the
        secondary keywords: filter by type, fuel, price, and vehicle names.
        The sr-only class hides it visually but keeps it in the HTML for crawlers.
        Alternatively render it visibly above the grid — even better for SEO.
      */}
      <div className="sr-only">
        <h1>Browse All Vehicles</h1>
        <p>
          Find the right vehicle for any trip or budget. Filter by type, fuel,
          transmission, and price to narrow down SUVs, sedans, luxury cars, and
          electric vehicles — then compare your favourites side by side before
          booking. Secure crypto payment via MetaMask accepted on all rentals.
        </p>
      </div>

      {/* All interactive logic lives in the Client Component below */}
      <FleetCatalogClient />
    </>
  )
}