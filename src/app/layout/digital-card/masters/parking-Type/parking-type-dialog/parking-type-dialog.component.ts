import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { ParkingNumberService } from 'src/app/service/masters/parking-number.service';
import { ParkingTypeService } from 'src/app/service/masters/parking-type.service';

@Component({
  selector: 'app-parking-type-dialog',
  templateUrl: './parking-type-dialog.component.html',
  styleUrls: ['./parking-type-dialog.component.css']
})
export class ParkingTypeDialogComponent implements OnInit {
  ActiveList: any;
  parkingType!: FormGroup; 
  actionbtn: String = this.editData !== null ? 'Update' : 'Submit'; 
  selectedStatusId: any;
  constructor(
    private pakingStatus: ParkingNumberService,
    private service: ParkingTypeService,
    private alertify: AlertifyService,
    @Inject(MAT_DIALOG_DATA) public editData: any, 
    private dialogRef: MatDialogRef<ParkingTypeDialogComponent>) { 
      this.dialogRef.disableClose = true 
    }

  ngOnInit(): void {
    this.initiateParkingForm();
    this.getStatusList();
    console.log(this.editData);
  }

  getStatusList(){
    this.pakingStatus.getIsActive().subscribe((list: any) => {
      if(list) {
        this.ActiveList = list;
      }
    });
  }

  initiateParkingForm(){
    this.parkingType = new FormGroup({
      type: new FormControl(this.editData?.parkingType ?? '', [Validators.required]),
      isActive: new FormControl(this.editData?.isActive ?? '', [Validators.required])
    });
  }

  selectedStatus(value: any){
    let data = this.ActiveList.find((item: any) => {
      return item.isActive == value.value ?? item.isActiveId
    });
    this.selectedStatusId = data.isActiveId; 
    console.log(this.selectedStatusId);
  }

  addParkingType(){
    let body = {
      parkingType: this.parkingType.get('type')?.value,
      isActiveId: this.selectedStatusId
    }
    if(this.editData === null) {
      this.service.postParkingType(body).subscribe({
        next: (list: any) => {
          if(list) {
            this.alertify.success(list.message);
            this.parkingType.reset();
            this.dialogRef.close('SAVE');
          } else {
            this.alertify.error(list.message);
          }
        },
        error: (error: any) => {
          this.alertify.error(error);
        }
      });
    } else {
      this.service.updateParkingType(body, this.editData?.id).subscribe((update: any) => {
        if (update) {
          this.alertify.success(update.message);
          this.dialogRef.close('SAVE');
        } else {
          this.alertify.error(update.message);
        }
      });
    }
  }
}
