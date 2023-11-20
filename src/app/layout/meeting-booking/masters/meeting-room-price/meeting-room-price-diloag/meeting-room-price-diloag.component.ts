import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { MeetingRoomPriceService } from 'src/app/service/masters/meeting-room-price.service';
import { SeatPriceService } from 'src/app/service/masters/seat-price.service';


@Component({
  selector: 'app-meeting-room-price-diloag',
  templateUrl: './meeting-room-price-diloag.component.html',
  styleUrls: ['./meeting-room-price-diloag.component.css']
})
export class MeetingRoomPriceDiloagComponent implements OnInit {


  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  seatTypeList: any;
  branchList: any;
  isActiveId: any;
  branchId: any;
  seatTypeId: any;
  meetingRoomTypeList: any;
  meetingRoomTypeId: any;
  employeeCode: any;
  filteredBranches: any;

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }


  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: MeetingRoomPriceService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<MeetingRoomPriceDiloagComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      meetingRoomTypeId: ['', Validators.required],
      branchId: ['', Validators.required],
      pricing_per_hour: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy: []
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['meetingRoomTypeId'].setValue(this.editData.meetingRoomType);
      this.formGroup.controls['branchId'].setValue(this.editData.branchName);
      this.formGroup.controls['pricing_per_hour'].setValue(this.editData.pricing_per_hour);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    const encryptedData = String(localStorage.getItem('employeeCode'));
    this.employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    this.formGroup.controls['createdBy'].setValue(this.employeeCode);

    this.getIsActive();
    this.getAllMeetingRoomType();
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

  getAllMeetingRoomType() {
    this.service.getAllMeetingRoomType()
      .subscribe({
        next: (res) => {
          this.meetingRoomTypeList = res;
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

    for (var i = 0; i < this.meetingRoomTypeList.length; i++) {
      if (this.meetingRoomTypeList[i].meetingRoomType == this.formGroup.value.meetingRoomTypeId) {
        this.meetingRoomTypeId = this.meetingRoomTypeList[i].meetingRoomTypeId;
      }
    }

    let formData = {
      "pricing_per_hour": this.formGroup.value.pricing_per_hour,
      "branchId": this.branchId,
      "meetingRoomTypeId": this.meetingRoomTypeId,
      "createdBy": this.formGroup.value.createdBy,
      "isActiveId": this.isActiveId,
    }



    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postMeetingRoomPricing(formData)
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
      this.service.putMeetingRoomPricing(formData, this.editData.roomPricingId)
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
