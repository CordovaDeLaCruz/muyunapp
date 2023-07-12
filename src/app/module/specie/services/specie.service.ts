import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecieService extends BaseService {

  constructor(private _http: HttpClient) {
    super();
  }

  // SPECIE
    // GET
  async getViewSpecie (params: any = {}){
    let queryParams = new HttpParams();

    if (params.limit) {
      queryParams = queryParams.append('limit', params.limit);
    }
    if (params.page) {
      queryParams = queryParams.append('page', params.page);
    } else {
      queryParams = queryParams.append('page', 1);
    }
    if (params.prevalence_specie) {
      queryParams = queryParams.append('prevalence_specie', params.prevalence_specie);
    }
    if (params.class_specie) {
      queryParams = queryParams.append('class_specie', params.class_specie);
    }
    if (params.filter) {
      queryParams = queryParams.append('filter', params.filter);
    }
    if (params.type_filter) {
      queryParams = queryParams.append('type_filter', params.type_filter);
    }

    return await this._http
      .get(this.getUrlBase() + '/species',
        {
          params: queryParams,
        }
      ).toPromise()
  }
    // GET DETAIl
  async getSpecieDetail(id: number): Promise<any> {
    return this._http
      .get<any>(this.getUrlBase() + '/species/' + id)
      .toPromise()
  }

    // POST
  async newSpecies(data: any): Promise<any> {
    let formData = new FormData();
    Object.keys(data).forEach(function (key) {
      if (data[key]) {
        if (key === 'prevalences' || key === 'habitatIcons' || key === 'alimentIcons' || key === 'colors' ) {
          data[key].forEach(element => {
            formData.append(key, JSON.stringify(element));
          });
        } else {
          formData.append(key, data[key]);
        }
      }
      console.log(formData)
    });
    return this._http
      .post<any>(this.getUrlBase() + '/species', formData)
      .toPromise()
  }
  async updateSpecies(id:any,data: any): Promise<any> {
    let formData = new FormData();
    console.log(data);
    Object.keys(data).forEach(function (key) {
      if (data[key] && key !== 'taxon_id') {
        if (key === 'prevalences' || key === 'habitatIcons' || key === 'alimentIcons' || key === 'colors' ) {
          data[key].forEach(element => {
            formData.append(key, JSON.stringify(element));
          });
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    return this._http
      .put<any>(this.getUrlBase() + '/species/' + id, formData)
      .toPromise()
  }
    // DELETE
  async deleteSpecie(id: number): Promise<any> {
    return this._http
      .delete<any>(this.getUrlBase() + '/species/' + id)
      .toPromise()
  }

  // RANK
  async getViewRank (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-rank',)
      .toPromise()
  }

  // KINGDOM
  async getViewKingdom (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-kingdom',)
      .toPromise()
  }

  // PHYLUM
  async getViewPhylum (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-phylum',)
      .toPromise()
  }

  // ORDER
  async getViewOrder (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-order',)
      .toPromise()
  }

  // FAMILY
  async getViewFamily (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-family',)
      .toPromise()
  }

  // GENUS
  async getViewGenus (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-genus',)
      .toPromise()
  }

  // HABITAT-ICON
  async getViewHabitatIcon (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-habitat-icon',)
      .toPromise()
  }

  // ALIMENT-ICON
  async getViewAlimentIcon (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-aliment-icon',)
      .toPromise()
  }

  // TYPE-ALIMENT
  async getViewTypeAliment (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-type-aliment',)
      .toPromise()
  }

  // COLOR
  async getViewColor (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-color',)
      .toPromise()
  }

  // size-especie
  async getViewSizeSpecie (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-size-specie',)
      .toPromise()
  }

  // CLASS
  async getViewClass (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-class',)
      .toPromise()
  }

  // PREVALENCE
  async getViewPrevalence (){
    return await this._http
      .get(this.getUrlBase() + '/species/list-prevalence',)
      .toPromise()
  }


}
