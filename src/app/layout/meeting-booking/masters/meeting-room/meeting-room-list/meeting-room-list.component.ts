import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { SeatService } from 'src/app/service/masters/seat.service';
import { MeetingRoomDialogComponent } from '../meeting-room-dialog/meeting-room-dialog.component';
import { MeetingRoomService } from 'src/app/service/masters/meeting-room.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';

@Component({
  selector: 'app-meeting-room-list',
  templateUrl: './meeting-room-list.component.html',
  styleUrls: ['./meeting-room-list.component.css']
})
export class MeetingRoomListComponent implements OnInit {

  displayedColumns: string[] = ['meetingRoomId', 'meetingRoomName', 'branchName', 'meetingRoomType', 'capacity', 'isActive', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Insert: boolean = false;
  Update: boolean = false;
  Delete: boolean = false;
  Select: boolean = false;

  data:any[]=[];
  formGroup!: FormGroup;
  isActiveList: any;
  value!: any;
  actionName:any;
  filteredBranches: any;
  branchList: any;

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }


  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private service: MeetingRoomService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.formGroup = this.formBuilder.group({
      isActiveId:[''],
      branchId:[]
    })

    const actionName = String(localStorage.getItem("actionName"));
    this.actionName = this.storageEncryptionService.decryptData(actionName);

    const branchList = String(localStorage.getItem('branchList'));
    this.branchList = this.storageEncryptionService.decryptData(branchList);

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

    await Promise.all([
    this.getAllMeetingRoom(),
    this.getAllStatus()
    ])
  }

  showAllBranches() {
    this.filteredBranches = this.branchList;
  }

  selectBranch(event: any) {

    this.value = this.formGroup.value.branchId;

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
          let branchId = this.branchList[i].branchId;
        }
      }
    }
  }

  openDialog() {
    this.dialog.open(MeetingRoomDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllMeetingRoom();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(MeetingRoomDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllMeetingRoom();
      }
    })
  }

  getAllMeetingRoom() {
    this.service.getAllMeetingRoom()
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

  selectStatus(event: any) {
    const value = this.formGroup.value.isActiveId;
    this.value = this.data.filter((item: any) => item.isActive === value);
    this.dataSource = new MatTableDataSource(this.value);
  }

  deleteData(meetingRoomId: number) {
    this.alertify.confirm('Delete meeting room', 'Are you sure to delete meeting booking',
      () => {
        this.service.deleteMeetingRoom(meetingRoomId)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllMeetingRoom();
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
