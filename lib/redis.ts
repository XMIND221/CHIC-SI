import { Redis } from "@upstash/redis"

const redisUrl = process.env.KV_REST_API_URL
const redisToken = process.env.KV_REST_API_TOKEN

// Only initialize Redis if environment variables are available
let redis: any = null
if (redisUrl && redisToken) {
  try {
    redis = new Redis({
      url: redisUrl,
      token: redisToken,
    })
    console.log("[v0] Redis initialized successfully")
  } catch (error) {
    console.warn("Redis initialization failed:", error)
  }
} else {
  console.warn("[v0] Redis environment variables not found:", { redisUrl: !!redisUrl, redisToken: !!redisToken })
}

export { redis }

// Cache utilities for Si-Chic
export const cache = {
  // Cache product data
  async getProducts() {
    if (!redis) {
      console.log("[v0] Redis not configured, skipping cache")
      return null
    }

    try {
      const result = await redis.get("si-chic:products")
      console.log("[v0] Redis get products result:", typeof result, result ? "data found" : "no data")
      return result
    } catch (error) {
      console.error("Redis get products error:", error)
      return null
    }
  },

  async setProducts(products: any[], ttl = 3600) {
    if (!redis) {
      console.log("[v0] Redis not configured, skipping cache set")
      return
    }

    try {
      await redis.setex("si-chic:products", ttl, JSON.stringify(products))
      console.log("[v0] Products cached successfully")
    } catch (error) {
      console.error("Redis set products error:", error)
    }
  },

  // Cache user sessions for guest checkout
  async getGuestSession(sessionId: string) {
    if (!redis) {
      console.log("[v0] Redis not configured, skipping cache")
      return null
    }

    try {
      const result = await redis.get(`si-chic:guest:${sessionId}`)
      console.log("[v0] Redis get guest session result:", typeof result, result ? "data found" : "no data")
      return result
    } catch (error) {
      console.error("Redis get session error:", error)
      return null
    }
  },

  async setGuestSession(sessionId: string, data: any, ttl = 86400) {
    if (!redis) {
      console.log("[v0] Redis not configured, skipping cache set")
      return
    }

    try {
      await redis.setex(`si-chic:guest:${sessionId}`, ttl, JSON.stringify(data))
      console.log("[v0] Guest session cached successfully")
    } catch (error) {
      console.error("Redis set session error:", error)
    }
  },

  // Cache cart data
  async getCart(cartId: string) {
    if (!redis) {
      console.log("[v0] Redis not configured, skipping cache")
      return null
    }

    try {
      const result = await redis.get(`si-chic:cart:${cartId}`)
      console.log("[v0] Redis get cart result:", typeof result, result ? "data found" : "no data")
      return result
    } catch (error) {
      console.error("Redis get cart error:", error)
      return null
    }
  },

  async setCart(cartId: string, cartData: any, ttl = 604800) {
    if (!redis) {
      console.log("[v0] Redis not configured, skipping cache set")
      return
    }

    try {
      await redis.setex(`si-chic:cart:${cartId}`, ttl, JSON.stringify(cartData))
      console.log("[v0] Cart data cached successfully")
    } catch (error) {
      console.error("Redis set cart error:", error)
    }
  },
}
