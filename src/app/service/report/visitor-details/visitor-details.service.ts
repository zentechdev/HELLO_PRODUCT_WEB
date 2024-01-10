import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class VisitorDetailsService {
 
  constructor(private http:HttpClient) { }
 
  checkOut(mobileNumber:string,data:any){
    return this.http.put<any>(`${baseUrl}/api/Visitors/putCheckOutStatus/`+mobileNumber,data)
  }
 
  getAllTodaysVisitor() {
    return this.http.get<any>(`${baseUrl}/api/Visitors/getTodayVisitor/`)
  }
 
  getNonInvitedVisitorByDateRange(data:any){
    return this.http.post<any>(`${baseUrl}/api/Visitors/getVisitorByDateRange/`,data)
  }

}