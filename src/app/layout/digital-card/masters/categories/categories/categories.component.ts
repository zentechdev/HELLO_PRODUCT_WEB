import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { CategoryService } from 'src/app/service/masters/category.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  colorCodeList: any;
  disabled:boolean=true;
  colorCodeListId: any;
  isActiveList: any;
  isActiveId: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: CategoryService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<CategoriesComponent>) {this.dialogRef.disableClose=true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryCode: ['', Validators.required],
      colorCodeId: ['', Validators.required],
      isActive: ['', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['categoryName'].setValue(this.editData.categoryName);
      this.formGroup.controls['categoryCode'].setValue(this.editData.categoryCode);
      this.formGroup.controls['colorCodeId'].setValue(this.editData.colorCode);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    this.formGroup.get('categoryName')?.disable();

    this.getColorCode();
    this.getIsActive();

  }

  getColorCode() {
    this.service.getColorCode()
      .subscribe({
        next: (res) => {
          this.colorCodeList = res.filter((item:any)=>item.isActive=='Active');        
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
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

    for(var i=0; i < this.colorCodeList.length;i++){
      if(this.colorCodeList[i].colorCode == this.formGroup.value.colorCodeId){
        this.colorCodeListId=this.colorCodeList[i].colorCodeId;
      }
    }

    for(var i=0; i < this.isActiveList.length;i++){
      if(this.isActiveList[i].isActive == this.formGroup.value.isActive){
        this.isActiveId=this.isActiveList[i].isActiveId;
      }
    }

    let formGroup = {
      "categoryName":this.formGroup.get('categoryName')?.value,
      "categoryCode":this.formGroup.value.categoryCode,
      "colorCodeId":this.colorCodeListId,
      "isActiveId":this.isActiveId
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postCategories(formGroup)
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
      this.service.putCategories(formGroup,this.editData.categoryId)
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
