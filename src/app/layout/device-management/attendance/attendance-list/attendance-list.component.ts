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
  displayedColumns: string[] = ['id', 'branchName', 'ipAddress', 'portNumber', 'employeeCode', 'employeeName', 'employeeType', 'entryExitType', 'eventDateTime'];
  // displayedColumns: string[] = ['visitorId', 'visitorName', 'mobileNumber', 'emailId', 'location', 'branchName', 'departmentName', 'actions',];
  dataSource!: MatTableDataSource<any>;
  data1: any[] = [];
  formGroup!: FormGroup;
  formGroup1!: FormGroup;
  ArrayList: any[] = [];

  @ViewChild('paginator') paginator!: MatPaginator; // Assuming you have a paginator element with the template reference variable 'paginator'
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
  // formGroup2: any;

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }
  
  constructor(private storageEncryptionService: StorageEncryptionService, private _formBuilder: FormBuilder, private alertify: AlertifyService, private service: AttendanceService) {
    this.service.getAllEmployee().subscribe(item => {
      this.options = item;
    })
  }

  async ngOnInit(): Promise<void> {
    // this.formGroup = this._formBuilder.group({
    //   branchId: ['']
    // })


    this.getAllTodaysAttendance();
    this.getAllAvilableEmployee();

    this.formGroup = await this._formBuilder.group({
      DatePicker1: [''],
      DatePicker2: [''],
      branchId: [''],
      employeeCode: []
    })

    this.finaldata = this.formGroup.get("employeeCode")?.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map((item: any) => {
        const employeeCode = item;
        return employeeCode ? this._filter(employeeCode as number) : this.options
      })
    )

    const branchList = String(localStorage.getItem('branchList'));
    this.branchList = this.storageEncryptionService.decryptData(branchList);
    const actionName = String(localStorage.getItem('actionName'));
    this.actionName = this.storageEncryptionService.decryptData(actionName);
    const encryptedData = String(localStorage.getItem('employeeCode'));
    let employeeCode = this.storageEncryptionService.decryptData(encryptedData);
  }

  private _filter(employeeCode: number): Employee[] {

    const filterValue = employeeCode.toString();

    return this.options.filter((opt: { employeeCode: { toString: () => string | string[]; }; }) => opt.employeeCode.toString().includes(filterValue));

  }
  
  getAllTodaysAttendance() {
    this.service.getAllTodaysAttendance()
      .subscribe({
        next: (res) => {
          this.data = res.filter((item: any) => {
            return this.branchList.some((branch: any) => {
              return item.branchName === branch.branchName;
            });
          });
          this.dataSource = new MatTableDataSource(
            res.filter((item: any) => {
              return this.branchList.some((branch: any) => {
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



  dateEvent() {

    if (this.formGroup.valid) {
      let queryParams = {
        "startDate": this.formGroup.value.DatePicker1.toLocaleDateString("fr-CA").split("/").reverse().join("-"),
        "endDate": this.formGroup.value.DatePicker2.toLocaleDateString("fr-CA").split("/").reverse().join("-")
      };
      this.service.getAllAttendanceByDateRange(queryParams)
        .subscribe({
          next: (res) => {
            this.data = res.filter((item: any) => {
              return this.branchList.some((branch: any) => {
                return item.branchName === branch.branchName;
              });
            });
            this.dataSource = new MatTableDataSource(
              res.filter((item: any) => {
                return this.branchList.some((branch: any) => {
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectStatus(event: any) {
    this.value = this.formGroup.value.branchId;
  }

  showAllBranches() {
    this.filteredBranches = this.branchList;
  }

  selectBranch(event: any) {
    const value = this.formGroup.value.branchId;
    if (value == "None") {
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else {
      this.value = this.data.filter((item: any) => item.branchName === this.formGroup.value.branchId);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
      for (let i = 0; i < this.branchList.length; i++) {
        if (this.branchList[i].branchName == value) {
          let branchId = this.branchList[i].branchId;
        }
      }
    }
  }

  selectEmployee(event: any) {
    const value = this.formGroup.value.employeeCode;
    if (value == "None") {
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else {
      this.value = this.data.filter((item: any) => item.employeeCode === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
      for (let i = 0; i < this.branchList.length; i++) {
        if (this.branchList[i].branchName == value) {
          let branchId = this.branchList[i].branchId;
        }
      }
    }
  }

  getAllAvilableEmployee() {
    this.service.getAllAvilableEmployee()
      .subscribe({
        next: (res) => {
          this.employeeList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }
}