import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanDetailsService {

  constructor(private http:HttpClient) { }

  getAllOrganisation(){
   return this.http.get<any>(`${baseUrl}/api/OrganizationDetails/getAllOrganizationDetails`);
  }

  getAllPlan(){
    return this.http.get<any>(`${baseUrl}/api/Plan/getAllPlan`)
  }

  getAllPlanDetails(){
    return this.http.get<any>(`${baseUrl}/api/PlanDetails/getAllPlanDetails`)
  }


  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  postPlanDetails(data:any){
    return this.http.post<any>(`${baseUrl}/api/PlanDetails/postPlanDetails`,data)
  }

  putPlanDetails(data:any,id:Number){
    return this.http.put<any>(`${baseUrl}/api/PlanDetails/putPlanDetails/`+id,data)
  }

  deletePlanDetails(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/PlanDetails/deletePlanDetails/`+id)
  }
}
