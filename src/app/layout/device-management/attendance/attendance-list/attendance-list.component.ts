import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { AttendanceService } from 'src/app/service/device-management/attendance.service';
import { Employee } from 'src/app/model/visiting-card/employee';
import { debounceTime, map, startWith } from 'rxjs';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'siteName', 'unitName', 'unitNumber', 'employeeName', 'employeeType', 'entryExitType', 'eventDateTime'];

  dataSource!: MatTableDataSource<any>;
  data1: any[] = [];
  formGroup!: FormGroup;
  formGroup1!: FormGroup;
  ArrayList: any[] = [];

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sort1!: MatSort;

  actionName: any;
  branchList: any;
  branchId: any;
  exporter: any;
  data: any;
  value: any;
  employeeList: any;
  employeeCode: any;
  filteredBranches: any;
  options: any;
  finaldata: any;
  clientId!: number;
  siteId!: number;
  unitId!: number;
  roleName: any;

  constructor(private storageEncryptionService: StorageEncryptionService, private _formBuilder: FormBuilder, private alertify: AlertifyService, private service: AttendanceService) {

  }

  async ngOnInit(): Promise<void> {

    this.formGroup = await this._formBuilder.group({
      DatePicker1: [''],
      DatePicker2: [''],
      branchId: [''],
      employeeCode: []
    })

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const unitId = String(localStorage.getItem("unitId"));
    this.unitId = Number(this.storageEncryptionService.decryptData(unitId));

    const roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);

    this.getAllTodaysAttendance();

  }

  getAllTodaysAttendance() {
    this.service.getAllTodaysAttendance()
      .subscribe({
        next: (res) => {
          if (this.roleName == "Master Admin") {
            this.data = res;
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else if (this.roleName == "Super Admin") {
            this.data = res;
            this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else if (this.roleName == "Site Admin") {
            this.data = res;
            this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else if (this.roleName == "Unit Admin") {
            this.data = res;
            this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId && item.unitId == this.unitId));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }



  dateEvent() {

    if (this.formGroup.valid) {
      let queryParams = {
        "startDate": this.formGroup.value.DatePicker1.toLocaleDateString("fr-CA").split("/").reverse().join("-"),
        "endDate": this.formGroup.value.DatePicker2.toLocaleDateString("fr-CA").split("/").reverse().join("-")
      };
      this.service.getAllAttendanceByDateRange(queryParams)
        .subscribe({
          next: (res) => {
            if (this.roleName == "Master Admin") {
              this.data = res;
              this.dataSource = new MatTableDataSource(this.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
            else if (this.roleName == "Super Admin") {
              this.data = res;
              this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId));
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
            else if (this.roleName == "Site Admin") {
              this.data = res;
              this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId));
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
            else if (this.roleName == "Unit Admin") {
              this.data = res;
              this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId && item.unitId == this.unitId));
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          },
          error: (res) => {
            this.alertify.error("Error While fetching The Records!!")
          }
        })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}