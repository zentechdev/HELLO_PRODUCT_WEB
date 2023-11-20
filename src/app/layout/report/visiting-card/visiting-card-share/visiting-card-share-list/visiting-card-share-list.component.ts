import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { VisitingCardShareService } from 'src/app/service/report/visitingcard/visiting-card-share.service';
import { VisitingCardShareDialogComponent } from '../visiting-card-share-dialog/visiting-card-share-dialog.component';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';


@Component({
  selector: 'app-visiting-card-share-list',
  templateUrl: './visiting-card-share-list.component.html',
  styleUrls: ['./visiting-card-share-list.component.css']
})
export class VisitingCardShareListComponent implements OnInit {

  displayedColumns: string[] = ['Id','fromEmployee', 'toEmployee','date','Action'];
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

  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private router: Router, private service:VisitingCardShareService, private alertify: AlertifyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getVisitingCard();

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
    this.dialog.open(VisitingCardShareDialogComponent, {
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
