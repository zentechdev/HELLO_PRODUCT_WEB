import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { PlanService } from 'src/app/service/masters/plan.service';
import { RoleService } from 'src/app/service/masters/role.service';

@Component({
  selector: 'app-plan-dialog',
  templateUrl: './plan-dialog.component.html',
  styleUrls: ['./plan-dialog.component.css']
})
export class PlanDialogComponent implements OnInit {

  panelOpenState = false;
  formGroup!: FormGroup;
  @ViewChild('select') select!: MatSelect;
  allSelected = false;
  showExpandMoreOption = false;
  checked: Boolean = false;
  actionBtn: string = 'SAVE';
  isActiveList: any;
  isActiveId: any;
  menuList: any;
  animals: any;

  ArrayList: any = [];
  ArrayList1: any = [];
  selected: any = [];
  list: any;
  numberArrayEmployeeCode!: string[];

  constructor(private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service:PlanService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<PlanDialogComponent>) {
    this.dialogRef.disableClose = true
  }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      planName: ['', Validators.required],
      moduleId: this.formBuilder.control([], Validators.required),
      price:['',Validators.required],
      isActive: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['planName'].setValue(this.editData.planName);
      this.formGroup.controls['price'].setValue(this.editData.price);
      // Conversion of string array to number array
      const stringArrayEmployeeCode: string[] = this.editData.moduleName;
      this.numberArrayEmployeeCode = stringArrayEmployeeCode[0].split(',');

      this.formGroup.controls['moduleId'].setValue(this.numberArrayEmployeeCode);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    this.getIsActive();
    this.getAllModule();

  }


  toggleAllSelectionMenu() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
      // this.getActionList();
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }

  }
  optionClickMenu() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
    // this.getActionList();
  }

  getAllModule() {
    this.service.getAllModule()
      .subscribe({
        next: (res) => {
          this.menuList = res.data;
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

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    const moduleArrayList = this.menuList;
    const moduleId: any = [];

    for (let i = 0; i < moduleArrayList.length; i++) {
      if (this.formGroup.value.moduleId.includes(moduleArrayList[i].name)) {
        moduleId.push(moduleArrayList[i].id)
      }
    }

    let formData = {
      "planName": this.formGroup.value.planName,
      "price": this.formGroup.value.price,
      "moduleId": moduleId == '' ? 0 : moduleId,
      "isActiveId": this.isActiveId
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postPlan(formData)
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
      this.putData(formData);
    }
  }

  putData(formData: any) {
    if (this.formGroup.valid) {
      this.service.putPlan(formData, this.editData.id)
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
