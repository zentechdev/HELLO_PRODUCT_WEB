import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { AsignParkingUnitService } from 'src/app/service/master/assignParkingUnit/asign-parking-unit.service';
import { AssignParkingUnitDialogComponent } from '../assign-parking-unit-dialog/assign-parking-unit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-parking-unit',
  templateUrl: './assign-parking-unit.component.html',
  styleUrls: ['./assign-parking-unit.component.css']
})
export class AssignParkingUnitComponent implements OnInit {
  displayedColumns: any = ['id', 'siteName', 'wingName', 'unitName', 'unitNumber', 'parkingNumber',
    'createdOn', 'isActive', 'Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  data: any;
  roleName: any;
  value: any;
  isActiveList: any;
  constructor(
    private service: AsignParkingUnitService,
    private alertify: AlertifyService,
    public dialog: MatDialog,
    private EncryptedData: StorageEncryptionService) { }

  ngOnInit(): void {
    let roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.EncryptedData.decryptData(roleName)
    this.getParkingUnitData();
    this.getStatusList();
  }

  getParkingUnitData() {
    this.service.getParkingUnitList().subscribe({
      next: (res: any) => {
        if (res.isSuccess == true) {
          this.data = res.data;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
        this.alertify.error(err);
      }
    });
  }

  selectStatus(event: any) {
    const value = event.value;
    if (value == 0) {
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else {
      this.value = this.data.filter((item: any) => item.isActive === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(AssignParkingUnitDialogComponent, {
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe((val: any) => {
      if (val === 'SAVE') {
        this.getParkingUnitData();
      }
    })
  }


  deleteData(Id: any) {
    this.alertify.confirm('Delete state', 'Are you sure to delete state',
      () => {
        this.service.deleteParkingUnit(Id)
          .subscribe({
            next: (res: any) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getParkingUnitData();
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

  editData(row: any) {
    this.dialog.open(AssignParkingUnitDialogComponent, {
      data: row,
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getParkingUnitData();
      }
    });
  }

  getStatusList() {
    this.service.getIsActive().subscribe({
      next: (res: any) => {
        if (res) {
          this.isActiveList = res;
        }
      } ,
      error: (er) => {
        this.alertify.error(er);
      }
    });
  }

}
