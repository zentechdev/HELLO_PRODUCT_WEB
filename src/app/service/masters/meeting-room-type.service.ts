import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomTypeService {
  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllMeetingRoomType(){
    return this.http.get<any>(`${baseUrl}/api/MeetingRoomType/getAllMeetingRoomType`)
  }

  postMeetingRoomType(data:any){
    return this.http.post<any>(`${baseUrl}/api/MeetingRoomType/postMeetingRoomType/`,data)
  }

  putMeetingRoomType(data:any,meetingRoomTypeId:number){
    return this.http.put<any>(`${baseUrl}/api/MeetingRoomType/putMeetingRoomType/`+meetingRoomTypeId,data)
  }

  deleteMeetingRoomType(meetingRoomTypeId:number){
    return this.http.delete<any>(`${baseUrl}/api/MeetingRoomType/deleteMeetingRoomType`+meetingRoomTypeId)
  }

}
