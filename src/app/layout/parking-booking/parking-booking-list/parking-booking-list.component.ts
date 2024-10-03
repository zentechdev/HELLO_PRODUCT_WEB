import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { ParkingBookingService } from 'src/app/service/parking-booking/parking-booking.service';
import { ParkingBookingDialogComponent } from '../parking-booking-dialog/parking-booking-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-parking-booking-list',
  templateUrl: './parking-booking-list.component.html',
  styleUrls: ['./parking-booking-list.component.css']
})
export class ParkingBookingListComponent implements OnInit {
  @ViewChild('Paginator') Paginator!: MatPaginator;
  @ViewChild('Sorting') Sorting!: MatSort;
  displayBookingColumn = ['id', 'wingName', 'floorName', 'personName', 'mobileNumber', 'vehicaleNumber', 
    'parkingNumber', 'toDate', 'fromDate', 'bookingHours', 'bookingStatus', 'action'];
  parkingBookingList: any;
  siteId: any;
  dataSource!: MatTableDataSource<any>;
  value: any;
  formGroup!: FormGroup;
  constructor(
    private service: ParkingBookingService,
    private decode: StorageEncryptionService,
    public datePipe: DatePipe,
    private alertify: AlertifyService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let roleName = String(localStorage.getItem('siteId'));
    this.siteId = this.decode.decryptData(roleName)
    this.getAllOccupiedParking();
    this.formGroup = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
  }

// this function are used to fetch the parking data from api and display on the table
  getAllOccupiedParking(){
    this.service.getAllOccupiedList().subscribe({
      next: (res: any) => {
        if(res.isSuccess == true) {
          this.parkingBookingList = res.data.filter((item: any) => {
            return item.siteId === parseInt(this.siteId);
          });
          this.dataSource = new MatTableDataSource(this.parkingBookingList);
          this.dataSource.data = this.parkingBookingList;
          this.dataSource.paginator = this.Paginator;
          this.dataSource.sort = this.Sorting;
        } else {
          this.alertify.error('Erorr While Fetch data');
        }
      },
      error: (err) => {
        this.alertify.error('Internal Error');
      }
    });
  }

  // this function are used to open the parking booking popup
  open(){
    this.dialog.open(ParkingBookingDialogComponent, {
      width: '40%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'SEND') {
        this.getAllOccupiedParking();
      }
    });
  }

// this function are used to cancel the occupied parking booking slot
  cancelParkingBooking(Id:any) {
    this.alertify.confirm('Cancel Seat Booking','Are you sure to cancel your booking',() => {
      this.service.cancelParkingBooking(Id).subscribe({
        next: (res: any) => {
          if (res.isSuccess == true) {
            this.alertify.success(res.message);
            this.getAllOccupiedParking();
          } else {
              this.alertify.error(res.message); 
            }
          },
          error: (res) => {
            this.alertify.error("500 Internal Server Error");
          }
        });
      },() => {
        this.alertify.error('Cancel');
      });
    }

    // this function are used to set the css of the parking status
    getBookingStatusColor(bookingStatus: string): string {
      switch (bookingStatus) {
        case 'Canceled':
          return 'canceled-color';
        case 'Occupied':
          return 'occupied-color';
        default:
          return '';
      }
    }

    // this function are used to filter the parking data list
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  // this function are used to filter the parking data list through status wise
  selectStatus(event: any) {
    const value = event.value;
    if(value == 0){
      this.value = this.parkingBookingList;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.Paginator;
      this.dataSource.data = this.value;
    }
    else{
      this.value = this.parkingBookingList.filter((item: any) => item.bookingStatus === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.Paginator;
      this.dataSource.data = this.value;
    }
  }

  // this function are used to filter the parking data list date range wise
  getParkingDataDateRangeWise(){
    let data = {
      "startDate": this.formGroup.value.startDate.toLocaleDateString("fr-CA").split("/").reverse().join("-"),
      "endDate": this.formGroup.value.endDate.toLocaleDateString("fr-CA").split("/").reverse().join("-")
    }
    this.service.getParkingListDateWise(data).subscribe({
      next: (res: any) => {
        this.parkingBookingList = res.data;
        this.dataSource = new MatTableDataSource(this.parkingBookingList);
        this.dataSource.data = this.parkingBookingList;
        this.dataSource.paginator = this.Paginator;
        this.dataSource.sort = this.Sorting;
      },
      error: (err: any) => {
        this.alertify.error(err);
      }
    });
  }

  clearDateRange(){
    this.formGroup.reset();
    this.getAllOccupiedParking();
  }
  
}
