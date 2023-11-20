import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomService {
  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllMeetingRoomType(){
    return this.http.get<any>(`${baseUrl}/api/MeetingRoomType/getAllMeetingRoomType`)
  }

  getBranch(){
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranch`)
  }

  getAllFacility(){
    return this.http.get<any>(`${baseUrl}/api/Facility/getAllFacility`)
  }

  getAllMeetingRoom(){
    return this.http.get<any>(`${baseUrl}/api/MeetingRoom/getAllMeetingRoom`)
  }

  postMeetingRoom(data:any){
    return this.http.post<any>(`${baseUrl}/api/MeetingRoom/postMeetingRoom/`,data);
  }

  putMeetingRoom(data:any,meetingRoomId:Number){
    return this.http.put<any>(`${baseUrl}/api/MeetingRoom/putMeetingRoom/`+meetingRoomId,data)
  }

  deleteMeetingRoom(meetingRoomId:Number){
    return this.http.delete<any>(`${baseUrl}/api/MeetingRoom/deleteMeetingRoom/`+meetingRoomId)
  }

}
