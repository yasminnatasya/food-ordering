import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Correct path to environment
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl; // Make sure this is correct

  constructor(private http: HttpClient) {}

  getTypeRequest(endpoint: string) {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get(url).pipe(
      map(response => response)
    );
  }

  deleteTypeRequest(endpoint: string) {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete(url).pipe(
      map(response => response)
    );
  }
  

  postTypeRequest(endpoint: string, payload: any) {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post(url, payload).pipe(
      map(response => response)
    );
  }

  putTypeRequest(endpoint: string, payload: any) {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put(url, payload).pipe(
      map(response => response)
    );
  }
}
