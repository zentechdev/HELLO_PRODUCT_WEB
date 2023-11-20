import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http:HttpClient) { }

  getAllOrganisation(){
   return this.http.get<any>(`${baseUrl}/api/OrganizationDetails/getAllOrganizationDetails`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  postOrganizationDetails(data:any){
    return this.http.post<any>(`${baseUrl}/api/OrganizationDetails/postOrganizationDetails`,data)
  }

  putOrganizationDetails(data:any,id:Number){
    return this.http.put<any>(`${baseUrl}/api/OrganizationDetails/putOrganizationDetails/`+id,data)
  }

  deleteOrganizationDetails(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/OrganizationDetails/deleteOrganizationDetails/`+id)
  }
}
