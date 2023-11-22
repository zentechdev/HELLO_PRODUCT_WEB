import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationTypeService {

  constructor(private http:HttpClient) { }



  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getOrganizationType() {
    return this.http.get<any>(`${baseUrl}/api/Organisation/getAllOrganisation`);
  }
  
  postOrganizationType(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Organisation/postOrganisation/`, data)
  }

  putOrganizationType(data: any, organizationId: Number) {
    return this.http.put<any>(`${baseUrl}/api/Organisation/putOrganisation/` + organizationId, data)
  }

  deleteOrganizationType(organizationId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Organisation/deleteOrganisation/`+organizationId)
  }
}
