import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private http:HttpClient) { }


  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllFloor() {
    return this.http.get<any>(`${baseUrl}/api/Floor/getAllFloor`);
  }
  
  postFloor(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Floor/postFloor/`, data)
  }

  getSiteDetails(){
    return this.http.get<any>(`${baseUrl}/api/SiteDetails/getAllSiteDetails`)
  }

  getWingDetails(){
    return this.http.get<any>(`${baseUrl}/api/Wing/getAllWing`)
  }

  putFloor(data: any, id: Number) {
    return this.http.put<any>(`${baseUrl}/api/Floor/putFloor/` + id, data)
  }

  deleteCity(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/Floor/deleteFloor/`+id)
  }
}