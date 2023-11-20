import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { MeetingRoomBookingDialogComponent } from '../meeting-room-booking-dialog/meeting-room-booking-dialog.component';
import { OccupiedMeetingRoomService } from 'src/app/service/meeting-booking/occupied-meeting-room.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { SharedService } from 'src/app/service/data/shared.service';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-meeting-room-booking-list',
  templateUrl: './meeting-room-booking-list.component.html',
  styleUrls: ['./meeting-room-booking-list.component.css']
})
export class MeetingRoomBookingListComponent implements OnInit {

  // displayedColumns: string[] = ['occupiedMeetingRoomId', 'employeeCode', 'employeeName','grade','departmentName','categoryCode','zone','branch','branchName','meetingRoomName','meetingRoomType','timeSlot','fromDate','bookingStatus','Action'];
  displayedColumns: string[] = ['occupiedMeetingRoomId', 'employeeCode', 'employeeName','grade','departmentName','categoryCode','zone','branch','branchName','meetingRoomName','meetingRoomType','fromDate','toDate','bookingStatus','Action'];
  dataSource!: MatTableDataSource<any>;
  data:any[]=[];
  filteredBranches: any;
  branchId: any;
  formGroup: any;
  value: any[] | undefined;

  async filterBranches(event: any) : Promise<void> {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches =await this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Insert: boolean = false;
  Update: boolean = false;
  Delete: boolean = false;
  Select: boolean = false;
  employeeCode: any;
  actionName:any;
  branchList: any;

  constructor(private formBuilder: FormBuilder, private storageEncryptionService: StorageEncryptionService,private sharedService:SharedService ,private router: Router, private service: OccupiedMeetingRoomService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {

    this.formGroup = await this.formBuilder.group({
      branchId: [''],
      branchName:[''],
      isActiveId:['']
    })

    this.sharedService.methodTriggered$$.subscribe(() => {
      this.getAllOccupiedMeeting();
    });

    const branchList = String(localStorage.getItem('branchList'));
    this.branchList = this.storageEncryptionService.decryptData(branchList);

    const actionName = String(localStorage.getItem('actionName'));
    this.actionName = this.storageEncryptionService.decryptData(actionName);

    const encryptedData = String(localStorage.getItem('employeeCode'));
    let employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    // Conversion of string array to number array
    const stringArrayAction: string[] = this.actionName;
    const numberArrayAction: string[] = stringArrayAction[0].split(',');

    for(let i=0; i < numberArrayAction.length;i++){
      if(numberArrayAction[i] == 'Insert'){
        this.Insert = true;
      }
    }

    for(let i=0; i < numberArrayAction.length;i++){
      if(numberArrayAction[i] == 'Update'){
        this.Update = true;
      }
    }

    for(let i=0; i < numberArrayAction.length;i++){
      if(numberArrayAction[i] == 'Delete'){
        this.Delete = true;
      }
    }

    for(let i=0; i < numberArrayAction.length;i++){
      if(numberArrayAction[i] == 'Select'){
        this.Select = true;
      }
    }

    // this.getAllBranchByEmployeeCode(employeeCode);

    await this.getAllOccupiedMeeting();
  }

  // getAllBranchByEmployeeCode(employeeCode:String){
  //   this.service.getAllBranchByEmployeeCode(employeeCode)
  //   .subscribe({
  //    next:(res)=>{
  //     this.branchList = res.filter((item: any) => item.stateName).sort((a: { stateName: string; }, b: { stateName: any; }) => a.stateName.localeCompare(b.stateName));
  //    },
  //    error:(res)=>{
  //      this.alertify.error("Error While fetching The Records!!")
  //    }
  //   })
  //  }

  openDialog() {
    this.dialog.open(MeetingRoomBookingDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SEND') {
        this.getAllOccupiedMeeting();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(MeetingRoomBookingDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllOccupiedMeeting();
      }
    })
  }

  showAllBranches() {
    this.filteredBranches = this.branchList;
  }

  selectBranch(event: any) {

    if(this.formGroup.value.branchId == "None"){
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else{
      
      // for (var i = 0; i < this.branchList.length; i++) {
      //   if (this.branchList[i].branchName == this.formGroup.value.branchId) {
      //     this.branchId = this.branchList[i].branchId;
      //   }
      // }

      this.value = this.data.filter((item: any) => item.branchName === this.formGroup.value.branchId);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
      for (let i = 0; i < this.branchList.length; i++) {
        if (this.branchList[i].branchName == this.formGroup.value.branchId) {
          let branchId = this.branchList[i].branchId;
        }
      }
    }

  }

  selectStatus1(event: any) {

    const value = this.formGroup.value.isActiveId;
    if(value == 0){
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else{
      this.value = this.data.filter((item: any) => item.bookingStatus === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
  }


  async getAllOccupiedMeeting() {

    await this.service.getAllOccupiedMeetingRoom()
      .subscribe({
        next: (res) => {

          this.data=res.filter((item:any) => {
            return this.branchList.some((branch:any) => {
              return item.branchName === branch.branchName;
            });
          });

          this.dataSource = new MatTableDataSource(
            res.filter((item:any) => {
              return this.branchList.some((branch:any) => {
                return item.branchName === branch.branchName;
              });
            })
          );

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  deleteData(rows: any) {

    let formData = {
      "occupiedMeetingRoomId": rows.occupiedMeetingRoomId,
      "employeeCode": rows.employeeCode
    }

    this.alertify.confirm('Cancel Meeting Booking', 'Are you sure to cancel booking',
      () => {
        this.service.cancelBooking(formData)
        .subscribe({
          next: (res) => {
            if (res.isSuccess == true) {
              this.alertify.success(res.message);
              this.getAllOccupiedMeeting();
            }
            else {
              this.alertify.error(res.message);
            }
          },
          error: (res) => {
            this.alertify.error("500 Internal Server Error");
          }
        })
      },
      () => {
        this.alertify.error('Cancel');
      })


  }

  getBookingStatusColor(bookingStatus: string): string {
    switch (bookingStatus) {
      case 'Canceled':
        return 'canceled-color'; // CSS class name for canceled status
      case 'In Progress':
        return 'in-progress-color'; // CSS class name for in-progress status
      case 'Occupied':
        return 'occupied-color'; // CSS class name for occupied status
      case 'Pending':
        return 'pending-color'; // CSS class name for pending status
      default:
        return ''; // Default CSS class name if no match is found
    }
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(); // Initialize the dataSource object
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
