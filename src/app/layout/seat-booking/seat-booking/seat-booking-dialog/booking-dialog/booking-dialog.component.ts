import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';

import { AlertifyService } from 'src/app/service/alertify/alertify.service';

import { OccupiedSeatService } from 'src/app/service/seat-booking/occupied-seat.service';

 

@Component({

  selector: 'app-booking-dialog',

  templateUrl: './booking-dialog.component.html',

  styleUrls: ['./booking-dialog.component.css']

})

export class BookingDialogComponent implements OnInit {

 

  branchName: any;

  seatType: any;

  seatNumber: any;

  seatId: any;

 

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,private router:Router,private service: OccupiedSeatService, private alertify: AlertifyService, private dialogRef: MatDialogRef<BookingDialogComponent>) { this.dialogRef.disableClose=true}

 

  ngOnInit(): void {

    this.getBookingDetails();

  }

 

  getBookingDetails() {

    this.branchName = this.editData.branchName;

    this.seatType = this.editData.seatType;

    this.seatNumber = this.editData.seatNumber;

    this.seatId = this.editData.seatId;

  }

 

  occupiedSeat() {

 

    let rowData = {

      "branchName": this.editData.branchName,

      "seatType": this.editData.seatType,

      "seatNumber": this.editData.seatNumber,

      "seatId": this.editData.seatId,

      "employeeCode": this.editData.employeeCode,

      "fromDate": this.editData.fromDate,

      "toDate": this.editData.toDate,

      "timeSlotId": this.editData.timeSlotId,

      "branchId": this.editData.branchId,

    }

 

    this.service.postPostOccupiedSeat(rowData)

      .subscribe({

        next: (res) => {

         if(res.isSuccess == true){

          this.alertify.success(res.message);

         

          this.dialogRef.close('SAVE');

         }

         else{

          this.alertify.error(res.message);

         }

        },

        error: (res) => {

          this.alertify.error("500 Internal Server Error");

        }

      })

  }

 

}