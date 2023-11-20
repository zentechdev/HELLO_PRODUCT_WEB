import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrochureVideoUrlService {
  constructor(private http: HttpClient) { }

  getBrochureType() {
    return this.http.get<any>(`${baseUrl}/api/BrochureType/getAllBrochureType`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllBrochureVideo() {
    return this.http.get<any>(`${baseUrl}/api/BrochureVideo/getAllBrochureVideo`);
  }

  postBrochureVideo(data: any) {
    return this.http.post<any>(`${baseUrl}/api/BrochureVideo/postBrochureVideo/`, data)
  }

  putBrochureVideo(data: any, videoUrlId: Number) {
    return this.http.put<any>(`${baseUrl}/api/BrochureVideo/putBrochureVideo/`+ videoUrlId, data)
  }

  deleteBrochureVideo(videoUrlId:Number){
    return this.http.delete<any>(`${baseUrl}/api/BrochureVideo/deleteBrochureVideo/`+videoUrlId)
  }
}
