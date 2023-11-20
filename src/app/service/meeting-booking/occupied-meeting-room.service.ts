import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OccupiedMeetingRoomService {

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

  getAllOccupiedMeetingRoomById(employeeCode: string) {
    return this.http.get<any>(`${baseUrl}/api/OccupiedMeetingRoom/getAllOccupiedMeetingRoomById/` + employeeCode)
  }

  getAllOccupiedMeetingRoom() {
    return this.http.get<any>(`${baseUrl}/api/OccupiedMeetingRoom/getAllOccupiedMeetingRoom`)
  }

  getAllAvilableMeetingRoom(data: any) {
    return this.http.post<any>(`${baseUrl}/api/MeetingRoom/getAvailableMeetingRoomById`,data)
  }

  postOccupiedMeeting(data: any) {
    return this.http.post<any>(`${baseUrl}/api/OccupiedMeetingRoom/postMeetingRoomAndNotify`,data)
  }

  cancelBooking(data: any) {
    return this.http.post<any>(`${baseUrl}/api/OccupiedMeetingRoom/cancelOccupiedMeetingRoom`, data)
  }
}
