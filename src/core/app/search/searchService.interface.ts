import IPersistantEntity from '../../domain/persistantEntity';

// use search service from infrastructure:
// db, elk stack, etc
export default interface ISearchService<T extends IPersistantEntity> {
  insert(entity: T): Promise<boolean>;
  remove(entity: T): Promise<boolean>;
  search(content: string, ...fields: Array<keyof T>): Promise<T[]>;
}
