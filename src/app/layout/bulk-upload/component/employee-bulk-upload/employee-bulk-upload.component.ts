import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { async } from 'rxjs';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { MemberBulkUploadService } from 'src/app/service/bulk-upload/member-bulk-upload.service';
import { DownloadExcelService } from 'src/app/service/download-excel/download-excel.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';

@Component({
  selector: 'app-employee-bulk-upload',
  templateUrl: './employee-bulk-upload.component.html',
  styleUrls: ['./employee-bulk-upload.component.css']
})
export class EmployeeBulkUploadComponent implements OnInit {

  formGroup!: FormGroup;
  file: any;
  siteList: any;
  unitList: any;
  clientId: any;
  siteId!: number;
  roleName: any;
  memberId: any;
  unitId!: number;
  siteName: any;
  unitName: any;
  actionBtn = 'SAVE';
  employeeTechAccessId:any;
  constructor(private excelService:DownloadExcelService,private storageEncryptionService: StorageEncryptionService, private formBuilder: FormBuilder, private service: MemberBulkUploadService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      siteId: ['', Validators.required],
      unitId: ['', Validators.required],
      file: ['', Validators.required],
      isActive: ['', Validators.required],
      statusId: ['', Validators.required]
    })

    this.formGroup.controls['isActive'].setValue("1");
    this.formGroup.controls['statusId'].setValue(1);

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

    const employeeTechAccessId = String(localStorage.getItem('employeeTechAccessId'));
    this.employeeTechAccessId = Number(this.storageEncryptionService.decryptData(employeeTechAccessId));


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


    this.getAllSiteDetails();
    this.getAllUnitDetails();
  }

  downloadExcel() {
    this.excelService.downloadExcel().subscribe((blob: Blob) => {
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const fileName = `Employee_details_excel_${timestamp}.xlsx`;

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  clearData(){
    this.formGroup.get('unitId')?.reset();
    this.formGroup.get('file')?.reset();
    this.formGroup.get('isActive')?.reset();
    this.formGroup.get('statusId')?.reset();
  }

  getAllSiteDetails() {
    this.service.getAllSiteDetails()
      .subscribe({
        next: (res) => {
          if (res.isSuccess == true) {
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
          }
          else {
            this.alertify.error(res.message);
          }
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      })
  }

  getAllUnitDetails() {
    this.service.getAllUnitDetails()
      .subscribe({
        next: (res) => {
          if (res.isSuccess == true) {
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
          }
          else {
            this.alertify.error(res.message);
          }
        },
        error: (err) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      })
  }

  postData() {

    //apend data in multipart
    let formData = new FormData()
    formData.append("siteId", this.formGroup.get('siteId')?.value);
    formData.append("unitId", this.formGroup.get('unitId')?.value);
    formData.append("employeeTechAccessId", this.employeeTechAccessId);
    formData.append("statusId", this.formGroup.value.statusId);
    formData.append("isActiveId", this.formGroup.value.isActive);
    formData.append("createdBy", this.memberId);
    formData.append("file",this.file);

    if (this.formGroup.valid) {
      this.service.postUsers(formData)
        .subscribe({
          next: (res) => {
            if (res.isSuccess == true) {
              this.alertify.success(res.message);
              this.formGroup.get('file')?.setValue('');
            }
            else {
              this.alertify.error(res.message);
              this.formGroup.get('file')?.setValue('');
            }
          },
          error: (res) => {
            this.alertify.error("500 Internal Server Error");
          }
        })
    }
  }

}
