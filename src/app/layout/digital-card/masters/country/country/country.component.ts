import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { StateService } from 'src/app/service/masters/state.service';
import { StateComponent } from '../../state/state/state.component';
import { CountryService } from 'src/app/service/masters/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

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
  orgList: any;


  constructor(private storageEncryptionService:StorageEncryptionService,private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service:CountryService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<CountryComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      clientId: ['',Validators.required],
      countryName: ['',Validators.required],
      isActive: ['', Validators.required],
      createdBy:['']
    })

    const encryptedData = String(localStorage.getItem('memberId'));
    this.memberId = this.storageEncryptionService.decryptData(encryptedData);

    const encryptedclientId = String(localStorage.getItem('clientId'));
    this.clientId = this.storageEncryptionService.decryptData(encryptedclientId);

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['clientId'].setValue(this.editData.clientId);
      this.formGroup.controls['countryName'].setValue(this.editData.countryName);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }

    this.formGroup.controls['createdBy'].setValue(this.memberId);

    this.getIsActive();
    this.getAllOrganisation();
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

  getAllOrganisation() {
    this.service.getAllOrganisation()
      .subscribe({
        next: (res) => {
          this.orgList = res.data;
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

    let formGroup = {
      "clientId": this.formGroup.value.clientId,
      "name": this.formGroup.value.countryName,
      "isActiveId": this.isActiveId,
      "createdBy":this.formGroup.value.createdBy
    }

    debugger

    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postCountry(formGroup)
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
      this.service.putCountry(formGroup, this.editData.id)
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
