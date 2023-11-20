import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { AppDownloadService } from 'src/app/service/report/app-download.service';


@Component({
  selector: 'app-app-download-list',
  templateUrl: './app-download-list.component.html',
  styleUrls: ['./app-download-list.component.css']
})
export class AppDownloadListComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'employeeCode','employeeName','grade','zone','categoryCode','branch','deviceType','createdOn', 'status'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  formGroup!: FormGroup;
  data: any[] = [];
  filteredBranches: any;
  branchList: any;
  value: any;

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }

  constructor(private formBuilder: FormBuilder, private storageEncryptionService: StorageEncryptionService,private service: AppDownloadService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getTodaysAppDownloadReport();

    this.formGroup = this.formBuilder.group({
      DatePicker1: ['', Validators.required],
      DatePicker2: ['', Validators.required],
      branchId:['']
    })

    const branchList = String(localStorage.getItem('branchList'));
    this.branchList = this.storageEncryptionService.decryptData(branchList);
  }

    showAllBranches() {
    this.filteredBranches = this.branchList;
  }

  selectBranch(event: any) {

    if(this.formGroup.value.branchId == "None"){
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else{
      
      // for (var i = 0; i < this.branchList.length; i++) {
      //   if (this.branchList[i].branchName == this.formGroup.value.branchId) {
      //     this.branchId = this.branchList[i].branchId;
      //   }
      // }

      this.value = this.data.filter((item: any) => item.branch === this.formGroup.value.branchId);
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

  
  getTodaysAppDownloadReport() {
    this.service.getTodaysAppDownloadReport()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
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

      this.service.getAppDownloadReportByDateRange(queryParams)
        .subscribe({
          next: (res) => {
            this.data = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (res) => {
            this.alertify.error("Error While fetching The Records!!");
          }
        })
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
