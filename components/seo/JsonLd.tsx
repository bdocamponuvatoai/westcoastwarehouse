import { offerings } from '@/content/offerings'
import { process as steps } from '@/content/process'
import { faq } from '@/content/faq'
import { site } from '@/content/site'
import type { Crumb } from '@/components/ui'
import { absolute } from '@/lib/seo'

type Json = Record<string, unknown>

export function JsonLd({ data }: { data: Json | Json[] }) {
  // Escape "<" so the payload can never close the script element.
  const json = JSON.stringify(data).replace(/</g, '\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

const orgId = `${site.url}/#organization`
const siteId = `${site.url}/#website`

const postal = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
}

export function organization(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': orgId,
    name: site.name,
    url: site.url,
    logo: absolute('/icon.png'),
    image: absolute('/opengraph-image'),
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phone,
    faxNumber: site.fax,
    address: postal,
    areaServed: { '@type': 'Country', name: 'United States' },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: site.phone,
        email: site.email,
        areaServed: 'US',
        availableLanguage: 'en',
      },
    ],
    knowsAbout: [
      'Third-party warehousing',
      'Order fulfillment',
      'Retail compliance',
      'EDI',
      'Container drayage',
      'Less than truckload',
      'Long haul trucking',
      'E-commerce fulfillment',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Logistics services',
      itemListElement: offerings.map((o) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: o.name, url: absolute(`/services/${o.id}`) },
      })),
    },
  }
}

export function website(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': siteId,
    url: site.url,
    name: site.name,
    publisher: { '@id': orgId },
    inLanguage: 'en-US',
  }
}

export function webPage(
  type: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage',
  path: string,
  name: string,
  description: string,
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absolute(path)}#webpage`,
    url: absolute(path),
    name,
    description,
    isPartOf: { '@id': siteId },
    about: { '@id': orgId },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['[data-speakable]'] },
  }
}

export function breadcrumbs(items: Crumb[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absolute(c.href),
    })),
  }
}

export function service(id: string): Json | null {
  const o = offerings.find((x) => x.id === id)
  if (!o) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absolute(`/services/${o.id}`)}#service`,
    name: o.name,
    serviceType: o.name,
    description: o.promise,
    url: absolute(`/services/${o.id}`),
    provider: { '@id': orgId },
    areaServed: { '@type': 'Country', name: 'United States' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${o.name} capabilities`,
      itemListElement: o.capabilities.map((c) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: c },
      })),
    },
  }
}

export function faqPage(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function howTo(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Westcoast moves your freight from the port to across the country',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: `${s.body} ${s.detail}`,
    })),
  }
}
