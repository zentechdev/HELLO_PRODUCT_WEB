import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { VisitorDetailsService } from 'src/app/service/report/visitor-details/visitor-details.service';

@Component({
  selector: 'app-walk-in-visitor',
  templateUrl: './walk-in-visitor.component.html',
  styleUrls: ['./walk-in-visitor.component.css']
})
export class WalkInVisitorComponent implements OnInit {
  
  displayedColumns: string[] = ['Id', 'siteName','unitName','unitNumber','visitorName','mobileNumber','emailId','createdDate','image','status','isActive'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formGroup!: FormGroup;
  data!: any[];
  clientId!: number;
  siteId!: number;
  unitId!: number;
  roleName: any;

  constructor(private storageEncryptionService:StorageEncryptionService,private service:VisitorDetailsService,private alertify:AlertifyService,private formBuilder:FormBuilder) { }

  async ngOnInit(): Promise<void> {

    this.formGroup = this.formBuilder.group({
      DatePicker1: ['', Validators.required],
      DatePicker2: ['', Validators.required],
    })

    await this.getAllTodaysVisitor();

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const unitId = String(localStorage.getItem("unitId"));
    this.unitId = Number(this.storageEncryptionService.decryptData(unitId));

    const roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);
  }

  async getAllTodaysVisitor(){
    this.service.getAllTodaysVisitor()
    .subscribe({
      next:(res)=>{
        if(this.roleName=="Master Admin"){
          this.data = res.data;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else if(this.roleName=="Super Admin"){
          this.data = res.data;
          this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }else if(this.roleName=="Site Admin"){
          this.data = res.data;
          this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId ));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }else if(this.roleName=="Unit Admin"){
          this.data = res.data;
          this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId && item.unitId == this.unitId));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error:(res)=>{
        this.alertify.error("Error While fetching The Records!!");
      } 
    })
  }

  dateEvent() {
    if (this.formGroup.valid) {
      let queryParams = {
        "startDate": this.formGroup.value.DatePicker1.toLocaleDateString("fr-CA").split("/").reverse().join("-"),
        "endDate": this.formGroup.value.DatePicker2.toLocaleDateString("fr-CA").split("/").reverse().join("-")
      };

      this.service.getNonInvitedVisitorByDateRange(queryParams)
        .subscribe({
          next: (res) => {
            if(this.roleName=="Master Admin"){
              this.data = res.data;
              this.dataSource = new MatTableDataSource(this.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
            else if(this.roleName=="Super Admin"){
              this.data = res.data;
              this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId));
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }else if(this.roleName=="Site Admin"){
              this.data = res.data;
              this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId ));
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }else if(this.roleName=="Unit Admin"){
              this.data = res.data;
              this.dataSource = new MatTableDataSource(this.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId && item.unitId == this.unitId));
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          },
          error: (res) => {
            this.alertify.error("Error While fetching The Records!!");
          }
        })
    }
  }

  checkOut(mobileNumber: string) {

    let data = null;

    this.service.checkOut(mobileNumber, data)
      .subscribe({
        next: (res) => {
          if (res.isSuccess == true) {
            this.alertify.success(res.message);
            this.getAllTodaysVisitor();
          }
          else {
            this.alertify.error(res.message);
          }
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(); 
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
