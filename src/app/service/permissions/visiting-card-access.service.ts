import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitingCardAccessService {

  constructor(private http:HttpClient) { }

  getAllEmployee() {
    return this.http.get<any>(`${baseUrl}/api/DigitalCard/getAllEmployeeDetail`);
  }

  updateVisitingCardStatus(data:any,employeeCode:string) {
    return this.http.put<any>(`${baseUrl}/api/VisitingCard/updateVisitingCardStatus/`+employeeCode,data);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }
  getAllEmployeeByBranchId(branchId:Number){
    return this.http.get<any>(`${baseUrl}api/DigitalCard/getAllEmployeeDetail/`+branchId);
  }
}
