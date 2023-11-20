import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getSeatType(){
    return this.http.get<any>(`${baseUrl}/api/SeatType/getAllSeatType`)
  }

  getBranch(){
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranch`)
  }

  getAssetType(){
    return this.http.get<any>(`${baseUrl}/api/AssetType/getAllAssetType`)
  }

  getSeat(){
    return this.http.get<any>(`${baseUrl}/api/Seat/getAllSeat`)
  }

  postSeat(data:any){
    return this.http.post<any>(`${baseUrl}/api/Seat/postSeat/`,data);
  }

  putSeat(data:any,seatId:Number){
    return this.http.put<any>(`${baseUrl}/api/Seat/putSeat/`+seatId,data)
  }


  deleteSeat(seatId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Seat/deleteSeat/`+seatId)
  }


}
