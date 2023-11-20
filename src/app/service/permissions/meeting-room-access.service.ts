import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomAccessService {
  constructor(private http:HttpClient) { }

  getAllEmployee() {
    return this.http.get<any>(`${baseUrl}/api/DigitalCard/getAllEmployeeDetail`);
  }

  updateMeetingRoomStatus(data:any,employeeCode:string) {
    return this.http.put<any>(`${baseUrl}/api/OccupiedMeetingRoom/updateMeetingRoomStatus/`+employeeCode,data);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }
}
