import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  constructor(private http: HttpClient) { }

  getParentMenuList(employeeCode:string) {
    return this.http.get<any>(`${baseUrl}/api/MenuList/getAllMenuList/`+employeeCode);
  }

  getChildMenuList(menuListId:Number){
    return this.http.get<any>(`${baseUrl}/api/MenuList/getAllMenuListById/`+menuListId);
  }
}
