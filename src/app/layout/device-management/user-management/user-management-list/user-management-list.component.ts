import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';

import { UserManagementDialogComponent } from '../user-management-dialog/user-management-dialog.component';
import { UserManagementService } from 'src/app/service/device-management/user-management.service';
@Component({
  selector: 'app-user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrls: ['./user-management-list.component.css']
})
export class UserManagementListComponent implements OnInit {

  displayedColumns: string[] = ['id','branchId','branchName','userId','name','isActive', 'Action'];
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

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }


  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private service:UserManagementService, private alertify: AlertifyService, public dialog: MatDialog) { }


  async ngOnInit(): Promise<void>{
    this.formGroup=await this.formBuilder.group({
      isActiveId: [''],
      branchId: [''],
    })

    
    const branchList = String(localStorage.getItem('branchList'));
    this.branchList = this.storageEncryptionService.decryptData(branchList);

    const actionName = String(localStorage.getItem('actionName'));
    this.actionName = this.storageEncryptionService.decryptData(actionName);

    const encryptedData = String(localStorage.getItem('employeeCode'));
    let employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    await Promise.all([
    this.getAllManageUsers(),
    this.getAllStatus()
    ]);

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
  }

  openDialog() {
    this.dialog.open(UserManagementDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllManageUsers();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(UserManagementDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllManageUsers();
      }
    })
  }

  getAllManageUsers() {
    this.service.getAllManageUsers()
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

  showAllBranches() {
    this.filteredBranches = this.branchList;
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

  selectBranch(event: any) {
    if(this.formGroup.value.branchId == "None"){
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else{
      this.value = this.data.filter((item: any) => item.branchName === this.formGroup.value.branchId);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;

      for(let i=0;i<this.branchList.length;i++){
        if(this.branchList[i].branchName == this.formGroup.value.isActiveId){
          let branchId = this.branchList[i].branchId;
        }
      }
    }
  }

  // deleteThirdPartyUsers(id: number) {
  //   this.alertify.confirm('Delete state', 'Are you sure to delete state',
  //     () => {
  //       this.service.deleteThirdPartyUsers(id)
  //         .subscribe({
  //           next: (res) => {
  //             if (res.isSuccess == true) {
  //               this.alertify.success(res.message);
  //               this.getAllManageUsers();
  //             }
  //             else {
  //               this.alertify.error(res.message);
  //             }
  //           },
  //           error: (res) => {
  //             this.alertify.error("500 Internal Server Error");
  //           }
  //         })
  //     },
  //     () => {
  //       this.alertify.error('Cancel');
  //     })
  // }

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
