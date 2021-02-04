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

  loadAll(entityInfo: IEntityInfo): Observable<Diaconate[]> {
    return this.http.get<Diaconate[]>(

    // ********* for testing
    //
    // `http://localhost:7071/api/GetDiaconateFunc`
    //
    // **********
    // ********* for production
    //
    `https://xroads-static.azurewebsites.net/api/GetDiaconateFunc?code=xEXnW0Ew0zhtGjc03MEr0fNbI6ahOpVzl7WYDXdrypd5tsbtEjfaVA==`
    //
    // **********

    );
  }

  create(entityInfo: IEntityInfo, entity: Diaconate): Observable<Diaconate> {
    return this.http.post<Diaconate>(

    // ********* for testing
    //
    // `http://localhost:7071/api/SaveDiaconateFunc`,
    // entity
    //
    // **********
    // ********* for production
    //
    `https://xroads-static.azurewebsites.net/api/SaveDiaconateFunc?code=a5024Ixc7zUcgu0wanQLzOw17/OiZrQFyQYxiLLtHhaf9bcsvLxr9w==`, entity
    //
    // **********

    );
  }

  update(entityInfo: IEntityInfo, entity: Diaconate): Observable<Diaconate> {
    return this.http.post<Diaconate>(

    // ********* for testing
    //
    // `http://localhost:7071/api/SaveDiaconateFunc`,
    // entity
    //
    // **********
    // ********* for production
    //
    `https://xroads-static.azurewebsites.net/api/SaveDiaconateFunc?code=a5024Ixc7zUcgu0wanQLzOw17/OiZrQFyQYxiLLtHhaf9bcsvLxr9w==`, entity
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
