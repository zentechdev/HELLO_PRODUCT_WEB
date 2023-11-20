import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { BrochureTypeService } from 'src/app/service/masters/brochure-type.service';

@Component({
  selector: 'app-brouchure-type',
  templateUrl: './brouchure-type.component.html',
  styleUrls: ['./brouchure-type.component.css']
})
export class BrouchureTypeComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  isActiveId: any;


  constructor(private formBuilder: FormBuilder,private router:Router,private alertify:AlertifyService,private service:BrochureTypeService,@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<BrouchureTypeComponent>) {this.dialogRef.disableClose=true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      brochureType: ['', Validators.required],
      isActive: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['brochureType'].setValue(this.editData.brochureType);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

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
      "brochureType":this.formGroup.value.brochureType,
      "isActiveId":this.isActiveId
    }
    
    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postBrochureType(formData)
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
    this.service.putBrochureType(formData, this.editData.brochureTypeId)
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
