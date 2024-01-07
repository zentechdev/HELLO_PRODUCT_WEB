import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrCodePassService {

  constructor(private http:HttpClient) { }

  getVisitorByMobileNumber(mobileNumber:string){
    return this.http.get<any>(`${baseUrl}/api/Visitors/getVisitorByMobileNumber/`+ mobileNumber)
  }
}
