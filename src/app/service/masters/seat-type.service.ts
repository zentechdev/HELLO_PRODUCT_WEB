import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatTypeService {

  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getSeatType(){
    return this.http.get<any>(`${baseUrl}/api/SeatType/getAllSeatType`)
  }

  postSeatType(data:any){
    return this.http.post<any>(`${baseUrl}/api/SeatType/postSeatType/`,data)
  }

  putSeatType(data:any,seatTypeId:number){
    return this.http.put<any>(`${baseUrl}/api/SeatType/putSeatType/`+seatTypeId,data)
  }

  deleteSeatType(seatTypeId:number){
    return this.http.delete<any>(`${baseUrl}/api/SeatType/deleteSeatType/`+seatTypeId)
  }


}
