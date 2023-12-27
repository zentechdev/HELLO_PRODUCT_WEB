import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { DeviceConfigurationService } from 'src/app/service/device-management/device-configuration.service';
import { ManageUsersService } from 'src/app/service/manage-users/manage-users.service';
import { StateService } from 'src/app/service/masters/state.service';

@Component({
  selector: 'app-device-configuration-dialog',
  templateUrl: './device-configuration-dialog.component.html',
  styleUrls: ['./device-configuration-dialog.component.css']
})
export class DeviceConfigurationDialogComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  allDeatailsList: any;
  disabled: boolean = true;
  cardReaderIpList: any;
  isActiveList: any;
  isActiveId: any;
  // putDevice: any;
  portNumberList: any;
  branchList: any;
  branchId: any;
  siteList: any;
  siteId: any;


  constructor(private service1: ManageUsersService,private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: StateService, private service2:DeviceConfigurationService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<DeviceConfigurationDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      siteId: ['', Validators.required],
      cardReaderIp: ['', Validators.required],
      portNumber :[''],
      isActive: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['siteId'].setValue(this.editData.siteName);
      this.formGroup.controls['cardReaderIp'].setValue(this.editData.cardReaderIp);
      this.formGroup.controls['portNumber'].setValue(this.editData.portNumber)
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    this.formGroup.get('siteId')?.disable();

    this.getAllDeviceDetails();
    this.getIsActive();
    this.getSiteDetails();
    // this.putDevice();

  }

  getAllDeviceDetails() {
    this.service2.getAllDeviceDetails()
      .subscribe({
        next: (res) => {
          this.allDeatailsList = res.filter((item:any)=>item.isActive=='Active');
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  
  getSiteDetails() {
    this.service1.getSiteDetails()
      .subscribe({
        next: (res) => {
          this.siteList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
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

    for (var i = 0; i < this.siteList.length; i++) {
      if (this.siteList[i].siteName == this.formGroup.get('siteId')?.value) {
        this.siteId = this.siteList[i].id;
      }
    }

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    let formGroup = {
      "id": this.formGroup.get('id')?.value,
      "siteId": this.siteId, // Get the value from the form control
      "cardReaderIp": this.formGroup.get('cardReaderIp')?.value, // Get the value from the form control
      "portNumber": this.formGroup.get('portNumber')?.value, // Get the value from the form control
      "isActiveId":this.isActiveId
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service2.postDevice(formGroup)
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
      this.putDevice(formGroup);
    }
  }

  

  putDevice(formGroup: any) {
    if (this.formGroup.valid) {
      this.service2.putDevice(formGroup,this.editData.cardReaderIp,this.editData.portNumber)
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
