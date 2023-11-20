import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { MeetingRoomAccessService } from 'src/app/service/permissions/meeting-room-access.service';
import { VisitingCardAccessService } from 'src/app/service/permissions/visiting-card-access.service';

@Component({
  selector: 'app-meeting-room-access-dialog',
  templateUrl: './meeting-room-access-dialog.component.html',
  styleUrls: ['./meeting-room-access-dialog.component.css']
})
export class MeetingRoomAccessDialogComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  colorCodeList: any;
  disabled: boolean = true;
  colorCodeListId: any;
  isActiveList: any;
  isActiveId: any;


  constructor(private formBuilder: FormBuilder, private alertify: AlertifyService, private service:MeetingRoomAccessService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<MeetingRoomAccessDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      employeeCode: [''],
      employeeName: [''],
      branchName: [''],
      departmentName: [''],
      isActive: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['employeeCode'].setValue(this.editData.employeeCode);
      this.formGroup.controls['branchName'].setValue(this.editData.branchName);
      this.formGroup.controls['departmentName'].setValue(this.editData.departmentName);
      this.formGroup.controls['employeeName'].setValue(this.editData.employeeName);
      this.formGroup.controls['isActive'].setValue(this.editData.meetingRoomStatus);
    }

    this.formGroup.get('employeeCode')?.disable();
    this.formGroup.get('branchName')?.disable();
    this.formGroup.get('departmentName')?.disable();
    this.formGroup.get('employeeName')?.disable();

    this.getIsActive();

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


  putData() {

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    let formGroup = {
      "status": this.isActiveId
    }

    if (this.formGroup.valid) {
      this.service.updateMeetingRoomStatus(formGroup, this.editData.employeeCode)
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
