import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AsignParkingUnitService {

  constructor(
    private http: HttpClient
  ) { }

  getParkingUnitList(){
    return this.http.get(`${baseUrl}/api/parkingDetails/getAllParkingDetails`);
  }

  postParkingUnitData(body: any){
    return this.http.post(`${baseUrl}/api/parkingDetails/postParkingDetails`, body);
  }

  updateParkingUnitData(Id: number, body: any) {
    return this.http.put(`${baseUrl}/api/parkingDetails/putParkingDetails/${Id}`, body);
  }

  deleteParkingUnit(Id: number) {
    return this.http.delete(`${baseUrl}/api/parkingDetails/deleteParkingDetails/${Id}`);
  }

  getParkingUnitById(Id: number) {
    return this.http.get(`${baseUrl}/api/parkingDetails/getParkingBySiteId/${Id}`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }


  getParkingNumber(){
    return this.http.get(`${baseUrl}/api/ParkingNumber/getAllParkingNumber`);
  }

  getAllUnit(){
    return this.http.get(`${baseUrl}/Unit/getAllUnit`);
  }
}
