import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { AsignParkingUnitService } from 'src/app/service/master/assignParkingUnit/asign-parking-unit.service';
import { UnitService } from 'src/app/service/masters/unit.service';
import { WingService } from 'src/app/service/masters/wing.service';

@Component({
  selector: 'app-assign-parking-unit-dialog',
  templateUrl: './assign-parking-unit-dialog.component.html',
  styleUrls: ['./assign-parking-unit-dialog.component.css']
})
export class AssignParkingUnitDialogComponent implements OnInit {

  assignParkingForm!: FormGroup; 
  siteName: any;
  roleName: any;
  isActiveList: any;
  clientId: any;
  siteId: any;
  wingList: any;
  employeeCode: any;
  unitList: any;
  parkingList: any;
  
  constructor(
    private service: AsignParkingUnitService,
    private wingService: WingService,
    private unitService: UnitService,
    private alertify: AlertifyService,
    private EncryptedData: StorageEncryptionService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any, 
    private dialogRef: MatDialogRef<AssignParkingUnitDialogComponent> ) {
    this.dialogRef.disableClose = true; 
  }

  ngOnInit(): void {
    let siteName = String(localStorage.getItem('siteName'));
    this.siteName = this.EncryptedData.decryptData(siteName);
    console.log(this.siteName);

    let roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.EncryptedData.decryptData(roleName);
    console.log(this.roleName);

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.EncryptedData.decryptData(siteId));
    console.log(this.siteId);
    
    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.EncryptedData.decryptData(clientId));
    console.log(this.clientId);
    
    let employeeCode = String(localStorage.getItem('employeeCode'));
    this.employeeCode = this.EncryptedData.decryptData(employeeCode);
    console.log(this.employeeCode);

    this.initateAssignParking();
    this.getActiveList();
    this.getWingList();
    this.getUnitNumber();
    this.getParkingList();

    console.log('check edit data', this.editData);
    if (this.editData !== null) {
      this.assignParkingForm.get('siteName')?.setValue(this.siteName);
      this.assignParkingForm.get('unitName')?.setValue(this.editData?.unitId);
    }
  }

  initateAssignParking(){
    this.assignParkingForm = this.fb.group({
      siteName: [this.siteName],
      wingName: [''],
      unitName: ['', [Validators.required]],
      parkingNumber: ['', [Validators.required]],
      isActive: ['', [Validators.required]]
    });
  }


  getActiveList(){
    this.service.getIsActive().subscribe({
      next: (res: any) => {
        this.isActiveList = res;
        console.log(this.isActiveList);
        if (this.editData !== null) {
          let data = res.filter((item: any) => item.isActive === this.editData?.isActive ? item.isActiveId : '');
          this.assignParkingForm.get('isActive')?.setValue(data[0]?.isActiveId);
        }
      }
    });
  }


  getWingList(){
    this.wingService.getWing().subscribe({
      next: (res: any) => {
        if(this.roleName == "Site Admin"){
          this.wingList = res?.data.filter((item:any)=> {
            return item.clientId == this.clientId && item.siteId == this.siteId ? item.name : ''
          });
        }
      }
    });
  }

  getUnitNumber(){
    this.unitService.getAllUnit().subscribe({
      next: (res: any) => {
        if (res) {
          let data = res.data.filter((item: any) => {
            return item?.clientId == this.clientId && item.siteId == this.siteId ? item?.name : ''
          });

          this.unitList = data.sort((a: any, b: any) => a.id - b.id);
        }
      }
    });
  }

  postData(){
    let body = {
      "unitId": this.assignParkingForm.get('unitName')?.value,
      "parkingId": this.assignParkingForm.get('parkingNumber')?.value,
      "createdBy": this.employeeCode,
      "isActiveId": this.assignParkingForm.get('isActive')?.value
    }

    console.log(this.assignParkingForm.get('unitName')?.value, body);
    if (this.editData === null) {
      this.service.postParkingUnitData(body).subscribe({
        next:(res: any) => {
          this.alertify.success('Parking are assign to unit inserted Successfully');
          this.dialogRef.close();
        },
        error: (er: any) => {
          this.alertify.error('Something went wrong please try again');
        }
      });
    } else {
      this.service.updateParkingUnitData(this.editData?.id, body).subscribe({
        next:(update: any) => {
          this.alertify.success('Parking are assign to unit updated Successfully');
          this.dialogRef.close();
        },
        error: (er: any) => {
          this.alertify.error('Something went wrong please try again');
        }
      });
    }
  }

  getParkingList(){
    this.service.getParkingNumber().subscribe({
      next: (res: any) => {
        this.parkingList = res.data;
        if(this.editData !== null) {
          let data = this.parkingList.filter((res: any) => res.parkingNumber == this.editData.parkingNumber ? res.id : '');
          this.assignParkingForm.get('parkingNumber')?.setValue(data[0].id);
        }
      }
    });
  }
}
