import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { UserManagementService } from 'src/app/service/device-management/user-management.service';


@Component({
  selector: 'app-user-management-dialog',
  templateUrl: './user-management-dialog.component.html',
  styleUrls: ['./user-management-dialog.component.css']
})
export class UserManagementDialogComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  allDeatailsList: any;
  disabled: boolean = true;
  cardReaderIpList: any;
  isActiveList: any;
  isActiveId: any;
  // putDevice: any;
  portNumberList: any;
  branchList: any;
  // branchId: any;
  BranchId: any;
  branchId: any;
  filteredBranches: any;

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }


  constructor(private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service:UserManagementService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<UserManagementDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      branchId: ['', Validators.required],
      userId: ['', Validators.required],
      name: ['', Validators.required],
      isActive :['',Validators.required],
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['branchId'].setValue(this.editData.branchName);
      this.formGroup.controls['userId'].setValue(this.editData.userId);
      this.formGroup.controls['name'].setValue(this.editData.name);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);

      this.formGroup.get('branchId')?.disable();
      this.formGroup.get('userId')?.disable();
      this.formGroup.get('name')?.disable();
    }

    // this.formGroup.get('branchId')?.disable();

    this.getAllManageUsers();
    this.getIsActive();
    this.getAllBranch();

  }

  getAllBranch() {
    this.service.getAllBranch()
      .subscribe({
        next: (res) => {
          this.branchList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  showAllBranches() {
    this.filteredBranches = this.branchList;
  }

  getAllManageUsers() {
    this.service.getAllManageUsers()
      .subscribe({
        next: (res) => {
          this.allDeatailsList = res.filter((item:any)=>item.isActive=='Active');
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

  selectStatus(event:any,){
    let branchId = this.formGroup.value.branchId;
    this.getAllManageUsers();
  }

  postData() {

    for (var i = 0; i < this.branchList.length; i++) {
      if (this.branchList[i].branchName == this.formGroup.get('branchId')?.value) {
        this.branchId = this.branchList[i].branchId;
      }
    }

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    let formGroup = {
      "BranchId": this.branchId, 
      "UserId": this.formGroup.get('userId')?.value,
      "Name": this.formGroup.get('name')?.value,
      "IsActiveId":this.isActiveId
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postDevice(formGroup)
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

  putData(formGroup: any) {
    if (this.formGroup.valid) {
      this.service.putThirdPartyUsers(formGroup, this.editData.id)
        .subscribe({
          next: (res: any) => {
            if (res.isSuccess === true) {
              this.alertify.success(res.message);
              this.formGroup.reset();
              this.dialogRef.close('UPDATE');
            } else {
              alert(res.message);
            }
          },
          error: (error: any) => {
            this.alertify.error("500 Internal Server Error");
          }
        });
    }
  }

}
