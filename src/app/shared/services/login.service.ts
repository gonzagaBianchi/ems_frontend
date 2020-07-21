import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ILoginReturn } from '../../../app/shared/models/login.model';

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
    return this.http.post<any>(`${this.API_URL}/login`, JSON.stringify(params), this.httpOptions).pipe(
      tap(event=>{
        this.saveTokenInLocalStorage(event);
      }),
      catchError(this.handleError)
    );
  }

  saveTokenInLocalStorage(event: ILoginReturn){
    localStorage.setItem(environment.typeAccessToken, event.token)
  }

  handleError(error) {
    console.error('login.HandleError: ', error);
    return throwError(error);
  }
}
