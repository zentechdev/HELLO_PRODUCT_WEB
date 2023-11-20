
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { ColorCodeService } from 'src/app/service/masters/color-code.service';

@Component({
  selector: 'app-color-code',
  templateUrl: './color-code.component.html',
  styleUrls: ['./color-code.component.css']
})
export class ColorCodeComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  colorCode: any;
  isActiveList: any;
  isActiveId: any;


  constructor(private formBuilder: FormBuilder,private router:Router,private alertify:AlertifyService,private service:ColorCodeService,@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<ColorCodeComponent>) { this.dialogRef.disableClose=true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      colorCode: ['', Validators.required],
      colorCode1: [''],
      isActive: ['', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['colorCode'].setValue(this.editData.colorCode);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);

      this.colorCode= this.editData.colorCode;
    }

    this.formGroup.get('colorCode1')?.disable();

    this.getIsActive();

  }

  selectFile(event: any) {
    this.colorCode = event.target.value;
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

    let formGroup = {
      "colorCode":this.formGroup.value.colorCode,
      "isActiveId":this.isActiveId
    }

    if (!this.editData) {
       if (this.formGroup.valid) {
        this.service.postColorCode(formGroup)
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

  putData(formGroup:any) {
   if(this.formGroup.valid){
    this.service.putColorCode(formGroup, this.editData.colorCodeId)
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
