import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient) { }

  getColorCode() {
    return this.http.get<any>(`${baseUrl}/api/ColorCode/getAllcolorCode`);
  }

  getState() {
    return this.http.get<any>(`${baseUrl}/api/State/getAllState`);
  }

  getCity() {
    return this.http.get<any>(`${baseUrl}/api/City/getAllCity`);
  }

  getBranch() {
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranch`);
  }

  postBranch(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Branch/postBranch/`, data)
  }

  putBranch(data: any, branchId: Number) {
    return this.http.put<any>(`${baseUrl}/api/Branch/putBranch/` + branchId, data)
  }

  deleteBranch(branchId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Branch/deleteBranch/`+branchId)
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }
}
