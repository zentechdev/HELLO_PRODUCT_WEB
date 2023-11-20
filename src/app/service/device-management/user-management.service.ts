import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http:HttpClient) { }

  getAllManageUsers() {
    return this.http.get<any>(`${baseUrl}/api/ManageUsers/getAllManageUsers`);
  }

  getAllBranch() {
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranch`);
  }

  deleteThirdPartyUsers(id:Number) {
    return this.http.delete<any>(`${baseUrl}/api/ManageUsers/deleteThirdPartyUsers/`+id);
  }

  putThirdPartyUsers(data: any, id:any){
    return this.http.put<any>(`${baseUrl}/api/ManageUsers/putThirdPartyUsers/`+id, data);
  }


  postDevice(data: any) {
    return this.http.post<any>(`${baseUrl}/api/ManageUsers/postThirdPartyUsers/`, data)
  }


  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }
}
