import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { RfidService } from 'src/app/service/masters/rfid.service';
import { ActivatedRoute } from '@angular/router';
import { RfidDialogComponent } from '../rfid-dialog/rfid-dialog.component';


@Component({
  selector: 'app-rfid-list',
  templateUrl: './rfid-list.component.html',
  styleUrls: ['./rfid-list.component.css']
})


export class RfidListComponent implements OnInit {

  // displayedColumns: string[] = ['siteName','createdOn', 'isActive', 'Action'];
  // dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['id','siteName','rfidNumber', 'createdOn', 'isActive', 'Action'];
  dataSource = new MatTableDataSource<any>();

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
  siteId: any;
  rfidData: any;

  

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private storageEncryptionService: StorageEncryptionService, private service: RfidService, private alertify: AlertifyService, public dialog: MatDialog) { }

  
  async ngOnInit(): Promise<void> {
    this.formGroup = this.formBuilder.group({
      isActiveId: ['']
    })

    const clientId = String(localStorage.getItem("siteId"));
    this.clientId = this.storageEncryptionService.decryptData(clientId);

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



    // this.siteId = this.route.snapshot.params['siteId'];
    this.getAllRFID();
    await this.getAllStatus();
  }

  openDialog() {
    this.dialog.open(RfidDialogComponent, {
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllRFID();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(RfidDialogComponent, {
      data: row,
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllRFID();
      }
    })
  }

  getAllRFID(): void {
    this.service.getAllRFID().subscribe(
      (data) => {
        this.data=data.data
        this.dataSource = new MatTableDataSource(this.data.filter((item:any)=>item.isActive=='Active'));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.data)
      },
      (error) => {
        console.error('Error fetching RFID data:', error);
      }
    );
  }

  // getAllRfidBySiteId(): void {
  //   this.siteId = 1;
  //   this.service.getAllRfidBySiteId(this.siteId).subscribe(
  //     (data) => {
  //       this.data=data.data
  //       this.dataSource.data = data.data; 
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //     (error) => {
  //       console.error('Error fetching RFID data:', error);
  //     }
  //   );
  // }

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


  deleteData(siteId: number) {
    this.alertify.confirm('Delete state', 'Are you sure to delete state',
      () => {
        this.service.deleteRfid(siteId)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllRFID();
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