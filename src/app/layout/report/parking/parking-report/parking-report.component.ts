import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { ParkingService } from 'src/app/service/report/parking.service';

@Component({
  selector: 'app-parking-report',
  templateUrl: './parking-report.component.html',
  styleUrls: ['./parking-report.component.css']
})
export class ParkingReportComponent implements OnInit {
  displayedColumns: any = ['id', 'siteName', 'wingName', 'floorName',
    'personName', 'mobileNumber', 'vehicaleNumber', 'parkingNumber', 'toDate', 'bookingHours', 'bookingStatus'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data!: any[];
  clientId!: number;
  siteId!: number;
  unitId!: number;
  parkingReport!: FormGroup;
  value: any;
  roleName: any;
  constructor(
    private alertify: AlertifyService,
    private storageEncryptionService: StorageEncryptionService,
    private service: ParkingService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.parkingReport = this.fb.group({
      DatePicker1: [''],
      DatePicker2: ['']
    });

    let siteId = String(localStorage.getItem('siteId'));
    this.siteId = this.storageEncryptionService.decryptData(siteId);

    let unitId = String(localStorage.getItem('unitId'));
    this.unitId = this.storageEncryptionService.decryptData(unitId);

    let roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);
    
    if(this.roleName == 'Unit Admin') {
      this.getParkingReportByUnitId(); 
    } else {
      this.getParkingReport();
    }
  }


  getParkingReport() {
    this.service.getParkingDetails().subscribe({
      next: (res: any) => {
        if (res?.isSuccess == true) {
          this.data = res.data.filter((item: any) => item.siteId == this.siteId);
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.data = res.data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
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

  getStatusColor(status: any) {
    switch (status) {
      case 'Canceled':
        return 'red';
      case 'Occupied':
        return 'green';
      default:
        return 'gray';
    }
  }

  dateEvent() {
    let body = {
      startDate: this.parkingReport.value.DatePicker1.toLocaleDateString("fr-CA").split("/").reverse().join("-"),
      endDate: this.parkingReport.value.DatePicker2.toLocaleDateString("fr-CA").split("/").reverse().join("-")
    }
    this.service.filterParkingByDateRage(body).subscribe({
      next: (res: any) => {
        if (res?.isSuccess == true) {
          this.data = res.data;
          this.dataSource = new MatTableDataSource(res?.data);
          this.dataSource.data = this.data;
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
      this.value = this.data.filter((item: any) => item.bookingStatus === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
  }

  resetDataFilter() {
    this.parkingReport.reset();
    this.getParkingReport();
  }

  getParkingReportByUnitId(){
    this.service.getParkingDataByUnitId(this.unitId).subscribe({
      next: (res: any) => {
        if (res?.isSuccess == true) {
          this.data = res.data;
          this.dataSource = new MatTableDataSource(res?.data);
          this.dataSource.data = this.data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    });
  }
}
