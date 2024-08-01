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
  roleName: any;
  defaultSiteName: any;

  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: UnitService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<UnitDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    // const siteName = String(localStorage.getItem("siteName"));
    // this.defaultSiteName = this.storageEncryptionService.decryptData(siteName);

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

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const roleName = String(localStorage.getItem("roleName"));
    this.roleName = this.storageEncryptionService.decryptData(roleName);
    
    
    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['siteName'].setValue(this.editData.siteId);
      this.formGroup.controls['wingName'].setValue(this.editData.wingId);
      this.formGroup.controls['floorName'].setValue(this.editData.floorId);
      this.formGroup.controls['unitNumberName'].setValue(this.editData.unitNumberId);
      this.formGroup.controls['name'].setValue(this.editData.name);
      this.formGroup.controls['accessId'].setValue(this.editData.accessStatus);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }
    this.formGroup.controls['createdBy'].setValue(this.memberId);

    this.getIsActive();
    this.getSiteDetails();
    // this.getWingDetails()
    // this.getfloorDetails();
    // this.getUnitDetails();

    this.getSelectDropdownRelatedFields(this.siteId);

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
            this.siteList=res.data.filter((item:any)=>item.clientId == this.clientId && item.id == this.siteId);
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
          if(this.roleName=="Master Admin"){
            this.wingList=res.data;
          }
          else if(this.roleName=="Super Admin"){
            this.wingList=res.data.filter((item:any)=>item.clientId == this.clientId);
          }
          else if(this.roleName=="Site Admin"){
            this.wingList=res.data.filter((item:any)=>item.clientId == this.clientId && item.siteId == this.siteId);
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

  getUnitDetails() {
    this.service.getUnitDetails()
      .subscribe({
        next: (res) => {
          if(this.roleName=="Master Admin"){
            this.unitNumberList=res.data;
          }
          else if(this.roleName=="Super Admin"){
            this.unitNumberList=res.data.filter((item:any)=>item.clientId == this.clientId);
          }
          else if(this.roleName=="Site Admin"){
            this.unitNumberList=res.data.filter((item:any)=>item.clientId == this.clientId && item.siteId == this.siteId);
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
      "unitNumberId":this.formGroup.value.unitNumberName,
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



  getSelectDropdownRelatedFields(data: any){
    console.log('data list', data);
    this.service.getWingDetails().subscribe((res: any) =>{
      this.wingList = res.data.filter((item: any) =>{
        console.log(item.siteName, data);
        return item.siteId == data ? item.name : null;
      });
    });
  }

  getSelectFloor(event: any){
    try {
      if (event.value !== '') {
        this.service.getfloorDetails().subscribe((res: any) =>{
          if (res && res.data.length !== null) {
            this.floorList  = res.data.filter((item: any) =>{
              return item.siteId == this.siteId && item.wingId == event.value ? item.name : null;
            });
            console.log('floor list', this.floorList);
          }
        });
      }
    }
    catch(error) {
      console.error('something went wrong');
    }
  }

  getSelectUnit(event: any){
    try {
      if (event.value !== '') {
        this.service.getUnitDetails().subscribe((res: any) =>{
          if (res && res.data.length !== null) {
            this.unitNumberList  = res.data.filter((item: any) =>{
              return item.siteId == this.siteId && item.floorId == event.value ? item.name : null;
            });
          }
        });
      }
    }
    catch(error) {
      console.error('something went wrong');
    }
  }
}