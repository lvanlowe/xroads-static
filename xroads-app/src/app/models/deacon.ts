import { Key } from '@briebug/ngrx-auto-entity';

export class Deacon {
  @Key id: number;
  name: string;
  year: number;
  month: number;
  deaconId: number;
 }
