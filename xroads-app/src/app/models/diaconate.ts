import { Key } from "@briebug/ngrx-auto-entity";

export class Diaconate {
  @Key id: string;
  year: number;
  month: number;
  name: string;
  attendeeId: string;
}
