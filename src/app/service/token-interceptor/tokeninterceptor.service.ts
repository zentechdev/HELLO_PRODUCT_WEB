import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageEncryptionService } from '../encryption/storage-encryption.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {
  token: any;

  constructor(private router: Router, private service: StorageEncryptionService, public dialog: MatDialog) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //get the jwt token which are present in the local storage
    
    // const token = JSON.parse(String(localStorage.getItem('token')));

    // if(token !=null){
    //   this.token = this.service.decryptData(token);
    // }
 
    let tokenheader = req.clone({
      setHeaders: {
        Authorization: "bearer " + this.token
      }
    })
    return next.handle(tokenheader)
      .pipe(
        catchError(errorData => {
          if (errorData.status == 401) {
            this.openDialog().then(navigate => {
              if (navigate) {
                // this.alertify.success("Logout Successfull!!");
                localStorage.removeItem('employeeName');
                localStorage.removeItem('employeeCode');
                localStorage.removeItem('emailId');
                localStorage.removeItem('dateOfBirth');
                localStorage.removeItem('mobileNumber');
                localStorage.removeItem('department');
                localStorage.removeItem('employeeName');
                localStorage.removeItem('image');
                localStorage.removeItem('token');
                localStorage.removeItem('roleName');
                localStorage.removeItem('actionName');
                localStorage.removeItem('branchList');
                this.router.navigate(['/'])
              }
            });
          }
          return throwError(errorData);
        })
      );
  }

  openDialog() {
    return new Promise(resolve => {
      if (confirm("Token is expired")) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}
