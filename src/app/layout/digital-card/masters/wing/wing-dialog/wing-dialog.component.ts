import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { WingService } from 'src/app/service/masters/wing.service';

@Component({
  selector: 'app-wing-dialog',
  templateUrl: './wing-dialog.component.html',
  styleUrls: ['./wing-dialog.component.css']
})
export class WingDialogComponent implements OnInit {

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
  siteList: any;
isActive: any;
  wingId: any;
  wingList: any;
  roleName: any;


  constructor(private storageEncryptionService:StorageEncryptionService,private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: WingService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<WingDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      siteName:['', Validators.required],
      name: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy:['']
    })

    const encryptedData = String(localStorage.getItem('memberId'));
    this.memberId = this.storageEncryptionService.decryptData(encryptedData);

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = this.storageEncryptionService.decryptData(clientId);

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = this.storageEncryptionService.decryptData(siteId);

    const roleName = String(localStorage.getItem("roleName"));
    this.roleName = this.storageEncryptionService.decryptData(roleName);

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['siteName'].setValue(this.editData.siteId);
      this.formGroup.controls['name'].setValue(this.editData.name);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }
    this.formGroup.controls['createdBy'].setValue(this.memberId);

    this.getIsActive();
    this.getSiteDetails();

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
          if(this.roleName=="Master Admin"){
            this.siteList=res.data;
          }
          else if(this.roleName=="Super Admin"){
            this.siteList=res.data.filter((item:any)=>item.clientId == this.clientId);
          }
          else if(this.roleName=="Site Admin"){
            this.siteList=res.data.filter((item:any)=>item.clientId == this.clientId && item.siteId == this.siteId);
          }
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

    let formGroup = {
      "siteId": this.formGroup.value.siteName,
      "name":this.formGroup.value.name,
      "isActiveId": this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postWing(formGroup)
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
      this.service.putWing(formGroup, this.editData.id)
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