import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private isLoginTimeErrorLaunchedSubject$: BehaviorSubject<boolean>;
  private isLoginTimeErrorLaunched = false;

  constructor() {
    this.isLoginTimeErrorLaunchedSubject$ = new BehaviorSubject(
      this.isLoginTimeErrorLaunched
    );

    this.isLoginTimeErrorLaunchedSubject$
      .pipe(
        tap({
          next: (x) => console.log('ErrorLaunched', x),
        })
      )
      .subscribe((value) => {
        this.isLoginTimeErrorLaunched = value;
      });
  }

  setLoginTimeError(errorLaunched: boolean) {
    this.isLoginTimeErrorLaunchedSubject$.next(errorLaunched);
  }

  getLoginTimeError() {
    return this.isLoginTimeErrorLaunchedSubject$.asObservable();
  }
}
