import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PermanentSeatService } from 'src/app/service/masters/permanent-seat.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { SeatService } from 'src/app/service/masters/seat.service';
import { UserListService } from 'src/app/service/user-list/user-list.service';
 
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
 
 
  displayedColumns: string[] = ['id','siteName','unitName','memberName','roleName','mobileNumber','email' , 'status'];
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
  value!: any;
  actionName:any;
  branchList: any;
  filteredBranches: any;
  branchId: any;
  clientId!: number;
  siteId!: number;
  unitId!: number;
  roleName: any;
 
  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }
  constructor( private service1: DashboardService,private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private service:UserListService, private alertify: AlertifyService, public dialog: MatDialog) { }
 
  async ngOnInit(): Promise<void> {
 
 
    await Promise.all([
    this.getAllEmployeeDetail(),
    ])

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const unitId = String(localStorage.getItem("unitId"));
    this.unitId = Number(this.storageEncryptionService.decryptData(unitId));

    const roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);
  }
 
  showAllBranches() {
    this.filteredBranches = this.branchList;
  }
 

 
  selectBranch(event: any) {
    this.value = this.formGroup.value.memberId;
 
    const value =  this.value ;
    if (value == "None") {
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else {
      this.value = this.data.filter((item: any) => item.branchName === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
      for (let i = 0; i < this.branchList.length; i++) {
        if (this.branchList[i].branchName == value) {
          let memberId = this.branchList[i].memberId;
        }
      }
    }
  }
 
  getAllEmployeeDetail() {
    this.service.getAllEmployeeDetail()
      .subscribe({
        next: (res) => {    
          if(this.roleName=="Master Admin"){
            this.data = res.data;
            this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.isActive == 'Active' && item.roleName=='Super Admin'));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else if(this.roleName=="Super Admin"){
            this.data = res.data;
            this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.isActive == 'Active' && item.clientId == this.clientId && item.roleName=='Site Admin'));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }else if(this.roleName=="Site Admin"){
            this.data = res.data;
            this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.isActive == 'Active'  && item.clientId == this.clientId && item.siteId == this.siteId && item.roleName=='Unit Admin'));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }else if(this.roleName=="Unit Admin"){
            this.data = res.data;
            this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.isActive == 'Active' && item.clientId == this.clientId && item.siteId == this.siteId && item.unitId == this.unitId &&  item.roleName=='Employee'));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
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