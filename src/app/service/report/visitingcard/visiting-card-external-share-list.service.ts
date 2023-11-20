import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitingCardExternalShareListService {

  constructor(private http: HttpClient) { }

  getAllSharedVisitingCard() {
    return this.http.get<any>(`${baseUrl}/api/VisitingCardExternalShare/getAllVisitingCardExternalShare`);
  }

  getAllSharedVisitingCardByDateRange(data: any) {
    return this.http.post<any>(`${baseUrl}/api/VisitingCardExternalShare/getAllVisitingCardExternalShareByDateRange/`, data)
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllBrochure() {
    return this.http.get<any>(`${baseUrl}/api/VisitingCardExternalShare/getAllBrochureExternalShare`);
  }

  getAllSharedBrochureByDateRange(data: any) {
    return this.http.post<any>(`${baseUrl}/api/VisitingCardExternalShare/getAllBrochureExternalShareByDateRange/`, data)
  }

}
