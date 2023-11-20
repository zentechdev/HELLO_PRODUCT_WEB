import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { MeetingRoomTypeService } from 'src/app/service/masters/meeting-room-type.service';
import { MenuService } from 'src/app/service/masters/menu.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  isActiveId: any;
  employeeCode: any;


  constructor(private storageEncryptionService:StorageEncryptionService,private formBuilder: FormBuilder,private router:Router,private alertify:AlertifyService,private service:MenuService,@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<MenuDialogComponent>) {this.dialogRef.disableClose=true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      menuName: ['', Validators.required],
      parentId: ['', Validators.required],
      menuUrl: [''], 
      menuIcon: [''],
      type: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy:['']
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['menuName'].setValue(this.editData.menuName);
      this.formGroup.controls['parentId'].setValue(this.editData.parentId);
      this.formGroup.controls['menuUrl'].setValue(this.editData.menuUrl);
      this.formGroup.controls['menuIcon'].setValue(this.editData.menuIcon);
      this.formGroup.controls['type'].setValue(this.editData.type);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    const encryptedData = String(localStorage.getItem('memberId'));
    this.employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    this.formGroup.controls['createdBy'].setValue(this.employeeCode);

    this.getIsActive();

  }

  getIsActive() {
    this.service.getIsActive()
      .subscribe({
        next: (res) => {
          this.isActiveList = res;
          console.log(this.isActiveList);
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
      "menuName":this.formGroup.value.menuName,
      "parentId":this.formGroup.value.parentId,
      "menuUrl":this.formGroup.value.menuUrl,
      "menuIcon":this.formGroup.value.menuIcon,
      "type":this.formGroup.value.type,
      "isActiveId":this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }
    
    if (!this.editData) {
       if (this.formGroup.valid) {
        this.service.postMenuList(formData)
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
    this.service.putMenuList(formData,this.editData.menuListId)
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
