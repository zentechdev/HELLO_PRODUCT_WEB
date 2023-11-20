import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Hello_Admin';

  // subscription: Subscription;

  constructor(private router: Router) {
    //create a event to check page is reload
    // this.subscription = router.events.subscribe((event) => {
    //     if (event instanceof NavigationStart) {
    //        browserRefresh = !router.navigated;
    //     }
    // });
  }

  ngOnDestroy() {
  //   this.subscription.unsubscribe();
  }
}

