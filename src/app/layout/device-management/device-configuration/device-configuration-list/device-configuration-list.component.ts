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

  // filterBranches(event: any) {
  //   const searchText = event.target.value.toLowerCase();
  //   this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
  //     return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
  //   });
  // }

  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private service:DeviceConfigurationService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void>{

    this.formGroup=await this.formBuilder.group({
      isActiveId: [''],
      branchId: [''],
      branchName:['']
    })

    
    // const branchList = String(localStorage.getItem('branchList'));
    // this.branchList = this.storageEncryptionService.decryptData(branchList);

    // const actionName = String(localStorage.getItem('actionName'));
    // this.actionName = this.storageEncryptionService.decryptData(actionName);

    // const encryptedData = String(localStorage.getItem('employeeCode'));
    // let employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    await Promise.all([
      this.getAllDeviceDetails(),
      this.getAllStatus()
    ]);

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
  }

  // openDialog() {
  //   this.dialog.open(DeviceConfigurationDialogComponent, {
  //     width: '100%',
  //     disableClose:true
  //   }).afterClosed().subscribe(val => {
  //     if (val === 'SAVE') {
  //       this.getState();
  //     }
  //   })
  // }

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

  // showAllBranches() {
  //   this.filteredBranches = this.branchList;
  // }

  

  // selectBranch(event: any) {
  //   if(this.formGroup.value.branchId == "None"){
  //     this.value = this.data;
  //     this.dataSource = new MatTableDataSource(this.value);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.data = this.value;
  //   }
  //   else{
  //     this.value = this.data.filter((item: any) => item.branchName === this.formGroup.value.branchId);
  //     this.dataSource = new MatTableDataSource(this.value);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.data = this.value;

  //     for(let i=0;i<this.branchList.length;i++){
  //       if(this.branchList[i].branchName == this.formGroup.value.isActiveId){
  //         let branchId = this.branchList[i].branchId;
  //       }
  //     }
  //   }
  // }

  
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
          this.data=res;
          this.dataSource = new MatTableDataSource(this.data.filter((item:any)=>item.isActive=='Active'));
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
