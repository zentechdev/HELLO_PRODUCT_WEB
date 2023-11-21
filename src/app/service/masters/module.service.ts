import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getCity() {
    return this.http.get<any>(`${baseUrl}/api/Module/getAllModule`);
  }
  
  postCity(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Module/postModule/`, data)
  }

  putCity(data: any, cityId: Number) {
    return this.http.put<any>(`${baseUrl}/api/Module/putModule/` + cityId, data)
  }

  deleteCity(cityId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Module/deleteModule/`+cityId)
  }
}
