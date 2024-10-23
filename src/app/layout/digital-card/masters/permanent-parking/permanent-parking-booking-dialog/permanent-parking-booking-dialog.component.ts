import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { ParkingNumberService } from 'src/app/service/masters/parking-number.service';
import { PermanentBookingService } from 'src/app/service/masters/permanent-booking.service';

@Component({
  selector: 'app-permanent-parking-booking-dialog',
  templateUrl: './permanent-parking-booking-dialog.component.html',
  styleUrls: ['./permanent-parking-booking-dialog.component.css']
})
export class PermanentParkingBookingDialogComponent implements OnInit {
  permanentParking!: FormGroup;
  vehicleList: any;
  selectedVehicle: any;
  parkingList: any;
  unitId: any;
  statusList: any;
  employeeCode: any; 
  memberList: any;
  constructor(
    private service: PermanentBookingService,
    private alertify: AlertifyService,
    private parkingService: ParkingNumberService,
    private decode: StorageEncryptionService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any, 
    private dialogRef: MatDialogRef<PermanentParkingBookingDialogComponent>) { 
      this.dialogRef.disableClose = true;

      let unitId = String(localStorage.getItem('unitId'));
      this.unitId = this.decode.decryptData(unitId);

      let employeeCode = String(localStorage.getItem('employeeCode'));
      this.employeeCode = this.decode.decryptData(employeeCode);
      console.log(this.editData);
    }

  ngOnInit(): void {
    this.initiateForm();
    this.getVehicleTypeList();
    this.getParkingNumberList();
    this.getStatusList();
    this.getAllMemberList();
    if (this.editData !== null) {
      this.permanentParking.get('ownerName')?.setValue(this.editData?.memberName);
      this.permanentParking.get('mobileNumber')?.setValue(this.editData?.mobileNumber);
      this.permanentParking.get('vehicleNumber')?.setValue(this.editData?.vehicleNumber);
      this.permanentParking.get('vehicleTypeId')?.setValue(this.editData?.vehicleTypeId);
      this.permanentParking.get('parkingId')?.setValue(this.editData?.parkingId);
    }
  }

  initiateForm(){
    this.permanentParking = this.fb.group({
      ownerName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      vehicleNumber: [ '', [Validators.required]],
      vehicleTypeId: ['', [Validators.required]],
      parkingId: ['', [Validators.required]],
      isActiveId: ['', [Validators.required]]
    });
  }


  bookPermanentParking(){
    let body = {
      ownerName: this.permanentParking.get('ownerName')?.value,
      mobileNumber: this.permanentParking.get('mobileNumber')?.value,
      vehicleNumber: this.permanentParking.get('vehicleNumber')?.value,
      vehicleTypeId: this.permanentParking.get('vehicleTypeId')?.value,
      parkingId: this.permanentParking.get('parkingId')?.value,
      isActiveId: this.permanentParking.get('isActiveId')?.value,
      createdBy: this.employeeCode
    }

    if (this.editData == null) {
      this.service.postPermanentParkingData(body).subscribe((res: any) => {
        if(res) {
          this.alertify.success('Permanent Parking Booking Added Successfully');
          this.dialogRef.close();
        } else {
          this.alertify.error('Permanent Parking Booking failed');
        }
      })
    } else {
      this.service.updatePermanentParkingData(this.editData?.id, body).subscribe((res: any) =>{
        if(res) {
          this.alertify.success('Permanent Parking Booking Updated Successfully');
          this.dialogRef.close();
        } else {
          this.alertify.error('Permanent Parking Booking failed');
        }
      });
    }
  }

  getVehicleTypeList(){
    this.service.getVehicleDetails().subscribe((list: any) => {
      if (list) {
        this.vehicleList = list.data;
      }
    });
  }



  getParkingNumberList(){
    this.service.getAvailableParkingList().subscribe({
      next: (res: any) => {
        if (res?.isSuccess === true) {
          this.parkingList = res.parkingData.filter((item: any) => item.unitId == this.unitId);
          console.log('parking list', this.parkingList);
        } else {
          this.alertify.error(res?.message);
        }
      },
      error: (err: any) => {
        this.alertify.error(err);
      }
    });
  }

  getStatusList(){
    this.parkingService.getIsActive().subscribe({
      next: (res: any) => {
        this.statusList = res;
        if (this.editData !== null) {
          let data = res.filter((item: any) => item.isActive === this.editData?.isActive ? item.isActiveId : '');
          this.permanentParking.get('isActiveId')?.setValue(data[0]?.isActiveId);
        }
      },
      error: (err: any) => {
        this.alertify.error(err);
      }
    });
  }

  getAllMemberList(){
    this.service.getUnitMemberList().subscribe({
      next: (res: any) => {
        if (res?.isSuccess === true) {
          let data = res.data.filter((item: any) => {
            return item.unitId == this.unitId;
          });
          this.memberList = data;
        }
      }
    });
  }

  selectedMemberName(event: any){
    let value = event.value;
    for(let i = 0; i < this.memberList.length; i++) {
      if (value == this.memberList[i].memberName) {
        this.permanentParking.get('mobileNumber')?.setValue(this.memberList[i].mobileNumber);
      }
    }
  }
}
