import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { InquiryOrgnizationService } from 'src/app/service/client-details/inquiry-orgnization.service';


@Component({
  selector: 'app-inquiry-organization-dialog',
  templateUrl: './inquiry-organization-dialog.component.html',
  styleUrls: ['./inquiry-organization-dialog.component.css']
})
export class InquiryOrganizationDialogComponent implements OnInit {


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

  constructor(private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service:InquiryOrgnizationService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<InquiryOrganizationDialogComponent>) {
    this.dialogRef.disableClose = true
  }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      organizationName: ['', Validators.required],
      organizationAddress: ['', Validators.required],
      inquiryPerson: ['', Validators.required],
      contactNumber: ['', Validators.required],
      emailId: ['', Validators.required],
      moduleId: this.formBuilder.control([], Validators.required),
      purchaseId:['', Validators.required],
      feedback:[''],
      comment:[''],
      isActive: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['organizationName'].setValue(this.editData.organizationName);
      this.formGroup.controls['organizationAddress'].setValue(this.editData.organizationAddress);
      this.formGroup.controls['inquiryPerson'].setValue(this.editData.InquiryPerson);
      this.formGroup.controls['contactNumber'].setValue(this.editData.ContactNumber);
      this.formGroup.controls['purchaseId'].setValue(this.editData.purchase);
      this.formGroup.controls['emailId'].setValue(this.editData.emailId);
      this.formGroup.controls['feedback'].setValue(this.editData.feedback);
      this.formGroup.controls['comment'].setValue(this.editData.comment);
      // Conversion of string array to number array
      const stringArrayEmployeeCode: string[] = this.editData.module;
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
      "organizationName": this.formGroup.value.organizationName,
      "organizationAddress": this.formGroup.value.organizationAddress,
      "inquiryPerson": this.formGroup.value.inquiryPerson,
      "contactNumber": this.formGroup.value.contactNumber,
      "emailId": this.formGroup.value.emailId,
      "planName": this.formGroup.value.planName,
      "purchaseId": this.formGroup.value.purchaseId === 'Yes' ? 1 : 2,
      "feedback": this.formGroup.value.feedback,
      "comment": this.formGroup.value.comment,
      "moduleId": moduleId == '' ? 0 : moduleId,
      "isActiveId": this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postInquiryOrganization(formData)
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
      this.service.putInquiryOrganization(formData, this.editData.id)
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
