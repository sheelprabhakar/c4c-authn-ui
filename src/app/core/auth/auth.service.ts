import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { environment as env } from 'src/environments/environment';
import { constants } from '../common/constants';
import { LoginResponseModel } from './login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = env.API_ROOT + 'api/auth'; // Replace with your API URL

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username: username, password: password, isOtp: false };
    return this.http.post(`${this.apiUrl}/authenticate`, loginData).pipe(
      tap((response) => {
        const loginResponse = new LoginResponseModel(
          response.accessToken,
          response.refreshToken,
          response.tenantId
        );
        this.tokenService.setToken(loginResponse);
      })
    );
  }

  public logout(): void {//Observable<any> {
    this.tokenService.removeToken();
    //return this.http.post(`${this.apiUrl}/logout`, {});
  }

  public get loggedIn(): boolean {
    const token = this.tokenService.getToken();
    return (
      token !== null && !this.tokenService.isTokenExpired(token.accessToken)
    );
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/refreshToken?refreshToken=${refreshToken}`,{}).pipe(
      tap((response) => {
        const loginResponse = new LoginResponseModel(
          response.accessToken,
          response.refreshToken,
          response.tenantId
        );
        this.tokenService.setToken(loginResponse);
      })
    );
  }
}
