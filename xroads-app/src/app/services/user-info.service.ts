import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';

import { UserInfo } from '../models/user-info';
import { environment } from '../../environments/environment';

@Injectable() // Must be provided via custom Model -> Service mapping!
export class UserInfoService implements IAutoEntityService<UserInfo> {
  constructor(private http: HttpClient) {
}

loadAll(entityInfo: IEntityInfo, id: number): Observable<UserInfo[]> {
    const userInfo = [{
      identityProvider: 'facebook',
      userDetails: 'Van',
      userId: 'b6c7c7ed83484c0c9b0c43d0c5302b20',
      userRoles: ['usher', 'deacon', 'anonymous', 'authenticated'] }];

    return of(userInfo);
// return this.http.get<UserInfo>(
// 	`${environment.rootUrl}/customers/${id}`
// );
}

	// loadAll(entityInfo: IEntityInfo): Observable<Customer[]> {
	// 	return this.http.get<Customer[]>(
	// 		`${environment.rootUrl}/customers`
	// 	);
	// }

	// create(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
	// 	return this.http.post<Customer>(
	// 		`${environment.rootUrl}/customers`,
	// 		entity
	// 	);
	// }

	// update(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
	// 	return this.http.patch<Customer>(
	// 		`${environment.rootUrl}/customers/${entity.id}`,
	// 		entity
	// 	);
	// }

	// delete(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
	// 	return this.http.delete<Customer>(
	// 		`${environment.rootUrl}/customers/${entity.id}`
	// 	).pipe(map(() => entity));
	// }
}
