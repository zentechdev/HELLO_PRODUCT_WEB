import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { QrCodePassService } from 'src/app/service/template/qr-code-pass.service';


@Component({
  selector: 'app-qr-code-pass',
  templateUrl: './qr-code-pass.component.html',
  styleUrls: ['./qr-code-pass.component.css']
})
export class QrCodePassComponent implements OnInit {

  value: any;
  token: any;
  valid: boolean = false;
  invalid: boolean = false;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  siteImage: any;


  constructor(private alertify: AlertifyService,private service:QrCodePassService) { }

  unitNumber!: string;
  image!: string;
  memberName!: string;
  mobileNumber!: string;
  location!: string;
  checkIn!: any;
  unitName!: string;
  siteName!: string;
  qrNumber: any;
  hostName: any;


  ngOnInit(): void {
    this.getParameter();
  }

  // get parameter value from url which is send by backend 

  getParameter() {
    let querystring = window.location.search;
    let urlParam = new URLSearchParams(querystring);
    this.value = urlParam.get('m');
    localStorage.setItem('m', this.value);

    // if (!this.isTokenExpired(this.token)) {
    //   if(this.invalid==false){
    //     this.invalid=true;
    //     localStorage.removeItem('m');
    //     localStorage.removeItem('token');
    //   }
    //   else{
    //     this.invalid=false;
    //   }
    // }
    // else {
    //   if(this.valid==false){
    //     this.getByMobileNumber();
    //     this.valid=true;
    //   }
    //   else{
    //     this.valid=false;
    //   }
    // }

    this.getByMobileNumber();

  }

  // private isTokenExpired(token: string) {
  //   const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  //   return expiry * 1000 > Date.now();
  // }

  getByMobileNumber() {
    this.mobileNumber=String(localStorage.getItem('m'));
    return this.service.getVisitorByMobileNumber(this.mobileNumber)
      .subscribe({
        next: (data) => {  
        if(data.isSuccess==true){
          this.unitNumber = data.data[0].unitNumber;
          this.image = data.data[0].image;
          this.qrNumber = data.data[0].qrNumber;
          this.memberName = data.data[0].visitorName;
          this.mobileNumber = data.data[0].mobileNumber;
          this.location = data.data[0].location;
          this.checkIn = data.data[0].createdDate;
          this.unitName = data.data[0].unitName;
          this.siteName = data.data[0].siteName;
          this.siteImage=data.data[0].siteImage;
          this.hostName = data.data[0].hostName;
          localStorage.removeItem('m');
        }
        },
        error: (data) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      })
  }

}
