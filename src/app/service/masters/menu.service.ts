import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http:HttpClient) { }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  getAllMenuList(){
    return this.http.get<any>(`${baseUrl}/api/MenuList/getAllMenuList`);
  }

  postMenuList(data:any){
    return this.http.post<any>(`${baseUrl}/api/MenuList/postMenuList`,data);
  }

  putMenuList(data: any, menuListId: Number){
    return this.http.put<any>(`${baseUrl}/api/MenuList/putMenuList/`+menuListId,data);
  }

  
  deleteMenuList(menuListId:Number){
    return this.http.delete<any>(`${baseUrl}/api/MenuList/deleteMenuList/`+menuListId);
  }

}
