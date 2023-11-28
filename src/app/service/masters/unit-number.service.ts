import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitNumberService {

  constructor(private http:HttpClient) { }


  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllFloor() {
    return this.http.get<any>(`${baseUrl}/api/UnitNumber/getAllUnitNumber`);
  }

  getAllUnitNumber() {
    return this.http.get<any>(`${baseUrl}/api/UnitNumber/getAllUnitNumber`);
  }
  
  postFloor(data: any) {
    return this.http.post<any>(`${baseUrl}/api/UnitNumber/postUnitNumber/`, data)
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

  putUnit(data: any, id: Number) {
    return this.http.put<any>(`${baseUrl}/api/UnitNumber/putUnitNumber/` + id, data)
  }

  deleteCity(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/UnitNumber/deleteUnitNumber/`+id)
  }
}
