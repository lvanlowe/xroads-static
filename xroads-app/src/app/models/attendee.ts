import { Key } from '@briebug/ngrx-auto-entity';

export class Attendee {
  @Key id: string;
  firstName: string;
  lastName: string;
  email: string;
  cell: string;
  isDeacon: boolean;
}
