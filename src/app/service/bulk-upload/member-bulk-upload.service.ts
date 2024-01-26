import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberBulkUploadService {

  constructor(private http:HttpClient) { }

  getAllSiteDetails(){
    return this.http.get<any>(`${baseUrl}/api/SiteDetails/getAllSiteDetails`); 
  }

  getAllUnitDetails(){
    return this.http.get<any>(`${baseUrl}/api/Unit/getAllUnit`);
  }

  postUsers(data: any) {
    return this.http.post<any>(`${baseUrl}/api/MemberBulkUpload/postMemberBulk`, data)
  }
}
