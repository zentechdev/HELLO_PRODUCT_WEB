import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { OccupiedSeatService } from 'src/app/service/seat-booking/occupied-seat.service';
import { SeatBookingDialogComponent } from '../seat-booking-dialog/seat-booking-dialog.component';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { SharedService } from 'src/app/service/data/shared.service';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';

@Component({
  selector: 'app-seat-booking-list',
  templateUrl: './seat-booking-list.component.html',
  styleUrls: ['./seat-booking-list.component.css']
})
export class SeatBookingListComponent implements OnInit {

  // displayedColumns: string[] = ['occupiedSeatId', 'employeeCode', 'employeeName','grade','departmentName','categoryCode','zone','branch','branchName','seatType', 'seatNumber','timeSlot','fromDate','bookingStatus', 'Action'];
    displayedColumns: string[] = ['occupiedSeatId', 'employeeCode', 'employeeName','grade','departmentName','categoryCode','zone','branch','branchName','seatType', 'seatNumber','fromDate','toDate','bookingStatus', 'Action'];
  dataSource!: MatTableDataSource<any>;
  data:any[]=[];
  filteredBranches: any;
  branchId: any;
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

  actionName:any;
  branchList: any;
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService,private sharedService:SharedService,private router: Router, private service: OccupiedSeatService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.formGroup = await this.formBuilder.group({
      branchId: [''],
      branch: [''],
      branchName:[''],
      isActiveId:['']
    })

    this.sharedService.methodTriggered$.subscribe(() => {
      this.getAllOccupiedSeat();
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

    await this.getAllOccupiedSeat();
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

  selectBranch(event: any) {

    if(this.formGroup.value.branchId == "None"){
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else{
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

  showAllBranches() {
    this.filteredBranches = this.branchList;
  }



  openDialog() {
    this.dialog.open(SeatBookingDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SEND') {
        this.getAllOccupiedSeat();
      }
    })
  }


  editData(row: any) {
    this.dialog.open(SeatBookingDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllOccupiedSeat();
      }
    })
  }

  selectStatus(event: any) {
    for (var i = 0; i < this.branchList.length; i++) {
      if (this.branchList[i].branchName == this.formGroup.value.branchId) {
        this.branchId = this.branchList[i].branchId;
      }
    }
  }

 getAllOccupiedSeat() {
    this.service.getAllOccupiedSeat()
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
      "occupiedSeatId": rows.occupiedSeatId,
      "employeeCode": rows.employeeCode
    }

    this.alertify.confirm('Cancel Seat Booking','Are you sure to cancel your booking',
      () => {
        this.service.cancelBooking(formData)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllOccupiedSeat();
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
      }
    );
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
