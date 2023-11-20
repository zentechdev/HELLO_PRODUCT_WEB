import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExportType, MatTableExporterDirective } from 'mat-table-exporter';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { VisitingCardShareService } from 'src/app/service/report/visitingcard/visiting-card-share.service';
import { MAT_TABLE_EXPORTER } from 'mat-table-exporter';
import { ViewImageDialogComponent } from 'src/app/shared/component/view-image/view-image-dialog/view-image-dialog.component';


@Component({
  selector: 'app-visiting-card-external-dialog',
  templateUrl: './visiting-card-external-dialog.component.html',
  styleUrls: ['./visiting-card-external-dialog.component.css']
})
export class VisitingCardExternalDialogComponent implements OnInit {

  displayedColumns: string[] = ['Id','employeeCode', 'personName','mobileNumber', 'emailId', 'companyName', 'designation', 'createdBy', 'createdOn', 'isActive',];
  dataSource!: MatTableDataSource<any>;
  formGroup!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter!: MatTableExporterDirective;
  @ViewChild(MatSort) sort!: MatSort;
  latest_date!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any, public dialog: MatDialog, private service:VisitingCardShareService, private alertify: AlertifyService) { }

  async ngOnInit(): Promise<void> {
    await this.getAllVisitingCardByDate();
  }

  getAllVisitingCardByDate() {

    var date = new Date(this.editData.date);
    this.latest_date = date.toLocaleDateString("fr-CA").split("/").reverse().join("-");


    let data = {
      "dateTime": this.latest_date,
      "employeeCode": this.editData.toEmployee
    };

    this.service.getAllSharedVisitingCardByDate(data)
      .subscribe({
        next: (res) => {
          (res)
           this.dataSource = new MatTableDataSource(res);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      })
  }

  openDialog(row: any) {
    this.dialog.open(ViewImageDialogComponent, {
      data: row,
      width: '30%',
      disableClose:true
    }).afterClosed().subscribe(val => {

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
