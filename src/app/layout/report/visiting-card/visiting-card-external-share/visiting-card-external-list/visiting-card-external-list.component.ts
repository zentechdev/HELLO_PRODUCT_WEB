import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { VisitingCardShareService } from 'src/app/service/report/visitingcard/visiting-card-share.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { VisitingCardExternalShareListService } from 'src/app/service/report/visitingcard/visiting-card-external-share-list.service';
import { VisitingCardExternalDialogComponent } from '../visiting-card-external-dialog/visiting-card-external-dialog.component';

@Component({
  selector: 'app-visiting-card-external-list',
  templateUrl: './visiting-card-external-list.component.html',
  styleUrls: ['./visiting-card-external-list.component.css']
})
export class VisitingCardExternalListComponent implements OnInit {


  displayedColumns: string[] = ['Id','employeeCode', 'personName','mobileNumber', 'emailId', 'companyName', 'designation', 'createdOn', 'isActive',];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Insert: boolean = false;
  Update: boolean = false;
  Delete: boolean = false;
  Select: boolean = false;
  formGroup!: FormGroup;
  data:any[]=[];
  actionName:any;
  isActiveList: any;
  value: any[] | undefined;

  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private router: Router, private service:VisitingCardExternalShareListService, private alertify: AlertifyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      isActive: ['', Validators.required],
      isActiveId: ['']
    });

    this.getVisitingCard();
    this.getAllStatus()

    const actionName = String(localStorage.getItem("actionName"));
    this.actionName = this.storageEncryptionService.decryptData(actionName);

    // Conversion of string array to number array
    const stringArrayAction: string[] = this.actionName;
    const numberArrayAction: string[] = stringArrayAction[0].split(',');

    for(let i=0; i < numberArrayAction.length;i++){
      if(numberArrayAction[i] == 'Insert'){
        this.Insert = true;
      }
    }

    for(let i=0; i < numberArrayAction.length;i++){
      if(numberArrayAction[i] == 'Update'){
        this.Update = true;
      }
    }

    for(let i=0; i < numberArrayAction.length;i++){
      if(numberArrayAction[i] == 'Delete'){
        this.Delete = true;
      }
    }

    for(let i=0; i < numberArrayAction.length;i++){
      if(numberArrayAction[i] == 'Select'){
        this.Select = true;
      }
    }

    this.formGroup = this.formBuilder.group({
      DatePicker1: [''],
      DatePicker2: ['']
    })
  }

  openDialog(row: any) {
    this.dialog.open(VisitingCardExternalDialogComponent, {
      data: row,
      width: '100%'
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.dateEvent();
      }
    })
  }

  getVisitingCard() {
    this.service.getAllSharedVisitingCard()
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
  getAllStatus() {
    this.service.getIsActive()
      .subscribe({
        next: (res) => {
          this.isActiveList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }
  selectStatus(event: any) {
    const value = this.formGroup.value.isActiveId;

    if(value==0){
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else{
      this.value = this.data.filter((item: any) => item.isActive === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }

  }
  dateEvent() {
    let queryParams = {
      "startDate": this.formGroup.value.DatePicker1.toLocaleDateString("fr-CA").split("/").reverse().join("-"),
      "endDate": this.formGroup.value.DatePicker2.toLocaleDateString("fr-CA").split("/").reverse().join("-")
    };

    this.service.getAllSharedVisitingCardByDateRange(queryParams)
      .subscribe({
        next: (res) => {
          this.data=res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      })
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
