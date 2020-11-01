import IPersistantEntity from './persistantEntity';
import { Criteria } from './repository.interface';

// base interface for all persistance entity creators
export default interface EntityCreator<T extends IPersistantEntity> {
  getInstance(fields: Criteria<T>): T;
}
