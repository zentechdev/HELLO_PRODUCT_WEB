import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { ParkingTypeService } from 'src/app/service/masters/parking-type.service';
import { ParkingTypeDialogComponent } from '../parking-type-dialog/parking-type-dialog.component';

@Component({
  selector: 'app-parking-type-list',
  templateUrl: './parking-type-list.component.html',
  styleUrls: ['./parking-type-list.component.css']
})
export class ParkingTypeListComponent implements OnInit, AfterContentInit {
  @ViewChild('Paginator') Paginator!: MatPaginator;
  @ViewChild('Sort') Sort!: MatSort;
  displayedColumns: any = ['id', 'parkingType', 'isActive', 'Action'];
  dataSource!: MatTableDataSource<any>;
  parkingDetails: any;
 
  constructor(
    private service: ParkingTypeService,
    private alertify: AlertifyService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getParkingDetails();
  }

  getParkingDetails() {
    this.service.getParkingType().subscribe({
      next: (list: any) => {
        if(list) {
          this.parkingDetails = list.data;
          this.dataSource = new MatTableDataSource(this.parkingDetails);
          this.dataSource.data = this.parkingDetails;
          this.dataSource.paginator = this.Paginator;
          this.dataSource.sort = this.Sort;
        }
      },
      error: (error: any) =>{
        this.alertify.error('error While fetched data');
      }
    });
  }

  editData(Id: any){
    this.service.getParkingTypeById(Id).subscribe((res: any) => {
      if(res) {
        this.dialog.open(ParkingTypeDialogComponent, {
          width: '50%',
          data: res.data[0],
          disableClose: true
        }).afterClosed().subscribe(val => {
          if (val === 'SAVE') {
            this.getParkingDetails();
          }
        });
      }
    });
  }

  deleteData(Id: any){
    this.alertify.confirm('Delete state', 'Are you sure to delete state',
      () => {
        this.service.deleteParkingType(Id).subscribe({
          next: (res: any) => {
            if (res.isSuccess == true) {
              this.alertify.success(res.message);
              this.getParkingDetails();
            }
            else {
              this.alertify.error(res.message);
            }
          },
          error: (res) => {
            this.alertify.error("500 Internal Server Error");
          }
        });
      },
      () => {
        this.alertify.error('Cancel');
      });
  }

  openDialog(){
    this.dialog.open(ParkingTypeDialogComponent, {
      width: '50%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getParkingDetails();
      }
    });
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
    console.log('enter in select Status function', value);
    let list;
    if (value == 0) {
      list = this.parkingDetails;
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.Paginator;
      this.dataSource.data = list;
    }
    else {
      list = this.parkingDetails.filter((item: any) => item.isActive === value);
      console.log('filtered value', list);
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.data = list;
      this.dataSource.paginator = this.Paginator;
    }
  }

  ngAfterContentInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.paginator = this.Paginator;
    this.dataSource.data = this.parkingDetails;
  }


}
