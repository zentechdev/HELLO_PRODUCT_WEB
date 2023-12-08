import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { UnitService } from 'src/app/service/masters/unit.service';

@Component({
  selector: 'app-unit-dialog',
  templateUrl: './unit-dialog.component.html',
  styleUrls: ['./unit-dialog.component.css']
})
export class UnitDialogComponent implements OnInit {

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
  siteId: any;
  siteName: any;
  wingName: any;
  siteList: any;
  isActive: any;
  wingId: any;
  wingList: any;
  floor: any;
  floorList: any;
  floorId: any;
  id: any;
  floorNumberList: any;
  unitNumberList: any;


  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: UnitService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<UnitDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      siteName:['', Validators.required],
      wingName:['', Validators.required],
      floorName: ['', Validators.required],
      unitNumberName:['', Validators.required],
      name: ['', Validators.required],
      accessId: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy:['']
    })

    const encryptedData = String(localStorage.getItem('memberId'));
    this.memberId = this.storageEncryptionService.decryptData(encryptedData);

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['siteName'].setValue(this.editData.siteName);
      this.formGroup.controls['wingName'].setValue(this.editData.wingName);
      this.formGroup.controls['floorName'].setValue(this.editData.floorName);
      this.formGroup.controls['unitNumberName'].setValue(this.editData.unitNumberName);
      this.formGroup.controls['name'].setValue(this.editData.name);
      this.formGroup.controls['accessId'].setValue(this.editData.accessStatus);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }
    this.formGroup.controls['createdBy'].setValue(this.memberId);

    this.getIsActive();
    this.getSiteDetails();
    this.getWingDetails()
    this.getfloorDetails();
    this.getUnitDetails();

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
  
  getSiteDetails() {
    this.service.getSiteDetails()
      .subscribe({
        next: (res) => {
          this.siteList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }


  

  getWingDetails() {
    this.service.getWingDetails()
      .subscribe({
        next: (res) => {
          this.wingList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }

  getfloorDetails() {
    this.service.getfloorDetails()
      .subscribe({
        next: (res) => {
          this.floorList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }

  getUnitDetails() {
    this.service.getUnitDetails()
      .subscribe({
        next: (res) => {
          this.unitNumberList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }

  

  postData() {

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    for (var i = 0; i < this.siteList.length; i++) {
      if (this.siteList[i].siteName == this.formGroup.value.siteName) {
        this.siteId = this.siteList[i].id;
      }
    }

    for (var i = 0; i < this.wingList.length; i++) {
      if (this.wingList[i].name == this.formGroup.value.wingName) {
        this.wingId = this.wingList[i].id;
      }
    }

    for (var i = 0; i < this.floorList.length; i++) {
      if (this.floorList[i].name == this.formGroup.value.floorName) {
        this.floorId = this.floorList[i].id;
      }
    }

    for (var i = 0; i < this.unitNumberList.length; i++) {
      if (this.unitNumberList[i].name == this.formGroup.value.unitNumberName) {
        this.id = this.unitNumberList[i].id;
      }
    }

    let formGroup = {
      "siteId": this.siteId,
      "wingId":this.wingId,
      "floorId":this.floorId,
      "unitNumberId":this.id,
      "accessId":this.formGroup.value.accessId === 'Yes' ? 1 : 2,
      "name":this.formGroup.value.name,
      "isActiveId": this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postUnit(formGroup)
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
      this.service.putUnit(formGroup, this.editData.id)
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