import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessageService {
  
  constructor(private http: HttpClient) { }

  getState() {
    return this.http.get<any>(`${baseUrl}/api/State/getAllState`);
  }

  getCity(data:any) {
    return this.http.post<any>(`${baseUrl}/api/City/getAllCityByStateId/`,data);
  }

  getBranch(data:any) {
    return this.http.post<any>(`${baseUrl}/api/Branch/getAllBranchByCityId/`,data);
  }

  getDepartment(data:any) {
    return this.http.post<any>(`${baseUrl}/api/Department/getAllDepartmentByBranchId/`,data);
  }

  getCategories(data:any) {
    return this.http.post<any>(`${baseUrl}/api/Categories/getAllCategoriesByDeptId/`,data);
  }

  getEmployee(data:any) {
    return this.http.post<any>(`${baseUrl}/api/Member/getAllEmployeeByCatId/`,data);
  }

  getAllMessage() {
    return this.http.get<any>(`${baseUrl}/api/GlobalMessage/getAllMessage`);
  }

  getAllMessageById(employeeCode:string) {
    return this.http.get<any>(`${baseUrl}/api/GlobalMessage/getMessageById/`+employeeCode);
  }

  postMessage(data: any) {
    return this.http.post<any>(`${baseUrl}/api/GlobalMessage/postMessage/`, data)
  }

  putMessage(data: any, messageId: Number) {
    return this.http.put<any>(`${baseUrl}/api/GlobalMessage/putMessage/`+ messageId, data)
  }

  deleteMessage(jobId:String){
    return this.http.delete<any>(`${baseUrl}/api/GlobalMessage/deleteMessage/`+jobId)
  }
}
