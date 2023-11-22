import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechnologyTypeService {

  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getTechnologyType() {
    return this.http.get<any>(`${baseUrl}/api/Technology/getAllTechnology`);
  }
  
  postTechnologyType(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Technology/postTechnology/`, data)
  }

  putTechnologyType(data: any, technologyId: Number) {
    return this.http.put<any>(`${baseUrl}/api/Technology/putTechnology/` + technologyId, data)
  }

  deleteTechnologyType(technologyId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Technology/deleteTechnology/`+technologyId)
  }
}
