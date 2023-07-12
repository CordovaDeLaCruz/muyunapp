import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export abstract class BaseService {
  protected getUrlBase(): string {
     //return "/api/v1"
    return environment.BASE_API;
  }
}
