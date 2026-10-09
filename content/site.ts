// Every word on the site lives in content/. Copy is taken from the existing
// westcoastwarehouse.com pages (lightly normalised for spelling and punctuation only).

export const site = {
  name: 'Westcoast Warehousing & Trucking',
  shortName: 'Westcoast',
  legalName: 'Westcoast Warehousing & Trucking',
  wordmark: { top: 'Westcoast', bottom: 'Warehousing & Trucking' },
  tagline: 'Excellence in motion.',
  description:
    'Warehousing, trucking and e-commerce fulfillment in the heart of the Alameda Corridor, ten miles from the Ports of Los Angeles and Long Beach.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://westcoastwarehouse.com').replace(/\/$/, ''),
  email: 'info@westcoastwarehouse.com',
  hrEmail: 'hr@westcoastwarehouse.com',
  phone: '310-635-9938',
  phoneHref: '+13106359938',
  fax: '310-635-9738',
  address: {
    street: '100 West Manville Street',
    city: 'Compton',
    region: 'CA',
    postalCode: '90220',
    country: 'US',
  },
  portal: {
    label: 'Online Portal',
    href: 'https://client.westcoastwarehouse.com/login.aspx',
    description:
      'Use our convenient online portal to schedule a service appointment at a time that works for you.',
  },
  locale: 'en_US',
} as const

export const cta = {
  primary: { label: 'Get a Rate Estimate', href: '/rate-estimate' },
  secondary: { label: 'Explore Services', href: '/services' },
  submit: 'Request Estimate',
} as const

export type NavItem = { label: string; href: string }

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Rate Estimate', href: '/rate-estimate' },
]

export const legalNav: NavItem[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

export const home = {
  hero: {
    eyebrow: 'Warehousing · Trucking · E-commerce',
    lines: [
      { text: 'Excellence', accent: '' },
      { text: 'in', accent: 'motion.' },
    ],
    lead: 'Are you in need of management, trucking, and warehousing services? Westcoast Warehousing & Trucking makes the safe transport and storage of your freight our top priority. We tailor our services to meet your unique supply chain requirements.',
    // Facts restated from the About and Trucking pages
    facts: [
      { value: '10 mi', label: 'to the Los Angeles and Long Beach ports' },
      { value: '48', label: 'states licensed for long haul trucking' },
      { value: '710 · 91', label: 'freeways next door in Compton, CA' },
    ],
  },
  panels: {
    eyebrow: 'What we do',
    title: 'Three services.',
    accent: 'One partner.',
  },
  problem: {
    eyebrow: 'The honest pitch',
    headline: 'If you are not doing business with us,',
    accent: 'you should be.',
    beats: [
      {
        icon: 'warehouse',
        title: 'Providing your own on-site logistics?',
        body: 'You may not be enjoying the cost-effectiveness that an offsite, full-turn-key fulfillment center can provide.',
      },
      {
        icon: 'route',
        title: 'From the port to across the United States.',
        body: 'Westcoast’s dedicated staff will handle your product throughout the entire distribution process.',
      },
      {
        icon: 'gauge',
        title: 'Efficiency and cost-effectiveness.',
        body: 'Our goal is to contribute to the efficiency and cost-effectiveness of your distribution process.',
      },
    ],
    consequence:
      'With Westcoast Warehousing and Trucking, let the power of our business increase the power of YOUR business.',
  },
  oneRoof: {
    eyebrow: 'One roof',
    title: 'Store it, move it,',
    accent: 'ship it.',
    lead: 'We approach warehousing and trucking in a way that allows for complete customer satisfaction while providing the highest level of service in the industry.',
  },
  services: {
    eyebrow: 'Services offered',
    title: 'Tailored to your needs,',
    accent: 'timeline and budget.',
    lead: 'We offer a broad range of services tailored to meet your specific needs, timeline, and budget.',
  },
  method: {
    eyebrow: 'How it works',
    title: 'Port to',
    accent: 'doorstep.',
    lead: 'From picking up your product at the port to shipping your product across the United States, Westcoast’s dedicated staff will handle your product throughout the entire distribution process.',
  },
  feature: {
    eyebrow: 'Location',
    title: 'In the heart of the',
    accent: 'Alameda Corridor.',
    body: 'Westcoast Warehousing & Trucking has established a reputation in providing prompt, reliable services. We are in the heart of the Alameda Corridor, located next to 710 and 91 freeways, only ten miles to both Los Angeles and Long Beach Ports.',
    points: [
      { icon: 'map-pin', text: 'Next to the 710 and 91 freeways' },
      { icon: 'ship', text: 'Only ten miles to both Los Angeles and Long Beach Ports' },
      { icon: 'container', text: 'Services to and from every major West Coast port' },
      { icon: 'route', text: 'Long haul trucking, licensed in all 48 states' },
    ],
  },
  faq: { eyebrow: 'Questions', title: 'Good to', accent: 'know.' },
  inquiry: {
    eyebrow: 'Rate Estimate',
    title: 'Get a complimentary',
    accent: 'estimate.',
    lead: 'Get a complimentary transportation and warehousing estimate from Westcoast Warehousing & Trucking. Simply provide the required information below to submit your request.',
    after: 'We will contact you shortly with a detailed estimate.',
  },
} as const

export const about = {
  eyebrow: 'About Us',
  title: 'Management, trucking, and warehousing services',
  accent: 'at its best.',
  lead: 'Westcoast Warehousing & Trucking has established a reputation in providing prompt, reliable services.',
  story: [
    'We are in the heart of the Alameda Corridor, located next to 710 and 91 freeways, only ten miles to both Los Angeles and Long Beach Ports. By utilizing technology and continuously implementing improvements to our systems, Westcoast Warehousing & Trucking is recognized as a leading provider of third-party warehouse, order-fulfillment, retail compliance, and E.D.I. services.',
    'We approach warehousing and trucking in a way that allows for complete customer satisfaction while providing the highest level of service in the industry. These core foundations have enabled Westcoast to thrive as a market leader in today’s competitive transportation industry.',
    'Our goal is to contribute to the efficiency and cost-effectiveness of your distribution process. From picking up your product at the port to shipping your product across the United States, Westcoast’s dedicated staff will handle your product throughout the entire distribution process.',
  ],
  mission: {
    title: 'Our Mission Statement',
    body: 'Westcoast Warehousing & Trucking aims to always meet or exceed customer expectations by designing, implementing, and executing supply chain solutions that provide our customers with the least cost and best service logistics network.',
  },
  vision: {
    title: 'Our Vision Statement',
    body: 'Our vision is to be the best logistics company in the industry by inspiring innovation and encouraging our people to do great things for our customers every day.',
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Drive or work',
    accent: 'with us.',
    roles: [
      { title: 'Job Application', body: 'Warehouse and office roles.' },
      { title: 'Driver Application', body: 'Drayage, local and long haul.' },
    ],
    body: 'Please email form(s) to',
  },
} as const

export const servicesPage = {
  eyebrow: 'Services',
  title: 'Excellence',
  accent: 'in motion.',
  lead: 'Westcoast Warehousing & Trucking offers advanced value-added services, such as quality control inspections, inventory management, indoor storage, yard storage, and building.',
  technology: {
    eyebrow: 'Technologies used',
    title: 'Built on',
    accent: 'real-time visibility.',
    lead: 'At Westcoast Warehousing & Trucking, we utilize state-of-the-art technologies and equipment to ensure efficient, high-quality services.',
  },
} as const

export const processPage = {
  eyebrow: 'Process',
  title: 'From the port,',
  accent: 'across the country.',
  lead: home.method.lead,
} as const

export const rateEstimatePage = {
  eyebrow: 'Rate Estimate',
  title: 'Get a complimentary',
  accent: 'estimate.',
  lead: home.inquiry.lead,
} as const

export const notFound = {
  eyebrow: '404',
  title: 'This load took',
  accent: 'a wrong exit.',
  body: 'The page you are looking for is not on our route. Let’s get you back on the 710.',
} as const

export const anyQuestions = {
  eyebrow: 'Any questions?',
  title: 'Our experts are',
  accent: 'ready to help.',
  body: 'Contact us at 310-635-9938 for assistance. For a more detailed discussion of your needs, you can set an appointment now.',
  appointment: 'Set an Appointment',
  call: 'Call 310-635-9938',
} as const

export const convenience = {
  eyebrow: 'We value your convenience',
  title: 'Book it, track it,',
  accent: 'refer it.',
  items: [
    {
      title: 'Set an Appointment',
      body: 'Use our convenient online portal to schedule a service appointment at a time that works for you.',
      label: 'Open the Online Portal',
      href: 'https://client.westcoastwarehouse.com/login.aspx',
    },
    {
      title: 'Send Your Referrals',
      body: 'If you want other businesses to experience the same level of quality service that you received, refer them now.',
      label: 'Email a referral',
      href: 'mailto:info@westcoastwarehouse.com?subject=Referral',
    },
  ],
} as const

export const footer = {
  blurb:
    'Third-party warehousing, trucking and e-commerce fulfillment from Compton, California — prompt, reliable service from the port to across the United States.',
  directions:
    'https://www.google.com/maps/search/?api=1&query=100+West+Manville+Street+Compton+CA+90220',
  // Operating facts restated from the About and Trucking pages
  facts: [
    'Alameda Corridor',
    'Next to the 710 and 91 freeways',
    '10 miles to the LA and Long Beach ports',
    'Licensed in all 48 states',
  ],
} as const
