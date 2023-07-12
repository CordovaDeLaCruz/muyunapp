import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TravelService extends BaseService {

  private specieDetailId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  specieDetailId$ = this.specieDetailId.asObservable();

  private obsertavionIdentifyFlag: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  obsertavionIdentifyFlag$ = this.obsertavionIdentifyFlag.asObservable();

  constructor(private _http: HttpClient) {
    super();
  }
  // TRAVEL
  // GET
  async getViewTravel(params: any = {}) {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    return await this._http
      .get(this.getUrlBase() + '/travel',
        {
          params: queryParams,
        }
      ).toPromise()
  }

  // DELETE
  async deleteTravel(id: number): Promise<any> {
    return this._http
      .delete<any>(this.getUrlBase() + '/travel/' + id)
      .toPromise()
  }

  //TRAVEL OBSERVATIONS
  // GET TRAVEL DETAIL
  async getTravelDetail(id: number): Promise<any> {
    return this._http
      .get<any>(this.getUrlBase() + '/travel/' + id)
      .toPromise()
  }

  // GET TRAVEL OBSERVATIONS
  async getTravelObservations(id: number, params: any = {}) {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    return await this._http
      .get(this.getUrlBase() + '/travel/observations/' + id,
        {
          params: queryParams,
        }
      ).toPromise()
  }

  // DELETE TRAVEL OBSERVATIONS
  async deleteTravelObservation(id: number): Promise<any> {
    return this._http
      .delete<any>(this.getUrlBase() + '/travel/observation/' + id)
      .toPromise()
  }

  // GET TRAVEL OBSERVATIONS DETAIL
  async getTravelObservationDetail(id: number): Promise<any> {
    return this._http
      .get<any>(this.getUrlBase() + '/travel/observation/' + id)
      .toPromise()
  }

  getTravelObservationDetail1(id: number): Observable<any>{
    return this._http
      .get<any>(this.getUrlBase() + '/travel/observation/' + id)
      .pipe(
        retry(1)
      )
  }

  // SPECIES
  // GET
  async getModalSpecie(params: any = {}) {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    return await this._http
      .get(this.getUrlBase() + '/species',
        {
          params: queryParams,
        }
      ).toPromise()
  }

  async updateSpecies(id:any,data: any): Promise<any> {
    const body = {
      specieId: data
    }
    return this._http
      .put<any>(this.getUrlBase() + '/travel/observation/cms/' + id, body)
      .toPromise()
  }

  setspecieDetailId(specieDetailId: number){
    this.specieDetailId.next(specieDetailId);
  }

  setObsertavionIdentify(test: any){
    this.obsertavionIdentifyFlag.next(test);
  }

}
