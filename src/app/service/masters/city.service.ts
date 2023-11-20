import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http:HttpClient) { }

  getState() {
    return this.http.get<any>(`${baseUrl}/api/State/getAllState`);
  }

  getCountry() {
    return this.http.get<any>(`${baseUrl}/api/Country/getAllCountry`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getCity() {
    return this.http.get<any>(`${baseUrl}/api/City/getAllCity`);
  }
  
  postCity(data: any) {
    return this.http.post<any>(`${baseUrl}/api/City/postCity/`, data)
  }

  putCity(data: any, cityId: Number) {
    return this.http.put<any>(`${baseUrl}/api/City/putCity/` + cityId, data)
  }

  deleteCity(cityId:Number){
    return this.http.delete<any>(`${baseUrl}/api/City/deleteCity/`+cityId)
  }
}
