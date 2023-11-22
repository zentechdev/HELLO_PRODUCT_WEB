import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InquiryOrgnizationService {
  constructor(private http: HttpClient) { }


  getAllModule() {
    return this.http.get<any>(`${baseUrl}/api/Module/getAllModule`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllInquiryOrganization(){
    return this.http.get<any>(`${baseUrl}/api/InquiryOrganization/getAllInquiryOrganization`)
  }

  postInquiryOrganization(data: any) {
    return this.http.post<any>(`${baseUrl}/api/InquiryOrganization/postInquiryOrganization`, data)
  }

  putInquiryOrganization(data: any,id: Number) {
    return this.http.put<any>(`${baseUrl}/api/InquiryOrganization/putInquiryOrganization/` + id, data)
  }

  deleteInquiryOrganization(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/Plan/deletePlan/`+id)
  }
}
