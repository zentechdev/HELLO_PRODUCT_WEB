import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { UnitService } from 'src/app/service/masters/unit.service';
import { UnitRfidDialogComponent } from '../unit-rfid-dialog/unit-rfid-dialog.component';
import { RfidUnitService } from 'src/app/service/rfid-details/rfid-unit.service';

@Component({
  selector: 'app-unit-rfid-list',
  templateUrl: './unit-rfid-list.component.html',
  styleUrls: ['./unit-rfid-list.component.css']
})
export class UnitRfidListComponent implements OnInit {

  displayedColumns: string[] = ['siteName', 'wingName', 'unitName','RFIDNumber','createdOn', 'isActive', 'Action'];
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

  constructor(private formBuilder: FormBuilder, private storageEncryptionService: StorageEncryptionService, private service:RfidUnitService, private alertify: AlertifyService, public dialog: MatDialog) { }

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


    await this.getAllRfidUnitDetails();
    await this.getAllStatus();
  }

  openDialog() {
    this.dialog.open(UnitRfidDialogComponent, {
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllRfidUnitDetails();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(UnitRfidDialogComponent, {
      data: row,
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllRfidUnitDetails();
      }
    })
  }

  getAllRfidUnitDetails() {
    this.service.getAllRfidUnitDetails()
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


  deleteData(id: number) {
    this.alertify.confirm('Delete state', 'Are you sure to delete state',
      () => { 
        this.service.deleteRFIDdetails(id)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllRfidUnitDetails();
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
