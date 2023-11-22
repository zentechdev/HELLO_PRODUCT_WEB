import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { InquiryOrgnizationService } from 'src/app/service/client-details/inquiry-orgnization.service';
import { SiteDetailsService } from 'src/app/service/client-details/site-details.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';


@Component({
  selector: 'app-site-details-dialog',
  templateUrl: './site-details-dialog.component.html',
  styleUrls: ['./site-details-dialog.component.css']
})
export class SiteDetailsDialogComponent implements OnInit {

  panelOpenState = false;
  formGroup!: FormGroup;
  @ViewChild('select') select!: MatSelect;
  allSelected = false;
  showExpandMoreOption = false;
  checked: Boolean = false;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  isActiveId: any;
  menuList: any;
  animals: any;

  ArrayList: any = [];
  ArrayList1: any = [];
  selected: any = [];
  list: any;
  numberArrayEmployeeCode!: string[];
  countryList: any;
  cityList: any;
  stateList: any;
  orgList: any;
  clientId: any;
  cityId: any;
  stateId: any;
  countryId: any;
  memberId: any;

  constructor(private storageEncryptionService:StorageEncryptionService,private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service:SiteDetailsService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<SiteDetailsDialogComponent>) {
    this.dialogRef.disableClose = true
  }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      clientId: ['', Validators.required],
      siteName: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy:['']
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['clientId'].setValue(this.editData.organisationName);
      this.formGroup.controls['siteName'].setValue(this.editData.siteName);
      this.formGroup.controls['countryId'].setValue(this.editData.countryName);
      this.formGroup.controls['stateId'].setValue(this.editData.stateName);
      this.formGroup.controls['cityId'].setValue(this.editData.cityName);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    const encryptedData = String(localStorage.getItem('memberId'));
    this.memberId = this.storageEncryptionService.decryptData(encryptedData);
    
    this.formGroup.controls['createdBy'].setValue(this.memberId );

    this.getIsActive();
    this.getAllOrganisation();
    this.getCountry();
    this.getState();
    this.getCity();

  }

  getAllOrganisation() {
    this.service.getAllOrganisation()
      .subscribe({
        next: (res) => {
          this.orgList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }
  getCountry() {
    this.service.getCountry()
      .subscribe({
        next: (res) => {
          this.countryList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getState() {
    this.service.getState()
      .subscribe({
        next: (res) => {
          this.stateList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getCity() {
    this.service.getCity()
      .subscribe({
        next: (res) => {
          this.cityList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }


  getIsActive() {
    this.service.getIsActive()
      .subscribe({
        next: (res) => {
          this.isActiveList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  postData() {

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    for (var i = 0; i < this.countryList.length; i++) {
      if (this.countryList[i].countryName == this.formGroup.value.countryId) {
        this.countryId = this.countryList[i].id;
      }
    }

    for (var i = 0; i < this.stateList.length; i++) {
      if (this.stateList[i].name == this.formGroup.value.stateId) {
        this.stateId = this.stateList[i].id;
      }
    }

    for (var i = 0; i < this.cityList.length; i++) {
      if (this.cityList[i].cityName == this.formGroup.value.cityId) {
        this.cityId = this.cityList[i].id;
      }
    }

    for (var i = 0; i < this.orgList.length; i++) {
      if (this.orgList[i].organizationName == this.formGroup.value.clientId) {
        this.clientId = this.orgList[i].id;
      }
    }

    let formData = {
      "clientId": this.clientId,
      "countryId":this.countryId,
      "stateId":this.stateId,
      "cityId":this.cityId,
      "siteName":this.formGroup.value.siteName,
      "isActiveId": this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postSiteDetails(formData)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.formGroup.reset();
                this.dialogRef.close('SAVE');
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
    }
    else {
      this.putData(formData);
    }
  }

  putData(formData: any) {
    if (this.formGroup.valid) {
      this.service.putSiteDetails(formData, this.editData.id)
        .subscribe({
          next: (res) => {
            if (res.isSuccess == true) {
              this.alertify.success(res.message);
              this.formGroup.reset;
              this.dialogRef.close('UPDATE');
            }
            else {
              alert(res.message);
            }
          },
          error: (res) => {
            this.alertify.error("500 Internal Server Error");
          }
        })
    }
  }


}
