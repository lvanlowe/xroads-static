import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';
import { Deacon } from '../models/deacon';
import { DeaconCalendar } from '../models/deacon-calendar';

@Injectable()
export class DeaconCalendarService implements IAutoEntityService<DeaconCalendar> {
  constructor(private http: HttpClient) {
  }

  // load(entityInfo: IEntityInfo, id: any): Observable<any> {
  //   return this.http.get<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${id}`
  //   );
  // }

  loadAll(entityInfo: IEntityInfo): Observable<DeaconCalendar[]> {
    return this.http.get<DeaconCalendar[]>(
      `https://xroads-static.azurewebsites.net/api/GetDeaconCalendarFunc?code=EBhnNg8qEUUd5xRehotbR7F1qsbkaaO58JEpCaZ39VpwNf/lJdN1QQ==`
    );
  }

  // create(entityInfo: IEntityInfo, entity: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}`,
  //     entity
  //   );
  // }

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
