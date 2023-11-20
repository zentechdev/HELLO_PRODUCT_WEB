import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import { VisitingCardShareService } from 'src/app/service/visiting-card/visiting-card-share.service';
import { VisitingCardShareComponent } from '../visiting-card-share/visiting-card-share.component';
import { ViewImageDialogComponent } from 'src/app/shared/component/view-image/view-image-dialog/view-image-dialog.component';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';


@Component({
  selector: 'app-visiting-card-list',
  templateUrl: './visiting-card-list.component.html',
  styleUrls: ['./visiting-card-list.component.css']
})
export class VisitingCardListComponent implements OnInit {

  displayedColumns: string[] = ['select','visitingCardId', 'employeeCode', 'personName', 'phoneNumber','emailId', 'image'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data:any[]=[];
  branchList: any;

  constructor(private service1: DashboardService, private storageEncryptionService: StorageEncryptionService,private service: VisitingCardShareService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getAllVisitingCard();

    const encryptedData = String(localStorage.getItem('employeeCode'));
    let employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    const branchList = String(localStorage.getItem('branchList'));
    this.branchList = this.storageEncryptionService.decryptData(branchList);

    // this.getAllBranchByEmployeeCode(employeeCode);

  }

  // getAllBranchByEmployeeCode(employeeCode:String){
  //   this.service1.getAllBranchByEmployeeCode(employeeCode)
  //   .subscribe({
  //    next:(res)=>{
  //     this.branchList = res.filter((item: any) => item.stateName).sort((a: { stateName: string; }, b: { stateName: any; }) =>          a.stateName.localeCompare(b.stateName));
  //    },
  //    error:(res)=>{
  //      this.alertify.error("Error While fetching The Records!!")
  //    }
  //   })
    
  //  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      // if there is a selection then clear that selection
      if (this.isSomeSelected()) {
        this.selection.clear(); 
      } else {
        this.isAllSelected()
          ? this.selection.clear()
          : this.dataSource.filteredData.forEach(row => this.selection.select(row));;
      }
    }
  
    isSomeSelected() {
      (this.selection.selected);
      return this.selection.selected.length > 0;
    }

  openDialog() {
    if(this.selection.selected.length > 0){
      let visitingCardId=this.selection.selected;
      this.dialog.open(VisitingCardShareComponent, {
        data:{visitingCardId:visitingCardId},
        width: '30%',
        disableClose:true
      }).afterClosed().subscribe(val => {
        if (val === 'SHARE') {
          this.getAllVisitingCard();
          this.masterToggle();
        }
      })
    }
    else{
      this.alertify.error("Please Select At Least One Record!!!")
    }
  }

  editData(row: any) {
    this.dialog.open(VisitingCardShareComponent, {
      data: row,
      width: '100%'
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllVisitingCard();
      }
    })
  }

  openImageDialog(row: any) {
    this.dialog.open(ViewImageDialogComponent, {
      data: row,
      width: '30%',
      disableClose:true
    }).afterClosed().subscribe(val => {

    })
  }

  getAllVisitingCard() {
    this.service.getAllVisitingCard()
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
