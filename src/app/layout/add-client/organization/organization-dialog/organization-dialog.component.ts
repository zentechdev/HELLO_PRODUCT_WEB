import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { OrganizationService } from 'src/app/service/organization/organization.service';

@Component({
  selector: 'app-organization-dialog',
  templateUrl: './organization-dialog.component.html',
  styleUrls: ['./organization-dialog.component.css']
})
export class OrganizationDialogComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  brochureTypeList: any;
  brochureTypeListId: any;
  file: any;
  isActiveList: any;
  isActiveId: any;
  brochure!: string;
  techTypeLsit: any;
  orgTypeList: any;
  inqOrgList: any;
  inqOrgId: any;
  orgTypeId: any;
  visitorTechId: any;
  employeeTechId: any;
  logo: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service:OrganizationService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<OrganizationDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      inquiryId: ['', Validators.required],
      orgnisationTypeId: ['', Validators.required],
      visitorTechTypeId: ['', Validators.required],
      employeeTechTypeId: ['', Validators.required],
      logo: ['', Validators.required],
      isActive: ['', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['inquiryId'].setValue(this.editData.organizationName);
      this.formGroup.controls['orgnisationTypeId'].setValue(this.editData.orgnisationType);
      this.formGroup.controls['visitorTechTypeId'].setValue(this.editData.visitorTechType);
      this.formGroup.controls['employeeTechTypeId'].setValue(this.editData.employeeTechType);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
      this.logo = this.editData.logo;
    }

    this.getAllInquiryOrganization();
    this.getOrganizationType();
    this.getTechnologyType();
    this.getIsActive();

  }

  selectFile(event: any) {
    if (event.target.files[0].name.includes('.png','.jpeg')) {
      this.file = event.target.files[0];
    } else {
      this.alertify.error("File format is not correct.");
    }
    //Create URL to view pdf
    this.logo = URL.createObjectURL(this.file);
  }

  getAllInquiryOrganization() {
    this.service.getAllInquiryOrganization()
      .subscribe({
        next: (res) => {
          this.inqOrgList = res.data.filter((item:any)=>item.isActive=='Active');
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getTechnologyType() {
    this.service.getTechnologyType()
      .subscribe({
        next: (res) => {
          this.techTypeLsit = res.data.filter((item:any)=>item.isActive=='Active');
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getOrganizationType() {
    this.service.getOrganizationType()
      .subscribe({
        next: (res) => {
          this.orgTypeList = res.data.filter((item:any)=>item.isActive=='Active');
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

    for (var i = 0; i < this.inqOrgList.length; i++) {
      if (this.inqOrgList[i].organizationName == this.formGroup.value.inquiryId) {
        this.inqOrgId = this.inqOrgList[i].id;
      }
    }

    for (var i = 0; i < this.orgTypeList.length; i++) {
      if (this.orgTypeList[i].name == this.formGroup.value.orgnisationTypeId) {
        this.orgTypeId = this.orgTypeList[i].id;
      }
    }

    for (var i = 0; i < this.techTypeLsit.length; i++) {
      if (this.techTypeLsit[i].name == this.formGroup.value.visitorTechTypeId) {
        this.visitorTechId = this.techTypeLsit[i].id;
      }
    }

    for (var i = 0; i < this.techTypeLsit.length; i++) {
      if (this.techTypeLsit[i].name == this.formGroup.value.employeeTechTypeId) {
        this.employeeTechId = this.techTypeLsit[i].id;
      }
    }

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    //apend data in multipart
    let formData = new FormData()
    formData.append("logo", this.file);
    formData.append("visitorTechTypeId", this.visitorTechId);
    formData.append("employeeTechTypeId", this.employeeTechId);
    formData.append("orgnisationTypeId", this.orgTypeId);
    formData.append("inquiryId", this.inqOrgId);
    formData.append("isActiveId", this.isActiveId);


    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postOrganizationDetails(formData)
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


  putData(formGroup: any) {
    
    if (this.formGroup.valid) {
      this.service.putOrganizationDetails(formGroup, this.editData.id)
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
