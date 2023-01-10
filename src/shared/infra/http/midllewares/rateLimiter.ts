import { Request, Response, NextFunction } from 'express'
import { createClient } from 'redis'
// import Redis from 'ioredis'
import AppError from '@shared/errors/AppError'
import { RateLimiterRedis } from 'rate-limiter-flexible'

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? '', 10),
  },
  disableOfflineQueue: false,
})
/* const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT ?? '', 10),
}) */

;(async () => {
  await redisClient.connect()
  console.log('Foi')
})()

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip)

    return next()
  } catch (err) {
    throw new AppError('too many requests', 429)
  }
}
