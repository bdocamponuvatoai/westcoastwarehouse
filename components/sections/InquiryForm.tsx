'use client'

import { useActionState, useEffect, useId, useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { submitInquiry } from '@/app/actions/inquiry'
import { offerings } from '@/content/offerings'
import { cta, home, site } from '@/content/site'
import { initialState, toCandidate, type FieldErrors, type FormValues } from '@/lib/form-values'
import { messages } from '@/lib/inquiry-service'
import { inquirySchema, steps, type InquiryField } from '@/lib/schema'
import { Arrow, cx } from '@/components/ui'

const fieldOrder: InquiryField[] = steps.flatMap((s) => s.fields)

function validate(values: FormValues, fields: InquiryField[]): FieldErrors {
  const mask = Object.fromEntries(fields.map((f) => [f, true])) as Partial<
    Record<InquiryField, true>
  >
  const result = inquirySchema.pick(mask).safeParse(toCandidate(values))
  if (result.success) return {}
  const errors: FieldErrors = {}
  for (const issue of result.error.issues) {
    const f = issue.path[0] as InquiryField
    if (f && !errors[f]) errors[f] = issue.message
  }
  return errors
}

export function InquiryForm({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const [state, action, pending] = useActionState(submitInquiry, initialState)
  const [values, setValues] = useState<FormValues>(state.values)
  const [errors, setErrors] = useState<FieldErrors>(state.errors ?? {})
  const [step, setStep] = useState(state.step)
  const [notice, setNotice] = useState<string | undefined>(
    state.status === 'invalid' || state.status === 'error' ? state.message : undefined,
  )
  const form = useRef<HTMLFormElement>(null)
  const stepHeading = useRef<Array<HTMLHeadingElement | null>>([])
  // Each request is a fresh object, so the effect below runs even when the target repeats.
  const [focusReq, setFocusReq] = useState<{ target: InquiryField | 'step' } | null>(null)
  const setFocusNext = (target: InquiryField | 'step' | null | undefined) =>
    setFocusReq(target ? { target } : null)
  const id = useId()
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  // After hydration the client validates each step, so native validation must not block hidden steps.
  useEffect(() => {
    ;(window as Window & { __wcHydrated?: boolean }).__wcHydrated = true
    if (form.current) form.current.noValidate = true
  }, [])

  // Sync with each server response.
  const [seen, setSeen] = useState(state)
  if (seen !== state) {
    setSeen(state)
    setValues(state.values)
    setErrors(state.errors ?? {})
    setStep(state.step)
    setNotice(state.status === 'invalid' || state.status === 'error' ? state.message : undefined)
    const first = fieldOrder.find((f) => state.errors?.[f])
    setFocusNext(first ?? (state.status === 'error' ? 'step' : null))
  }

  useEffect(() => {
    if (!focusReq) return
    if (focusReq.target === 'step') stepHeading.current[step]?.focus()
    else form.current?.querySelector<HTMLElement>(`[name="${focusReq.target}"]`)?.focus()
  }, [focusReq, step])

  const set = <K extends keyof FormValues>(k: K, v: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [k]: v }))
    if (errors[k as InquiryField]) setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const goTo = (next: number) => {
    setStep(next)
    setFocusNext('step')
  }

  const advance = () => {
    const errs = validate(values, steps[step]!.fields)
    if (Object.keys(errs).length) {
      setErrors(errs)
      setNotice(messages.invalid)
      setFocusNext(fieldOrder.find((f) => errs[f]))
      return
    }
    setNotice(undefined)
    goTo(step + 1)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const errs = validate(values, fieldOrder)
    if (Object.keys(errs).length) {
      e.preventDefault()
      setErrors(errs)
      setNotice(messages.invalid)
      const first = fieldOrder.find((f) => errs[f])!
      setStep(steps.findIndex((s) => s.fields.includes(first)))
      setFocusNext(first)
    }
  }

  if (state.status === 'success' && seen === state) {
    return (
      <div className="card grid gap-5 p-8 sm:p-12" role="status">
        <CheckCircle2 className="size-10 text-accent" strokeWidth={1.5} aria-hidden="true" />
        <Heading className="display t-3">Request received</Heading>
        <p className="text-ink">{state.message}</p>
        <p className="text-sm text-muted">
          Urgent? Call{' '}
          <a href={`tel:${site.phoneHref}`} className="inline-link">
            {site.phone}
          </a>
          .
        </p>
      </div>
    )
  }

  const err = (f: InquiryField) => errors[f]
  const describedBy = (f: InquiryField, hint?: string) =>
    [hint, err(f) ? `${id}-${f}-error` : undefined].filter(Boolean).join(' ') || undefined
  const errorText = (f: InquiryField) =>
    err(f) ? (
      <p id={`${id}-${f}-error`} className="text-sm font-medium text-danger">
        {err(f)}
      </p>
    ) : null

  return (
    <form
      ref={form}
      action={action}
      onSubmit={onSubmit}
      className="card grid content-start gap-8 self-start p-6 sm:p-10"
      aria-describedby={`${id}-progress`}
    >
      {/* Progress (JS layout only; rendered on the server so nothing shifts) */}
      <div className="js-only grid gap-3">
        <p
          id={`${id}-progress`}
          className="text-xs font-semibold tracking-[0.3em] text-muted uppercase"
          aria-live="polite"
        >
          Step {step + 1} of {steps.length} · {steps[step]!.title}
        </p>
        <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
          {steps.map((s, i) => (
            <span
              key={s.title}
              className={cx('h-1 rounded-full', i <= step ? 'bg-pop' : 'bg-line')}
            />
          ))}
        </div>
      </div>

      {notice ? (
        <p
          role="alert"
          className="rounded-2xl px-4 py-3 text-sm font-medium text-danger shadow-[inset_0_0_0_1px_var(--danger)]"
        >
          {notice}
        </p>
      ) : null}

      {/* Honeypot */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Step 1 — services */}
      <fieldset className="form-step grid gap-5" data-active={step === 0 ? '' : undefined}>
        <legend className="contents">
          <Heading
            ref={(el) => {
              stepHeading.current[0] = el
            }}
            tabIndex={-1}
            className="display t-3 outline-none"
          >
            What do you need?
          </Heading>
        </legend>
        <div className="field">
          <p id={`${id}-interests-label`} className="text-sm text-ink">
            Choose one or more services.
          </p>
          <div
            role="group"
            aria-labelledby={`${id}-interests-label`}
            aria-describedby={describedBy('interests')}
            className="grid gap-2 sm:grid-cols-3"
          >
            {offerings.map((o) => (
              <label key={o.id} className="check">
                <input
                  type="checkbox"
                  name="interests"
                  value={o.id}
                  checked={values.interests.includes(o.id)}
                  aria-invalid={err('interests') ? true : undefined}
                  onChange={(e) =>
                    set(
                      'interests',
                      e.target.checked
                        ? [...values.interests, o.id]
                        : values.interests.filter((x) => x !== o.id),
                    )
                  }
                />
                <span className="font-medium">{o.name}</span>
              </label>
            ))}
          </div>
          {errorText('interests')}
        </div>
        <div className="js-only flex justify-end">
          <button type="button" className="btn btn-primary" onClick={advance}>
            Continue
            <Arrow />
          </button>
        </div>
      </fieldset>

      {/* Step 2 — details */}
      <fieldset className="form-step grid gap-5" data-active={step === 1 ? '' : undefined}>
        <legend className="contents">
          <Heading
            ref={(el) => {
              stepHeading.current[1] = el
            }}
            tabIndex={-1}
            className="display t-3 outline-none"
          >
            Tell us about your freight
          </Heading>
        </legend>
        <div className="field">
          <label htmlFor={`${id}-message`}>Shipment details</label>
          <p id={`${id}-message-hint`} className="text-sm text-muted">
            Origin and destination, volume, container or pallet counts, timeline.
          </p>
          <textarea
            id={`${id}-message`}
            name="message"
            className="input"
            required
            minLength={20}
            maxLength={3000}
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            aria-invalid={err('message') ? true : undefined}
            aria-describedby={describedBy('message', `${id}-message-hint`)}
          />
          {errorText('message')}
        </div>
        <div className="js-only flex flex-wrap justify-between gap-3">
          <button type="button" className="btn btn-outline" onClick={() => goTo(0)}>
            Back
          </button>
          <button type="button" className="btn btn-primary" onClick={advance}>
            Continue
            <Arrow />
          </button>
        </div>
      </fieldset>

      {/* Step 3 — contact */}
      <fieldset className="form-step grid gap-5" data-active={step === 2 ? '' : undefined}>
        <legend className="contents">
          <Heading
            ref={(el) => {
              stepHeading.current[2] = el
            }}
            tabIndex={-1}
            className="display t-3 outline-none"
          >
            Where should we send your estimate?
          </Heading>
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="field">
            <label htmlFor={`${id}-name`}>Name</label>
            <input
              id={`${id}-name`}
              name="name"
              className="input"
              autoComplete="name"
              required
              value={values.name}
              onChange={(e) => set('name', e.target.value)}
              aria-invalid={err('name') ? true : undefined}
              aria-describedby={describedBy('name')}
            />
            {errorText('name')}
          </div>
          <div className="field">
            <label htmlFor={`${id}-email`}>Email</label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              className="input"
              autoComplete="email"
              required
              value={values.email}
              onChange={(e) => set('email', e.target.value)}
              aria-invalid={err('email') ? true : undefined}
              aria-describedby={describedBy('email')}
            />
            {errorText('email')}
          </div>
          <div className="field">
            <label htmlFor={`${id}-company`}>
              Company <span className="tracking-normal text-muted normal-case">(optional)</span>
            </label>
            <input
              id={`${id}-company`}
              name="company"
              className="input"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => set('company', e.target.value)}
              aria-invalid={err('company') ? true : undefined}
              aria-describedby={describedBy('company')}
            />
            {errorText('company')}
          </div>
          <div className="field">
            <label htmlFor={`${id}-phone`}>
              Phone <span className="tracking-normal text-muted normal-case">(optional)</span>
            </label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              className="input"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => set('phone', e.target.value)}
              aria-invalid={err('phone') ? true : undefined}
              aria-describedby={describedBy('phone')}
            />
            {errorText('phone')}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" className="js-only btn btn-outline" onClick={() => goTo(1)}>
            Back
          </button>
          <button
            type="submit"
            className="btn btn-primary ml-auto"
            disabled={pending}
            aria-disabled={pending}
          >
            {pending ? 'Sending…' : cta.submit}
            <Arrow />
          </button>
        </div>
        <p className="text-sm text-muted">{home.inquiry.after}</p>
      </fieldset>
    </form>
  )
}
