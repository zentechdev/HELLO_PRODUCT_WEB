import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { GlobalMessageService } from 'src/app/service/global-message/global-message.service';
import { GlobalMessageDialogComponent } from '../global-message-dialog/global-message-dialog.component';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';

@Component({
  selector: 'app-global-message-list',
  templateUrl: './global-message-list.component.html',
  styleUrls: ['./global-message-list.component.css']
})
export class GlobalMessageListComponent implements OnInit {

  displayedColumns: string[] = ['messageId', 'title', 'description', 'attachement', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Insert: boolean = false;
  Update: boolean = false;
  Delete: boolean = false;
  Select: boolean = false;

  data:any[]=[];
  actionName:any;

  constructor(private router: Router,private storageEncryptionService: StorageEncryptionService, private service: GlobalMessageService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getAllMessage();
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
  }
  

  openDialog() {
    this.dialog.open(GlobalMessageDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SEND') {
        this.getAllMessage();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(GlobalMessageDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllMessage();
      }
    })
  }

  getAllMessage() {
    const encryptedData = String(localStorage.getItem('employeeCode'));
    let employeeCode = this.storageEncryptionService.decryptData(encryptedData);
    
    this.service.getAllMessageById(employeeCode)
      .subscribe({
        next: (res) => {
          this.data=res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  deleteData(jobId: string) {
    this.alertify.confirm('Delete global message', 'Are you sure to delete global message',
      () => {
        this.service.deleteMessage(jobId)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllMessage();
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
