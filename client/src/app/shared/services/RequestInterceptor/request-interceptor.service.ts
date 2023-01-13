import { Injectable } from '@angular/core';
import { AlertType } from '../../types/enums/alert.enum';
import { HttpCodeEnum } from '../../types/enums/response-status-enum';
import { AlertService } from '../alert/alert.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService {

  constructor(private alertService: AlertService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== HttpCodeEnum.UNPROCESSABLE_ENTITY){
            this.handleErrorMessage(err);
          } 
        }
        return throwError(err);
      })
    );
  }

  handleErrorMessage(err: any): void {
    if (err.error && err.status !== HttpCodeEnum.INTERNAL_SERVER_ERROR) {
      err.error.message ?
      this.alertService.onShowAlert(err.error.message, AlertType.warning) :
      this.alertService.onShowAlert(err.message, AlertType.warning);
    }
  }
}
