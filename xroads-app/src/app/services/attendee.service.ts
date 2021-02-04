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

  loadAll(entityInfo: IEntityInfo): Observable<Attendee[]> {
    return this.http.get<Attendee[]>(

    // ********* for testing
    //
    // `http://localhost:7071/api/GetAttendeeFunc`
    //
    // **********
    // ********* for production
    //
    `https://xroads-static.azurewebsites.net/api/GetAttendeeFunc?code=GZ2F5jp1vacHlyND1i4Twz2LyX6JA4H/Re9iW4IfO/HgWkfWu013xg==`
    //
    // **********

    );
  }

  create(entityInfo: IEntityInfo, entity: Attendee): Observable<Attendee> {
    return this.http.post<Attendee>(

    // ********* for testing
    //
    // `http://localhost:7071/api/AddAttendeeFunc`,
    // entity
    //
    // **********
    // ********* for production
    //
    `https://xroads-static.azurewebsites.net/api/AddAttendeeFunc?code=Mny1wa0ZTxUV3uJtcDL6RG4TxrShEY1YVZVD4eonWAvRv31F4l6Guw==`, entity
    //
    // **********

    );
  }

  update(entityInfo: IEntityInfo, entity: Attendee): Observable<Attendee> {
    return this.http.post<Attendee>(
      // `http://localhost:7071/api/AddAttendeeFunc`,
      // entity
      //
      // **********
      // ********* for production
      //
      `https://xroads-static.azurewebsites.net/api/AddAttendeeFunc?code=Mny1wa0ZTxUV3uJtcDL6RG4TxrShEY1YVZVD4eonWAvRv31F4l6Guw==`, entity
      //
      // **********

      );
  }

  // delete(entityInfo: IEntityInfo, entity: any): Observable<any> {
  //   return this.http.delete<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`
  //   ).pipe(map(() => entity));
  // }
}
