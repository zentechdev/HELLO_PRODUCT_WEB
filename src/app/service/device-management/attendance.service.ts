import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { baseUrl } from 'src/environments/environment';

 

@Injectable({

  providedIn: 'root'

})

export class AttendanceService {

  constructor(private http:HttpClient) { }

  getAllTodaysAttendance() {
    return this.http.get<any>(`${baseUrl}/api/IpDeviceConfiguration/getAllTodaysAttendance`)
  }

  getAllAttendanceByDateRange(data:any){
    return this.http.post<any>(`${baseUrl}/api/IpDeviceConfiguration/getAllAttendanceByDateRange/`,data)
  }

  getAllTodaysAttendanceById(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllTodaysAttendance/`+branchId)
  }

  getAllEmployee(){
    return this.http.get<any>(`${baseUrl}/api/DigitalCard/getAllEmployeeDetail`);
  }

  getAllAvilableEmployee() {
    return this.http.get<any>(`${baseUrl}/api/DigitalCard/getAllEmployeeDetail`);
  }

}
