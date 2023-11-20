import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitingCardScanService {
  constructor(private http: HttpClient) { }

  getVisitingCard() {
    return this.http.get<any>(`${baseUrl}/api/VisitingCardReport/getAllVisitingCard`);
  }

  getVisitingCardByDateRange(data: any) {
    return this.http.post<any>(`${baseUrl}/api/VisitingCardReport/getAllVisitingCardByDateRange/`, data)
  }

  getAllVisitingCardByDate(data: any) {
    return this.http.post<any>(`${baseUrl}/api/VisitingCardReport/getAllVisitingCardByDate/`, data)
  }

}
