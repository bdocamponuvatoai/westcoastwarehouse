import { test } from 'node:test'
import assert from 'node:assert/strict'
import { processInquiry, messages, type InquiryGateway } from '../../lib/inquiry-service.ts'
import type { Inquiry } from '../../lib/schema.ts'

const valid = {
  interests: ['warehousing', 'trucking'],
  message: 'Two 40ft containers a week out of Long Beach, palletized and stored.',
  name: 'Sam Rivera',
  email: 'sam@example.com',
  company: 'Example Goods',
  phone: '(310) 555-0100',
}

function form(over: Partial<Record<keyof typeof valid | 'website', string | string[]>> = {}) {
  const fd = new FormData()
  const all = { ...valid, ...over }
  for (const [k, v] of Object.entries(all)) {
    for (const item of Array.isArray(v) ? v : [v]) fd.append(k, item)
  }
  return fd
}

function fakeGateway(
  opts: { configured?: boolean; limit?: number; ack?: boolean; limiterDown?: boolean } = {},
) {
  const sent: Inquiry[] = []
  let calls = 0
  const gateway: InquiryGateway = {
    configured: () => opts.configured ?? true,
    async allowed() {
      if (opts.limiterDown) throw new Error('redis down')
      calls += 1
      return calls <= (opts.limit ?? 5)
    },
    async send(i) {
      sent.push(i)
      return opts.ack ?? true
    },
  }
  return { gateway, sent }
}

test('success requires provider acknowledgment', async () => {
  const { gateway, sent } = fakeGateway({ ack: true })
  const r = await processInquiry(form(), gateway)
  assert.equal(r.status, 'success')
  assert.equal(sent.length, 1)
  assert.equal(sent[0]!.email, 'sam@example.com')
})

test('provider rejection is an honest failure and keeps input', async () => {
  const { gateway } = fakeGateway({ ack: false })
  const r = await processInquiry(form(), gateway)
  assert.equal(r.status, 'error')
  assert.equal(r.message, messages.failed)
  assert.equal(r.values.message, valid.message)
  assert.equal(r.values.name, valid.name)
})

test('validation blocks the provider and returns to the first invalid step', async () => {
  const { gateway, sent } = fakeGateway()
  const r = await processInquiry(form({ email: 'nope', message: 'short' }), gateway)
  assert.equal(r.status, 'invalid')
  assert.equal(sent.length, 0)
  assert.ok(r.errors?.email)
  assert.ok(r.errors?.message)
  assert.equal(r.step, 1)
})

test('honeypot never reaches the provider', async () => {
  const { gateway, sent } = fakeGateway()
  const r = await processInquiry(form({ website: 'http://spam.example' }), gateway)
  assert.equal(r.status, 'success')
  assert.equal(sent.length, 0)
})

test('unconfigured gateway fails honestly', async () => {
  const { gateway, sent } = fakeGateway({ configured: false })
  const r = await processInquiry(form(), gateway)
  assert.equal(r.status, 'error')
  assert.equal(r.message, messages.notConfigured)
  assert.equal(sent.length, 0)
})

test('sixth request in the window is refused', async () => {
  const { gateway, sent } = fakeGateway({ limit: 5 })
  for (let i = 0; i < 5; i++)
    assert.equal((await processInquiry(form(), gateway)).status, 'success')
  const r = await processInquiry(form(), gateway)
  assert.equal(r.status, 'error')
  assert.equal(r.message, messages.tooMany)
  assert.equal(sent.length, 5)
})

test('limiter outage fails closed', async () => {
  const { gateway, sent } = fakeGateway({ limiterDown: true })
  const r = await processInquiry(form(), gateway)
  assert.equal(r.status, 'error')
  assert.equal(sent.length, 0)
})

test('unknown service values are rejected', async () => {
  const { gateway, sent } = fakeGateway()
  const r = await processInquiry(form({ interests: ['teleportation'] }), gateway)
  assert.equal(r.status, 'invalid')
  assert.ok(r.errors?.interests)
  assert.equal(r.step, 0)
  assert.equal(sent.length, 0)
})

test('no service chosen is rejected', async () => {
  const { gateway } = fakeGateway()
  const fd = form()
  fd.delete('interests')
  const r = await processInquiry(fd, gateway)
  assert.equal(r.status, 'invalid')
  assert.ok(r.errors?.interests)
})

test('optional fields may be empty', async () => {
  const { gateway, sent } = fakeGateway()
  const r = await processInquiry(form({ company: '', phone: '' }), gateway)
  assert.equal(r.status, 'success')
  assert.equal(sent[0]!.company, undefined)
})
