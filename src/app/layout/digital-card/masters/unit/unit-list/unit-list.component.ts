import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { UnitDialogComponent } from '../unit-dialog/unit-dialog.component';
import { UnitService } from 'src/app/service/masters/unit.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  displayedColumns: string[] = ['siteName', 'wingName', 'floorName','unitNumberName','name', 'createdOn', 'isActive', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Insert: boolean = false;
  Update: boolean = false;
  Delete: boolean = false;
  Select: boolean = false;

  data: any[] = []; // Replace with your actual data
  formGroup!: FormGroup;
  isActiveList: any;
  value!: any[];
  actionName: any;
  clientId: any;

  constructor(private formBuilder: FormBuilder, private storageEncryptionService: StorageEncryptionService, private service: UnitService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.formGroup = this.formBuilder.group({
      isActiveId: ['']
    })

    // const clientId = String(localStorage.getItem("siteId"));
    // this.clientId = this.storageEncryptionService.decryptData(clientId);

    // // Conversion of string array to number array
    // const stringArrayAction: string[] = this.actionName;
    // const numberArrayAction: string[] = stringArrayAction[0].split(',');

    // for(let i=0; i < numberArrayAction.length;i++){
    //   if(numberArrayAction[i] == 'Insert'){
    //     this.Insert = true;
    //   }
    // }

    // for(let i=0; i < numberArrayAction.length;i++){
    //   if(numberArrayAction[i] == 'Update'){
    //     this.Update = true;
    //   }
    // }

    // for(let i=0; i < numberArrayAction.length;i++){
    //   if(numberArrayAction[i] == 'Delete'){
    //     this.Delete = true;
    //   }
    // }

    // for(let i=0; i < numberArrayAction.length;i++){
    //   if(numberArrayAction[i] == 'Select'){
    //     this.Select = true;
    //   }
    // }


    await this.getAllUnit();
    await this.getAllStatus();
  }

  openDialog() {
    this.dialog.open(UnitDialogComponent, {
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllUnit();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(UnitDialogComponent, {
      data: row,
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllUnit();
      }
    })
  }

  getAllUnit() {
    this.service.getAllUnit()
      .subscribe({
        next: (res) => {
          this.data = res.data.filter((item: any) => item.clientId == this.clientId);
          this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.isActive == 'Active'));
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


  deleteData(cityId: number) {
    this.alertify.confirm('Delete state', 'Are you sure to delete state',
      () => {
        this.service.deleteUnit(cityId)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllUnit();
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