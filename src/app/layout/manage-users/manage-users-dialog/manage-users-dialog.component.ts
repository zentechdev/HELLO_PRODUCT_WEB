import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { ManageUsersService } from 'src/app/service/manage-users/manage-users.service';

@Component({
  selector: 'app-manage-users-dialog',
  templateUrl: './manage-users-dialog.component.html',
  styleUrls: ['./manage-users-dialog.component.css']
})
export class ManageUsersDialogComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  colorCodeList: any;
  disabled: boolean = true;
  colorCodeListId: any;
  isActiveList: any;
  memberId: any;
  countryList: any;
  countryId: any;
  clientId: any;
  stateList: any;
  stateId: any;
  siteId: any;
  siteName: any;
  wingName: any;
  siteList: any;
  isActive: any;
  wingId: any;
  wingList: any;
  floor: any;
  floorList: any;
  floorId: any;
  id: any;
  floorNumberList: any;
  unitNumberList: any;
  unitList: any;
  statusList: any;
  roleList: any;
  roleId: any;
  genderId: any;
  unitId: any;
  file: any;
  image: string | undefined;
  employeeTechAccessId: any;
  roleName!: string;
  unitName: any;
  rfidList: any;
  isEmployeeTechAccessChecked!: boolean;

  genderList = [
    { id: 1, gender: 'Male' },
    { id: 2, gender: 'Female' },
    { id: 3, gender: 'Other' }
  ];
  

  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: ManageUsersService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<ManageUsersDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      siteId: ['', Validators.required],
      genderId: ['', Validators.required],
      statusId: ['', Validators.required],
      roleId: ['', Validators.required],
      unitId: ['', Validators.required],
      rfid: [''],
      // employeeTechAccessId: ['', Validators.required],
      memberName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      image: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy: ['']
    })

    const employeeTechAccessId = String(localStorage.getItem('employeeTechAccessId'));
    this.employeeTechAccessId = Number(this.storageEncryptionService.decryptData(employeeTechAccessId));

    if(this.employeeTechAccessId==1){
      this.isEmployeeTechAccessChecked=false;
    }
    else{
      this.isEmployeeTechAccessChecked=true;
    }

    const encryptedData = String(localStorage.getItem('memberId'));
    this.memberId = this.storageEncryptionService.decryptData(encryptedData);

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const unitId = String(localStorage.getItem("unitId"));
    this.unitId = Number(this.storageEncryptionService.decryptData(unitId));

    const roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);

    const siteName = String(localStorage.getItem('siteName'));
    this.siteName = this.storageEncryptionService.decryptData(siteName);

    const unitName = String(localStorage.getItem('unitName'));
    this.unitName = this.storageEncryptionService.decryptData(unitName);



    if (this.roleName == "Master Admin") {

    } else if (this.roleName == "Super Admin") {

    } else if (this.roleName == "Site Admin") {
      this.formGroup.controls['siteId'].setValue(this.siteId);
      this.formGroup.get('siteId')?.disable();
    }
    else if (this.roleName == "Unit Admin") {
      this.formGroup.controls['siteId'].setValue(this.siteId);
      this.formGroup.controls['unitId'].setValue(this.unitId);
      this.formGroup.get('siteId')?.disable();
      this.formGroup.get('unitId')?.disable();
    }

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.isEmployeeTechAccessChecked=false;
      this.formGroup.controls['siteId'].setValue(this.editData.siteId);
      this.formGroup.controls['genderId'].setValue(this.editData.gender);
      this.formGroup.controls['roleId'].setValue(this.editData.roleName);
      this.formGroup.controls['unitId'].setValue(this.editData.unitId);
      this.formGroup.controls['email'].setValue(this.editData.email);
      this.formGroup.controls['memberName'].setValue(this.editData.memberName);
      this.formGroup.controls['mobileNumber'].setValue(this.editData.mobileNumber);
      this.formGroup.controls['address'].setValue(this.editData.address);
      this.formGroup.controls['image'].setValue(this.editData.image);
      this.image = this.editData.image;
    }

    this.formGroup.controls['isActive'].setValue("1");
    this.formGroup.controls['statusId'].setValue(1);
    this.formGroup.controls['createdBy'].setValue(this.memberId);

    this.getIsActive();
    this.getSiteDetails();
    this.getAllUnit()
    this.getAllStatus();
    this.getAllRole();
    this.getAllAvailableRFID();

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

  getAllStatus() {
    this.service.getAllStatus()
      .subscribe({
        next: (res) => {
          this.statusList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }

  getSiteDetails() {
    this.service.getSiteDetails()
      .subscribe({
        next: (res) => {
          if (this.roleName == "Master Admin") {
            this.siteList = res.data;
          }
          else if (this.roleName == "Super Admin") {
            this.siteList = res.data.filter((item: any) => item.clientId == this.clientId);
          }
          else if (this.roleName == "Site Admin") {
            this.siteList = res.data.filter((item: any) => item.clientId == this.clientId && item.id == this.siteId);
          }
          else if (this.roleName == "Unit Admin") {
            this.siteList = res.data.filter((item: any) => item.clientId == this.clientId && item.id == this.siteId);
          }
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }

  getAllAvailableRFID() {
    this.service.getAllAvailableRFID()
      .subscribe({
        next: (res) => {
          if (this.roleName == "Master Admin") {
            this.rfidList = res.data;
          }
          else if (this.roleName == "Super Admin") {
            this.rfidList = res.data.filter((item: any) => item.clientId == this.clientId);
          }
          else if (this.roleName == "Site Admin") {
            this.rfidList = res.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId);
          }
          else if (this.roleName == "Unit Admin") {
            this.rfidList = res.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId && item.unitId == this.unitId);
          }
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      })
  }

  getAllUnit() {
    this.service.getAllUnit()
      .subscribe({
        next: (res) => {
          if (this.roleName == "Master Admin") {
            this.unitList = res.data;
          }
          else if (this.roleName == "Super Admin") {
            this.unitList = res.data.filter((item: any) => item.clientId == this.clientId);
          }
          else if (this.roleName == "Site Admin") {
            this.unitList = res.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId);
          }
          else if (this.roleName == "Unit Admin") {
            this.unitList = res.data.filter((item: any) => item.clientId == this.clientId && item.siteId == this.siteId);
          }
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }

  getAllRole() {
    this.service.getAllRole()
      .subscribe({
        next: (res) => {
          if (this.roleName == "Master Admin") {
            this.roleList = res.data.filter((role: any) => role.isActive == 'Active' && role.roleName !== 'Master Admin' && role.roleName !== 'Employee' && role.roleName !== 'Site Admin' && role.roleName !== 'Unit Admin');
          }
          else if (this.roleName == "Super Admin") {
            this.roleList = res.data.filter((role: any) => role.isActive == 'Active' && role.roleName !== 'Master Admin' && role.roleName !== 'Employee' && role.roleName !== 'Super Admin' && role.roleName !== 'Unit Admin' && role.roleName !== 'Visitor Device');
          } else if (this.roleName == "Site Admin") {
            this.roleList = res.data.filter((role: any) => role.isActive == 'Active' && role.roleName !== 'Master Admin' && role.roleName !== 'Site Admin' && role.roleName !== 'Super Admin' && role.roleName !== 'Employee' && role.roleName !== 'Visitor Device');
          } else if (this.roleName == "Unit Admin") {
            this.roleList = res.data.filter((role: any) => role.isActive == 'Active' && role.roleName !== 'Master Admin' && role.roleName !== 'Site Admin' && role.roleName !== 'Super Admin' && role.roleName !== 'Unit Admin' && role.roleName !== 'Visitor Device');
          }
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }

  selectFile(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const allowedFormats = ['.png', '.jpeg'];
      const maxSizeKB = 500;

      // Check file format
      const fileExtension = selectedFile.name.toLowerCase().slice((selectedFile.name.lastIndexOf(".") - 1 >>> 0) + 2);
      if (!allowedFormats.includes(`.${fileExtension}`)) {
        this.formGroup.get('image')?.setErrors({ 'incorrectFormat': true });
        return;
      }

      // Check file size
      const fileSizeKB = selectedFile.size / 1024;
      if (fileSizeKB > maxSizeKB) {
        this.formGroup.get('image')?.setErrors({ 'exceedsSizeLimit': true });
        return;
      }

      // Valid file, set it and create URL
      this.file = selectedFile;
      this.image = URL.createObjectURL(this.file);
    }
  }




  postData() {

    for (var i = 0; i < this.roleList.length; i++) {
      if (this.roleList[i].roleName == this.formGroup.value.roleId) {
        this.roleId = this.roleList[i].roleId;
      }
    }

    for (var i = 0; i < this.genderList.length; i++) {
      if (this.genderList[i].gender == this.formGroup.value.genderId) {
        this.genderId = this.genderList[i].id;
      }
    }

    //apend data in multipart
    let formData = new FormData()
    formData.append("siteId", this.formGroup.get('siteId')?.value);
    formData.append("genderId", this.genderId);
    formData.append("unitId", this.formGroup.get('unitId')?.value);
    formData.append("employeeTechAccessId", this.employeeTechAccessId);
    formData.append("rfidId", this.formGroup.value.rfid);
    formData.append("memberName", this.formGroup.value.memberName);
    formData.append("mobileNumber", this.formGroup.value.mobileNumber);
    formData.append("email", this.formGroup.value.email);
    formData.append("address", this.formGroup.value.address);
    formData.append("image", this.file);
    formData.append("statusId", this.formGroup.value.statusId);
    formData.append("roleId", this.roleId);
    formData.append("isActiveId", this.formGroup.value.isActive);
    formData.append("createdBy", this.formGroup.value.createdBy);

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postUsers(formData)
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
      this.service.putUsers(formGroup, this.editData.memberId)
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
