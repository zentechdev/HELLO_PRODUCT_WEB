import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StateService } from 'src/app/service/masters/state.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { DeviceConfigurationDialogComponent } from '../device-configuration-dialog/device-configuration-dialog.component';
import { DeviceConfigurationService } from 'src/app/service/device-management/device-configuration.service';

@Component({
  selector: 'app-device-configuration-list',
  templateUrl: './device-configuration-list.component.html',
  styleUrls: ['./device-configuration-list.component.css']
})
export class DeviceConfigurationListComponent implements OnInit {

displayedColumns: string[] = ['id','siteId','siteName','cardReaderIp','portNumber','gateway','subNetMask','dns', 'isActive', 'Action'];
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
  actionName:any;
  branchList: any;
  filteredBranches: any;
  branchId: any;
  clientId!: number;
  siteId!: number;
  unitId!: number;
  roleName: any;

  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private service:DeviceConfigurationService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void>{

    this.formGroup=await this.formBuilder.group({
      isActiveId: [''],
      branchId: [''],
      branchName:['']
    })

    
    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const unitId = String(localStorage.getItem("unitId"));
    this.unitId = Number(this.storageEncryptionService.decryptData(unitId));

    const roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);

    await Promise.all([
      this.getAllDeviceDetails(),
      this.getAllStatus()
    ]);

  }

  editData(row: any) {
    this.dialog.open(DeviceConfigurationDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllDeviceDetails();
      }
    })
  }
  
  selectStatus(event: any) {
    const value = this.formGroup.value.isActiveId;
    if(value == 0){
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

  getAllDeviceDetails() {
    this.service.getAllDeviceDetails()
      .subscribe({
        next: (res) => {
          if(this.roleName=="Master Admin"){
            this.data = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else{
            this.data = res;
            this.dataSource = new MatTableDataSource(res.filter((item:any)=>item.siteId==this.siteId));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
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


  deleteData(id: number) {
    this.alertify.confirm('Delete state', 'Are you sure to delete state',
      () => {
        this.service.deleteDevice(id)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllDeviceDetails();
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

  // ngAfterViewInit() {
  //   this.dataSource = new MatTableDataSource<any>(); // Initialize the dataSource object
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.data = this.data;
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
