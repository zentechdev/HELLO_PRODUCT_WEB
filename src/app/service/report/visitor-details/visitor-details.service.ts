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

  getAllNonInvitedVisitor() {
    return this.http.get<any>(`${baseUrl}/api/Visitor/getTodayVisitor`)
    
  }

  getInvitedVisitorByDateRange(data:any){
    return this.http.post<any>(`${baseUrl}/api/Visitor/getInviteVisitorByDateRange/`,data)
  }

  getNonInvitedVisitorByDateRange(data:any){
    return this.http.post<any>(`${baseUrl}/api/Visitor/getVisitorByDateRange/`,data) 
  }

  getTodayInvitedVisitorByBranchId(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getTodayInvitedVisitorByBranchId/`+branchId)
  }

  getTodayNonInviteVisitorByBranchId(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/Visitor/getTodatVisitor/`+branchId)
  }

}