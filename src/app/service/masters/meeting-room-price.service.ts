import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MeetingRoomPriceService {
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

  getAllMeetingRoomPricing(){
    return this.http.get<any>(`${baseUrl}/api/MeetingRoomPricing/getAllMeetingRoomPricing`)
  }

  postMeetingRoomPricing(data:any){
    return this.http.post<any>(`${baseUrl}/api/MeetingRoomPricing/postMeetingRoomPricing/`,data)
  }

  putMeetingRoomPricing(data:any,roomPricingId:Number){
    return this.http.put<any>(`${baseUrl}/api/MeetingRoomPricing/putMeetingRoomPricing/`+roomPricingId,data)
  }

  deletePricing(roomPricingId:Number){
    return this.http.delete<any>(`${baseUrl}/api/MeetingRoomPricing/deletePricing/`+roomPricingId)
  }

}
