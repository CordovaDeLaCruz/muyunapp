import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, map, mergeMap, takeWhile, tap } from 'rxjs/operators';
import { TokenEnum } from 'src/app/module/auth/dto/token.enum';
import { AuthStateModel } from 'src/app/store/auth/auth.model';
import { AuthState } from 'src/app/store/auth/auth.state';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  @Select(AuthState.getToken) authData: Observable<AuthStateModel>

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem(TokenEnum.ACCESS_TOKEN);

    let headers = null;

    if (req.body instanceof FormData) {
      headers = {
        setHeaders: {
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        // withCredentials: true,
      };
    } else {
      headers = {
        setHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        // withCredentials: true,
      };
    }
    if (token) {
      headers = {
        ...headers,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    // Authorization: token ? `Bearer ${token}` : null,

    // console.log('Request', req);
    // console.log('Request Headers', req.headers);

    // console.log('HEADERS', headers);

    return next.handle(req.clone(headers));

    // return this.authData.pipe(
    //   tap({
    //     next: x => console.log(x)
    //   }),
    //   first(),
    //   map(x => x.token),
    //   mergeMap(token => {
    //     console.log("Req",req);
    //     const authReq = !!token ? req.clone({
    //       setHeaders: { Authorization: 'Bearer ' + token },
    //       withCredentials: false
    //       // withCredentials: true
    //     }) : req;
    //     return next.handle(authReq);
    //   }),
    // );
  }
}
