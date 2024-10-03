import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { ParkingBookingService } from 'src/app/service/parking-booking/parking-booking.service';

@Component({
  selector: 'app-booking-slot',
  templateUrl: './booking-slot.component.html',
  styleUrls: ['./booking-slot.component.css']
})
export class BookingSlotComponent implements OnInit {
  parkingBooking!: FormGroup;
  currentUserName: any;
  selectedVehicle: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private service: ParkingBookingService,
    private decodeData: StorageEncryptionService,
    private alertify: AlertifyService,
    private dialogRef: MatDialogRef<BookingSlotComponent>,
    private router: Router
  ) { 
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.initateParkingForm();
    let currentUserName = String(localStorage.getItem('memberId'));
    this.currentUserName = this.decodeData.decryptData(currentUserName);
    this.getVehicleList();
  }

  

  initateParkingForm(){
    this.parkingBooking = new FormGroup({
      ownerName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      vehicleNumber: new FormControl('', [Validators.required])
    });
  }

  
  getVehicleList(){
    this.service.getVehicleList().subscribe((res: any) => {
      if(res) {
        let vehicleType = res.data;
        for(let u = 0; u < vehicleType.length; u++) {
          if(vehicleType[u].name === this.editData?.vehicleType) {
            return this.selectedVehicle = vehicleType[u].id;
          }
        }
      }
    });
  }

  occupiedParking(){
    let body = {
      "parkingId": this.editData?.parkingId,
      "mobileNumber": this.parkingBooking.get('mobileNumber')?.value,
      "ownerName": this.parkingBooking.get('ownerName')?.value,
      "vehicleNumber": this.parkingBooking.get('vehicleNumber')?.value,
      "vehicleTypeId": this.selectedVehicle,
      "createdBy": this.currentUserName,
      "isActiveId": 1
    }

    if(this.parkingBooking.valid) {
      this.service.parkingBooking(body).subscribe({
        next: (res: any) => {
          if (res.isSuccess == true) {
            this.alertify.success('Parking-Slot Book Successfully');
            this.dialogRef.close('SAVE');
            this.router.navigate(['layout/parking-booking-list']);
          }
          else {
            this.alertify.error(res.message);
          }
        },
        error: (res) => {
          this.alertify.error("500 Internal Server Error");
        }
      })
    } else {
      this.alertify.error('Please Fill required Details');
    }
  }
}
