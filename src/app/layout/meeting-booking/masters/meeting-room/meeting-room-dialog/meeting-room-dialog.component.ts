import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { MeetingRoomService } from 'src/app/service/masters/meeting-room.service';



@Component({
  selector: 'app-meeting-room-dialog',
  templateUrl: './meeting-room-dialog.component.html',
  styleUrls: ['./meeting-room-dialog.component.css']
})
export class MeetingRoomDialogComponent implements OnInit {
  panelOpenState = false;
  @ViewChild('select') select!: MatSelect;
  allSelected = false;
  showExpandMoreOption = false;
  checked: Boolean = false;

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  branchList: any;
  isActiveId: any;
  branchId: any;
  facilityList: any;
  facilityId: any;
  meetingRoomTypeList: any;
  meetingRoomTypeId: any;
  selected: any = [];
  ArrayList: any = [];
  employeeCode: any;

  filteredBranches: any;

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }


  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: MeetingRoomService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<MeetingRoomDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      meetingRoomTypeId: ['', Validators.required],
      branchId: ['', Validators.required],
      facilityId: this.formBuilder.control([], Validators.required),
      meetingRoomName: ['', Validators.required],
      capacity: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy: []
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['meetingRoomTypeId'].setValue(this.editData.meetingRoomType);
      this.formGroup.controls['branchId'].setValue(this.editData.branchName);
      // conversion of string array to number array
      const stringArray: string[] = this.editData.facility;
      const numberArray: number[] = stringArray[0].split(',').map(numString => parseInt(numString));
      this.formGroup.controls['facilityId'].setValue(numberArray);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
      this.formGroup.controls['meetingRoomName'].setValue(this.editData.meetingRoomName);
      this.formGroup.controls['capacity'].setValue(this.editData.capacity);
    }

    const encryptedData = String(localStorage.getItem('employeeCode'));
    this.employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    this.formGroup.controls['createdBy'].setValue(this.employeeCode);

    this.getIsActive();
    this.getAllMeetingRoomType();
    this.getBranch();
    this.getAllFacility();

  }

  toggleAllSelectionMenu() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
      // this.getActionList();
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }

  }
  optionClickMenu() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
    // this.getActionList();
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

  showAllBranches() {
    this.filteredBranches = this.branchList;
  }

  getAllFacility() {
    this.service.getAllFacility()
      .subscribe({
        next: (res) => {
          this.facilityList = res.filter((item:any)=>item.isActive=='Active');
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
          this.meetingRoomTypeList = res.filter((item:any)=>item.isActive=='Active');
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
          this.branchList = res.filter((item:any)=>item.isActive=='Active');
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

    for (var i = 0; i < this.facilityList.length; i++) {
      if (this.facilityList[i].facilities == this.formGroup.value.facilityId) {
        this.facilityId = this.facilityList[i].facilityId;
      }
    }

    let formData = {
      "meetingRoomName": this.formGroup.value.meetingRoomName,
      "capacity": this.formGroup.value.capacity,
      "branchId": this.branchId,
      "facilityId": this.formGroup.value.facilityId == '' ? 0 : this.formGroup.value.facilityId,
      "meetingRoomTypeId": this.meetingRoomTypeId,
      "createdBy": this.formGroup.value.createdBy,
      "isActiveId": this.isActiveId,
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postMeetingRoom(formData)
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
      this.service.putMeetingRoom(formData, this.editData.meetingRoomId)
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
