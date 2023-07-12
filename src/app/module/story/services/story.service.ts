import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService extends BaseService {

  constructor(private _http: HttpClient) {
    super();
  }

  // TRAVEL
  // GET
  async getStories(params: any = {}) {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    return await this._http
      .get(this.getUrlBase() + '/story',
        {
          params: queryParams,
        }
      ).toPromise()
  }

  // DELETE
  async deleteStory(id: number): Promise<any> {
    return this._http
      .delete<any>(this.getUrlBase() + '/story/cms/' + id)
      .toPromise()
  }

  // GET DETAIL
  async getStoryDetail(id: number): Promise<any> {
    return this._http
      .get<any>(this.getUrlBase() + '/story/' + id)
      .toPromise()
  }

  createStory(storyData: any) {
    return this._http
      .post(this.getUrlBase() + '/story/cms', storyData)
      .pipe(catchError((error) => of(error)));
  }

  updateStory(
    storyId: number,
    storyData: any,
  ) {
    return this._http
    .put<any>(this.getUrlBase() + '/story/cms/' + storyId, storyData)
    .toPromise()
  }
}
