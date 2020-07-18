import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagePersonsService {

  API_URL = `${environment.baseUrlservice}`;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  findPerson(idPerson: any) {
    return this.http.get<any>(`${this.API_URL}/api/persons/{${idPerson}}`)
      .pipe(catchError(this.handleError));
  }

  getPersons() {
    return this.http.get<any>(`${this.API_URL}/api/persons`)
      .pipe(catchError(this.handleError));
  }

  createPerson(params: any) {
  //   {
  //     "username": "user1",
  //     "password": "password",
  //     "name": "person1",
  //     "age": 33,
  //     "family": 0,
  //     "role": "normal"
  // }
    return this.http.post<any>(`${this.API_URL}/api/persons`, JSON.stringify(params), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  editPerson(params: any) {
    return this.http.put(`${this.API_URL}/api/persons/{${params.id}}`, JSON.stringify(params), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deletePerson(idPerson: string) {
    return this.http.delete(`${this.API_URL}/api/persons/{${idPerson}}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error) {
    console.error('manage-persons.HandleError: ', error);
    return throwError(error);
  }
}
