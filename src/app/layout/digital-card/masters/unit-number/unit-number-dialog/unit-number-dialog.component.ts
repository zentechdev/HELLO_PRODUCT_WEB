import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { UnitNumberService } from 'src/app/service/masters/unit-number.service';


@Component({
  selector: 'app-unit-number-dialog',
  templateUrl: './unit-number-dialog.component.html',
  styleUrls: ['./unit-number-dialog.component.css']
})
export class UnitNumberDialogComponent implements OnInit {


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
  roleName: any;
  defaultSiteName: any;

  constructor(
    private storageEncryptionService: StorageEncryptionService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private alertify: AlertifyService, 
    private service: UnitNumberService, @Inject(MAT_DIALOG_DATA) public editData: any, 
    private dialogRef: MatDialogRef<UnitNumberDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    const siteName = String(localStorage.getItem('siteName'));
    this.defaultSiteName = this.storageEncryptionService.decryptData(siteName);

    this.formGroup = this.formBuilder.group({
      siteName:['', Validators.required],
      wingName:['', Validators.required],
      floorName: ['', Validators.required],
      name: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy:['']
    })

    const encryptedData = String(localStorage.getItem('memberId'));
    this.memberId = this.storageEncryptionService.decryptData(encryptedData);

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const roleName = String(localStorage.getItem("roleName"));
    this.roleName = this.storageEncryptionService.decryptData(roleName);

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.get('siteName')?.setValue(this.editData.siteId);
      this.formGroup.get('wingName')?.setValue(this.editData.wingId);
      this.formGroup.get('floorName')?.setValue(this.editData.floorId);
      this.formGroup.get('name')?.setValue(this.editData.name);
      this.formGroup.get('isActive')?.setValue(this.editData.isActive);
    }

    this.formGroup.controls['createdBy'].setValue(this.memberId);

    this.getIsActive();
    this.getSiteDetails();
    this.getSelectWing(this.defaultSiteName);
    // this.getWingDetails()
    // this.getfloorDetails();

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
          console.log('response of site details', res);
          if(this.roleName == "Master Admin"){
            this.siteList = res.data;
          }
          else if(this.roleName == "Super Admin"){
            this.siteList = res.data.filter((item:any)=>item.clientId == this.clientId);
          }
          else if(this.roleName=="Site Admin"){
            this.siteList = res.data.filter((item:any)=>
              item.clientId == this.clientId && item.id == this.siteId
          );
          console.log('site list ', this.siteList);
          }
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
          if(this.roleName == "Master Admin"){
            this.wingList = res.data;
          }
          else if(this.roleName == "Super Admin"){
            this.wingList = res.data.filter((item:any)=>item.clientId == this.clientId);
          }
          else if(this.roleName == "Site Admin"){
            this.wingList = res.data.filter((item:any)=>item.clientId == this.clientId && item.siteId == this.siteId);
            console.log('wing list data', this.wingList);
          }
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
          if(this.roleName=="Master Admin"){
            this.floorList=res.data;
          }
          else if(this.roleName=="Super Admin"){
            this.floorList=res.data.filter((item:any)=>item.clientId == this.clientId);
          }
          else if(this.roleName=="Site Admin"){
            this.floorList=res.data.filter((item:any)=>item.clientId == this.clientId && item.siteId == this.siteId);
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
      "wingId":this.formGroup.value.wingName,
      "floorId":this.formGroup.value.floorName,
      "name":this.formGroup.value.name,
      "isActiveId": this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postFloor(formGroup)
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

  getSelectWing(data: any){
    try {
      if (data !== null) {
        this.service.getWingDetails().subscribe((res: any) =>{
          if (res && res.data.length !== null) {
            this.wingList = res.data.filter((item: any) =>{
              return item.siteName == data ? item.name : null;
            });
          }
        });
      }
    } catch(error) {
      console.error('something went wrong', error);
    }
  }

  getSelectFloor(event: any){
    try {
      if (event.value !== '') {
        this.service.getfloorDetails().subscribe((res: any) =>{
          if (res && res.data.length !== null){
            // console.log('response of floor', res);
            this.floorList = res.data.filter((item: any) =>{
              return item.wingId == event.value && item.siteName == this.defaultSiteName ? item.name : null;
            });
            // console.log('floor list', this.floorList);
          }
        });
      }
    } catch(error) {
      console.error('something went wrong', error);
    }
    
  }
}