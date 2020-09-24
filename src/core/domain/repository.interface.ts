import IPersistantEntity from './persistantEntity';

export interface Range<T> {
  field: keyof T;
  from?: any;
  to?: any;
}

// we use public data fields instead of
// private data fields and public get/set-methods in domain entities
// for possibility of using criterias
export type Criteria<T> = {
  [P in keyof T]?: any;
} & { range?: Range<T> };

export type OrderCriteria<T> = { [P in keyof T]?: 'ASC' | 'DESC' };

// this is interface, not abstract class, because we interested in public methods,
// not in private fields or implementation parts
// Can we use for some entities ORM\DBMS and for another outer web-gateways?
// Probably children: TypeOrmRepository<T>, MongoRepository<T>, XmlRepository<T>
export default interface IRepository<T extends IPersistantEntity> {
  insert(entity: T): Promise<T>;
  findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<T>,
    searchCriteria: Criteria<T>,
  ): Promise<T[]>;
  findById(id: string): Promise<T>;
  findOneByAndCriteria(searchCriteria: Criteria<T>): Promise<T>;
  findByAndCriteria(searchCriteria: Criteria<T>): Promise<T[]>;
  findByOrCriteria(searchCriteria: Criteria<T>): Promise<T[]>;
  update(updateData: Criteria<T>, id: string): Promise<any>;
  delete(deleteCriteria: Criteria<T>): Promise<any>;
  getRelatedEntity(id: string, fieldName: keyof T): Promise<any>;
  getRelatedEntities(id: string, fieldName: keyof T): Promise<any[]>;
}
