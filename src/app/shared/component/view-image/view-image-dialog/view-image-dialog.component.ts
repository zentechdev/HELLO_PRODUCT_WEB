import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-image-dialog',
  templateUrl: './view-image-dialog.component.html',
  styleUrls: ['./view-image-dialog.component.css']
})
export class ViewImageDialogComponent implements OnInit {

  image!:string;

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,private dialogRef: MatDialogRef<ViewImageDialogComponent>) { this.dialogRef.disableClose=true}

  ngOnInit(): void {
    this.image=this.editData.image;
  }

}
