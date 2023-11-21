import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitorDetailsService {

  constructor(private http:HttpClient) { }

  checkOut(mobileNumber:String,data:any){
    return this.http.put<any>(`${baseUrl}/api/Visitor/putCheckOutStatus/`+mobileNumber,data)
  }

  getAllInvitedVisitor() {
    return this.http.get<any>(`${baseUrl}/api/InviteVisitor/getTodayInviteVisitor`)
  }

  getAllNonInvitedVisitor(siteId:any) {
    return this.http.get<any>(`${baseUrl}/api/Visitors/getTodayVisitor/`+siteId)
    
  }

  getInvitedVisitorByDateRange(data:any){
    return this.http.post<any>(`${baseUrl}/api/Visitor/getInviteVisitorByDateRange/`,data)
  }

  getNonInvitedVisitorByDateRange(data:any){
    return this.http.post<any>(`${baseUrl}/api/Visitors/getVisitorByDateRange/`,data) 
  }

  getTodayInvitedVisitorByBranchId(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/Visitors/getVisitorByDateRange/`+branchId)
  }

  getTodayNonInviteVisitorByBranchId(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/Visitors/getTodayVisitor/`+branchId)
  }

}