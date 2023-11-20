import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { MeetingRoomTypeService } from 'src/app/service/masters/meeting-room-type.service';


@Component({
  selector: 'app-meeting-room-type-diloag',
  templateUrl: './meeting-room-type-diloag.component.html',
  styleUrls: ['./meeting-room-type-diloag.component.css']
})
export class MeetingRoomTypeDiloagComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  isActiveId: any;
  employeeCode: any;


  constructor(private storageEncryptionService:StorageEncryptionService,private formBuilder: FormBuilder,private router:Router,private alertify:AlertifyService,private service:MeetingRoomTypeService,@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<MeetingRoomTypeDiloagComponent>) {this.dialogRef.disableClose=true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      meetingRoomType: ['', Validators.required],
      description: [''],
      isActive: ['', Validators.required],
      createdBy:[]
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['meetingRoomType'].setValue(this.editData.meetingRoomType);
      this.formGroup.controls['description'].setValue(this.editData.description);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    const encryptedData = String(localStorage.getItem('employeeCode'));
    this.employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    this.formGroup.controls['createdBy'].setValue(this.employeeCode);

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

  postData() {

    for(var i=0; i < this.isActiveList.length;i++){
      if(this.isActiveList[i].isActive == this.formGroup.value.isActive){
        this.isActiveId=this.isActiveList[i].isActiveId;
      }
    }

    let formData = {
      "meetingRoomType":this.formGroup.value.meetingRoomType,
      "description":this.formGroup.value.description,
      "isActiveId":this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }
    
    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postMeetingRoomType(formData)
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

  putData(formData:any) {
   if(this.formGroup.valid){
    this.service.putMeetingRoomType(formData, this.editData.meetingRoomTypeId)
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
