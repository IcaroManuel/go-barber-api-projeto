import { Request, Response, NextFunction } from 'express'
import Redis from 'ioredis'
import AppError from '@shared/errors/AppError'
import { RateLimiterRedis } from 'rate-limiter-flexible'

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT ?? '', 10),
  password: 'toor',
})

console.log(process.env.REDIS_HOST, 'HOST')
console.log(process.env.REDIS_PORT, 'PORT')

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
})

export async function rateLimiter(
  req: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(req.ip)

    return next()
  } catch (err) {
    throw new AppError('too many requests', 429)
  }
}
