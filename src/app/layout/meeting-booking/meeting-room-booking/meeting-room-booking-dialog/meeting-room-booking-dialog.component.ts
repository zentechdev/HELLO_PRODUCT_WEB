import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { MeetingDialogComponent } from './meeting-dialog/meeting-dialog.component';
import { OccupiedMeetingRoomService } from 'src/app/service/meeting-booking/occupied-meeting-room.service';
import { SharedService } from 'src/app/service/data/shared.service';
import { Employee } from 'src/app/model/visiting-card/employee';
import { debounceTime, map, startWith } from 'rxjs';

@Component({
  selector: 'app-meeting-room-booking-dialog',
  templateUrl: './meeting-room-booking-dialog.component.html',
  styleUrls: ['./meeting-room-booking-dialog.component.css']
})
export class MeetingRoomBookingDialogComponent implements OnInit {
  formGroup!: FormGroup;
  actionBtn: string = 'BOOK NEW MEEING';
  branchList: any;
  isActiveId: any;
  branchId: any;
  timeSlotList: any;
  timeSlotId: any;
  fromDate: any;
  employeeList: any;
  formData: any;
  rows: any = [];
  seatsPerRow = 6; // adjust to your needs
  options: any;
  finaldata: any;
  pendingCount: any;
  filteredBranches: any;
  minDate: string;

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
    return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });

  }

  constructor(private sharedService: SharedService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private alertify: AlertifyService, private service: OccupiedMeetingRoomService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<MeetingRoomBookingDialogComponent>) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(today.getDate()).padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;

    this.service.getAllEmployee().subscribe(item => {
      this.options = item;
    }),
      this.dialogRef.disableClose = true
  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      branchId: ['', Validators.required],
      timeSlotId: [1, Validators.required],
      employeeCode: ['', Validators.required],
      // fromDate: ['', Validators.required],
      fromDate: new FormControl('', [Validators.required]),
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]]
    });

    this.finaldata = this.formGroup.get("employeeCode")?.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map((item: any) => {
        const employeeCode = item;
        return employeeCode ? this._filter(employeeCode as number) : this.options
      })
    )
    this.getAllBranch();
    // this.getAllEmployee();
  }
  showAllBranches() {
    this.filteredBranches = this.branchList;
  }


  private _filter(employeeCode: number): Employee[] {
    const filterValue = employeeCode.toString();
    return this.options.filter((opt: { employeeCode: { toString: () => string | string[]; }; }) => opt.employeeCode.toString().includes(filterValue));
  }
  // dateEvent(event: any) {
  //   this.fromDate = event.target.value;
  //   this.getAllTimeSlot(this.fromDate);
  // }
  
  dateEvent(event: any) {
    this.formData = event.target.value;
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset the time to midnight
    // Check if the selected date is before the current dat
    if (selectedDate.getTime() < currentDate.getTime()) {
      this.formGroup.controls['fromDate'].setErrors({ 'invalidDate': true });
      this.timeSlotList = [];
    } else {
      // Clear any previous errors
      this.getAllTimeSlot(event.target.value);
      this.formGroup.controls['fromDate'].setErrors(null);
    }
  }
// getAllEmployee() {
  //   this.service.getAllEmployee()
  //     .subscribe({
  //       next: (res) => {
  //         this.employeeList = res.filter((item: any) => item.categoryCode == 'CAT 1');
  //       },
  //       error: (res) => {
  //         this.alertify.error("Error While fetching The Records!!")
  //       }
  //     })
  // }
  getAllBranch() {
    this.service.getAllBranch()
      .subscribe({
        next: (res) => {
          this.branchList = res.filter((item: any) => item.meetingRoomStatus == true);
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }
  getAllTimeSlot(date: any) {
    this.service.getTimeSlot(date,this.formGroup.value.employeeCode)
      .subscribe({
        next: (res) => {
          if (res.data.length > 0) {
            this.timeSlotList = res.data;
            this.pendingCount = res.pendingCount;
          }
          else {
            this.alertify.alert("TIME SLOT", "NO TIME SLOT AVILABLE FOR YOUR SELECTED DATE!!!");
          }
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }
  // function to clear the array
  clearArray() {
    this.rows = []; // assigning an empty array to clear existing elements
  }
  clearFields(){
    this.formGroup.controls['branchId'].setValue('');
    this.formGroup.controls['timeSlotId'].setValue('');
    this.formGroup.controls['fromDate'].setValue('');
    this.formGroup.controls['startTime'].setValue('');
    this.formGroup.controls['endTime'].setValue('');
    this.clearArray();
  }
  validateTimeRange(): boolean {
    // Convert fromDate and toDate to JavaScript Date objects
    const fromDateTime = new Date(this.formGroup.value.fromDate + "T" + this.formGroup.value.startTime + "Z").toISOString();
    const toDateTime =  new Date(this.formGroup.value.fromDate + "T" + this.formGroup.value.endTime + "Z").toISOString();
    // Set the opening and closing time boundaries
    const openingTime = new Date(this.formGroup.value.fromDate + "T" + "09:30:00" + "Z").toISOString();
    const closingTime = new Date(this.formGroup.value.fromDate + "T" + "19:30:00" + "Z").toISOString();
    // Check if the time range falls within the specified boundaries
    if (fromDateTime >= openingTime && toDateTime <= closingTime && toDateTime > fromDateTime) {
      return true;
    } else {
      return false;
    }
  }
  getAllAvilableMeetingRoom() {
    var value =  this.validateTimeRange();
    if(value == true){
      if (this.formGroup.valid) {
        for (var i = 0; i < this.branchList.length; i++) {
          if (this.branchList[i].branchName == this.formGroup.value.branchId) {
            this.branchId = this.branchList[i].branchId;
          }
        }
        // for (var i = 0; i < this.timeSlotList.length; i++) {
        //   if (this.timeSlotList[i].timeSlot == this.formGroup.value.timeSlotId) {
        //     this.timeSlotId = this.timeSlotList[i].timeSlotId;
        //   }
        // }
        this.formData = {
          "branchId": this.branchId,
          "timeSlotId": this.formGroup.value.timeSlotId,
          "employeeCode": this.formGroup.value.employeeCode,
          "fromDate": new Date(this.formGroup.value.fromDate + "T" + this.formGroup.value.startTime + "Z").toISOString(),
          "toDate": new Date(this.formGroup.value.fromDate + "T" + this.formGroup.value.endTime + "Z").toISOString()
        }
        this.service.getAllAvilableMeetingRoom(this.formData)
          .subscribe({
            next: (res) => {
              this.clearArray();
              if (res.data.length>0 ) {
                let meetingRoomList = res.data.filter((item:any)=> item.isActive == 'Active')
                for (let i = 0; i < meetingRoomList.length; i += this.seatsPerRow) {
                  let row = [];
                  for (let j = i; j < i + this.seatsPerRow; j++) {
                    if (j < meetingRoomList.length) {
                      row.push(meetingRoomList[j]);
                    }
                  }
                  this.rows.push(row);
                }
              }
              else {
                this.alertify.alert("ROOM DETAILS",res.message);
              }
            },
            error: (res) => {
              this.alertify.error("500 Internal Server Error");
            }
          })
      }
    }
    else{
      this.alertify.alert("Invalid Time Range", "Please select a time range between 9:30 AM and 7:30 PM");
    }
  }
  openBookingDialog(row: any) {
    //concatinate two diffrent objects
    let rowData = { ...row, ...this.formData };
    this.dialog.open(MeetingDialogComponent, {
      data: rowData,
      width: '20%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.formGroup.reset();
        this.clearArray();
        this.dialog.closeAll();
        this.sharedService.triggerGetMeetingBooking();
      }
    })
  }
}