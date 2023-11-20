import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PermanentBookingDialogComponent } from '../permanent-booking-dialog/permanent-booking-dialog.component';
import { PermanentSeatService } from 'src/app/service/masters/permanent-seat.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';


@Component({
  selector: 'app-permanent-booking-list',
  templateUrl: './permanent-booking-list.component.html',
  styleUrls: ['./permanent-booking-list.component.css']
})
export class PermanentBookingListComponent implements OnInit {


  displayedColumns: string[] = ['id','employeeCode','employeeName','categoryCode','branch','departmentName','seatNumber','seatType','isActive', 'Action'];
  dataSource!: MatTableDataSource<any>;

  displayedColumns1: string[] = ['id','branchName','seatNumber','seatType','isActive'];
  dataSource1!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator; // Assuming you have a paginator element with the template reference variable 'paginator'
  @ViewChild('paginator1') paginator1!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sort1!: MatSort;

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
  availableSeatCountList: any;
  totalCount: any;
  occupiedCount: any;
  vacanteCount: any;

  filteredBranches: any;
  getSeatReportByBranchId: any;
  getSeatTypeReportByBranchId: any;
  branchId: any;
  data1: any;
  availableSeatCountList1: any;
  totalCount1: any;
  occupiedCount1: any;
  vacanteCount1: any;

  filterBranches(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }
  constructor( private service1: DashboardService,private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private service:PermanentSeatService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {

    this.formGroup = this.formBuilder.group({
      isActiveId:[''],
      branchId:[''],
      branchId1:[]
    })

    const branchList = String(localStorage.getItem('branchList'));
    this.branchList = this.storageEncryptionService.decryptData(branchList);

    const actionName = String(localStorage.getItem('actionName'));
    this.actionName = this.storageEncryptionService.decryptData(actionName);

    const encryptedData = String(localStorage.getItem('employeeCode'));
    let employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    // this.getAllBranchByEmployeeCode(employeeCode);

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
    this.getAllPermanentSeat(),
    this.getAllAvailableSeat(),
    this.getAllStatus(),
    this.getAllPermanentAvailableSeatCount(),
    this.getAllPermanentAvailableSeatCount1()
    ])
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

      this.getAllPermanentAvailableSeatCount();
    }
    else{
      this.value = this.data.filter((item: any) => item.branch === this.formGroup.value.branchId);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    for (var i = 0; i < this.branchList.length; i++) {
      if (this.branchList[i].branchName == this.formGroup.value.branchId) {
        this.branchId = this.branchList[i].branchId;
      }
    }
    this.value = this.branchId;
    this.getAllPermanentAvailableSeatCountByBranchId(this.value);
    
  }
  }

  selectBranch1(event: any) {
    if(this.formGroup.value.branchId1 == "None"){
      this.value = this.data1;
      this.dataSource1 = new MatTableDataSource(this.value);
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.data = this.value;

      this.getAllPermanentAvailableSeatCount1();
    }
    else{
      this.value = this.data1.filter((item: any) => item.branchName === this.formGroup.value.branchId1);
      this.dataSource1 = new MatTableDataSource(this.value);
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.data = this.value;
    for (var i = 0; i < this.branchList.length; i++) {
      if (this.branchList[i].branchName == this.formGroup.value.branchId1) {
        this.branchId = this.branchList[i].branchId;
      }
    }
    this.value = this.branchId;
    this.getAllPermanentAvailableSeatCountByBranchId1(this.value);
    
  }
  }

  openDialog() {
    this.dialog.open(PermanentBookingDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllPermanentSeat();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(PermanentBookingDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllPermanentSeat();
      }
    })
  }

  getAllAvailableSeat(){
    this.service.getAllAvailableSeat()
    .subscribe({
      next: (res) => {        

        this.data1=res.filter((item:any) => {
          return this.branchList.some((branch:any) => {
            return item.branchName === branch.branchName;
          });
        });

        this.dataSource1 = new MatTableDataSource(
          res.filter((item:any) => {
            return this.branchList.some((branch:any) => {
              return item.branchName === branch.branchName;
            });
          })
        );

        this.dataSource1.paginator = this.paginator1;
        this.dataSource1.sort = this.sort1;
      },
      error: (res) => {
        this.alertify.error("Error While fetching The Records!!")
      }
    })
  }

    getAllPermanentSeat() {
    this.service.getAllPermanentSeat()
      .subscribe({
        next: (res) => {        

          this.data=res.filter((item:any) => {
            return this.branchList.some((branch:any) => {
              return item.branch === branch.branchName;
            });
          });

          this.dataSource = new MatTableDataSource(
            res.filter((item:any) => {
              return this.branchList.some((branch:any) => {
                return item.branch === branch.branchName;
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

  getAllPermanentAvailableSeatCount() {
    this.service.getAllPermanentAvailableSeat()
      .subscribe({
        next: (res) => {
          this.availableSeatCountList = res;
          this.totalCount = this.availableSeatCountList[0].totalCount;
          this.occupiedCount = this.availableSeatCountList[0].occupiedCount;
          this.vacanteCount = this.availableSeatCountList[0].vacanteCount;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllPermanentAvailableSeatCount1() {
    this.service.getAllPermanentAvailableSeat()
      .subscribe({
        next: (res) => {
          this.availableSeatCountList1 = res;
          this.totalCount1 = this.availableSeatCountList1[0].totalCount;
          this.occupiedCount1 = this.availableSeatCountList1[0].occupiedCount;
          this.vacanteCount1 = this.availableSeatCountList1[0].vacanteCount;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllPermanentAvailableSeatCountByBranchId(branchId:Number) {
    this.service.getAllPermanentAvailableSeatByBranchId(branchId)
      .subscribe({
        next: (res) => {
          this.availableSeatCountList = res;
          this.totalCount = this.availableSeatCountList[0].totalCount;
          this.occupiedCount = this.availableSeatCountList[0].occupiedCount;
          this.vacanteCount = this.availableSeatCountList[0].vacanteCount;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllPermanentAvailableSeatCountByBranchId1(branchId:Number) {
    this.service.getAllPermanentAvailableSeatByBranchId(branchId)
      .subscribe({
        next: (res) => {
          this.availableSeatCountList1 = res;
          this.totalCount1 = this.availableSeatCountList1[0].totalCount;
          this.occupiedCount1 = this.availableSeatCountList1[0].occupiedCount;
          this.vacanteCount1 = this.availableSeatCountList1[0].vacanteCount;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }


  deleteData(id: number) {
    this.alertify.confirm('Delete Permanent Seat', 'Are you sure to delete Permanent Seat',
      () => {
        this.service.deletePermanentSeat(id)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllPermanentSeat();
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
    this.dataSource = new MatTableDataSource<any>(this.data); // Initialize the dataSource object with the first data array
    this.dataSource.paginator = this.paginator;

    this.dataSource1 = new MatTableDataSource<any>(this.data1); // Initialize the dataSource1 object with the second data array
    this.dataSource1.paginator = this.paginator1;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

}
