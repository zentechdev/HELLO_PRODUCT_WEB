import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data:any){
    return this.http.post<any>(`${baseUrl}/api/Auth/login/`,data);
  }

  putPassword(data:any,mobileNumber:string){
    return this.http.put<any>(`${baseUrl}/api/Password/putPassword/`+mobileNumber,data);
  }

  getStatusByMobileNumber(mobileNumber:string){
   return this.http.get<any>(`${baseUrl}/api/ManageUsers/getEmployeeStatus/`+mobileNumber)
  }
  
}
