export class LoginResponseModel {
  accessToken: string;
  refreshToken: string;
  tenantId: string;

  constructor(accessToken: string, refreshToken: string, tenantId: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.tenantId = tenantId;
  }
}
