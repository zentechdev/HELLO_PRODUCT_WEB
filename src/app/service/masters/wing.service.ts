import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WingService {

  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getSiteDetails(){
    return this.http.get<any>(`${baseUrl}/api/SiteDetails/getAllSiteDetails`);
  }
  
  getSiteName() {
    return this.http.get<any>(`${baseUrl}/api/Wing/getAllWing`);
  }

  getCity() {
    return this.http.get<any>(`${baseUrl}/api/Wing/getAllWing`);
  }
  
  postWing(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Wing/postWing/`, data)
  }

  putWing(data: any, id: Number) {
    return this.http.put<any>(`${baseUrl}/api/Wing/putWing/` + id, data)
  }

  deleteWing(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/Wing/deleteWing/`+id)
  }
}
