import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermanentSeatService {

  constructor(private http:HttpClient) { }

  getAllPermanentAvailableSeat() {
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllPermanentAvailableSeat`);
  }

  getAllAvailableSeat() {
    return this.http.get<any>(`${baseUrl}/api/PermanentSeat/getAllAvailableSeat`);
  }

  getAllPermanentAvailableSeatByBranchId(branchId:Number) {
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllPermanentAvailableSeatByBranchId/`+branchId);
  }

  getAllBranch() {
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranch`);
  }

  getAllEmployee(){
    return this.http.get<any>(`${baseUrl}/api/DigitalCard/getAllEmployeeDetail`);
  }

  getAllSeat(){
    return this.http.get<any>(`${baseUrl}/api/Seat/getAllSeat`)
  }

  getAllAvilableSeat(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/PermanentSeat/getAllAvilableSeatByBranchId/`+branchId)
  }
  
  getAllAvilableEmployee() {
    return this.http.get<any>(`${baseUrl}/api/PermanentSeat/getAllAvilableEmployee`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllPermanentSeat(){
    return this.http.get<any>(`${baseUrl}/api/PermanentSeat/getAllPermanentSeat`);
  }

  postPermanentSeat(data:any){
    return this.http.post<any>(`${baseUrl}/api/PermanentSeat/postPermanentSeat`,data);
  }

  putPermanentSeat(data: any, id: Number){
    return this.http.put<any>(`${baseUrl}/api/PermanentSeat/putPermanentSeat/`+id,data);
  }

  deletePermanentSeat(id:Number){
    return this.http.delete<any>(`${baseUrl}/api/PermanentSeat/deletePermanentSeat/`+id);
  }
}
