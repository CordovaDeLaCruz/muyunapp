import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map, catchError, retry, pluck } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private baseEndPoint = '/users';

  constructor(private _http: HttpClient) {
    super();
  }

  getUsers(params: any = {}) {
    let queryParams = new HttpParams();

    if (params.page) {
      queryParams = queryParams.append('page', params.page);
    } else {
      queryParams = queryParams.append('page', 1);
    }
    if (params.limit) {
      queryParams = queryParams.append('limit', params.limit);
    }

    if (params.text) {
      queryParams = queryParams.append('text', params.text);
    }

    if (params.role) {
      queryParams = queryParams.append('role', params.role);
    }


    return this._http
      .get(this.getUrlBase() + this.baseEndPoint, {
        params: queryParams,
      })
      .pipe(
        tap({
          next: (data: any) => console.log(data),
          error: (error: any) => console.log(error),
        }),
        retry(3),
        catchError((error) => of(error)),
        pluck('data')
      );
  }

  getDetailedUser(userId: number) {
    return this._http
      .get(this.getUrlBase() + this.baseEndPoint + `/${userId}`)
      .pipe(
        tap({
          next: (data: any) => console.log(data),
          error: (error: any) => console.log(error),
        }),
        retry(3),
        catchError((error) => of(error)),
        pluck('data')
      );
  }

  createUser(userData: any, image = null) {
    let formData = new FormData();

    if (image) formData.append('photoUrl', image);
    if (userData.role) formData.append('role', userData.role);
    if (userData.code) formData.append('code', userData.code);
    if (userData.firstName) formData.append('firstName', userData.firstName);
    if (userData.lastName) formData.append('lastName', userData.lastName);
    if (userData.documentType)
      formData.append('documentType', userData.documentType);
    if (userData.documentNumber)
      formData.append('documentNumber', userData.documentNumber);
    if (userData.email) formData.append('email', userData.email);
    if (userData.username) formData.append('username', userData.username);
    if (userData.password) formData.append('password', userData.password);
    if (userData.experience) formData.append('experience', userData.experience);
    if (userData.description)
      formData.append('description', userData.description);

    return this._http
      .post(this.getUrlBase() + this.baseEndPoint, formData)
      .pipe(catchError((error) => of(error)));
  }

  updateUser(
    userId: number,
    userData: any,
    image = null,
    must_empty_photo = false
  ) {
    let formData = new FormData();

    if (image) formData.append('photoUrl', image);
    if (must_empty_photo) formData.append('photoUrl', '');
    if (userData.role) formData.append('role', userData.role);
    if (userData.code) formData.append('code', userData.code);
    if (userData.firstName) formData.append('firstName', userData.firstName);
    if (userData.lastName) formData.append('lastName', userData.lastName);
    if (userData.documentType)
      formData.append('documentType', userData.documentType);
    if (userData.documentNumber)
      formData.append('documentNumber', userData.documentNumber);
    if (userData.email) formData.append('email', userData.email);
    if (userData.username) formData.append('username', userData.username);
    if (userData.password) formData.append('password', userData.password);
    if (userData.experience) formData.append('experience', userData.experience);
    if (userData.description)
      formData.append('description', userData.description);

    return this._http
      .put<any>(
        this.getUrlBase() + this.baseEndPoint + `/normal/${userId}`,
        formData
      )
      .pipe(catchError((error) => of(error)));
  }

  deleteUser(userId: number) {
    return this._http
      .delete(this.getUrlBase() + this.baseEndPoint + `/${userId}`)
      .pipe(
        retry(3),
        catchError((error) => of(error))
      );
  }
}
