import type { LegalSection } from '@/components/sections/Legal'
import { site } from './site'

// DRAFT TEMPLATES — replace with copy supplied by counsel before relying on them.
export const legalUpdated = 'October 9, 2026'

export const privacy: LegalSection[] = [
  {
    heading: 'What we collect',
    body: [
      'When you request a rate estimate we collect the details you enter: your name, email address, company, phone number, the services you are interested in and your shipment details.',
      'Like most websites, our hosting provider records basic technical information such as IP address and browser type to keep the site secure and working. We use privacy-friendly, cookie-free analytics to understand which pages are visited.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'We use your details only to respond to your request, prepare an estimate and provide the services you ask for. We do not sell your information.',
    ],
  },
  {
    heading: 'Who we share it with',
    body: [
      'Form submissions are delivered to our team by an email delivery provider. Rate limiting to prevent abuse is handled by a data store provider. These providers process data on our behalf only.',
    ],
  },
  {
    heading: 'Your choices',
    body: [
      `You can ask us to access, correct or delete the information you have sent us by emailing ${site.email}.`,
    ],
  },
  {
    heading: 'Contact',
    body: [
      `${site.name}, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}. Phone ${site.phone}. Email ${site.email}.`,
    ],
  },
]

export const terms: LegalSection[] = [
  {
    heading: 'Use of this website',
    body: [
      `This website is operated by ${site.name}. By using it you agree to these terms. The content is provided for general information about our services.`,
    ],
  },
  {
    heading: 'Estimates',
    body: [
      'Estimates requested through this website are complimentary and non-binding. Services are provided under separate written agreements, rate confirmations and bills of lading.',
    ],
  },
  {
    heading: 'Online portal',
    body: [
      'Access to the customer portal is governed by your customer agreement and any terms presented in the portal.',
    ],
  },
  {
    heading: 'Liability',
    body: [
      'We work to keep this website accurate and available but cannot guarantee it is free of errors or interruptions. To the extent permitted by law, we are not liable for losses arising from use of the website.',
    ],
  },
  {
    heading: 'Contact',
    body: [`Questions about these terms: ${site.email} or ${site.phone}.`],
  },
]
