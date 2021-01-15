import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAutoEntityService, IEntityInfo } from "@briebug/ngrx-auto-entity";
import { Observable } from "rxjs";
import { Diaconate } from "../models/diaconate";

@Injectable()
export class DiaconateService implements IAutoEntityService<Diaconate> {
  constructor(private http: HttpClient) {
  }

   // load(entityInfo: IEntityInfo, id: any): Observable<any> {
  //   return this.http.get<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${id}`
  //   );
  // }

  // loadAll(entityInfo: IEntityInfo): Observable<Attendee[]> {
  //   return this.http.get<Attendee[]>(

  //   // ********* for testing
  //   //
  //   `http://localhost:7071/api/GetAttendeeFunc`
  //   //
  //   // **********
  //   // ********* for production
  //   //
  //   // `/api/GetAttendeeFunc`
  //   //
  //   // **********

  //   );
  // }

  create(entityInfo: IEntityInfo, entity: Diaconate): Observable<Diaconate> {
    return this.http.post<Diaconate>(

    // ********* for testing
    //
    `http://localhost:7071/api/SaveDiaconateFunc`,
    entity
    //
    // **********
    // ********* for production
    //
    // `/api/SaveDiaconateFunc`, entity
    //
    // **********

    );
  }

  // update(entityInfo: IEntityInfo, entity: Attendee): Observable<Attendee> {
  //   return this.http.post<Attendee>(
  //     `http://localhost:7071/api/AddAttendeeFunc`,
  //     entity
  //   );
  // }

  // delete(entityInfo: IEntityInfo, entity: any): Observable<any> {
  //   return this.http.delete<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`
  //   ).pipe(map(() => entity));
  // }
}
