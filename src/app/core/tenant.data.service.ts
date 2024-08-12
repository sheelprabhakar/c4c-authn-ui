import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantDataService {
  private apiUrl = env.API_ROOT + 'v1/api/tenant'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getData(page: number, size: number): Observable<any> {
    //return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
    return this.http.get(`${this.apiUrl}`);
  }
}
