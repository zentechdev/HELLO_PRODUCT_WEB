import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }


  getAllModule() {
    return this.http.get<any>(`${baseUrl}/api/Module/getAllModule`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllPlan(){
    return this.http.get<any>(`${baseUrl}/api/Plan/getAllPlan`)
  }

  postPlan(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Plan/postPlan`, data)
  }

  putPlan(data: any,planId: Number) {
    return this.http.put<any>(`${baseUrl}/api/Plan/putPlan/` + planId, data)
  }

  deletePlan(planId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Plan/deletePlan/`+planId)
  }
}
