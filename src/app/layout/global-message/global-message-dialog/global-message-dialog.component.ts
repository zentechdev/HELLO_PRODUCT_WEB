import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { GlobalMessageService } from 'src/app/service/global-message/global-message.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';

@Component({
  selector: 'app-global-message-dialog',
  templateUrl: './global-message-dialog.component.html',
  styleUrls: ['./global-message-dialog.component.css']
})
export class GlobalMessageDialogComponent implements OnInit {

  @ViewChild('select') select!: MatSelect;
  @ViewChild('select1') select1!: MatSelect;
  @ViewChild('select2') select2!: MatSelect;
  @ViewChild('select3') select3!: MatSelect;
  @ViewChild('select4') select4!: MatSelect;
  @ViewChild('select5') select5!: MatSelect;

  allSelected1 = false;
  allSelected2 = false;
  allSelected3 = false;
  allSelected4 = false;
  allSelected5 = false;
  allSelected6 = false;
  
  formGroup!: FormGroup;
  actionBtn: string = 'SEND';
  file: any;
  stateList: any;
  cityList: any;
  branchList: any;
  categoryList: any;
  departmentList: any;
  employeeList: any;


  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private router: Router, private alertify: AlertifyService, private service: GlobalMessageService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<GlobalMessageDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      stateId: ['', Validators.required],
      title: ['', Validators.required],
      dateTime: ['', Validators.required],
      description: ['', Validators.required],
      cityId: [''],
      branchId: [''],
      departmentId: [''],
      categoryId: [''],
      employeeCode: [''],
      attachement: ['']
    })


    this.getState();

  }

  dateEvent(event: any) {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset the time to midnight

    // Check if the selected date is before the current date
    if (selectedDate.getTime() < currentDate.getTime()) {
      this.formGroup.controls['dateTime'].setErrors({ 'invalidDate': true });
    } else {
      this.formGroup.controls['dateTime'].setErrors(null);
    }
  }


  toggleAllSelectionState() {
    if (this.allSelected1) {
      this.select.options.forEach((item: MatOption) => item.select());
      this.getCity(this.select.value);
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClickState() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected1 = newStatus;
    this.getCity(this.select.value);

  }

  toggleAllSelectionCity() {
    if (this.allSelected2) {
      this.select1.options.forEach((item: MatOption) => item.select());
      this.getBranch(this.select1.value);
    } else {
      this.select1.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClickCity() {
    let newStatus = true;
    this.select1.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected2 = newStatus;
    this.getBranch(this.select1.value)
  }

  toggleAllSelectionBranch() {
    if (this.allSelected3) {
      this.select2.options.forEach((item: MatOption) => item.select());
      this.getDepartment(this.select2.value);
    } else {
      this.select2.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClickBranch() {
    let newStatus = true;
    this.select2.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected3 = newStatus;
    this.getDepartment(this.select2.value)
  }

  toggleAllSelectionDepartment() {
    if (this.allSelected4) {
      this.select3.options.forEach((item: MatOption) => item.select());
      this.getCategory(this.select3.value);
    } else {
      this.select3.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClickDepartment() {
    let newStatus = true;
    this.select3.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected4 = newStatus;
    this.getCategory(this.select3.value)
  }

  toggleAllSelectionCategory() {
    if (this.allSelected5) {
      this.select4.options.forEach((item: MatOption) => item.select());
      this.getEmployee(this.select4.value);
    } else {
      this.select4.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClickCategory() {
    let newStatus = true;
    this.select4.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
        this.formGroup.controls['employeeCode'].setValue('');
      }
    });
    this.allSelected5 = newStatus;
    this.getEmployee(this.select4.value)
  }

  toggleAllSelectionEmployee() {
    if (this.allSelected6) {
      this.select5.options.forEach((item: MatOption) => item.select());
      // this.getEmployee(this.select4.value);
    } else {
      this.select5.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClickEmployee() {
    let newStatus = true;
    this.select5.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected6 = newStatus;
    // this.getEmployee(this.select4.value)
  }


  selectFile(event: any) {
    this.file = event.target.files[0];
  }

  getState() {
    this.service.getState()
      .subscribe({
        next: (res) => {
          this.stateList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getCity(cityArray: Number) {
    let formGroup = {
      "stateId": cityArray
    };
    this.service.getCity(formGroup)
      .subscribe({
        next: (res) => {
          this.cityList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getBranch(branchArray: Number) {
    let formGroup = {
      "cityId": branchArray
    };
    this.service.getBranch(formGroup)
      .subscribe({
        next: (res) => {
          this.branchList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getDepartment(departmentArray: Number) {
    let formGroup = {
      "branchId": departmentArray
    };
    this.service.getDepartment(formGroup)
      .subscribe({
        next: (res) => {
          this.departmentList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getCategory(categoryArray: Number) {
    let formGroup = {
      "departmentId": categoryArray
    };
    this.service.getCategories(formGroup)
      .subscribe({
        next: (res) => {
          this.categoryList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getEmployee(employeeArray: Number) {
    let formGroup = {
      "branchId": this.select2.value,
      "departmentId": this.select3.value,
      "categoryId": employeeArray
    };

    this.service.getEmployee(formGroup)
      .subscribe({
        next: (res) => {
          this.employeeList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })

  }



  postData() {
    if (this.formGroup.valid) {

      const encryptedData = String(localStorage.getItem('employeeCode'));
      let employeeCode = this.storageEncryptionService.decryptData(encryptedData);

      //apend data in multipart
      let formData = new FormData()
      formData.append("stateId", this.formGroup.value.stateId == '' ? 0 : this.formGroup.value.stateId);
      formData.append("cityId", this.formGroup.value.cityId == '' ? 0 : this.formGroup.value.cityId);
      formData.append("branchId", this.formGroup.value.branchId == '' ? 0 : this.formGroup.value.branchId);
      formData.append("departmentId", this.formGroup.value.departmentId == '' ? 0 : this.formGroup.value.departmentId);
      formData.append("categoryId", this.formGroup.value.categoryId == '' ? 0 : this.formGroup.value.categoryId);
      formData.append("employeeCode", this.formGroup.value.employeeCode == '' ? 0 : this.formGroup.value.employeeCode);
      formData.append("dateTime", this.formGroup.value.dateTime);
      formData.append("attachement", this.file == '' ? 0 : this.file);
      formData.append("description", this.formGroup.value.description);
      formData.append("title", this.formGroup.value.title);
      formData.append("createdBy",employeeCode);

      this.service.postMessage(formData)
        .subscribe({
          next: (res) => {
            if (res.isSuccess == true) {
              this.alertify.success(res.message);
              this.formGroup.reset();
              this.dialogRef.close('SEND');
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
