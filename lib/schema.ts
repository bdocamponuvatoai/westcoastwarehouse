import { z } from 'zod'
import { offerings } from '@/content/offerings'

// The site's CSP forbids eval. Without this, zod probes `new Function` once to decide on its
// JIT path; the probe is caught, but Firefox reports it as a CSP violation in the console.
z.config({ jitless: true })

const interestIds = offerings.map((o) => o.id) as [string, ...string[]]

export const inquirySchema = z.object({
  interests: z
    .array(z.enum(interestIds, { error: 'Choose from the listed services.' }))
    .min(1, { error: 'Choose at least one service.' }),
  message: z
    .string()
    .trim()
    .min(20, { error: 'Tell us a little more — at least 20 characters.' })
    .max(3000, { error: 'Please keep it under 3,000 characters.' }),
  name: z
    .string()
    .trim()
    .min(2, { error: 'Please enter your name.' })
    .max(120, { error: 'Please shorten your name.' }),
  email: z
    .string()
    .trim()
    .max(254, { error: 'Please shorten your email.' })
    .pipe(z.email({ error: 'Please enter a valid email address.' })),
  company: z.string().trim().max(160, { error: 'Please shorten the company name.' }).optional(),
  phone: z
    .string()
    .trim()
    .max(40, { error: 'Please shorten the phone number.' })
    .regex(/^[0-9+().\-\s]*$/, { error: 'Use digits, spaces and + ( ) - only.' })
    .optional(),
})

export type Inquiry = z.infer<typeof inquirySchema>
export type InquiryField = keyof Inquiry

/** The three steps of the client form, in order. Each step validates only its own fields. */
export const steps: { title: string; fields: InquiryField[] }[] = [
  { title: 'Services', fields: ['interests'] },
  { title: 'Shipment details', fields: ['message'] },
  { title: 'Contact', fields: ['name', 'email', 'company', 'phone'] },
]

export const stepOf = (field: InquiryField) => steps.findIndex((s) => s.fields.includes(field))
