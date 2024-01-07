import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { CityService } from 'src/app/service/masters/city.service';
import { StateService } from 'src/app/service/masters/state.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  colorCodeList: any;
  disabled: boolean = true;
  colorCodeListId: any;
  isActiveList: any;
  isActiveId: any;
  memberId: any;
  countryList: any;
  countryId: any;
  clientId: any;
  stateList: any;
  stateId: any;
  orgList: any;


  constructor(private storageEncryptionService:StorageEncryptionService,private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: CityService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<CityComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      clientId: [''],
      countryId: ['',Validators.required],
      stateId: ['',Validators.required],
      cityName: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy:['']
    })

    const encryptedData = String(localStorage.getItem('memberId'));
    this.memberId = this.storageEncryptionService.decryptData(encryptedData);

    const encryptedclientId = String(localStorage.getItem('clientId'));
    this.clientId = this.storageEncryptionService.decryptData(encryptedclientId);

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['clientId'].setValue(this.editData.clientId);
      this.formGroup.controls['countryId'].setValue(this.editData.countryId);
      this.formGroup.controls['stateId'].setValue(this.editData.stateId);
      this.formGroup.controls['cityName'].setValue(this.editData.cityName);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    this.formGroup.controls['createdBy'].setValue(this.memberId);

    this.getAllOrganisation();
    this.getIsActive();
    this.getAllCountry();
    this.getState();
  }

  getAllCountry() {
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
          this.stateList=res.data;
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

  postData() {

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    let formGroup = {
      "clientId": this.formGroup.value.clientId,
      "countryId": this.formGroup.value.countryId,
      "stateId": this.formGroup.value.stateId,
      "cityName":this.formGroup.value.cityName,
      "isActiveId": this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postCity(formGroup)
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
      this.putData(formGroup);
    }
  }

  putData(formGroup: any) {
    if (this.formGroup.valid) {
      this.service.putCity(formGroup, this.editData.id)
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
