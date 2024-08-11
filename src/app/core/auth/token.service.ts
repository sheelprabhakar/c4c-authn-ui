import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { constants } from '../common/constants'
import { LoginResponseModel } from './login-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtHelper = new JwtHelperService();

  constructor() { }

  // Decode the JWT token
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  // Get the token from local storage
  getToken(): LoginResponseModel | null {
    const data=  localStorage.getItem(constants.LOGIN_RESPONSE);
    if(data){
      const object = JSON.parse(data);
      return new LoginResponseModel(object.accessToken, object.refreshToken, object.tenantId);
    }else{
      return null;
    }
  }

  // Set the token from local storage
  setToken(data: LoginResponseModel): void {
    localStorage.setItem(constants.LOGIN_RESPONSE, JSON.stringify(data));
  }

  // Remove the token from local storage
  removeToken(): void {
    localStorage.removeItem(constants.LOGIN_RESPONSE);
  }
}
