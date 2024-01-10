import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { UnitService } from 'src/app/service/masters/unit.service';
import { ManageUsersDialogComponent } from '../manage-users-dialog/manage-users-dialog.component';
import { ManageUsersService } from 'src/app/service/manage-users/manage-users.service';

@Component({
  selector: 'app-manage-users-list',
  templateUrl: './manage-users-list.component.html',
  styleUrls: ['./manage-users-list.component.css']
})
export class ManageUsersListComponent implements OnInit {

  displayedColumns: string[] = ['id','siteName', 'unitName', 'memberName','mobileNumber','email', 'roleName','isActive', 'Action'];
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
  clientId!: number;
  roleName: any;
  siteName: any;
  unitName: any;
  siteId!: number;
  unitId!: number;

  constructor(private formBuilder: FormBuilder, private storageEncryptionService: StorageEncryptionService, private service:ManageUsersService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.formGroup = this.formBuilder.group({
      isActiveId: ['']
    })

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const unitId = String(localStorage.getItem("unitId"));
    this.unitId = Number(this.storageEncryptionService.decryptData(unitId));

    const roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);


    await this.getAllMembers();
    await this.getAllStatus();
  }

  openDialog() {
    this.dialog.open(ManageUsersDialogComponent, {
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllMembers();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(ManageUsersDialogComponent, {
      data: row,
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllMembers();
      }
    })
  }

  getAllMembers() {
    this.service.getAllMembers()
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
    this.alertify.confirm('Delete User', 'Are you sure to delete User',
      () => {
        this.service.deleteUsers(id)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllMembers();
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
