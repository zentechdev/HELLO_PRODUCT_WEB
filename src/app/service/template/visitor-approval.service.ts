import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitorApprovalService {

  constructor(private http:HttpClient) { }

  updateVisitorStatus(data:any,mobileNumber:string){
    return this.http.put<any>(`${baseUrl}/api/Visitors/updateVisitorStatus/`+mobileNumber,data)
  }
}
