import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs'

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(Message:string){
    alertyfy.success(Message);
  }

  warning(Message:string){
    alertyfy.warning(Message);
  }

  error(Message:string){
    alertyfy.error(Message);
  }

  alert(Title:string,Message:string){
    alertyfy.alert(Title,Message)
  }

  confirm(title: string, message: string, okCallback: () => void, cancelCallback: () => void): void {
    alertyfy.confirm(title, message,
      () => {
        okCallback();
      },
      () => {
        cancelCallback();
      });
  }
}
