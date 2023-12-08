import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { LoginService } from 'src/app/service/auth/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  helper = new JwtHelperService();
  employeeCode: any;
  formGroup!: FormGroup;
  token!: any;
  branchList: any;
  memberId: any;
  clientId: any;
  siteId: any;
  unitId: any;
  unitNumber: any;
  clientName: any;
  siteName: any;
  memberName: any;
  email: any;
  roleName: any;
  status: any;
  isActive: any;
  mobileNumber: any;
  image: any;
  qrNumber: any;
  employeeTechAccessId: any;
  visitorTechAccessId: any;
  unitName: any;

  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private service: LoginService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }



  loginProcess() {
    if (this.formGroup.valid) {
      this.service.login(this.formGroup.value)
        .subscribe({
          next: (res) => {
            if (res.isSuccess == true) {
              //set token to local storage
              const encryptedData15 = this.storageEncryptionService.encryptData(res.token);
              localStorage.setItem('token', encryptedData15);

              //Decode string from JWT Token
              const helper = new JwtHelperService();
              const decodedToken = helper.decodeToken(res.token);
              this.memberId = decodedToken.memberId;
              this.clientId = decodedToken.clientId;
              this.qrNumber = decodedToken.qrNumber;
              this.siteId = decodedToken.siteId;
              this.unitId = decodedToken.unitId;
              this.unitNumber = decodedToken.unitNumber;
              this.unitName = decodedToken.unitName;
              this.clientName = decodedToken.clientName;
              this.siteName = decodedToken.siteName;
              this.memberName = decodedToken.memberName;
              this.mobileNumber = decodedToken.mobileNumber;
              this.email = decodedToken.email;
              this.image = decodedToken.image;
              this.roleName = decodedToken.roleName;
              this.status = decodedToken.status;
              this.employeeTechAccessId=decodedToken.employeeTechAccessId;
              this.isActive = decodedToken.isActive;


              if (this.roleName != null && this.isActive == 'Active') {
                const encryptedData = this.storageEncryptionService.encryptData(this.memberId);
                localStorage.setItem('memberId', encryptedData);
                const encryptedData1 = this.storageEncryptionService.encryptData(this.clientId);
                localStorage.setItem('clientId', encryptedData1);
                const encryptedData2 = this.storageEncryptionService.encryptData(this.siteId);
                localStorage.setItem('siteId', encryptedData2);
                const encryptedData3 = this.storageEncryptionService.encryptData(this.unitId);
                localStorage.setItem('unitId', encryptedData3);
                const encryptedData4 = this.storageEncryptionService.encryptData(this.unitNumber);
                localStorage.setItem('unitNumber', encryptedData4);
                const encryptedData18 = this.storageEncryptionService.encryptData(this.unitName);
                localStorage.setItem('unitName', encryptedData18);
                const encryptedData5 = this.storageEncryptionService.encryptData(this.clientName);
                localStorage.setItem('clientName', encryptedData5);
                const encryptedData6 = this.storageEncryptionService.encryptData(this.siteName);
                localStorage.setItem('siteName', encryptedData6);
                const encryptedData7 = this.storageEncryptionService.encryptData(this.memberName);
                localStorage.setItem('memberName', encryptedData7);
                const encryptedData8 = this.storageEncryptionService.encryptData(this.roleName);
                localStorage.setItem('roleName', encryptedData8);
                const encryptedData9 = this.storageEncryptionService.encryptData('Dashboard');
                localStorage.setItem('menuName', encryptedData9)
                const encryptedData10 = this.storageEncryptionService.encryptData(this.mobileNumber);
                localStorage.setItem('mobileNumber', encryptedData10);
                const encryptedData11 = this.storageEncryptionService.encryptData(this.image);
                localStorage.setItem('image', encryptedData11);
                const encryptedData12 = this.storageEncryptionService.encryptData(this.qrNumber);
                localStorage.setItem('qrNumber', encryptedData12);
                const encryptedData13 = this.storageEncryptionService.encryptData(this.employeeTechAccessId);
                localStorage.setItem('employeeTechAccessId', encryptedData13);
                const encryptedData14 = this.storageEncryptionService.encryptData(this.visitorTechAccessId);
                localStorage.setItem('visitorTechAccessId', encryptedData14);
                
                this.router.navigate(['/layout/dashboard']);
                this.alertify.success(res.message)
              }
              else {
                this.router.navigate(['token-expired-dialog']);
              }
            }
            else {
              this.alertify.error(res.message)
            }
          },
          error: (res) => {
            console.error(res);
            this.alertify.error("500 Internal Server Error")
          }
        })
    }
  }

}

