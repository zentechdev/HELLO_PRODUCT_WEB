import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppDownloadService {

  constructor(private http:HttpClient) { }

  getTodaysAppDownloadReport(){
    return this.http.get<any>(`${baseUrl}/api/AppDownloadReport/getTodaysAppDownloadReport`)
  }

  getAppDownloadReportByDateRange(data:any){
    return this.http.post<any>(`${baseUrl}/api/AppDownloadReport/getAppDownloadReportByDateRange/`,data)
  }
}
