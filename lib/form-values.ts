import type { Inquiry, InquiryField } from './schema'

export type FormValues = {
  interests: string[]
  message: string
  name: string
  email: string
  company: string
  phone: string
}

export const emptyValues: FormValues = {
  interests: [],
  message: '',
  name: '',
  email: '',
  company: '',
  phone: '',
}

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v : '')

export function readValues(fd: FormData): FormValues {
  return {
    interests: fd.getAll('interests').filter((v): v is string => typeof v === 'string'),
    message: str(fd.get('message')),
    name: str(fd.get('name')),
    email: str(fd.get('email')),
    company: str(fd.get('company')),
    phone: str(fd.get('phone')),
  }
}

/** Shape the raw values for zod: empty optional fields become undefined. */
export function toCandidate(v: FormValues): Record<keyof Inquiry, unknown> {
  return {
    interests: v.interests,
    message: v.message,
    name: v.name,
    email: v.email,
    company: v.company.trim() || undefined,
    phone: v.phone.trim() || undefined,
  }
}

export type FieldErrors = Partial<Record<InquiryField, string>>

export type InquiryState = {
  status: 'idle' | 'success' | 'invalid' | 'error'
  message?: string
  errors?: FieldErrors
  values: FormValues
  step: number
}

export const initialState: InquiryState = { status: 'idle', values: emptyValues, step: 0 }
