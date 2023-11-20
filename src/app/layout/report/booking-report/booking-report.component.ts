import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { BookingReportService } from 'src/app/service/report/booking-report/booking-report.service';



@Component({
  selector: 'app-booking-report',
  templateUrl: './booking-report.component.html',
  styleUrls: ['./booking-report.component.css']
})
export class BookingReportComponent implements OnInit {

  displayedColumns: string[] = ['occupiedSeatId', 'employeeCode', 'employeeName','grade','departmentName','categoryCode','zone','branch','branchName', 'seatType', 'seatNumber','fromDate','toDate','bookingStatus'];

  dataSource!: MatTableDataSource<any>;

  data: any[] = [];

 

  displayedColumns1: string[] = ['occupiedMeetingRoomId', 'employeeCode', 'employeeName','grade','departmentName','categoryCode','zone','branch', 'branchName','meetingRoomType','meetingRoomName','fromDate','toDate', 'bookingStatus'];

  dataSource1!: MatTableDataSource<any>;

  data1: any[] = [];

  formGroup!: FormGroup;
  formGroup1!: FormGroup;
  ArrayList:any[] = [];

  @ViewChild('paginator') paginator!: MatPaginator; // Assuming you have a paginator element with the template reference variable 'paginator'
  @ViewChild('paginator1') paginator1!: MatPaginator;


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sort1!: MatSort;

  actionName: any;
  branchList: any;
  ArrayList1:any[] = [];
  value: any;
  filteredBranches: any;

  async filterBranches(event: any) : Promise<void> {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches =await this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }

  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private service: BookingReportService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getAllOccupiedSeat();
    await this.getAllOccupiedMeetingRoom();

    this.formGroup = this.formBuilder.group({
      DatePicker1: [''],
      DatePicker2: [''],
      branchId:[''],
      isActiveId:['']
    })

    this.formGroup1 = this.formBuilder.group({
      DatePicker3: [''],
      DatePicker4: [''],
      branchId1:[''],
      isActiveId1:['']
    })

    const branchList = String(localStorage.getItem('branchList'));
    this.branchList = this.storageEncryptionService.decryptData(branchList);

    const actionName = String(localStorage.getItem('actionName'));
    this.actionName = this.storageEncryptionService.decryptData(actionName);

    const encryptedData = String(localStorage.getItem('employeeCode'));
    let employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    // this.getAllBranchByEmployeeCode(employeeCode);
  }

  // getAllBranchByEmployeeCode(employeeCode: String) {
  //   this.service.getAllBranchByEmployeeCode(employeeCode)
  //     .subscribe({
  //       next: (res) => {
  //         this.branchList = res.filter((item: any) => item.stateName).sort((a: { stateName: string; }, b: { stateName: any; }) => a.stateName.localeCompare(b.stateName));
  //       },
  //       error: (res) => {
  //         this.alertify.error("Error While fetching The Records!!")
  //       }
  //     })
  // }

  selectStatus1(event: any) {

    const value = this.formGroup.value.isActiveId;
    if(value == 0){
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else{
      this.value = this.data.filter((item: any) => item.bookingStatus === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
  }

  selectStatus2(event: any) {
    const value = this.formGroup1.value.isActiveId1;
    if(value == 0){
      this.value = this.data1;
      this.dataSource1 = new MatTableDataSource(this.value);
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.data = this.value;
    }
    else{
      this.value = this.data1.filter((item: any) => item.bookingStatus === value);
      this.dataSource1 = new MatTableDataSource(this.value);
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.data = this.value;
    }
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
      
      // for (var i = 0; i < this.branchList.length; i++) {
      //   if (this.branchList[i].branchName == this.formGroup.value.branchId) {
      //     this.branchId = this.branchList[i].branchId;
      //   }
      // }

      this.value = this.data.filter((item: any) => item.branchName === this.formGroup.value.branchId);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
      for (let i = 0; i < this.branchList.length; i++) {
        if (this.branchList[i].branchName == this.formGroup.value.branchId) {
          let branchId = this.branchList[i].branchId;
        }
      }
    }

  }



  getAllOccupiedSeat() {

    this.service.getAllOccupiedSeat()
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

  dateEvent() {
    if (this.formGroup.valid) {
      let queryParams = {
        "startDate": this.formGroup.value.DatePicker1.toLocaleDateString("fr-CA").split("/").reverse().join("-"),
        "endDate": this.formGroup.value.DatePicker2.toLocaleDateString("fr-CA").split("/").reverse().join("-")
      };

      this.service.getAllOccupiedSeatByDateRange(queryParams)
        .subscribe({
          next: (res) => {
            this.data = res.filter((item: any) => {
              return this.branchList.some((branch: any) => {
                return item.branchName === branch.branchName;
              });
            });

            this.dataSource = new MatTableDataSource(
              res.filter((item: any) => {
                return this.branchList.some((branch: any) => {
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
  }

  selectBranch1(event: any) {
    if(this.formGroup1.value.branchId1 == "None"){
      this.value = this.data1;
      this.dataSource1 = new MatTableDataSource(this.value);
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.data = this.value;
    }
    else{
      
      // for (var i = 0; i < this.branchList.length; i++) {
      //   if (this.branchList[i].branchName == this.formGroup.value.branchId) {
      //     this.branchId = this.branchList[i].branchId;
      //   }
      // }

      this.value = this.data1.filter((item: any) => item.branchName === this.formGroup1.value.branchId1);
      this.dataSource1 = new MatTableDataSource(this.value);
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.data = this.value;
      for (let i = 0; i < this.branchList.length; i++) {
        if (this.branchList[i].branchName == this.formGroup1.value.branchId1) {
          let branchId = this.branchList[i].branchId;
        }
      }
    }

  }

  getAllOccupiedMeetingRoom() {

    this.service.getAllOccupiedMeetingRoom()
      .subscribe({
        next: (res) => {
          this.data1 = res.filter((item: any) => {
            return this.branchList.some((branch: any) => {
              return item.branchName === branch.branchName;
            });
          });

          this.dataSource1 = new MatTableDataSource(
            res.filter((item: any) => {
              return this.branchList.some((branch: any) => {
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

  dateEvent1() {
    if (this.formGroup1.valid) {
      let queryParams = {
        "startDate": this.formGroup1.value.DatePicker3.toLocaleDateString("fr-CA").split("/").reverse().join("-"),
        "endDate": this.formGroup1.value.DatePicker4.toLocaleDateString("fr-CA").split("/").reverse().join("-")
      };

      this.service.getAllOccupiedMeetingRoomByDateRange(queryParams)
        .subscribe({
          next: (res) => {
            this.data1 = res.filter((item: any) => {
              return this.branchList.some((branch: any) => {
                return item.branchName === branch.branchName;
              });
            });

            this.dataSource1 = new MatTableDataSource(
              res.filter((item: any) => {
                return this.branchList.some((branch: any) => {
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
  }

  getBookingStatusColor(bookingStatus: string): string {
    switch (bookingStatus) {
      case 'Canceled':
        return 'canceled-color'; // CSS class name for canceled status
      case 'In Progress':
        return 'in-progress-color'; // CSS class name for in-progress status
      case 'Occupied':
        return 'occupied-color'; // CSS class name for occupied status
      case 'Pending':
        return 'pending-color'; // CSS class name for pending status
      default:
        return ''; // Default CSS class name if no match is found
    }
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
