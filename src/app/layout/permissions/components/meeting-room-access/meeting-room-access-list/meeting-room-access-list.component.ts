import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VisitingCardAccessService } from 'src/app/service/permissions/visiting-card-access.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { MeetingRoomAccessDialogComponent } from '../meeting-room-access-dialog/meeting-room-access-dialog.component';
import { MeetingRoomAccessService } from 'src/app/service/permissions/meeting-room-access.service';

@Component({
  selector: 'app-meeting-room-access-list',
  templateUrl: './meeting-room-access-list.component.html',
  styleUrls: ['./meeting-room-access-list.component.css']
})
export class MeetingRoomAccessListComponent implements OnInit {

  displayedColumns: string[] = ['id','employeeCode','employeeName','grade','branchName', 'departmentName', 'meetingRoomStatus', 'Action'];
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
  branchList: any;
  actionName:any;
  branchId: any;
  filteredBranches: any;


  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }

  constructor( private service1: DashboardService,private storageEncryptionService:StorageEncryptionService,private formBuilder: FormBuilder, private service:MeetingRoomAccessService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {

    this.formGroup=this.formBuilder.group({
      isActiveId: [''],
      branchId:['']
    })

    const actionName = String(localStorage.getItem("actionName"));
    this.actionName = this.storageEncryptionService.decryptData(actionName);

    // Conversion of string array to number array
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

    const encryptedData = String(localStorage.getItem('employeeCode'));
    let employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    await Promise.all([
    this.getAllBranchByEmployeeCode(employeeCode),
    this.getAllEmployee(),
    this.getAllStatus()
    ])
  }

  showAllBranches() {
    this.filteredBranches = this.branchList;
  }

  selectBranch(event: any) {

    if(this.formGroup.value.branchId == "None"){
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else{
      
      for (var i = 0; i < this.branchList.length; i++) {
        if (this.branchList[i].branchName == this.formGroup.value.branchId) {
          this.branchId = this.branchList[i].branchId;
        }
      }

      this.value = this.data.filter((item: any) => item.branchId === this.branchId);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
      for (let i = 0; i < this.branchList.length; i++) {
        if (this.branchList[i].branchName == this.branchId) {
          let branchId = this.branchList[i].branchId;
        }
      }
    }

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
      this.value = this.data.filter((item: any) => item.meetingRoomStatus === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
  }
  
  getAllBranchByEmployeeCode(employeeCode:String){
    this.service1.getAllBranchByEmployeeCode(employeeCode)
    .subscribe({
     next:(res)=>{
      this.branchList = res.filter((item: any) => item.stateName).sort((a: { stateName: string; }, b: { stateName: any; }) =>  a.stateName.localeCompare(b.stateName));
     },
     error:(res)=>{
       this.alertify.error("Error While fetching The Records!!")
     }
    })
   }

  openDialog() {
    this.dialog.open(MeetingRoomAccessDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllEmployee();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(MeetingRoomAccessDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllEmployee();
      }
    })
  }

  getAllEmployee() {
    this.service.getAllEmployee()
      .subscribe({
        next: (res) => {
          this.data=res.filter((item:any) => {
            return this.branchList.some((branch:any) => {
              return item.branchName === branch.branchName;
            });
          });

          this.dataSource = new MatTableDataSource(
            res.filter((item:any) => {
              return this.branchList.some((branch:any) => {
                return item.branchName === branch.branchName;
              });
            })
          );

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



  // deleteData(stateId: number) {
  //   this.alertify.confirm('Delete state', 'Are you sure to delete state',
  //     () => {
  //       this.service.deleteState(stateId)
  //         .subscribe({
  //           next: (res) => {
  //             if (res.isSuccess == true) {
  //               this.alertify.success(res.message);
  //               this.getState();
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
