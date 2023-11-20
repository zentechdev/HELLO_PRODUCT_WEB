import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }


  getRole() {
    return this.http.get<any>(`${baseUrl}/api/role/getAllRole`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getMenuList(){
    return this.http.get<any>(`${baseUrl}/api/role/getMenuListId`)
  }

  postRole(data: any) {
    return this.http.post<any>(`${baseUrl}/api/role/postRole/`, data)
  }

  putRole(data: any, roleId: Number) {
    return this.http.put<any>(`${baseUrl}/api/role/putRole/` + roleId, data)
  }

  deleteRole(roleId:Number){
    return this.http.delete<any>(`${baseUrl}/api/role/deleteRole/`+roleId)
  }
}
