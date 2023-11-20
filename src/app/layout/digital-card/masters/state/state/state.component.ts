import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StateService } from 'src/app/service/masters/state.service';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  colorCodeList: any;
  disabled: boolean = true;
  colorCodeListId: any;
  isActiveList: any;
  isActiveId: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: StateService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<StateComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      stateName: ['', Validators.required],
      stateCode: ['', Validators.required],
      colorCodeId: [''],
      isActive: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['stateName'].setValue(this.editData.stateName);
      this.formGroup.controls['stateCode'].setValue(this.editData.stateCode);
      this.formGroup.controls['colorCodeId'].setValue(this.editData.colorCode);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    this.formGroup.get('stateName')?.disable();

    this.getColorCode();
    this.getIsActive();

  }

  getColorCode() {
    this.service.getColorCode()
      .subscribe({
        next: (res) => {
          this.colorCodeList = res.filter((item:any)=>item.isActive=='Active');
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getIsActive() {
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

  postData() {

    for (var i = 0; i < this.colorCodeList.length; i++) {
      if (this.colorCodeList[i].colorCode == this.formGroup.value.colorCodeId) {
        this.colorCodeListId = this.colorCodeList[i].colorCodeId;
      }
    }

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    let formGroup = {
      "stateName": this.formGroup.get('stateName')?.value,
      "stateCode": this.formGroup.value.stateCode,
      "colorCodeId": this.colorCodeListId,
      "isActiveId": this.isActiveId
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postState(formGroup)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.formGroup.reset();
                this.dialogRef.close('SAVE');
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
    else {
      this.putData(formGroup);
    }
  }

  putData(formGroup: any) {
    if (this.formGroup.valid) {
      this.service.putState(formGroup, this.editData.stateId)
        .subscribe({
          next: (res) => {
            if (res.isSuccess == true) {
              this.alertify.success(res.message);
              this.formGroup.reset;
              this.dialogRef.close('UPDATE');
            }
            else {
              alert(res.message);
            }
          },
          error: (res) => {
            this.alertify.error("500 Internal Server Error");
          }
        })
    }
  }

}
