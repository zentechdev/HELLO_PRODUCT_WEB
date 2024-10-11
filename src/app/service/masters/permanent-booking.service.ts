import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PermanentBookingService {

  constructor(
    private http: HttpClient
  ) { }

  getPermanentParkingList(){
    return this.http.get(`${baseUrl}/api/PermanentParkingDetails/getAllPermanentParking`);
  }

  postPermanentParkingData(body: any){
    return this.http.post(`${baseUrl}/api/PermanentParkingDetails/postPermanentParking`, body);
  }

  updatePermanentParkingData(Id: any, body: any) {
    return this.http.put(`${baseUrl}/api/PermanentParkingDetails/putPermanentParking/${Id}`, body);
  }

  deletePermanentParking(Id: any) {
    return this.http.delete(`${baseUrl}/api/PermanentParkingDetails/deletePermanentParking/${Id}`);
  }

  getVehicleDetails(){
    return this.http.get(`${baseUrl}/api/VehicleType/getAllVehicleType`);
  }
}
