import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorCodeService {

  constructor(private http:HttpClient) { }

  getColorCode(){
   return this.http.get<any>(`${baseUrl}/api/ColorCode/getAllcolorCode`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  postColorCode(data:any){
    return this.http.post<any>(`${baseUrl}/api/ColorCode/postColorCode/`,data)
  }

  putColorCode(data:any,colorCodeId:Number){
    return this.http.put<any>(`${baseUrl}/api/ColorCode/putColorCode/`+colorCodeId,data)
  }

  deleteColorCode(colorCodeId:Number){
    return this.http.delete<any>(`${baseUrl}/api/ColorCode/deleteColorCode/`+colorCodeId)
  }
}
