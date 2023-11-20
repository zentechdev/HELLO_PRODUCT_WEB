import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserMappingService {

  constructor(private http:HttpClient) { }

  getDepartment(){
   return this.http.get<any>(`${baseUrl}/api/UserMapping/getDepartment`)
  }

  getAllBranch() {
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranch`);
  }

  getEmployee(department:string){
   return this.http.get<any>(`${baseUrl}/api/UserMapping/getEmployee/`+department)
  }

  getMenuList(){
    return this.http.get<any>(`${baseUrl}/api/UserMapping/getMenuListId`)
  }

  getRole() {
    return this.http.get<any>(`${baseUrl}/api/role/getAllRole`);
  }

  getActions() {
    return this.http.get<any>(`${baseUrl}/api/Actions/getAllActions`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllUserMapping() {
    return this.http.get<any>(`${baseUrl}/api/UserMapping/getAllUserMapping`);
  }

  postUserMapping(data:any) {
    return this.http.post<any>(`${baseUrl}/api/UserMapping/postUserMapping/`,data);
  }

  deleteUserMapping(userMappingId:Number) {
    return this.http.delete<any>(`${baseUrl}/api/UserMapping/deleteUserMapping/`+userMappingId);
  }

  putUserMapping(data:any,userMappingId:Number) {
    return this.http.put<any>(`${baseUrl}/api/UserMapping/putUserMapping/`+userMappingId,data);
  }



}
