import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { MeetingRoomTypeDiloagComponent } from '../meeting-room-type-diloag/meeting-room-type-diloag.component';
import { MeetingRoomTypeService } from 'src/app/service/masters/meeting-room-type.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';


@Component({
  selector: 'app-meeting-room-type-list',
  templateUrl: './meeting-room-type-list.component.html',
  styleUrls: ['./meeting-room-type-list.component.css']
})
export class MeetingRoomTypeListComponent implements OnInit {

  displayedColumns: string[] = ['meetingRoomTypeId', 'meetingRoomType', 'description', 'isActive', 'Action'];
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
  value!: any[];
  actionName:any;

  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private service: MeetingRoomTypeService, private alertify: AlertifyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      isActiveId:['']
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
    this.getAllMeetingRoomType();
    this.getAllStatus();
  }

  openDialog() {
    this.dialog.open(MeetingRoomTypeDiloagComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllMeetingRoomType();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(MeetingRoomTypeDiloagComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllMeetingRoomType();
      }
    })
  }

  getAllMeetingRoomType() {
    this.service.getAllMeetingRoomType()
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


  deleteData(meetingRoomTypeId: number) {
    this.alertify.confirm('Delete meeting room type', 'Are you sure to delete meeting room type',
      () => {
        this.service.deleteMeetingRoomType(meetingRoomTypeId)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllMeetingRoomType();
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