import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrochureTypeService {

  constructor(private http: HttpClient) { }

  getBrochureType() {
    return this.http.get<any>(`${baseUrl}/api/BrochureType/getAllBrochureType`);
  }

  postBrochureType(data: any) {
    return this.http.post<any>(`${baseUrl}/api/BrochureType/postBrochureType/`, data)
  }

  putBrochureType(data: any, brochureTypeId: Number) {
    return this.http.put<any>(`${baseUrl}/api/BrochureType/putBrochureType/`+brochureTypeId, data)
  }

  deleteBrochureType(brochureTypeId:Number){
    return this.http.delete<any>(`${baseUrl}/api/BrochureType/deleteBrochureType/`+brochureTypeId)
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }
}
