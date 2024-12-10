import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../service/check-in/check-in.service';
import { StorageEncryptionService } from '../service/encryption/storage-encryption.service';
import { UnitService } from '../service/masters/unit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../service/alertify/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { SiteDetailsService } from '../service/client-details/site-details.service';

@Component({
  selector: 'app-check-in-page',
  templateUrl: './check-in-page.component.html',
  styleUrls: ['./check-in-page.component.css']
})
export class CheckInPageComponent implements OnInit {
  siteId: any;
  unitlist: any;
  logo: any;
  check_InForm!: FormGroup;
  image: any;
  filteredUnitList: any;
  file: any;
  imagePreview!: string | ArrayBuffer | null;
  qrNumber: any;
  isConfirmed: boolean = false;
  
  constructor(
    private service: CheckInService,
    private acitveRoute: ActivatedRoute,
    private unitService: UnitService,
    public fb: FormBuilder,
    private alertify: AlertifyService,
    private siteService: SiteDetailsService,
    private decodeData: StorageEncryptionService
  ) {
    this.acitveRoute.queryParams.subscribe(params => {
      let siteId = params['siteId'];
      this.siteId = this.decodeData.decryptData(siteId);
    });
    
    this.confirmAction();
  }

  ngOnInit(): void {
    this.getSiteDetailById(this.siteId);
    this.addFormControls();
    this.getAllUnitList();
    this.check_InForm.get('mobileNo')?.valueChanges.subscribe((x: any) => {
      let mobileNumber = x.toString().replace(/\s+/g, ''); 
      if (mobileNumber.length === 10) {
        this.getCheckVisitor_DetailsAlreadyExitOrNo(mobileNumber);
      }
    })
  }

  getAllUnitList() {
    this.unitService.getAllUnit().subscribe((res: any) => {
      if (res?.isSuccess == true) {
        this.unitlist = res?.data.filter((item: any) => item.siteId == this.siteId);
        this.filteredUnitList = [...this.unitlist];
      }
    });
  }

  addFormControls() {
    this.check_InForm = this.fb.group({
      unitId: ['', Validators.required],
      fullName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      location: ['', Validators.required],
    });
  }

  checkIn() {
    let data = {
      unitId: this.check_InForm.value.unitId,
      siteId: this.siteId,
      visitorName: this.check_InForm.value.fullName,
      mobileNumber: this.check_InForm.value.mobileNo,
      location: this.check_InForm.value.location,
      image: this.image,
      // qrNumber: this.qrNumber,
      material: [
        {
          "materialName": "null",
          "materialSerialNumber": "null"
        },
      ],
      isActive: 1,
    }
    if (this.check_InForm.valid) {
      if (this.isConfirmed == true) {
        this.service.checkIn(data).subscribe((res: any) => {
          if (res?.isSuccess == true) {
            this.alertify.success(res?.message);
            this.check_InForm.reset();
            this.image = null;
          } else {
            this.alertify.confirm('Check-Out', 'Your number already exists. Please check out first.', 
              ()=> {
                this.service.checkOut(this.check_InForm.value.mobileNo).subscribe((checkout: any) => {
                  if (checkout?.isSuccess == true) {
                    this.alertify.success(checkout.message);
                  }
                });
              },
              ()=> {
                this.alertify.error('Cancel');
              }
            )
          }
        });
      } else {
        this.confirmAction();
      }
    }
    
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  // File Select Code

  private handleFile(file: File): void {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only image files are allowed!');
    }
  }

  filterUnits(searchTerm: KeyboardEvent): void {
    const lowerSearchTerm = searchTerm;
    this.filteredUnitList = this.unitlist.filter((unit: any) =>
      unit.name.toLowerCase().includes(lowerSearchTerm)
    );
  }

  getCheckout(){
    this.service.checkOut(this.check_InForm.value.mobileNo).subscribe({
      next: (res: any) => {
        if (res.isSuccess == true) {
          alert('check out successfully');
        }
      }
    });
  }

  getCheckVisitor_DetailsAlreadyExitOrNo(data: any){
    this.service.getVisitorByMobileNo(data).subscribe((res: any) => {
      if (res?.isSuccess == true) {
        this.check_InForm.get('fullName')?.setValue(res.data[0].visitorName);
        this.check_InForm.get('location')?.setValue(res.data[0].location);
        this.image = res.data[0].image;
        this.check_InForm.get('unitId')?.setValue(res.data[0].unitId);
      }
    });
  }
  

  getSiteDetailById(siteId: any) {
    this.siteService.getSiteDetailById(siteId).subscribe((res: any) => {
      if (res?.isSuccess == true) {
        this.logo = res.data[0].logo;
      }
    });
  }

  confirmAction(): void{
    this.alertify.confirm('Acknowledge', 'We take your privacy seriously.Your entered details will be stored securely.Please proceed only if you agree',
      ()=>{
        this.isConfirmed = true;
        this.alertify.success('Confirmed');
      },
      () => {
        this.alertify.error('Cancel');
      });
  }
}
