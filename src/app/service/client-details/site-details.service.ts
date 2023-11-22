import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SiteDetailsService {
  constructor(private http: HttpClient) { }


  getAllOrganisation(){
    return this.http.get<any>(`${baseUrl}/api/OrganizationDetails/getAllOrganizationDetails`);
   }
 
   getCountry() {
     return this.http.get<any>(`${baseUrl}/api/Country/getAllCountry`);
   }
 
   getState() {
     return this.http.get<any>(`${baseUrl}/api/State/getAllState`);
   }
 
   getCity() {
     return this.http.get<any>(`${baseUrl}/api/City/getAllCity`);
   }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllSiteDetails(){
    return this.http.get<any>(`${baseUrl}/api/SiteDetails/getAllSiteDetails`)
  }

  postSiteDetails(data: any) {
    return this.http.post<any>(`${baseUrl}/api/SiteDetails/postSiteDetails`, data)
  }

  putSiteDetails(data: any,id: Number) {
    return this.http.put<any>(`${baseUrl}/api/SiteDetails/putSiteDetails/` + id, data)
  }

  deleteSiteDetails(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/SiteDetails/deleteSiteDetails/`+id)
  }
}
