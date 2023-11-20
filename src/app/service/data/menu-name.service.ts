import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuNameService {

  constructor() { }

  public menuName!:string;
}
