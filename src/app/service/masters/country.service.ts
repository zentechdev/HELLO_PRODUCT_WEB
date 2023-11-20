import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) { }

  getCountry() {
    return this.http.get<any>(`${baseUrl}/api/Country/getAllCountry`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  postCountry(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Country/postCountry/`, data)
  }

  putCountry(data: any,countryId: Number) {
    return this.http.put<any>(`${baseUrl}/api/Country/putCountry/` + countryId, data)
  }

  deleteCountry(countryId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Country/deleteCountry/`+countryId)
  }

}
