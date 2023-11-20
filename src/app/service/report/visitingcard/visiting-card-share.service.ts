import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitingCardShareService {

  constructor(private http: HttpClient) { }

  getAllSharedVisitingCard() {
    return this.http.get<any>(`${baseUrl}/api/VisitingCardReport/getAllSharedVisitingCard`);
  }

  getAllSharedVisitingCardByDateRange(data: any) {
    return this.http.post<any>(`${baseUrl}/api/VisitingCardReport/getAllSharedVisitingCardByDateRange/`, data)
  }

  getAllSharedVisitingCardByDate(data: any) {
    return this.http.post<any>(`${baseUrl}/api/VisitingCardReport/getAllSharedVisitingCardByDate/`, data)
  }
}
