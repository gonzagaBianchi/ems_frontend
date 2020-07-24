import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagePersonsService {

  API_URL = `${environment.baseUrlservice}`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    })
  };

  findPerson(idPerson: any) {
    return this.http.get<any>(`${this.API_URL}persons/{${idPerson}}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getPersons() {
    return this.http.get<any>(`${this.API_URL}/persons`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  createPerson(params: any) {
    return this.http.post<any>(`${this.API_URL}/persons`, JSON.stringify(params), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  editPerson(params: any) {
    return this.http.put(`${this.API_URL}/persons/${params.id}`, JSON.stringify(params.family), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deletePerson(idPerson: string) {
    return this.http.delete(`${this.API_URL}/persons/${idPerson}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error) {
    console.error('manage-persons.HandleError: ', error);
    return throwError(error);
  }
}
