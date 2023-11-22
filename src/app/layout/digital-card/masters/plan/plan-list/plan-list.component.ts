import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { RoleService } from 'src/app/service/masters/role.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { PlanDetailsDialogComponent } from 'src/app/layout/add-client/plan-details/plan-details-dialog/plan-details-dialog.component';
import { PlanService } from 'src/app/service/masters/plan.service';
import { PlanDialogComponent } from '../plan-dialog/plan-dialog.component';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  displayedColumns: string[] = ['planId', 'planName', 'isActive', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Insert: boolean = false;
  Update: boolean = false;
  Delete: boolean = false;
  Select: boolean = false;
  data : any[] = [];
  formGroup!: FormGroup;
  isActiveList: any;
  value!: any[];
  actionName:any;

  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private service:PlanService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {

    this.formGroup = this.formBuilder.group({
      isActiveId:['']
    })

    // const actionName = String(localStorage.getItem("actionName"));
    // this.actionName = this.storageEncryptionService.decryptData(actionName);

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

    await this.getAllPlan();
    await this.getAllStatus();
  }

  openDialog() {
    this.dialog.open(PlanDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllPlan();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(PlanDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllPlan();
      }
    })
  }

  getAllPlan() {
    this.service.getAllPlan()
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

  selectStatus(event: any) {
    const value = this.formGroup.value.isActiveId;

    if(value==0){
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

  deleteData(planId: number) {
    this.alertify.confirm('Delete Role', 'Are you sure to delete role',
      () => {
        this.service.deletePlan(planId)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllPlan();
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
