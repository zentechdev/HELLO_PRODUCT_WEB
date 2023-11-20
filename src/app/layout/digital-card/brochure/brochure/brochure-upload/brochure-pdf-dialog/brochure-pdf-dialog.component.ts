import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-brochure-pdf-dialog',
  templateUrl: './brochure-pdf-dialog.component.html',
  styleUrls: ['./brochure-pdf-dialog.component.css']
})
export class BrochurePdfDialogComponent implements OnInit {

  brochure: any;

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<BrochurePdfDialogComponent>) { }

  ngOnInit(): void {
    
    this.brochure = { url:this.editData.brochure, withCredentials: true}
  }

}
