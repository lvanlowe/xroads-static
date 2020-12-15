import { Key } from '@briebug/ngrx-auto-entity';
import { Deacon } from './deacon';

export class DeaconCalendar {
  @Key id: number;
  year: number;
  month: number;
  deacon: Deacon;
 }
