import { inquirySchema, stepOf, type Inquiry, type InquiryField } from './schema'
import {
  readValues,
  toCandidate,
  emptyValues,
  type FieldErrors,
  type InquiryState,
} from './form-values'

export type InquiryGateway = {
  configured(): boolean
  allowed(): Promise<boolean>
  send(inquiry: Inquiry): Promise<boolean>
}

export const messages = {
  success: 'Thank you. Your request is in — we will contact you shortly with a detailed estimate.',
  invalid: 'Please check the highlighted fields.',
  notConfigured:
    'Our online form is not connected yet. Please email info@westcoastwarehouse.com or call 310-635-9938.',
  tooMany:
    'Too many requests from this connection. Please try again in an hour, or call 310-635-9938.',
  failed:
    'We could not send your request. Nothing was lost — please try again, or email info@westcoastwarehouse.com.',
} as const

export async function processInquiry(fd: FormData, gateway: InquiryGateway): Promise<InquiryState> {
  const values = readValues(fd)

  // Honeypot: bots fill the hidden field. Pretend nothing happened and never reach the provider.
  const trap = fd.get('website')
  if (typeof trap === 'string' && trap.trim() !== '') {
    return { status: 'success', message: messages.success, values: emptyValues, step: 0 }
  }

  const parsed = inquirySchema.safeParse(toCandidate(values))
  if (!parsed.success) {
    const errors: FieldErrors = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as InquiryField
      if (field && !errors[field]) errors[field] = issue.message
    }
    const first = Math.min(...Object.keys(errors).map((f) => stepOf(f as InquiryField)))
    return {
      status: 'invalid',
      message: messages.invalid,
      errors,
      values,
      step: Math.max(0, first),
    }
  }

  const last = 2
  if (!gateway.configured()) {
    return { status: 'error', message: messages.notConfigured, values, step: last }
  }

  let allowed: boolean
  try {
    allowed = await gateway.allowed()
  } catch {
    return { status: 'error', message: messages.failed, values, step: last }
  }
  if (!allowed) return { status: 'error', message: messages.tooMany, values, step: last }

  let delivered = false
  try {
    delivered = await gateway.send(parsed.data)
  } catch {
    delivered = false
  }
  if (!delivered) return { status: 'error', message: messages.failed, values, step: last }

  return { status: 'success', message: messages.success, values: emptyValues, step: 0 }
}
