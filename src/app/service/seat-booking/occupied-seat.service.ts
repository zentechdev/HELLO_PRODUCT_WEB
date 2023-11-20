import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OccupiedSeatService {

  constructor(private http: HttpClient) { }

  getAllBranchByEmployeeCode(employeeCode:String) {
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranchByEmployeeCode/`+employeeCode);
  }
  
  getAllBranch() {
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranch`);
  }

  getTimeSlot(date: Date,employeeCode:String) {
    return this.http.get<any>(`${baseUrl}/api/TimeSlot/getAllTimeSlotByDate/${date}/${employeeCode}`)
  }

  getAllEmployee() {
    return this.http.get<any>(`${baseUrl}/api/DigitalCard/getAllEmployeeDetail`);
  }

  getAllOccupiedSeatById(employeeCode: string) {
    return this.http.get<any>(`${baseUrl}/api/OccupiedSeat/getAllOccupiedSeatById/` + employeeCode)
  }

  getAllOccupiedSeat() {
    return this.http.get<any>(`${baseUrl}/api/OccupiedSeat/getAllOccupiedSeat`)
  }

  postAllAvilableSeat(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Seat/getAllAvilableSeatById`,data)
  }

  postPostOccupiedSeat(data: any) {
    return this.http.post<any>(`${baseUrl}/api/OccupiedSeat/postOccupiedSeat`,data)
  }

  cancelBooking(data: any) {
    return this.http.post<any>(`${baseUrl}/api/OccupiedSeat/cancelOccupiedSeat`, data)
  }


}
