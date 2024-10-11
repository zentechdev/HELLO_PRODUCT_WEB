import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
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
  
  constructor(
    private service: PermanentBookingService,
    private alertify: AlertifyService,
    @Inject(MAT_DIALOG_DATA) public editData: any, 
    private dialogRef: MatDialogRef<PermanentParkingBookingDialogComponent>) { 
      this.dialogRef.disableClose = true 
    }

  ngOnInit(): void {
    this.initiateForm();
    this.getVehicleTypeList();
  }

  initiateForm(){
    this.permanentParking = new FormGroup({
      ownerName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
      vehicleTypeId: new FormControl('', [Validators.required]),
      parkingId: new FormControl('', [Validators.required]),
      isActiveId: new FormControl('', [Validators.required])
    });
  }


  bookPermanentParking(){
    let body = {
      ownerName: this.permanentParking.get('ownerName')?.value,
      mobileNumber: this.permanentParking.get('mobileNumber')?.value,
      vehicleNumber: this.permanentParking.get('vehicleNumber')?.value,
      vehicleTypeId: this.permanentParking.get('vehicleTypeId')?.value,
      parkingId: this.permanentParking.get('parkingId')?.value,
      isActiveId: 1,
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

  selectedVehicleType(value: any){
    this.selectedVehicle = value.value;
  }
}
