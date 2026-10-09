'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { offerings } from '@/content/offerings'
import { site } from '@/content/site'
import type { InquiryState } from '@/lib/form-values'
import { processInquiry, type InquiryGateway } from '@/lib/inquiry-service'
import { checkRateLimit, rateLimitConfigured } from '@/lib/ratelimit'
import type { Inquiry } from '@/lib/schema'

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )

function render(i: Inquiry) {
  const services = i.interests.map((id) => offerings.find((o) => o.id === id)?.name ?? id)
  const rows: Array<[string, string]> = [
    ['Name', i.name],
    ['Email', i.email],
    ['Company', i.company ?? '—'],
    ['Phone', i.phone ?? '—'],
    ['Services', services.join(', ')],
  ]
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', i.message].join('\n')
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><th align="left">${esc(k)}</th><td>${esc(v)}</td></tr>`)
    .join(
      '',
    )}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(i.message)}</p>`
  return {
    text,
    html,
    subject: `Rate estimate request — ${i.name}${i.company ? ` (${i.company})` : ''}`,
  }
}

async function clientKey() {
  const h = await headers()
  if (process.env.VERCEL) {
    const ip = h.get('x-vercel-forwarded-for') ?? h.get('x-forwarded-for') ?? 'unknown'
    return ip.split(',')[0]!.trim()
  }
  return 'local'
}

const resendGateway: InquiryGateway = {
  configured: () =>
    Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_FROM_EMAIL && rateLimitConfigured()),
  allowed: async () => checkRateLimit(await clientKey()),
  async send(inquiry) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { subject, text, html } = render(inquiry)
    const { data, error } = await resend.emails.send({
      from: process.env.INQUIRY_FROM_EMAIL!,
      to: (process.env.INQUIRY_TO_EMAIL ?? site.email).split(',').map((s) => s.trim()),
      replyTo: inquiry.email,
      subject,
      text,
      html,
    })
    return !error && Boolean(data?.id)
  },
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  return processInquiry(formData, resendGateway)
}
