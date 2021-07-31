import { Injectable} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { DateServiceService } from './Services/date-service.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private service: DateServiceService, private router: Router) { }

  intercept(req: any, next: any) {
    let token = this.service.getStorageToken();
    let tokenizedReq: any;
    if (token) {
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    } else {
      tokenizedReq = req.clone();
    }

    return next.handle(tokenizedReq).pipe(catchError(this.handleError))
  }

  handleError(error: { error: { message: any; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
        console.log(errorMessage);
    } else {
        // server-side error
           errorMessage = `Error status ${error.status} Error message: ${error.message}`;
    }  console.log(errorMessage);
    return throwError(errorMessage);
}

}
