import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { TokenEnum } from '../dto/token.enum';
import { SignInDto, SignInResponseDto } from '../dto/authentication.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private baseEndPoint = '/auth';

  constructor(private _http: HttpClient, public jwtHelper: JwtHelperService) {
    super();
  }

  signInWithPassword(data: SignInDto): Promise<SignInResponseDto> {
    console.log(data);
    return this._http
      .post<SignInResponseDto>(
        this.getUrlBase() + this.baseEndPoint + '/sign-in',
        data
      )
      .toPromise();
  }
  storeToken(access_token: string) {
    return new Promise((resolve, reject) => {
      localStorage.setItem(TokenEnum.ACCESS_TOKEN, access_token);
      resolve(true);
    });
  }

  getToken() {
    return localStorage.getItem(TokenEnum.ACCESS_TOKEN);
  }
  removeSession() {
    localStorage.clear();
  }
  isAuthenticated(): boolean {
    let isAuth = false;
    const token = localStorage.getItem(TokenEnum.ACCESS_TOKEN);
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        isAuth = true;
      }
    }

    return isAuth;
  }
  forgotPassword(data: any) {
    return this._http.post<any>(
      this.getUrlBase() + this.baseEndPoint + '/forgot-password',
      data
    );
  }
  changePassword(data: any): Promise<any> {
    return this._http
      .patch<any>(
        this.getUrlBase() + this.baseEndPoint + '/change-password',
        data
      )
      .toPromise();
  }
}
