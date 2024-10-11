import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PermanentParkingBookingDialogComponent } from '../permanent-parking-booking-dialog/permanent-parking-booking-dialog.component';
import { PermanentBookingService } from 'src/app/service/masters/permanent-booking.service';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';

@Component({
  selector: 'app-permanent-parking-booking-list',
  templateUrl: './permanent-parking-booking-list.component.html',
  styleUrls: ['./permanent-parking-booking-list.component.css']
})
export class PermanentParkingBookingListComponent implements OnInit {
  
  displayedColumns: any = ['id', 'siteName', 'unitName', 'unitNumber', 'parkingName', 'memberName', 'isActive','action'];
  @ViewChild(MatPaginator) Paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort; 
  dataSource!: MatTableDataSource<any>;
  permanentParkingList: any;
  
  constructor(
    private dialog: MatDialog,
    private service: PermanentBookingService,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.getPermanentBookingList();
  }

  openDialog() {
    this.dialog.open(PermanentParkingBookingDialogComponent, {
      width: '80%',
      disableClose: true
    }).afterClosed().subscribe((res: any) => {
      if (res === 'SAVE') {
        this.getPermanentBookingList();
      }
    });
  }

  getPermanentBookingList(){
    this.service.getPermanentParkingList().subscribe({
      next: (res: any) => {
        if(res.isSuccess === true) {
          this.permanentParkingList = res.data;
          this.dataSource = new MatTableDataSource(this.permanentParkingList);
          this.dataSource.data = this.permanentParkingList;
          this.dataSource.paginator = this.Paginator;
          this.dataSource.sort = this.Sort;
        } else {
          this.alertify.success(res.message)
        }
      },
      error: (err) => {
        this.alertify.error(err);
      }
    })
  }

  editData(Id: any){

  }

  deleteData(Id: any){

  }

}
