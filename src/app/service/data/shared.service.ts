import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private methodTiggeredSource1 = new Subject<void>();
  methodTriggered$ = this.methodTiggeredSource1.asObservable();

  private methodTriggeredSource2 = new Subject<void>();
  methodTriggered$$ = this.methodTriggeredSource2.asObservable();

  triggerGetSeatBooking() {
    this.methodTiggeredSource1.next();
  }

  triggerGetMeetingBooking() {
    this.methodTriggeredSource2.next();
  }
}
