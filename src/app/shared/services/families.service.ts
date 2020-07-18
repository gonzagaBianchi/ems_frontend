import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamiliesService {
  API_URL = `${environment.baseUrlservice}`;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  findFamily(id: any) {
    return this.http.get<any>(`${this.API_URL}/api/families/{${id}}`)
      .pipe(catchError(this.handleError));
  }

  getFamilies() {
    return this.http.get<any>(`${this.API_URL}/api/families`)
      .pipe(catchError(this.handleError));
  }

  createFamily(params: any) {
    return this.http.post<any>(`${this.API_URL}/api/families`, JSON.stringify(params), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    console.error('manage-persons.HandleError: ', error);
    return throwError(error);
  }
}
