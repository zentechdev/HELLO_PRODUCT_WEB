import { Component, OnInit } from '@angular/core';
// import moment from 'moment'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year:any;

  constructor() {

    // this.year=moment().format('YYYY');
    this.year='2024'

   }

  ngOnInit(): void {
  }

}
