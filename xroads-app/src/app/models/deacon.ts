import { Key } from '@briebug/ngrx-auto-entity';

export class Deacon {
  @Key id: number;
  name: string;
  email: string;
  phone: string;
 }
