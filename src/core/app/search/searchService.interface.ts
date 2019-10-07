import IPersistantEntity from '../../domain/persistantEntity';

// use search service from infrastructure:
// db, elk stack, etc
export default interface ISearchService<T extends IPersistantEntity> {
  search(content: string, ...fields: Array<keyof T>): Promise<T[]>;
}
