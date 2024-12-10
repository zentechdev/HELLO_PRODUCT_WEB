import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CheckInService {
  data: any;
  constructor(
    private http: HttpClient
  ) { }

  checkIn(data: any){
    return this.http.post(`${baseUrl}/api/Visitors/postVisitor`, data);
  }

  getQRData() {
    return this.data;
  }

  checkOut(mobile: any, data?:any){
    return this.http.put(`${baseUrl}/api/Visitors/putCheckOutStatus/${mobile}`, data);
  }

  getVisitorByMobileNo(mobileNo: any){
    return this.http.get(`${baseUrl}/api/Visitors/getVisitorByMobileNumber/${mobileNo}`);
  }
}
