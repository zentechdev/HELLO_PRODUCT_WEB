import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { ParkingBookingService } from 'src/app/service/parking-booking/parking-booking.service';
import { BookingSlotComponent } from '../booking-slot/booking-slot.component';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-parking-booking-dialog',
  templateUrl: './parking-booking-dialog.component.html',
  styleUrls: ['./parking-booking-dialog.component.css']
})
export class ParkingBookingDialogComponent implements OnInit {
  siteId: any;
  parkingFloor:any = [];
  parkingSlot: any;
  selectedFloor: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private service: ParkingBookingService,
    private decode: StorageEncryptionService,
    private dialog: MatDialog,
    private alertify: AlertifyService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let siteId = String(localStorage.getItem('siteId'));
    this.siteId = this.decode.decryptData(siteId);
    this.getParkingDetails(this.siteId);
  }

// Fetch parking details and automatically select the first floor
getParkingDetails(siteId: any) {
  this.service.getParkingList(siteId).subscribe({
    next: (parkingList: any) => {
      if (parkingList) {
        this.parkingFloor = parkingList.parkingfloor;

        // Automatically select the first floor (e.g., "P1")
        if (this.parkingFloor && this.parkingFloor.length > 0) {
          const firstFloor = this.parkingFloor[0].floorName;
          this.selectedFloor = firstFloor;
          this.getParkingSlot(firstFloor);
        }
      }
    }
  });
}

// Fetch parking slots for the selected floor
getParkingSlot(parkingNo: any) {
  this.parkingSlot = this.parkingFloor?.find((item: any) => {
    return item.floorName == parkingNo;
  });

  if (this.parkingSlot) {
    let parkingList = this.parkingSlot.parking;

    // Set availability status for each parking slot
    for (let status of parkingList) {
      if (status.status === false && status.bookingParkingId[0] === '') {
        status.availabilityStatus = 'Available';
      } else if (status.status === false && status.bookingParkingId !== '') {
        status.availabilityStatus = 'Occupied';
      } else {
        status.availabilityStatus = 'Permanent';
      }
    }
    this.parkingSlot = parkingList;
  }
}


  openToggle(row: any) {
    if (row.availabilityStatus === 'Permanent') {
      this.snackBar.open(`${row.parkingName} is permanently booked. Please select another slot.`, 'Close', {
        duration: 3000,
        panelClass: ['snackbar-warning'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else if (row.availabilityStatus === 'Occupied') {
      this.snackBar.open(`${row.parkingName} is currently occupied. Please select another slot.`, 'Close', {
        duration: 3000,
        panelClass: ['snackbar-warning'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      this.dialog.open(BookingSlotComponent, {
        width: '30%',
        data: row,
        disableClose: true
      });
    }
   
  }

}
