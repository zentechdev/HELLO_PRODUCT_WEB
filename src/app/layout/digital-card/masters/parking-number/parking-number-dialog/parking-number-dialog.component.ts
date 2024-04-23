import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { CityService } from 'src/app/service/masters/city.service';
import { ParkingNumberService } from 'src/app/service/masters/parking-number.service';
import { TechnologyTypeService } from 'src/app/service/masters/technology-type.service';
import { UnitService } from 'src/app/service/masters/unit.service';

@Component({
  selector: 'app-parking-number-dialog',
  templateUrl: './parking-number-dialog.component.html',
  styleUrls: ['./parking-number-dialog.component.css']
})
export class ParkingNumberDialogComponent implements OnInit {

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
  vehicleTypeList: any;
  vehicleTypeId: any;
  parkingTypeList: any;
  parkingTypeId: any;


  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: ParkingNumberService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<ParkingNumberDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      siteName: ['', Validators.required],
      wingName: ['', Validators.required],
      floorName: ['', Validators.required],
      vehicleName: ['', Validators.required],
      parkingType: ['', Validators.required],
      parkingNumber: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy: ['']
    })

    const encryptedData = String(localStorage.getItem('memberId'));
    this.memberId = this.storageEncryptionService.decryptData(encryptedData);

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['siteName'].setValue(this.editData.siteName);
      this.formGroup.controls['wingName'].setValue(this.editData.wingName);
      this.formGroup.controls['floorName'].setValue(this.editData.floorName);
      this.formGroup.controls['vehicleName'].setValue(this.editData.vehicleTypeName);
      this.formGroup.controls['parkingType'].setValue(this.editData.parkingType);  // parking data type list 
      this.formGroup.controls['parkingNumber'].setValue(this.editData.parkingNumber);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }
    this.formGroup.controls['createdBy'].setValue(this.memberId);

    this.getIsActive();
    this.getSiteDetails();
    this.getWingDetails()
    this.getfloorDetails();
    this.getVehicleType();
    this.getParkingList();
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

  getVehicleType() {
    this.service.getVehicleType()
      .subscribe({
        next: (res) => {
          this.vehicleTypeList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }

// ________________________________________________________________________

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

    for (var i = 0; i < this.vehicleTypeList.length; i++) {
      if (this.vehicleTypeList[i].name == this.formGroup.value.vehicleName) {
        this.vehicleTypeId = this.vehicleTypeList[i].id;
      }
    }

    for (var i = 0; i < this.parkingTypeList.length; i++) {
      if (this.parkingTypeList[i].name == this.formGroup.value.parkingType) {
        this.parkingTypeId = this.parkingTypeList[i].id;
      }
    }


    let formGroup = {
      "siteId": this.siteId,
      "wingId": this.wingId,
      "floorId": this.floorId,
      "vehicleTypeId": this.vehicleTypeId,
      "parkingTypeId": this.formGroup.value.parkingType,
      "parkingNumber": this.formGroup.value.parkingNumber,
      "isActiveId": this.isActiveId,
      "createdBy": this.formGroup.value.createdBy
    };

    console.log("Form data for submiting at the end test :", formGroup);

    //  Prevent this code for action.
    //   if (this.formGroup.valid) {
    //     this.service.postParkingNumber(formGroup)
    //       .subscribe({
    //         next: (res) => {
    //           if (res.isSuccess == true) {
    //             this.alertify.success(res.message);
    //             this.formGroup.reset();
    //             this.dialogRef.close('SAVE');
    //           }
    //           else {
    //             this.alertify.error(res.message);
    //           }
    //         },
    //         error: (res) => {
    //           this.alertify.error("500 Internal Server Error");
    //         }
    //       })
    //   }
    // }
    // else {
    //   this.putData(formGroup);
    // }
    

  }

  putData(formGroup: any) {
    if (this.formGroup.valid) {
      this.service.putParkingNumber(formGroup, this.editData.id)
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

  getParkingList() {
    this.service.getParkingType()
      .subscribe({
        next: (res) => {
          this.parkingTypeList = res.data;
          // console.log("PArking data >>", this.parkingTypeList);
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }
}
