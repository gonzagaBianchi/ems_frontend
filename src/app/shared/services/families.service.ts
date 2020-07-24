import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service';
import { IFamily } from '../models/family.model';

@Injectable({
  providedIn: 'root'
})
export class FamiliesService {
  API_URL = `${environment.baseUrlservice}`;

  constructor(
    private http: HttpClient,
    private auth: AuthService,

    ) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    })
  };

  findFamily(id: any) {
    return this.http.get<any>(`${this.API_URL}/families/${id} `, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getFamilies() {
    return this.http.get<IFamily[]>(`${this.API_URL}/families`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  createFamily(params: any) {
    return this.http.post<any>(`${this.API_URL}/families`, JSON.stringify(params), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    console.error('manage-persons.HandleError: ', error);
    return throwError(error);
  }
}
