import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitingCardShareService {

  constructor(private http: HttpClient) { }

  getAllVisitingCard() {
    return this.http.get<any>(`${baseUrl}/api/VisitingCard/getAllVisitingCard`);
  }

  getAllEmployee() {
    return this.http.get<any>(`${baseUrl}/api/DigitalCard/getAllEmployeeDetail`);
  }

  postShareVisitingCard(data:any) {
    return this.http.post<any>(`${baseUrl}/api/VisitingCard/postShareVisitingCard`,data);
  }

}
