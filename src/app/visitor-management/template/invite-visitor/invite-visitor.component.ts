import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-invite-visitor',
  templateUrl: './invite-visitor.component.html',
  styleUrls: ['./invite-visitor.component.css']
})
export class InviteVisitorComponent implements OnInit {
  QrImage: any;
  value: any;
  token: any;
  valid: boolean = false;
  invalid: boolean = false;
  notActivated : boolean = false;
  serverTime!: string;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrNumber!: string;
  expectedEntryTime!: string;
  helper = new JwtHelperService();


  // value1 = 'https://www.techiediaries.com/';

  constructor(private datePipe: DatePipe) {

  }

  async ngOnInit(): Promise<void> {
    await this.getParameter();
    // this.getByMobileNumber();
  }

  // get parameter value from url which is send by backend 

  getParameter() {

    let querystring = window.location.search;
    let urlParam = new URLSearchParams(querystring);

    this.token = urlParam.get('t');

    //Decode string from JWT Token
    const helper = new JwtHelperService();
    // console.log(helper);
    const decodedToken = helper.decodeToken(this.token);
    // console.log(decodedToken);
    this.qrNumber = decodedToken.unique_name;
    this.expectedEntryTime = decodedToken.expectedEntryTime;
    

    // Other functions
    const expirationDate = this.helper.getTokenExpirationDate(this.token);
    const isExpired = this.helper.isTokenExpired(this.token);
    // console.log('isExpired', isExpired);
    // var date = new Date(this.expectedEntryTime);
    // this.latest_date = date.toLocaleDateString("fr-CA").split("/").reverse().join("-");

    const currentDate = new Date();
    const currentTime = this.datePipe.transform(currentDate,'M/dd/yyyy h:mm:ss a');
    let fromDate: any = this.datePipe.transform(this.expectedEntryTime, 'M/dd/yyyy h:mm:ss a');

    if (currentTime! >= fromDate) { 
      if (isExpired !== true) {
        if (this.valid == false) {
          this.value = this.qrNumber;
          this.valid = true;
        }
        else {
          this.valid = false;
        }
      } else {
        if (this.invalid == false) {
          this.invalid = true;
        }
        else {
          this.invalid = false;
        }
      }
    } else{
      if (this.notActivated == false) {
        this.notActivated = true;
      }
      else {
        this.notActivated = false;
      }
    }
  }


}
