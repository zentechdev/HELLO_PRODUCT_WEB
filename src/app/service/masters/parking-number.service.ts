import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingNumberService {

  constructor(private http:HttpClient) { }


  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllFloor() {
    return this.http.get<any>(`${baseUrl}/api/UnitNumber/getAllUnitNumber`);
  }

  getAllUnit() {
    return this.http.get<any>(`${baseUrl}/api/Unit/getAllUnit`);
  }

  getWingDetails(){
    return this.http.get<any>(`${baseUrl}/api/Wing/getAllWing`)
  }

  getfloorDetails(){
    return this.http.get<any>(`${baseUrl}/api/Floor/getAllFloor`)
  }
  
  getSiteDetails(){
    return this.http.get<any>(`${baseUrl}/api/SiteDetails/getAllSiteDetails`)
  }

  getVehicleType(){
    return this.http.get<any>(`${baseUrl}/api/VehicleType/getAllVehicleType`)
  }


  postParkingNumber(data: any) {
    return this.http.post<any>(`${baseUrl}/api/ParkingNumber/postParkingNumber`, data)
  }

  getAllParkingNumber(){
    return this.http.get<any>(`${baseUrl}/api/ParkingNumber/getAllParkingNumber`)
  }

  getParkingType(){
    return this.http.get<any>(`${baseUrl}/api/ParkingType/getAllParkingType`)
  }

  putParkingNumber(data: any, id: Number) {
    return this.http.put<any>(`${baseUrl}/api/ParkingNumber/putParkingNumber/` + id, data)
  }

  deleteParkingNumber(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/ParkingNumber/deleteParkingNumber/`+id)
  }

}
