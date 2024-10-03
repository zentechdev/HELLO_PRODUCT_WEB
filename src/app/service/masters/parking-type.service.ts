import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ParkingTypeService {

  constructor(
    public http: HttpClient
  ) { }

  getParkingType(){
    return this.http.get(`${baseUrl}/api/ParkingType/getAllParkingType`);
  }

  postParkingType(body: any){
    return this.http.post(`${baseUrl}/api/ParkingType/addParkingType`, body);
  }

  getParkingTypeById(Id: any){
    return this.http.get(`${baseUrl}/api/ParkingType/getParkingTypeById/${Id}`);
  }

  deleteParkingType(Id: any) {
    return this.http.delete(`${baseUrl}/api/ParkingType/deleteParkingType/${Id}`);
  }

  updateParkingType(body: any, Id: any) {
    return this.http.put(`${baseUrl}/api/ParkingType/putParkingType/${Id}`,body);
  }
}
