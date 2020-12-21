import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAutoEntityService, IEntityInfo } from "@briebug/ngrx-auto-entity";
import { Observable } from "rxjs";
import { Attendee } from "../models/attendee";

@Injectable()
export class AttendeeService implements IAutoEntityService<Attendee> {
  constructor(private http: HttpClient) {
  }

   // load(entityInfo: IEntityInfo, id: any): Observable<any> {
  //   return this.http.get<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${id}`
  //   );
  // }

  // loadAll(entityInfo: IEntityInfo): Observable<DeaconCalendar[]> {
  //   return this.http.get<DeaconCalendar[]>(
  //     `http://localhost:7071/api/GetDeaconCalendarFunc`
  //   );
  // }

  create(entityInfo: IEntityInfo, entity: Attendee): Observable<Attendee> {
    return this.http.post<Attendee>(

    // ********* for testing
    //
    `http://localhost:7071/api/AddAttendeeFunc`,
    entity
    //
    // **********
        // ********* for production
    //
    // `/api/AddAttendeeFunc`, entity
    //
    // **********

    );
  }

  // update(entityInfo: IEntityInfo, entity: any): Observable<any> {
  //   return this.http.patch<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`,
  //      entity
  //   );
  // }

  // delete(entityInfo: IEntityInfo, entity: any): Observable<any> {
  //   return this.http.delete<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`
  //   ).pipe(map(() => entity));
  // }
}
