import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StateService } from 'src/app/service/masters/state.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { CityService } from 'src/app/service/masters/city.service';
import { OrganizationTypeDialogComponent } from '../organization-type-dialog/organization-type-dialog.component';
import { OrganizationTypeService } from 'src/app/service/organization-type/organization-type.service';

@Component({
  selector: 'app-organization-type-list',
  templateUrl: './organization-type-list.component.html',
  styleUrls: ['./organization-type-list.component.css']
})
export class OrganizationTypeListComponent implements OnInit {

  displayedColumns: string[] = ['id','name','createdOn','isActive', 'Action'];
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
  clientId: any;

  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private service:OrganizationTypeService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.formGroup=this.formBuilder.group({
      isActiveId: ['']
    })

    const clientId = String(localStorage.getItem("clientId"));
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


    await this.getOrganizationType();
    await this.getAllStatus();
  }

  openDialog() {
    this.dialog.open(OrganizationTypeDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getOrganizationType();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(OrganizationTypeDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getOrganizationType();
      }
    })
  }

  getOrganizationType() {
    this.service.getOrganizationType()
      .subscribe({
        next: (res) => {
          this.data=res.data;
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

  // selectStatus(event: any) {
  //   const value = this.formGroup.value.isActiveId;

  //   if(value==0){
  //     this.value = this.data;
  //     this.dataSource = new MatTableDataSource(this.value);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.data = this.value;
  //   }
  //   else{
  //     this.value = this.data.filter((item: any) => item.isActive === value);
  //     this.dataSource = new MatTableDataSource(this.value);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.data = this.value;
  //   }

  // }

  deleteData(cityId: number) {
    this.alertify.confirm('Delete state', 'Are you sure to delete org type',
      () => {
        this.service.deleteOrganizationType(cityId)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getOrganizationType();
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
