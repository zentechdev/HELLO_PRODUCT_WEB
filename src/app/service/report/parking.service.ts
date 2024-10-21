import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(
    private http: HttpClient
  ) { }

  getParkingDetails(){
    return this.http.get(`${baseUrl}/api/OccupiedParking/getAllOccupiedParking`);
  }

  filterParkingByDateRage(body: any) {
    return this.http.post(`${baseUrl}/api/OccupiedParking/getOccupiedParkingByDateRange`,body);
  }

  getParkingDataByUnitId(ID: any) {
    return this.http.get(`${baseUrl}/api/OccupiedParking/getOccupiedParkingByUnit/${ID}`);
  }
}
