import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { PermanentSeatService } from 'src/app/service/masters/permanent-seat.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-permanent-booking-dialog',
  templateUrl: './permanent-booking-dialog.component.html',
  styleUrls: ['./permanent-booking-dialog.component.css']
})
export class PermanentBookingDialogComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  isActiveId: any;
  employeeCode: any;
  employeeList: any;
  seatList: any;
  branchList: any;
  branchId!: any;
  filteredBranches: any;
  filterTerm: string = '';

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }


  constructor(private service1: DashboardService,private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: PermanentSeatService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<PermanentBookingDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      seatId: ['', Validators.required],
      branchId: ['', Validators.required],
      // fromDate: ['', Validators.required],
      // toDate: ['', Validators.required],
      employeeCode: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy: []
    })

    if (this.editData) {

      this.actionBtn = 'UPDATE';

      this.formGroup.get('seatId')?.disable();
      this.formGroup.get('branchId')?.disable();
      this.formGroup.get('employeeCode')?.disable();

      this.service.getAllBranch()
      .subscribe({
        next: (res) => {
          this.branchList = res;

          if(this.editData){
            for(var i=0;i < res.length;i++){
              if(res[i].branchName == this.editData.branch){
                this.branchId = res[i].branchId;
                
              }
            }
          }      
         this.formGroup.controls['branchId'].setValue(this.branchId);
        }
      })

      this.service.getAllSeat()
      .subscribe({
        next:(res)=>{
          this.seatList=res;
          this.formGroup.controls['seatId'].setValue(this.editData.seatId);
        }
      })

      this.service.getAllEmployee()
      .subscribe({
        next:(res)=>{
          this.employeeList=res;
          this.formGroup.controls['employeeCode'].setValue(this.editData.employeeCode);
        }
      })



      // Split dateTime string and take the date part
      if(this.editData.fromDate!==null){
        const fromDate = this.editData.fromDate.split('T')[0]; // yyyy-mm-dd
        this.formGroup.controls['fromDate'].setValue(fromDate);
      }

      if(this.editData.toDate !==null){
        const toDate = this.editData.toDate.split('T')[0]; // yyyy-mm-dd
        this.formGroup.controls['toDate'].setValue(toDate);
      }

      // Set date values in the form controls
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);

    }

    const encryptedData = String(localStorage.getItem('employeeCode'));
    this.employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    const branchList = String(localStorage.getItem('branchList'));
    this.branchList = this.storageEncryptionService.decryptData(branchList);

    this.formGroup.controls['createdBy'].setValue(this.employeeCode);

    this.getIsActive();
    // this.getAllBranch();
  }

  showAllBranches() {
    this.filteredBranches = this.branchList;
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

  selectStatus(event:any){
    let branchId = this.formGroup.value.branchId;
    this.getAllAvilableSeat(branchId);
  }

  // getAllBranch() {
  //   this.service.getAllBranch()
  //     .subscribe({
  //       next: (res) => {
  //         this.branchList = res.filter;
  //       },
  //       error: (res) => {
  //         this.alertify.error("Error While fetching The Records!!")
  //       }
  //     })
  // }

  getAllAvilableSeat(branchId:Number) {
    this.service.getAllAvilableSeat(branchId)
      .subscribe({
        next: (res) => {
          this.seatList = res;
          this.getAllAvilableEmployee(branchId);
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllAvilableEmployee(branchId:Number) {
    this.service.getAllAvilableEmployee()
      .subscribe({
        next: (res) => {
          this.employeeList = res.filter((data:any)=>data.branchId==branchId);
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


    let formData = {
      "seatId": this.formGroup.get('seatId')?.value,
      // "fromDate": this.formGroup.value.fromDate,
      // "toDate": this.formGroup.value.toDate,
      "employeeCode": this.formGroup.get('employeeCode')?.value,
      "createdBy": this.formGroup.value.createdBy,
      "isActiveId": this.isActiveId,
    }


    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postPermanentSeat(formData)
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
      this.service.putPermanentSeat(formData, this.editData.id)
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
