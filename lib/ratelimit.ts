import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN

export const rateLimitConfigured = () => Boolean(url && token)

let limiter: Ratelimit | null = null

function getLimiter() {
  if (!url || !token) return null
  limiter ??= new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'wcw:inquiry',
    analytics: false,
  })
  return limiter
}

/** 5 requests per hour per key. Throws if the limiter is unreachable so callers fail closed. */
export async function checkRateLimit(key: string): Promise<boolean> {
  const l = getLimiter()
  if (!l) throw new Error('Rate limiter not configured')
  const { success } = await l.limit(key)
  return success
}
