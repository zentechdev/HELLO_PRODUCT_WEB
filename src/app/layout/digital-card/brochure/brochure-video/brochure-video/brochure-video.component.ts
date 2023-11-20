import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { BrochureVideoUrlService } from 'src/app/service/brochure/brochure-video-url.service';

@Component({
  selector: 'app-brochure-video',
  templateUrl: './brochure-video.component.html',
  styleUrls: ['./brochure-video.component.css']
})
export class BrochureVideoComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  brochureTypeList: any;
  brochureTypeListId: any;
  file: any;
  isActiveList: any;
  isActiveId: any;
  brochure!: string;


  constructor(private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: BrochureVideoUrlService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<BrochureVideoComponent>) { this.dialogRef.disableClose = true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      brochureType: ['', Validators.required],
      videoUrl: ['', Validators.required],
      isActive: ['', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['brochureType'].setValue(this.editData.brochureType);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
      this.brochure = this.editData.videoUrl;
    }

    this.getBrochureType();
    this.getIsActive();

  }

  selectFile(event: any) {
    if (event.target.files[0].name.includes('.mp4')) {
      this.file = event.target.files[0];
    } else {
      this.alertify.error("File format is not correct.");
    }
    //Create URL to view pdf
    this.brochure = URL.createObjectURL(this.file);
  }

  getBrochureType() {
    this.service.getBrochureType()
      .subscribe({
        next: (res) => {
          this.brochureTypeList = res.filter((item:any)=>item.isActive=='Active');
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
    for (var i = 0; i < this.brochureTypeList.length; i++) {
      if (this.brochureTypeList[i].brochureType == this.formGroup.value.brochureType) {
        this.brochureTypeListId = this.brochureTypeList[i].brochureTypeId;
      }
    }

    for (var i = 0; i < this.isActiveList.length; i++) {
      if (this.isActiveList[i].isActive == this.formGroup.value.isActive) {
        this.isActiveId = this.isActiveList[i].isActiveId;
      }
    }

    //apend data in multipart
    let formData = new FormData()
    formData.append("videoUrl", this.file);
    formData.append("brochureTypeId", this.brochureTypeListId);
    formData.append("isActiveId", this.isActiveId);


    if (!this.editData) {
      if (this.formGroup.valid) {
        this.service.postBrochureVideo(formData)
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
      this.service.putBrochureVideo(formGroup, this.editData.videoUrlId)
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
