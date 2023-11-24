import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http:HttpClient) { }


  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllFloor() {
    return this.http.get<any>(`${baseUrl}/api/UnitNumber/getAllUnitNumber`);
  }

  getAllUnit() {
    return this.http.get<any>(`${baseUrl}/api/Unit/getAllUnit`);
  }
  
  postUnit(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Unit/postUnit`, data)
  }

  getSiteDetails(){
    return this.http.get<any>(`${baseUrl}/api/SiteDetails/getAllSiteDetails`)
  }

  getWingDetails(){
    return this.http.get<any>(`${baseUrl}/api/Wing/getAllWing`)
  }

  getfloorDetails(){
    return this.http.get<any>(`${baseUrl}/api/Floor/getAllFloor`)
  }

  getUnitDetails(){
    return this.http.get<any>(`${baseUrl}/api/UnitNumber/getAllUnitNumber`)
  }

  putUnit(data: any, id: Number) {
    return this.http.put<any>(`${baseUrl}/api/Unit/putUnit/` + id, data)
  }

  deleteUnit(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/Unit/deleteUnit/`+id)
  }
}
