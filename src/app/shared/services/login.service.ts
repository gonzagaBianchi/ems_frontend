import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = `${environment.baseUrlservice}`;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  loginUser(params: string) {
    console.log("params:", params)
    return this.http.post<any>(`${this.API_URL}/login`, { body: JSON.stringify(params) }, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    console.error('login.HandleError: ', error);
    return throwError(error);
  }
}
