import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        // private auth: AuthGuard
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
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
            errorMessage = 'Recurso indisponível, tente novamente mais tarde';
        } else if (error.status == 400 && typeof error.error == 'string') {
            errorMessage = 'Solicitação incorreta, tente novamente mais tarde';
        } else if (error.status == 500 && typeof error.error == 'string') {
            errorMessage = 'Servidor indiponível, tente novamente mais tarde';
        } else if (error.status == 0) {
            errorMessage = 'Servidor indiponível, tente novamente mais tarde';
        } else {
            if (error.error instanceof ErrorEvent) {
                errorMessage = error.error.message;
            } else {
                errorMessage = `${error.error.errors[0].value}`;
            }
        }
        return errorMessage;
    }
}
