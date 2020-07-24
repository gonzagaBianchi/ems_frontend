import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        private auth: AuthService,
        private route: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Authorization': `Bearer ${this.auth.getTokenActual}`,
            },
        });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(this.handleRequestError(error));
            })
        );
    }

    private handleRequestError(error: HttpErrorResponse) {
        let errorMessage = '';
        console.error('ERRO: ', error);
        if (error.status == 404) {
            errorMessage = 'Service Unavailable';
        } else if (error.status == 400) {
            errorMessage = 'Service Unavailable';
        } else if (error.status == 500) {
            errorMessage = 'Service Unavailable';
        } else if (error.status == 0) {
            errorMessage = 'Service Unavailable';
        } else if (error.status == 403) {
            // this.route.navigateByUrl("/login");
        }
        return errorMessage;
    }
}
