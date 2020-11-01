import { Injectable } from '@nestjs/common';
import * as redis from 'redis';

import { CacheService } from './cache.service';

@Injectable()
export class RedisCacheService<T> extends CacheService<T> {
  constructor(private readonly client: redis.RedisClient) {
    super();
  }

  get(key: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.client.get(key, (err: Error, reply: string) => {
        if (err) {
          return reject(err);
        }
        if (!reply) {
          reject(new Error('Value is absent in the cache'));
        } else {
          resolve(JSON.parse(reply));
        }
      });
    });
  }

  set(key: string, value: T): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client.set(key, JSON.stringify(value), (err: Error, reply: 'OK') => {
        if (err) {
          return reject(err);
        }
        if (reply !== 'OK') {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  delete(key: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.client.del(key, err => resolve(!err));
    });
  }
}
