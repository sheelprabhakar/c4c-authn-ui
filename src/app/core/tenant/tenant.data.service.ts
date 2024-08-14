import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { TenantData } from './tenant.data.model';
import { PagedResponse } from '../common/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class TenantDataService {
  private apiUrl = env.API_ROOT + 'v1/api/tenant'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getData<T>(page: number, size: number): Observable<PagedResponse<T>> {
    //return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
    return this.http.get<PagedResponse<T>>(`${this.apiUrl}`);
  }
}
