import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RfidService {

  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getSiteDetails(){
    return this.http.get<any>(`${baseUrl}/api/SiteDetails/getAllSiteDetails`);
  }

  getAllUnit() {
    return this.http.get<any>(`${baseUrl}/api/Unit/getAllUnit`);
  }

  getAllRFID(){
    return this.http.get<any>(`${baseUrl}/api/RFID/getAllRFID`);
  }
  
  postRfid(data: any) {
    return this.http.post<any>(`${baseUrl}/api/RFID/postRFID`, data)
  }

  putRfid(data: any, id: Number) {
    return this.http.put<any>(`${baseUrl}/api/RFID/putRFID/` + id, data)
  }

  deleteRfid(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/RFID/deleteRFID/`+id)
  }
}
