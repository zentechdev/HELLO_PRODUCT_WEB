import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrochureUploadService {

  constructor(private http: HttpClient) { }

  getBrochureType() {
    return this.http.get<any>(`${baseUrl}/api/BrochureType/getAllBrochureType`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getBrochure() {
    return this.http.get<any>(`${baseUrl}/api/InquiryOrganization/getAllInquiryOrganization`);
  }

  postBrochure(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Brochure/postBrochure/`, data)
  }

  putBrochure(data: any, brochureId: Number) {
    return this.http.put<any>(`${baseUrl}/api/Brochure/putBrochure/`+ brochureId, data)
  }

  deleteBrochure(brochureId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Brochure/deleteBrochure/`+brochureId)
  }
}
