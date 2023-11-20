import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { VisitorDetailsService } from 'src/app/service/report/visitor-details/visitor-details.service';


@Component({
  selector: 'app-visitor-details-dialog',
  templateUrl: './visitor-details-dialog.component.html',
  styleUrls: ['./visitor-details-dialog.component.css']
})
export class VisitorDetailsDialogComponent implements OnInit {

  displayedColumns: string[] = ['Id','materialName', 'materialSerialNumber',];
  dataSource!: MatTableDataSource<any>;
  formGroup!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  latest_date!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any, private formBuilder: FormBuilder, public dialog: MatDialog,private service: VisitorDetailsService, private alertify: AlertifyService) { }

  async ngOnInit(): Promise<void> {
    this.dataSource = this.editData;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
