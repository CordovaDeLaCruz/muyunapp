import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UrlService {
  private previousUrlSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public previousUrl$: Observable<string> = this.previousUrlSubject$.asObservable();

  constructor() {}

  setPreviousUrl(previousUrl: string) {
    this.previousUrlSubject$.next(previousUrl);
  }
}
