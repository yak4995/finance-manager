// This interface will not inherited in pure form.
// Only interfaces, that extends this, will be implemented in classes
// For each interface, that extends IPersistantEntity and represent some type of persistance entity,
// we should create a creator interface for creating by them new entity objects in needed form
// (but it`s not a stored object, only their RAM presentation.
// You can save persistant entity if you use compatibile repository class)
export default interface IPersistantEntity {
  id: string;
}
