import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, map, startWith } from 'rxjs';
import { Employee } from 'src/app/model/visiting-card/employee';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { VisitingCardShareService } from 'src/app/service/visiting-card/visiting-card-share.service';

export interface DialogData {
  visitingCardId: any;
}

@Component({
  selector: 'app-visiting-card-share',
  templateUrl: './visiting-card-share.component.html',
  styleUrls: ['./visiting-card-share.component.css']
})
export class VisitingCardShareComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SHARE';
  employeeList: any;
  options!: Employee[];
  visitingCardId: any;
  finaldata: any;
  employeeCode: any;


  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: VisitingCardShareService, @Inject(MAT_DIALOG_DATA) public editData: DialogData, private dialogRef: MatDialogRef<VisitingCardShareComponent>) {
    this.service.getAllEmployee().subscribe(item => {
      this.options = item;
    }),

    this.dialogRef.disableClose=true;
  }

  async ngOnInit(): Promise<void> {
    this.formGroup =await this.formBuilder.group({
      employeeCode: ['', Validators.required],
    })

    this.finaldata = this.formGroup.get("employeeCode")?.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(item => {
        const employeeCode = item;
        return employeeCode ? this._filter(employeeCode as number) : this.options
      })
    )
  }

  private _filter(employeeCode: number): Employee[] {
    const filterValue = employeeCode.toString();
    return this.options.filter(opt => opt.employeeCode.toString().includes(filterValue));
  }


  postData() {

    let array = [];

    for (var i = 0; i < this.editData.visitingCardId.length; i++) {
      this.visitingCardId = this.editData.visitingCardId[i].visitingCardId;
      array.push(this.visitingCardId)
    }

    const encryptedData = String(localStorage.getItem('employeeCode'));
    this.employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    let formData = {
      "visitingCardId": array,
      "employeeCode": this.formGroup.value.employeeCode,
      "createdBy": this.employeeCode
    }
     
    

    if (formData.visitingCardId.length > 0) {
      if(this.formGroup.valid){
        this.service.postShareVisitingCard(formData)
        .subscribe({
          next: (res) => {
            if (res.isSuccess == true) {
              this.alertify.success(res.message);
              this.formGroup.reset();
              this.dialogRef.close('SHARE');
            }
            else {
              this.alertify.error(res.message);
            }
          },
          error: (res) => {
            this.alertify.error("500 Internal Server Error");
          }
        })
    }
      }
    }
  }


function startwith(arg0: string): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');

}



