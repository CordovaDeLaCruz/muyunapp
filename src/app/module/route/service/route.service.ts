import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RouteService extends BaseService {

  constructor(private _http: HttpClient) {
    super();
  }
    // ROUTES
    // GET
    async getViewRoutes (params: any = {}){
      let queryParams = new HttpParams();
      Object.keys(params).forEach(function (key) {
        if (params[key]) {
          queryParams = queryParams.append(key, params[key]);
        }
      });
      return await this._http
        .get(this.getUrlBase() + '/path',
          {
            params: queryParams,
          }
        ).toPromise()
    }
    // GET DETAIl
  async getRouteDetail(id: number): Promise<any> {
    return this._http
      .get<any>(this.getUrlBase() + '/path/' + id)
      .toPromise()
  }
    // POST
  async newRoute(data: any): Promise<any> {
    let formData = new FormData();
    Object.keys(data).forEach(function (key) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });
    return this._http
      .post<any>(this.getUrlBase() + '/path', formData)
      .toPromise()
  }
    // UPDATE
  async updateRoute(id:any,data: any): Promise<any> {
    let formData = new FormData();
    console.log(data);
    Object.keys(data).forEach(function (key) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });
    return this._http
      .put<any>(this.getUrlBase() + '/path/' + id, formData)
      .toPromise()
  }
    // DELETE
  async deleteRoute(id: number): Promise<any> {
    return this._http
      .delete<any>(this.getUrlBase() + '/path/' + id)
      .toPromise()
  }
}
