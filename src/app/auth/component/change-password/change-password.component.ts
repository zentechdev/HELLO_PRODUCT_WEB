import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/auth/login.service';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  formGroup!: FormGroup;

  QrMobile: boolean = true;
  QrOTP: boolean = false;
  QrDetails: boolean = false;


  Image?: string;
  MembersName?: string;
  MobileNumber?: string;
  MembersAddress?: string;
  QrImage?: string;
  UnitNumber?: Number;
  finaldata!: any;
  myControl = new FormControl('');
  PhoneNumber = localStorage.getItem('mobileNumber');
  otp: any;
  hide: boolean = true;
  memberId!: number;
  otpNumber: any;


  constructor(private http: HttpClient, private router: Router, public service: LoginService, public dialog: MatDialog, private formBuilder: FormBuilder, private alertify: AlertifyService) {

  }

  async ngOnInit(): Promise<void> {
    this.formGroup = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      OTP: ['', [Validators.required, Validators.pattern("[0-6]*$"), Validators.minLength(6), Validators.maxLength(6)]],
      password: ['', Validators.required],
      confirmPassword: ['',],
    }, { validator: this.checkPasswords })
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true }
  }


  async verifyOtp() {
    try {
      if (this.formGroup.value.OTP === this.otpNumber) {
        this.alertify.success('OTP is Verified Successfully');
        this.OnOtpChange();
      }
      else {
        this.alertify.error('Invalid OTP!');
      }
    } catch (e) {
      this.alertify.error('Invalid OTP!');
    }
  }

  async resend() {
    // Get the mobile number from the form
    const mobileNumber = this.formGroup.value.mobileNumber;

    this.otpNumber = this.generateRandom4DigitNumber();

    const url = `https://sms.cell24x7.in/smsReceiver/sendSMS`;

    const body = `user=zentech&pwd=apizentech&sender=ZTISPL&mobile=${mobileNumber}&msg=Your+login+OTP+is+${this.otpNumber}+Use+this+OTP+to+validate+your+login.+-Zentechinfo+Solutions+Private+Limited&mt=0`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post(url, body, { headers, responseType: 'text' })
      .subscribe(
        (response) => {
          // You can also check for specific status codes
          if (response) {
            this.alertify.success('OTP is sent successfully');
            this.OnMobileChange();
          } else {
            this.alertify.error('Failed to send OTP. Please try again.');
          }
        },
        (error) => {
          this.alertify.error('Failed to send OTP. Please try again.');
        }
      );
  }

  async sendOtpOnMobile() {
    debugger
    // Get the mobile number from the form
    const mobileNumber = this.formGroup.value.mobileNumber;

    this.otpNumber = this.generateRandom4DigitNumber();

    let formData = {
      "otp": this.otpNumber,
      "mobileNumber": mobileNumber
    }

    this.service.postOTP(formData)
      .subscribe({
        next: (res) => {
          if (res.isSuccess == true) {
            this.alertify.success(res.message);
            this.OnMobileChange();
          }
          else {
            this.alertify.error(res.message);
          }
        },
        error: (res) => {
          this.alertify.error("500 Internal Server Error");
        }
      })

  }

  generateRandom4DigitNumber(): number {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number

    // Generate a random number between min and max (inclusive)
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNum;
  }

  getMemberStatus() {
    this.service.getStatusByMobileNumber(this.formGroup.value.mobileNumber)
      .subscribe({
        next: (res) => {
          if (res.status == true) {
            this.sendOtpOnMobile();
          }
          else {
            this.alertify.warning('Your Mobile Number Is Not Register In Hello Application');
          }
        },
        error: (res) => {
          this.alertify.error("500 Internal Server Error");
        }
      })
  }


  putPassword() {

    let formData = {
      "password": this.formGroup.value.password
    }

    this.service.putPassword(formData, this.formGroup.value.mobileNumber)
      .subscribe({
        next: (res) => {
          if (res.isSuccess == true) {
            this.alertify.success(res.message);
            this.formGroup.reset();
            // window.location.reload();
            this.router.navigate(['']);
          }
          else {
            this.alertify.error(res.message);
          }
        },
        error: (res) => {
          this.alertify.error("500 Internal Server Error");
        }
      })

  }

  OnMobileChange() {
    if (this.QrOTP == false) {
      this.QrOTP = true;
      this.QrMobile = false;
      this.QrDetails = false;
    }
    else {
      this.QrOTP = false;
    }
  }

  OnOtpChange() {
    if (this.QrDetails == false) {
      this.QrOTP = false;
      this.QrMobile = false;
      this.QrDetails = true;
    }
    else {
      this.QrDetails = false;
    }
  }

  Back1() {
    this.router.navigate(['/']);
  }

  Back2() {
    window.location.reload();
  }
}
