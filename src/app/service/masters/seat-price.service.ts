import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SeatPriceService {

  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getSeatType(){
    return this.http.get<any>(`${baseUrl}/api/SeatType/getAllSeatType`)
  }

  getBranch(){
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranch`)
  }

  getSeatPrice(){
    return this.http.get<any>(`${baseUrl}/api/Pricing/getAllPricing`)
  }

  postSeatPrice(data:any){
    return this.http.post<any>(`${baseUrl}/api/Pricing/postPricing/`,data)
  }

  putSeatPrice(data:any,pricingId:Number){
    return this.http.put<any>(`${baseUrl}/api/Pricing/putPricing/`+pricingId,data)
  }

  deleteSeatPrice(pricingId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Pricing/deletePricing/`+pricingId)
  }

}
