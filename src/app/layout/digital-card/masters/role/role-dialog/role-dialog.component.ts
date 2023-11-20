import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { RoleService } from 'src/app/service/masters/role.service';


@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent implements OnInit {

  panelOpenState = false;
  formGroup!: FormGroup;
  @ViewChild('select') select!: MatSelect;
  allSelected = false;
  showExpandMoreOption = false;
  checked: Boolean = false;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  isActiveId: any;
  menuList: any;
  animals: any;

  ArrayList: any = [];
  ArrayList1: any = [];
  selected: any = [];
  list: any;



  constructor(private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: RoleService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<RoleDialogComponent>) {
    this.dialogRef.disableClose = true
  }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      roleName: ['', Validators.required],
      menuListId: this.formBuilder.control([], Validators.required),
      isActive: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['roleName'].setValue(this.editData.roleName);
      // conversion of string array to number array
      const stringArray: string[] = this.editData.menuListId;
      const numberArray: number[] = stringArray[0].split(',').map(numString => parseInt(numString));
      this.formGroup.controls['menuListId'].setValue(numberArray);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    this.getIsActive();
    this.getMenuList();

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

  getMenuList() {
    this.service.getMenuList()
      .subscribe({
        next: (res) => {
          debugger
          this.menuList = res.menuListResponse;
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

    debugger
    
    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    let formData = {
      "roleName": this.formGroup.value.roleName,
      "menuListId": this.formGroup.value.menuListId == '' ? 0 : this.formGroup.value.menuListId,
      "isActiveId": this.isActiveId
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postRole(formData)
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
      this.service.putRole(formData, this.editData.roleId)
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
