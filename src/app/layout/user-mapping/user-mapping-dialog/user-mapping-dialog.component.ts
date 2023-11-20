import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { UserMappingService } from 'src/app/service/user-mapping/user-mapping.service';

@Component({
  selector: 'app-user-mapping-dialog',
  templateUrl: './user-mapping-dialog.component.html',
  styleUrls: ['./user-mapping-dialog.component.css']
})
export class UserMappingDialogComponent implements OnInit {

  @ViewChild('select') select!: MatSelect;
  @ViewChild('select1') select1!: MatSelect;
  @ViewChild('select2') select2!: MatSelect;
  @ViewChild('select3') select3!: MatSelect;
  @ViewChild('select4') select4!: MatSelect;
  @ViewChild('select5') select5!: MatSelect;

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  allSelected1 = false;
  allSelected2 = false;
  allSelected3 = false;
  allSelected4 = false;
  allSelected5 = false;
  allSelected6 = false;

  loadingForeground = false;

  file: any;
  departmentList: any;
  employeeList: any;
  roleList: any;
  menuList: any;
  actionList: any;
  isActiveList: any;
  isActiveId: any;
  selected: any = [];
  selected1: any = [];
  selected2: any = [];
  ArrayList: any = [];
  departmentArrayList: any = [];
  employeeArrayList: any = [];
  roleListId: any = [];
  departmentNameList: any = [];
  employeeCodeList: any = [];
  branchList: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: UserMappingService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<UserMappingDialogComponent>) {
    dialogRef.disableClose = true;

  }


  async ngOnInit(): Promise<void> {
    this.formGroup = this.formBuilder.group({
      departmentId: this.formBuilder.control([], Validators.required),
      employeeCode: this.formBuilder.control([], Validators.required),
      roleId: this.formBuilder.control([], Validators.required),
      actionId: this.formBuilder.control([], Validators.required),
      branchId: this.formBuilder.control([], Validators.required),
      isActiveId: ['', Validators.required],
    });



    if (this.editData) {

      // Conversion of string array to number array
      const stringArrayDepartment: string[] = this.editData.departmentName;
      const numberArrayDepartment: string[] = stringArrayDepartment[0].split(',');

      if (numberArrayDepartment[0] !== "") {
        this.getEmployeeList(this.editData.departmentName);
      }

      // Conversion of string array to number array
      const stringArrayEmployeeCode: string[] = this.editData.employeeCode;
      const numberArrayEmployeeCode: string[] = stringArrayEmployeeCode[0].split(',');

      // Conversion of string array to number array
      const stringArrayBranchId: string[] = this.editData.branchId;
      const numberArrayBranchId: number[] = stringArrayBranchId[0].split(',').map(Number);

      // Conversion of string array to number array
      const stringArrayRole: string[] = this.editData.roleName;
      const numberArrayRole: string[] = stringArrayRole[0].split(',');

      this.service.getRole().subscribe({
        next: (res) => {
          const roleArrayList = res;
          const roleId: any = [];
          for (let i = 0; i < roleArrayList.length; i++) {
            if (numberArrayRole.includes(roleArrayList[i].roleName)) {
              roleId.push(roleArrayList[i].roleId)
            }
          }
          this.formGroup.controls['roleId'].setValue(roleId);
        }
      });

      // Conversion of string array to number array
      const stringArrayAction: string[] = this.editData.actionName;
      const numberArrayAction: string[] = stringArrayAction[0].split(',');

      this.service.getActions().subscribe({
        next: (res) => {
          const actionArrayList = res;
          const actionId: any = [];
          for (let i = 0; i < actionArrayList.length; i++) {
            if (numberArrayAction.includes(actionArrayList[i].actionName)) {
              actionId.push(actionArrayList[i].actionId)
            }
          }
          this.formGroup.controls['actionId'].setValue(actionId);
        }
      });

      

      this.formGroup.controls['employeeCode'].setValue(numberArrayEmployeeCode);
      this.formGroup.controls['branchId'].setValue(numberArrayBranchId);
      this.formGroup.controls['departmentId'].setValue(numberArrayDepartment);
      this.formGroup.controls['isActiveId'].setValue(this.editData.isActive);
    }

    await Promise.all([
    this.getDepartmentList(),
    this.getRoleList(),
    this.getIsActive(),
    this.getActionList(),
    this.getAllBranch()
    ])
  }

  
  toggleAllSelectionDepartment() {
    if (this.allSelected1) {
      this.select.options.forEach((item: MatOption) => item.select());
      this.getEmployeeList(this.select.value);
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClickDepartment() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected1 = newStatus;
    this.getEmployeeList(this.select.value);
  }

  toggleAllSelectionEmployee() {
    if (this.allSelected2) {
      this.select1.options.forEach((item: MatOption) => item.select());
    } else {
      this.select1.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClickEmployee() {
    let newStatus = true;
    this.select1.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected2 = newStatus;
  }

  toggleAllSelectionRole() {
    if (this.allSelected3) {
      this.select2.options.forEach((item: MatOption) => item.select());
    } else {
      this.select2.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClickRole() {
    let newStatus = true;
    this.select2.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected3 = newStatus;
  }

  toggleAllSelectionAction() {
    if (this.allSelected5) {
      this.select4.options.forEach((item: MatOption) => item.select());
    } else {
      this.select4.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClickAction() {
    let newStatus = true;
    this.select4.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected5 = newStatus;
  }

  toggleAllSelectionBranch() {
    if (this.allSelected6) {
      this.select5.options.forEach((item: MatOption) => item.select());
    } else {
      this.select5.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClickBranch() {
    let newStatus = true;
    this.select5.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected6 = newStatus;
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
  }

  getDepartmentList() {
    this.service.getDepartment().subscribe({
      next: (res) => {
        this.departmentList = res;
      },
      error: (res) => {
        this.alertify.error('Error While fetching The Records!!');
      },
    });
  }

  getActionList() {
    this.service.getActions().subscribe({
      next: (res) => {
        this.actionList = res;
      },
      error: (res) => {
        this.alertify.error('Error While fetching The Records!!');
      },
    });
  }

  getEmployeeList(department: string) {
    this.service.getEmployee(department)
      .subscribe({
        next: (res) => {
          this.employeeList = res;
        },
        error: (res) => {
          this.alertify.error('Error While fetching The Records!!');
        },
      });
  }

  getRoleList() {
    this.service.getRole().subscribe({
      next: (res) => {
        this.roleList = res.filter((item: any) => item.isActive == 'Active');
      },
      error: (res) => {
        this.alertify.error('Error While fetching The Records!!');
      },
    });
  }

  getIsActive() {
    this.service.getIsActive().subscribe({
      next: (res) => {
        this.isActiveList = res;
      },
      error: (res) => {
        this.alertify.error('Error While fetching The Records!!');
      },
    });
  }

  getAllBranch() {
    this.service.getAllBranch()
      .subscribe({
        next: (res) => {
          this.branchList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  postData() {

    for (let i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive === this.formGroup.value.isActiveId) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    // Append data in multipart
    const formData = {
      employeeCode: this.formGroup.value.employeeCode === '' ? 0 : this.formGroup.value.employeeCode,
      branchId: this.formGroup.value.branchId === '' ? 0 : this.formGroup.value.branchId,
      departmentName: this.formGroup.value.departmentId === '' ? 0 : this.formGroup.value.departmentId,
      roleId: this.formGroup.value.roleId === '' ? 0 : this.formGroup.value.roleId,
      actionId: this.formGroup.value.actionId === '' ? 0 : this.formGroup.value.actionId,
      isActiveId: this.isActiveId,
    };

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postUserMapping(formData).subscribe({
          next: (res) => {
            if (res.isSuccess === true) {
              this.alertify.success(res.message);
              this.formGroup.reset();
              this.dialogRef.close('SAVE');
            } else {
              this.alertify.error(res.message);
            }
          },
          error: (res) => {
            this.alertify.error('500 Internal Server Error');
          },
        });
      }
    } else {
      this.putData(formData);
    }
  }

  putData(formData: any) {
    if (this.formGroup.valid) {
      this.service.putUserMapping(formData, this.editData.usermappingId).subscribe({
        next: (res) => {
          if (res.isSuccess === true) {
            this.alertify.success(res.message);
            this.formGroup.reset;
            this.dialogRef.close('UPDATE');
          } else {
            alert(res.message);
          }
        },
        error: (res) => {
          this.alertify.error('500 Internal Server Error');
        },
      });
    }
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

