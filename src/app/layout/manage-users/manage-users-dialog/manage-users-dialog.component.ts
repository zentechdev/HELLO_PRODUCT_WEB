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
  isActiveId: any;
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
  statusId: any;
  unitId: any;
  file: any;
  image: string | undefined;
  employeeTechAccessId: any;
  roleName!: string;
  unitName: any;


  constructor(private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: ManageUsersService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<ManageUsersDialogComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      siteId: ['', Validators.required],
      genderId: ['', Validators.required],
      statusId: ['', Validators.required],
      roleId: ['', Validators.required],
      unitId: ['', Validators.required],
      // employeeTechAccessId: ['', Validators.required],
      memberName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      image: ['', Validators.required],
      isActive: ['', Validators.required],
      createdBy: ['']
    })

    const encryptedData = String(localStorage.getItem('memberId'));
    this.memberId = this.storageEncryptionService.decryptData(encryptedData);

    const employeeTechAccessId = String(localStorage.getItem('employeeTechAccessId'));
    this.employeeTechAccessId = Number(this.storageEncryptionService.decryptData(employeeTechAccessId));

    const roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);

    const siteName = String(localStorage.getItem('siteName'));
    this.siteName = this.storageEncryptionService.decryptData(siteName);

    const unitName = String(localStorage.getItem('unitName'));
    this.unitName = this.storageEncryptionService.decryptData(unitName);

    if(this.roleName=="Master Admin"){

    }else if(this.roleName=="Super Admin" || this.roleName=="Site Admin"){
      this.formGroup.get('siteId')?.disable();
      this.formGroup.controls['siteId'].setValue(this.siteName);
    }else if(this.roleName=="Unit Admin"){
      this.formGroup.get('siteId')?.disable();
      this.formGroup.get('unitId')?.disable();
      this.formGroup.controls['siteId'].setValue(this.siteName);
      this.formGroup.controls['unitId'].setValue(this.unitName);
    }

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['siteId'].setValue(this.editData.siteName);
      this.formGroup.controls['genderId'].setValue(this.editData.gender);
      this.formGroup.controls['statusId'].setValue(this.editData.status);
      this.formGroup.controls['roleId'].setValue(this.editData.roleName);
      this.formGroup.controls['unitId'].setValue(this.editData.unitName);
      this.formGroup.controls['email'].setValue(this.editData.email);
      this.formGroup.controls['memberName'].setValue(this.editData.memberName);
      this.formGroup.controls['mobileNumber'].setValue(this.editData.mobileNumber);
      this.formGroup.controls['address'].setValue(this.editData.address);
      this.formGroup.controls['image'].setValue(this.editData.image);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
      this.image = this.editData.image;
    }
    this.formGroup.controls['createdBy'].setValue(this.memberId);

    this.getIsActive();
    this.getSiteDetails();
    this.getAllUnit()
    this.getAllStatus();
    this.getAllRole();

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

  getSiteDetails() {
    this.service.getSiteDetails()
      .subscribe({
        next: (res) => {
          this.siteList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
  }




  getAllUnit() {
    this.service.getAllUnit()
      .subscribe({
        next: (res) => {
          this.unitList = res.data;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      });
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

  getAllRole() {
    this.service.getAllRole()
      .subscribe({
        next: (res) => {
          if(this.roleName=="Master Admin"){
            this.roleList = res.data.filter((role: any) => role.isActive=='Active' && role.roleName !== 'Master Admin' && role.roleName !== 'Employee' && role.roleName !== 'Site Admin' && role.roleName !== 'Unit Admin');
          }
          else if(this.roleName=="Super Admin"){
            this.roleList = res.data.filter((role: any) =>  role.isActive=='Active' && role.roleName !== 'Master Admin' && role.roleName !== 'Employee' && role.roleName !== 'Super Admin' && role.roleName !== 'Unit Admin' && role.roleName !== 'Visitor Device');
          }else if(this.roleName=="Site Admin"){
            this.roleList = res.data.filter((role: any) => role.isActive=='Active' && role.roleName !== 'Master Admin' && role.roleName !== 'Site Admin' && role.roleName !== 'Super Admin' && role.roleName !== 'Employee' && role.roleName !== 'Visitor Device');
          }else if(this.roleName=="Unit Admin"){
            this.roleList = res.data.filter((role: any) => role.isActive=='Active' && role.roleName !== 'Master Admin' && role.roleName !== 'Site Admin' && role.roleName !== 'Super Admin' && role.roleName !== 'Unit Admin' && role.roleName !== 'Visitor Device');
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

    // for (var i = 0; i < this.isActiveList.length; i++) {
    //   if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
    //     this.isActiveId = this.isActiveList[i].isActiveId;
    //   }
    // }

    for (var i = 0; i < this.siteList.length; i++) {
      if (this.siteList[i].siteName == this.formGroup.get('siteId')?.value) {
        this.siteId = this.siteList[i].id;
      }
    }

    for (var i = 0; i < this.roleList.length; i++) {
      if (this.roleList[i].roleName == this.formGroup.value.roleId) {
        this.roleId = this.roleList[i].roleId;
      }
    }

    // for (var i = 0; i < this.statusList.length; i++) {
    //   if (this.statusList[i].name == this.formGroup.value.statusId) {
    //     this.statusId = this.statusList[i].id;
    //   }
    // }

    for (var i = 0; i < this.unitList.length; i++) {
      if (this.unitList[i].name == this.formGroup.get('unitId')?.value) {
        this.unitId = this.unitList[i].id;
      }
    }
    
    this.isActiveId=1;
    this.statusId=1;

    //apend data in multipart
    let formData = new FormData()
    formData.append("siteId", this.siteId);
    formData.append("genderId",this.getGenderId(this.formGroup.value.genderId).toString());
    formData.append("statusId", this.statusId);
    formData.append("roleId", this.roleId);
    formData.append("unitId", this.unitId);
    formData.append("employeeTechAccessId", this.employeeTechAccessId);
    formData.append("memberName", this.formGroup.value.memberName);
    formData.append("mobileNumber", this.formGroup.value.mobileNumber);
    formData.append("email", this.formGroup.value.email);
    formData.append("address", this.formGroup.value.address,);
    formData.append("image", this.file);
    formData.append("isActiveId", this.isActiveId);
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

  // Function to get genderId based on the provided gender string
  getGenderId(genderString: string) {
    // Define gender constants
    const GENDER = {
      MALE: 1,
      FEMALE: 2,
      OTHER: 3,
    };


    switch (genderString.toLowerCase()) {
      case 'male':
        return GENDER.MALE;
      case 'female':
        return GENDER.FEMALE;
      default:
        return GENDER.OTHER;
    }
  }
}
