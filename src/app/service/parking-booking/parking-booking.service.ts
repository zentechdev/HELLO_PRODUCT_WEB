import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ParkingBookingService {

  constructor(
    private http: HttpClient
  ) { }

  getAllOccupiedList(){
    return this.http.get(`${baseUrl}/api/OccupiedParking/getAllOccupiedParking`);
  }

  cancelParkingBooking(Id: any){
    return this.http.delete(`${baseUrl}/api/OccupiedParking/cancelOccupiedParkingById/${Id}`);
  }

  parkingBooking(body: any){
    return this.http.post(`${baseUrl}/api/OccupiedParking/postOccupiedParking`, body);
  }

  getParkingList(Id: any){
    return this.http.get(`${baseUrl}/api/parkingDetails/getParkingBySiteId/${Id}`)
  }

  getVehicleList(){
    return this.http.get(`${baseUrl}/api/VehicleType/getAllVehicleType`);
  }
}
