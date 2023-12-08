import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RfidUnitService {

  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllRfidBySiteId(siteId: any){
    return this.http.get<any>(`${baseUrl}/api/RFID/getAllRFIDBySiteId/` + siteId);
  }

  getAllUnit() {
    return this.http.get<any>(`${baseUrl}/api/Unit/getAllUnit`);
  }

  getAllRfidUnitDetails(){
    return this.http.get<any>(`${baseUrl}/api/RFIDdetails/getAllRfidDetails`)
  }

  postRFIDdetails(data: any) {
    return this.http.post<any>(`${baseUrl}/api/RFIDdetails/postRFIDdetails`, data)
  }

  putRFIDdetails(data: any, id: Number) {
    return this.http.put<any>(`${baseUrl}/api/RFIDdetails/putRFIDdetails/` + id, data)
  }

  deleteRFIDdetails(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/RFIDdetails/deleteRFIDdetails/`+id)
  }
}
