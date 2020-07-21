import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    API_URL = `${environment.baseUrlservice}`;

    constructor(private http: HttpClient) { }

    get getTokenActual(): string {
        return localStorage.getItem(environment.typeAccessToken)
    }

    handleError(error) {
        console.error('login.HandleError: ', error);
        return throwError(error);
    }
}
