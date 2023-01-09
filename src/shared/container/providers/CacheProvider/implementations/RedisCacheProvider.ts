import Redis, { Redis as RedisClient } from 'ioredis'
import ICacheProvider from '../models/ICacheProvider'
import cache from '@config/cache'

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cache.config.redis)
  }

  public async save<T>(key: string, value: T): Promise<void> {
    this.client.set(key, JSON.stringify(value))
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)

    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data)

    return parsedData
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}: *`)

    const pipeline = this.client.pipeline()

    keys.forEach(key => {
      pipeline.del(key)
    })
    await pipeline.exec()
  }
}
