import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechnologyTypeService {
  getSiteList: any;
  getWingList: any;
  

  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }


  getCity() {
    return this.http.get<any>(`${baseUrl}/api/Technology/getAllTechnology`);
  }

  
  postCity(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Technology/postTechnology/`, data)
  }

  putCity(data: any, cityId: Number) {
    return this.http.put<any>(`${baseUrl}/api/Technology/putTechnology/` + cityId, data)
  }

  deleteCity(cityId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Technology/deleteTechnology/`+cityId)
  }
}
