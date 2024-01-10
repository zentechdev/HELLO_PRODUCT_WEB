import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { PlanDetailsService } from 'src/app/service/client-details/plan-details.service';
import { OrganizationService } from 'src/app/service/organization/organization.service';

@Component({
  selector: 'app-plan-details-dialog',
  templateUrl: './plan-details-dialog.component.html',
  styleUrls: ['./plan-details-dialog.component.css']
})
export class PlanDetailsDialogComponent implements OnInit {

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
  orgList: any;
  planList: any;
  organizationId: any;
  planId: any;
  cost!: number;


  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: PlanDetailsService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<PlanDetailsDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      organizationId: ['', Validators.required],
      planId: ['', Validators.required],
      startDate: ['', Validators.required],
      enddate: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      finalPrice: ['', Validators.required],
      isActive: ['', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['organizationId'].setValue(this.editData.organizationName);
      this.formGroup.controls['planId'].setValue(this.editData.planName);
      // Log the dates before and after transformation
      const transformedStartDate = this.datePipe.transform(this.editData.startDate, 'yyyy-MM-dd');
      this.formGroup.controls['startDate'].setValue(transformedStartDate);

      const transformedEndDate = this.datePipe.transform(this.editData.enddate, 'yyyy-MM-dd');
      this.formGroup.controls['enddate'].setValue(transformedEndDate);

      this.formGroup.controls['price'].setValue(this.editData.price);
      this.formGroup.controls['discount'].setValue(this.editData.discount);
      this.formGroup.controls['finalPrice'].setValue(this.editData.finalPrice);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);

      this.cost=this.editData.price;

    }

    this.getAllOrganisation();
    this.getAllPlan();
    this.getIsActive();

  }


  getAllOrganisation() {
    this.service.getAllOrganisation()
      .subscribe({
        next: (res) => {
          this.orgList = res.data.filter((item: any) => item.isActive == 'Active');
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllPlan() {
    this.service.getAllPlan()
      .subscribe({
        next: (res) => {
          this.planList = res.data.filter((item: any) => item.isActive == 'Active');
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

  selectStatus(event: any) {
    let price = this.planList.filter((item: any) => item.planName == this.formGroup.value.planId)

    // Example usage:
    const startDate = new Date(this.formGroup.value.startDate); // Replace with your start date
    const endDate = new Date(this.formGroup.value.enddate);   // Replace with your end date
    const annualCost = price[0].price;  // Replace with your annual cost

    this.cost = this.calculateCost(startDate, endDate, annualCost);

    this.formGroup.controls['price'].setValue(Math.floor(this.cost));
    this.formGroup.controls['finalPrice'].setValue(Math.floor(this.cost));
  }


  calculateCost(startDate: Date, endDate: Date, annualCost: number): number {
    // Calculate the difference in years, months, and days
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const days = endDate.getDate() - startDate.getDate();

    // Calculate the total number of months and days
    const totalMonths = years * 12 + months;
    const totalDays = totalMonths * 30 + days; // Assuming an average of 30 days per month

    // Calculate the prorated cost based on the total number of months and days
    const proratedCost = (annualCost / 365) * totalDays;

    return proratedCost;
  }

  selectDiscount(event: any) {

    const discount = this.formGroup.value.discount;

    if (this.cost) {
      // Assuming this.cost represents the calculated cost as a number
      const discountedAmount = this.cost - (this.cost * discount / 100);
      // Set the discounted amount to the appropriate form control
      this.formGroup.controls['finalPrice'].setValue(Math.floor(discountedAmount));
    } else {
      // Assuming this.cost represents the calculated cost as a number
      const discountedAmount = this.cost - (this.formGroup.value.price * discount / 100);
      // Set the discounted amount to the appropriate form control
      this.formGroup.controls['finalPrice'].setValue(Math.floor(discountedAmount));
    }
    

  }


  postData() {

    for (var i = 0; i < this.orgList.length; i++) {
      if (this.orgList[i].organizationName == this.formGroup.value.organizationId) {
        this.organizationId = this.orgList[i].id;
      }
    }

    for (var i = 0; i < this.planList.length; i++) {
      if (this.planList[i].planName == this.formGroup.value.planId) {
        this.planId = this.planList[i].id;
      }
    }

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    let formData = {
      "organizationId": this.organizationId,
      "planId": this.planId,
      "startDate": this.formGroup.value.startDate,
      "enddate": this.formGroup.value.enddate,
      "price": this.formGroup.value.price,
      "discount": this.formGroup.value.discount,
      "finalPrice": this.formGroup.value.finalPrice,
      "isActiveId": this.isActiveId
    }


    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postPlanDetails(formData)
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
      this.service.putPlanDetails(formGroup, this.editData.id)
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
