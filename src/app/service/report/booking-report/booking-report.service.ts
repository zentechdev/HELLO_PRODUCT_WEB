import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingReportService {

  constructor(private http:HttpClient) { }

  getAllBranchByEmployeeCode(employeeCode:String) {
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranchByEmployeeCode/`+employeeCode);
  }

  getAllOccupiedSeat() {
    return this.http.get<any>(`${baseUrl}/api/OccupiedSeat/getAllOccupiedSeat`)
  }

  getAllOccupiedSeatByDateRange(data:any){
    return this.http.post<any>(`${baseUrl}/api/OccupiedSeat/getAllOccupiedSeatByDateRange/`,data)
  }

  getAllOccupiedMeetingRoom() {
    return this.http.get<any>(`${baseUrl}/api/OccupiedMeetingRoom/getAllOccupiedMeetingRoom`)
  }

  getAllOccupiedMeetingRoomByDateRange(data:any){
    return this.http.post<any>(`${baseUrl}/api/OccupiedMeetingRoom/getAllOccupiedMeetingRoomByDateRange/`,data)
  }
}
