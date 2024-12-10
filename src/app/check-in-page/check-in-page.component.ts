import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../service/check-in/check-in.service';
import { StorageEncryptionService } from '../service/encryption/storage-encryption.service';
import { UnitService } from '../service/masters/unit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../service/alertify/alertify.service';
import { ActivatedRoute } from '@angular/router';

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
  
  constructor(
    private service: CheckInService,
    private acitveRoute: ActivatedRoute,
    private unitService: UnitService,
    public fb: FormBuilder
  ) {
    this.acitveRoute.queryParams.subscribe(params => {
      this.siteId = params['siteId'];
      this.qrNumber = params['qrNumber'];
    });
  }

  ngOnInit(): void {
    this.addFormControls();
    this.getAllUnitList();
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
      qrNumber: this.qrNumber,
      material: [
        {
          "materialName": "null",
          "materialSerialNumber": "null"
        },
      ],
      isActive: 1,
    }
    if (this.check_InForm.valid) {
      this.service.checkIn(data).subscribe((res: any) => {
        if (res?.isSuccess == true) {
          alert(res?.message);
          this.check_InForm.reset();
        } else {
          alert('Your number already exists. Please check out');
        }
      });
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

}
