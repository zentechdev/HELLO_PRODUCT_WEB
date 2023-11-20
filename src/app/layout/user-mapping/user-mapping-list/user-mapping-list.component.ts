import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { UserMappingService } from 'src/app/service/user-mapping/user-mapping.service';
import { UserMappingDialogComponent } from '../user-mapping-dialog/user-mapping-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-mapping-list',
  templateUrl: './user-mapping-list.component.html',
  styleUrls: ['./user-mapping-list.component.css']
})
export class UserMappingListComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['usermappingId','employeeName','employeeCode', 'roleName', 'status', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data:any[]=[];
  formGroup!: FormGroup;
  isActiveList: any;
  value: any;

  constructor(private changeDetectorRef: ChangeDetectorRef, private service: UserMappingService,private formBuilder:FormBuilder, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {

    this.formGroup=this.formBuilder.group({
      isActiveId: ['']
    })
    
    await this.getAllUserMapping();
    await this.getAllStatus();
  }

  openDialog() {
    this.dialog.open(UserMappingDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllUserMapping();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(UserMappingDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllUserMapping();
      }
    })
  }

  getAllUserMapping() {
    this.service.getAllUserMapping()
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

  getAllStatus(){
    this.service.getIsActive()
    .subscribe({
      next:(res)=>{
        this.isActiveList = res ;
      },
      error:(res)=>{
          this.alertify.error("Error While fetching The Records!!")
      }
    })
  }

  selectStatus(event:any) {
   const value  = this.formGroup.value.isActiveId;
   this.value = this.data.filter((item: any) => item.isActive === value);
   this.dataSource = new MatTableDataSource(this.value);
  }

  deleteData(usermappingId: number) {
    this.alertify.confirm('Delete user mapping', 'Are you sure to delete user mapping',
      () => {
        this.service.deleteUserMapping(usermappingId)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllUserMapping();
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
    this.changeDetectorRef.detectChanges();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
