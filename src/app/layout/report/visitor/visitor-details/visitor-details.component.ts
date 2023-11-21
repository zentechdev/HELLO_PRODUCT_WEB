import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VisitorDetailsService } from 'src/app/service/report/visitor-details/visitor-details.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { VisitorDetailsDialogComponent } from '../visitor-details-dialog/visitor-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-visitor-details',
  templateUrl: './visitor-details.component.html',
  styleUrls: ['./visitor-details.component.css']
})
export class VisitorDetailsComponent implements OnInit {


  displayedColumns: string[] =['Id', 'visitorName', 'mobileNumber','employeeCode', 'emailId', 'location', 'branchName','createdDate', 'isActive','Action'];
  // displayedColumns: string[] = ['visitorId', 'visitorName', 'mobileNumber', 'emailId', 'location', 'branchName', 'departmentName', 'actions',];
  dataSource!: MatTableDataSource<any>;
  data1: any[] = [];

  displayedColumns1: string[] = ['Id', 'visitorName', 'mobileNumber', 'emailId', 'location', 'createdDate','Action','isActive'];
  dataSource1!: MatTableDataSource<any>;
  data2: any[] = [];


  secondFormGroup = this._formBuilder.group({
    secondCtrl: [''],
  });
  siteId: any;
  
  openDialog(row: any) {
    this.dialog.open(VisitorDetailsDialogComponent, {
      data: row,
      width: '100%'
    }).afterClosed().subscribe((val: string) => {
      if (val === 'UPDATE') {
        this.dateEvent();
      }
    })
  }

  formGroup!: FormGroup;
  formGroup1!: FormGroup;
  ArrayList: any[] = [];

  @ViewChild('paginator') paginator!: MatPaginator; // Assuming you have a paginator element with the template reference variable 'paginator'
  @ViewChild('paginator1') paginator1!: MatPaginator;


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sort1!: MatSort;

  Insert: boolean = false;
  Update: boolean = false;
  Delete: boolean = false;
  Select: boolean = false;

  actionName: any;
  branchList: any;
  branchId:any;
  exporter: any;
  data: any;
  value: any;
  // formGroup2: any;

  
  filteredBranches: any;

  async filterBranches(event: any) : Promise<void> {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches =await this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }
  constructor(private storageEncryptionService: StorageEncryptionService, private _formBuilder: FormBuilder, private alertify: AlertifyService, private service: VisitorDetailsService, public dialog: MatDialog) {

  }

  async ngOnInit(): Promise<void> {

    // this.formGroup = this._formBuilder.group({
    //   branchId: ['']
    // })
    
    const siteId = String(localStorage.getItem('siteId'));
    this.siteId = this.storageEncryptionService.decryptData(siteId);

    await this.getAllInvitedVisitor();
    await this.getAllNonInvitedVisitor(this.siteId);
    this.formGroup = this._formBuilder.group({
      DatePicker1: [''],
      DatePicker2: [''],
    })

    this.formGroup1 = this._formBuilder.group({
      DatePicker3: [''],
      DatePicker4: [''],
    })


    // const actionName = String(localStorage.getItem('actionName'));
    // this.actionName = this.storageEncryptionService.decryptData(actionName);

    // const encryptedData = String(localStorage.getItem('employeeCode'));
    // let employeeCode = this.storageEncryptionService.decryptData(encryptedData);

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

  }

  getAllInvitedVisitor() {

    this.service.getAllInvitedVisitor()
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

  getAllNonInvitedVisitor(siteId:number) {
    debugger
    this.service.getAllNonInvitedVisitor(siteId)
      .subscribe({
        next: (res) => {
          this.data2 = res.data;
          this.dataSource1 = new MatTableDataSource(this.data2 );
          this.dataSource1.paginator = this.paginator;
          this.dataSource1.sort = this.sort;
        },
        error: (error) => {
          this.alertify.error("Error while fetching the records!");
        }
      });
  }
  
  dateEvent1() {
    if (this.formGroup1.valid) {
      let queryParams = {
        "startDate": this.formGroup1.value.DatePicker3.toLocaleDateString("fr-CA").split("/").reverse().join("-"),
        "endDate": this.formGroup1.value.DatePicker4.toLocaleDateString("fr-CA").split("/").reverse().join("-")
      };

      this.service.getNonInvitedVisitorByDateRange(queryParams)
        .subscribe({
          next: (res) => {
            this.data = res.data.filter((item: any) => {
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

  dateEvent() {
    if (this.formGroup.valid) {
      let queryParams = {
        "startDate": this.formGroup.value.DatePicker1.toLocaleDateString("fr-CA").split("/").reverse().join("-"),
        "endDate": this.formGroup.value.DatePicker2.toLocaleDateString("fr-CA").split("/").reverse().join("-")
      };

      this.service.getInvitedVisitorByDateRange(queryParams)
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

  async selectStatus(event: any) {
    this.value = this.formGroup.value.branchId;
    await this.getTodayInvitedVisitorByBranchId(this.value)
    await this.getTodayNonInviteVisitorByBranchId(this.value)
  }

  getTodayInvitedVisitorByBranchId(branchId:Number){
    this.service.getTodayInvitedVisitorByBranchId(branchId)
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

  getTodayNonInviteVisitorByBranchId(branchId:Number){
    this.service.getTodayNonInviteVisitorByBranchId(branchId)
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

checkOut(mobileNumber:String){
  let data = null;
  this.service.checkOut(mobileNumber,data)
  .subscribe({
    next:(res)=>{
      if(res.isSuccess == true){
        this.alertify.success(res.message);
        this.getAllNonInvitedVisitor(this.siteId);
      }
      else{
        this.alertify.error(res.message);
      }
    },
    error:(res)=>{
      this.alertify.error("Error While fetching The Records!!")
    }   
  })
  }

}
