import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PermanentParkingBookingDialogComponent } from '../permanent-parking-booking-dialog/permanent-parking-booking-dialog.component';
import { PermanentBookingService } from 'src/app/service/masters/permanent-booking.service';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';

@Component({
  selector: 'app-permanent-parking-booking-list',
  templateUrl: './permanent-parking-booking-list.component.html',
  styleUrls: ['./permanent-parking-booking-list.component.css']
})
export class PermanentParkingBookingListComponent implements OnInit {
  
  displayedColumns: any = ['id', 'siteName', 'unitName', 'unitNumber', 'parkingNumber', 'memberName', 'isActive','action'];
  AvilableParkingColumns: any = ['id', 'siteName', 'unitName', 'unitNumber', 'parkingNumber', 'vehicleType'];
  @ViewChild(MatPaginator) Paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort; 
  dataSource!: MatTableDataSource<any>;
  permanentParkingList: any;
  roleName: any;
  unitId: any;
  availableParkingList: any;
  availableParkingTableList!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) Paginator1!: MatPaginator;
  @ViewChild(MatSort) Sort1!: MatSort; 
  value: any;
  constructor(
    private dialog: MatDialog,
    private service: PermanentBookingService,
    private alertify: AlertifyService,
    private encryptedData: StorageEncryptionService,
  ) { }

  ngOnInit(): void {
    let roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.encryptedData.decryptData(roleName);

    let unitId = String(localStorage.getItem('unitId'));
    this.unitId = this.encryptedData.decryptData(unitId);
    
    this.getPermanentBookingList();
    this.getAllAvilableParking();
  }

  openDialog() {
    this.dialog.open(PermanentParkingBookingDialogComponent, {
      width: '50%',
      disableClose: true
    }).afterClosed().subscribe((res: any) => {
      this.getPermanentBookingList();
      this.getAllAvilableParking();
    });
  }

  getPermanentBookingList(){
    this.service.getPermanentParkingList().subscribe({
      next: (res: any) => {
        if(res.isSuccess === true) {
          this.permanentParkingList = res.data.filter((item: any) => item.unitId == this.unitId);
          this.dataSource = new MatTableDataSource(this.permanentParkingList);
          this.dataSource.data = this.permanentParkingList;
          this.dataSource.paginator = this.Paginator1;
          this.dataSource.sort = this.Sort;
        } else {
          this.alertify.success(res.message)
        }
      },
      error: (err) => {
        this.alertify.error(err);
      }
    });
  }

  editData(data: any){
    this.dialog.open(PermanentParkingBookingDialogComponent, {
      width: '50%',
      data: data,
      disableClose: true
    }).afterClosed().subscribe((res: any) => {
      if (res === 'SAVE') {
        this.getPermanentBookingList();
      }
    });
  }

  deleteData(Id: any){
    this.alertify.confirm('Delete Permanent Parking', 'Are you sure do you really want to delete',
      ()=>{
        this.service.deletePermanentParking(Id).subscribe({
          next: (res: any) => {
            if (res?.isSuccess == true) {
              this.alertify.success('Permanent Parking Deleted Successfully');
              this.getPermanentBookingList();
              this.getAllAvilableParking();
            } else {
              this.alertify.error('Permanent Parking Deleted Faild');
            }
          },
          error: (err) => {
            this.alertify.error(err);
          }
        });
      },
      ()=>{
        this.alertify.error('Delete Cancel');
      });
  }

  // avalilable parking data function
  getAllAvilableParking(){
    this.service.getAvailableParkingList().subscribe({
      next: (res: any) => {
        if (res?.isSuccess === true) {
          this.availableParkingList = res.parkingData.filter((item: any) => item.unitId == this.unitId);
          this.availableParkingTableList = new MatTableDataSource(this.availableParkingList);
          this.availableParkingTableList.data = this.availableParkingList;
          this.availableParkingTableList.paginator = this.Paginator;
          this.availableParkingTableList.sort = this.Sort1;
        } else {
          this.alertify.error(res?.message);
        }
      }
    });
  }

  applyFilter(type: any, event: any) {
    if (type == 'AssignedParking') {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      const filterData = (event.target as HTMLInputElement).value;
      this.availableParkingTableList.filter = filterData.trim().toLowerCase();
      if (this.availableParkingTableList.paginator) {
        this.availableParkingTableList.paginator.firstPage();
      }
    }
  }

  // this function are search data status wise
  filterStatusWise(event: any) {
    let value = event.value;
    if (value == '') {
      this.value = this.permanentParkingList;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.data = this.value;
      this.dataSource.paginator = this.Paginator;
      this.dataSource.sort = this.Sort;
    } else {
      this.value = this.permanentParkingList.filter((item: any) => item.isActive == value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.data = this.value;
      this.dataSource.paginator = this.Paginator;
      this.dataSource.sort = this.Sort;
    }
  }
}
