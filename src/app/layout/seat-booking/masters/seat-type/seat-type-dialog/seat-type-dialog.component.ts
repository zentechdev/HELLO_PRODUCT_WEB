import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { SeatTypeService } from 'src/app/service/masters/seat-type.service';


@Component({
  selector: 'app-seat-type-dialog',
  templateUrl: './seat-type-dialog.component.html',
  styleUrls: ['./seat-type-dialog.component.css']
})
export class SeatTypeDialogComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  isActiveId: any;
  employeeCode: any;


  constructor(private storageEncryptionService:StorageEncryptionService,private formBuilder: FormBuilder,private router:Router,private alertify:AlertifyService,private service:SeatTypeService,@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<SeatTypeDialogComponent>) {this.dialogRef.disableClose=true }

  async ngOnInit(): Promise<any> {
    this.formGroup = this.formBuilder.group({
      seatType: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy:['']
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['seatType'].setValue(this.editData.seatType);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    const encryptedData = String(localStorage.getItem('employeeCode'));
    this.employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    this.formGroup.controls['createdBy'].setValue(this.employeeCode);

    await this.getIsActive();

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
      "seatType":this.formGroup.value.seatType,
      "isActiveId":this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }
    
    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postSeatType(formData)
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
    this.service.putSeatType(formData, this.editData.seatTypeId)
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
