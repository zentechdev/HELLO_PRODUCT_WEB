import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceConfigurationService {

  constructor(private http:HttpClient) { }

  getAllDeviceDetails() {
    return this.http.get<any>(`${baseUrl}/api/IpDeviceConfiguration/getAllDeviceDetails`);
  }

  deleteDevice(id:Number) {
    return this.http.delete<any>(`${baseUrl}/api/IpDeviceConfiguration/deleteDevice/`+id);
  }

  putDevice(data: any, ipAddress:string,portNumber:string){
    return this.http.put<any>(`${baseUrl}/api/IpDeviceConfiguration/putDevice/${ipAddress}/${portNumber}`,data);
  }

  getAllBranch() {
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranch`);
  }

  postDevice(data: any) {
    return this.http.post<any>(`${baseUrl}/api/IpDeviceConfiguration/postDevice/`, data)
  }


  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

}
