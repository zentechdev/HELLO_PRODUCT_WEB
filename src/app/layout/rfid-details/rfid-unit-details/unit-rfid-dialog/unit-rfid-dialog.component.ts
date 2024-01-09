import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { RfidUnitService } from 'src/app/service/rfid-details/rfid-unit.service';

@Component({
  selector: 'app-unit-rfid-dialog',
  templateUrl: './unit-rfid-dialog.component.html',
  styleUrls: ['./unit-rfid-dialog.component.css']
})
export class UnitRfidDialogComponent implements OnInit {

  @ViewChild('select') select!: MatSelect;

  allSelected1 = false;

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
  unitList: any;
  unitid: any;
  rfidList: any;


  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service:RfidUnitService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<UnitRfidDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      unitId:['', Validators.required],
      rfidId:['', Validators.required],
      isActive: ['', Validators.required],
      createdBy:['']
    })

    const encryptedData = String(localStorage.getItem('memberId'));
    this.memberId = this.storageEncryptionService.decryptData(encryptedData);

    const clientId = String(localStorage.getItem("siteId"));
    this.siteId = this.storageEncryptionService.decryptData(clientId);

    // if (this.editData) {
    //   this.actionBtn = 'UPDATE';
    //   this.formGroup.controls['siteName'].setValue(this.editData.siteName);
    //   this.formGroup.controls['wingName'].setValue(this.editData.wingName);
    //   this.formGroup.controls['floorName'].setValue(this.editData.floorName);
    //   this.formGroup.controls['unitNumberName'].setValue(this.editData.unitNumberName);
    //   this.formGroup.controls['name'].setValue(this.editData.name);
    //   this.formGroup.controls['accessId'].setValue(this.editData.accessStatus);
    //   this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    // }

    this.formGroup.controls['createdBy'].setValue(this.memberId);

    this.getIsActive();
    this.getAllUnit();
    this.getAllRfidBySiteId();

  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected1 = newStatus;
  }

  toggleAllSelection() {
    if (this.allSelected1) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
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
  
  getAllRfidBySiteId() {
    this.service.getAllRfidBySiteId(this.siteId)
      .subscribe({
        next: (res) => {
          this.rfidList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }


  getAllUnit() {
    this.service.getAllUnit()
      .subscribe({
        next: (res) => {
          this.unitList = res.data;
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

    for (var i = 0; i < this.unitList.length; i++) {
      if (this.unitList[i].name == this.formGroup.value.unitId) {
        this.unitid = this.unitList[i].id;
      }
    }


    let formGroup = {
      "unitId": this.unitid,
      "rfidId":this.formGroup.value.rfidId,
      "isActiveId": this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }

;

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postRFIDdetails(formGroup)
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
      this.service.putRFIDdetails(formGroup, this.editData.id)
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
