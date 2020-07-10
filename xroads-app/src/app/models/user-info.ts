import { Key } from '@briebug/ngrx-auto-entity';

export class UserInfo {
  identityProvider: string;
  @Key userId: string;
  userDetails: string;
  userRoles: string[];
}
