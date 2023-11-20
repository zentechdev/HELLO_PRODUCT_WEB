import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { SeatPriceService } from 'src/app/service/masters/seat-price.service';


@Component({
  selector: 'app-seat-price-dialog',
  templateUrl: './seat-price-dialog.component.html',
  styleUrls: ['./seat-price-dialog.component.css']
})
export class SeatPriceDialogComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  seatTypeList: any;
  branchList: any;
  isActiveId: any;
  branchId: any;
  seatTypeId: any;
  employeeCode: any;
  filteredBranches: any;

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }

  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: SeatPriceService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<SeatPriceDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      seatTypeId: ['', Validators.required],
      branchId: ['', Validators.required],
      pricing_per_hour: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy: []
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['seatTypeId'].setValue(this.editData.seatType);
      this.formGroup.controls['branchId'].setValue(this.editData.branchName);
      this.formGroup.controls['pricing_per_hour'].setValue(this.editData.pricing_per_hour);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    const encryptedData = String(localStorage.getItem('employeeCode'));
    this.employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    this.formGroup.controls['createdBy'].setValue(this.employeeCode);

    this.getIsActive();
    this.getSeatType();
    this.getBranch();

  }

  showAllBranches() {
    this.filteredBranches = this.branchList;
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

  getSeatType() {
    this.service.getSeatType()
      .subscribe({
        next: (res) => {
          this.seatTypeList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getBranch() {
    this.service.getBranch()
      .subscribe({
        next: (res) => {
          this.branchList = res;
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

    for (var i = 0; i < this.branchList.length; i++) {
      if (this.branchList[i].branchName == this.formGroup.value.branchId) {
        this.branchId = this.branchList[i].branchId;
      }
    }

    for (var i = 0; i < this.seatTypeList.length; i++) {
      if (this.seatTypeList[i].seatType == this.formGroup.value.seatTypeId) {
        this.seatTypeId = this.seatTypeList[i].seatTypeId;
      }
    }

    let formData = {
      "pricing_per_hour": this.formGroup.value.pricing_per_hour,
      "branchId": this.branchId,
      "seatTypeId": this.seatTypeId,
      "createdBy": this.formGroup.value.createdBy,
      "isActiveId": this.isActiveId,
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postSeatPrice(formData)
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
      this.service.putSeatPrice(formData, this.editData.pricingId)
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
