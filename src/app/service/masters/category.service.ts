import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getColorCode() {
    return this.http.get<any>(`${baseUrl}/api/ColorCode/getAllcolorCode`);
  }

  getCategories() {
    return this.http.get<any>(`${baseUrl}/api/Categories/getAllCategories`);
  }

  postCategories(data: any) {
    return this.http.post<any>(`${baseUrl}/api/Categories/postCategories/`, data)
  }

  putCategories(data: any, CategoryId: Number) {
    return this.http.put<any>(`${baseUrl}/api/Categories/putCategories/` + CategoryId, data)
  }

  deleteCategories(CategoryId:Number){
    return this.http.delete<any>(`${baseUrl}/api/Categories/deleteCategories/`+CategoryId)
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }
}
