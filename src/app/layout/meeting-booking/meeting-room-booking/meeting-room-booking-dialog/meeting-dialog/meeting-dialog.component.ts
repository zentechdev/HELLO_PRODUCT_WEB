import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';

import { AlertifyService } from 'src/app/service/alertify/alertify.service';

import { OccupiedMeetingRoomService } from 'src/app/service/meeting-booking/occupied-meeting-room.service';

import { OccupiedSeatService } from 'src/app/service/seat-booking/occupied-seat.service';

 

@Component({

  selector: 'app-meeting-dialog',

  templateUrl: './meeting-dialog.component.html',

  styleUrls: ['./meeting-dialog.component.css']

})

export class MeetingDialogComponent implements OnInit {

 

  branchName: any;

  meetingRoomType: any;

  meetingRoomName: any;

  meetingRoomId: any;

  facility:any;

  meetingRoomCapacity: any;

 

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,private router:Router,private service:OccupiedMeetingRoomService, private alertify: AlertifyService, private dialogRef: MatDialogRef<MeetingDialogComponent>) { this.dialogRef.disableClose=true}

 

  ngOnInit(): void {

    this.getBookingDetails();

  }

 

  getBookingDetails() {

    this.branchName = this.editData.branchName;

    this.meetingRoomType = this.editData.meetingRoomType;

    this.meetingRoomName = this.editData.meetingRoomName;

    this.meetingRoomId = this.editData.meetingRoomId;

    this.meetingRoomCapacity = this.editData.capacity;

    this.facility = this.editData.facility;

  }

 

  occupiedSeat() {

 

    let rowData = {

      "employeeCode": this.editData.employeeCode,

      "fromDate": this.editData.fromDate,

      "toDate": this.editData.toDate,

      "meetingRoomId": this.editData.meetingRoomId,

      "branchId": this.editData.branchId,

      "timeSlotId": this.editData.timeSlotId,

      "isActiveId": 1

    }

 

    this.service.postOccupiedMeeting(rowData)

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