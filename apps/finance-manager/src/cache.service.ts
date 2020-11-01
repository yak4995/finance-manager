export abstract class CacheService<T> {
  abstract get(key: string): Promise<T>;
  abstract set(key: string, value: T): Promise<boolean>;
  abstract delete(key: string): Promise<boolean>;
}
