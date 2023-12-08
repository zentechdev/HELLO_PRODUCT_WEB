import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  constructor(private http:HttpClient) { }


  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllUnit() {
    return this.http.get<any>(`${baseUrl}/api/Unit/getAllUnit`);
  }

  getSiteDetails(){
    return this.http.get<any>(`${baseUrl}/api/SiteDetails/getAllSiteDetails`)
  }

  getAllRole(){
    return this.http.get<any>(`${baseUrl}/api/Role/getAllRole`)
  }

  getAllStatus(){
    return this.http.get<any>(`${baseUrl}/api/Status/getAllStatus`)
  }

  getAllMembers(){
    return this.http.get<any>(`${baseUrl}/api/ManageUsers/getAllMembers`)
  }
  
  postUsers(data: any) {
    return this.http.post<any>(`${baseUrl}/api/ManageUsers/postUsers`, data)
  }

  putUsers(data: any, id: Number) {
    return this.http.put<any>(`${baseUrl}/api/ManageUsers/putUsers/` + id, data)
  }

  deleteUsers(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/ManageUsers/deleteUsers/`+id)
  }
}
