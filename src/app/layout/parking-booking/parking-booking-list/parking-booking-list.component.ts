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
  }


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

    getBookingStatusColor(bookingStatus: string): string {
      switch (bookingStatus) {
        case 'Canceled':
          return 'canceled-color';
        case 'In Progress':
          return 'in-progress-color';
        case 'Occupied':
          return 'occupied-color';
        case 'Pending':
          return 'pending-color';
        default:
          return '';
      }
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

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
}
