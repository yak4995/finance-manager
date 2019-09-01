import { Roles } from './roles.enum';

export interface IUser {
  getEmail(): string;
  getProfileImageUrl(): string;
  getRoles(): Roles[];
  isActive(): boolean;
  setEmail(email: string): this;
  setProfileImageUrl(profileImageUrl: string): this;
  setRoles(roles: Roles[]): this;
  setActive(isActive: boolean): this;
}
