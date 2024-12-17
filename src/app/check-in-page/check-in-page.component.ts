import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CheckInService } from '../service/check-in/check-in.service';
import { StorageEncryptionService } from '../service/encryption/storage-encryption.service';
import { UnitService } from '../service/masters/unit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../service/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteDetailsService } from '../service/client-details/site-details.service';
import { baseUrl } from 'src/environments/environment';
@Component({
  selector: 'app-check-in-page',
  templateUrl: './check-in-page.component.html',
  styleUrls: ['./check-in-page.component.css']
})
export class CheckInPageComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  
  capturedImage: string | null = null;
  siteId: any;
  unitlist: any;
  logo: any;
  check_InForm!: FormGroup;
  image: any;
  filteredUnitList: any;
  file: any;
  imagePreview!: string | ArrayBuffer | null;
  submitCheckinForm: boolean = false;
  saveStatus: any;
  showPopup: boolean = false;
  
  constructor(
    private service: CheckInService,
    private acitveRoute: ActivatedRoute,
    private unitService: UnitService,
    public fb: FormBuilder,
    private alertify: AlertifyService,
    private siteService: SiteDetailsService,
    private decodeData: StorageEncryptionService,
    private router: Router
  ) {
    this.acitveRoute.queryParams.subscribe(params => {
      let encryptedSiteId = params['siteId'];
      if (encryptedSiteId) {
        try {
          this.siteId = this.decodeData.decryptData(encryptedSiteId);
          this.showVisitorPolicy();
        } catch (error) {
          console.error('Decryption failed:', error);
          this.alertify.error('Invalid site ID.');
          this.siteId = null;
        }
      } else {
        this.alertify.error('No site ID provided.');
        this.siteId = null;
      }
    });
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
    });
    this.startCamera();
  }

  getAllUnitList() {
    this.unitService.getAllUnit().subscribe((res: any) => {
      if (res?.isSuccess == true) {
        const unitList = res?.data.filter((item: any) => item.siteId == this.siteId);
        this.unitlist = unitList.reduce((unique: any[], item: any) => {
          if (!unique.some((obj: any) => obj.name === item.name)) {
            unique.push(item);
          }
          return unique;
        }, []);
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
    this.submitCheckinForm = true;
    let statusList = this.filteredUnitList.find((value: any) => value.id == this.check_InForm.value.unitId);
    this.saveStatus = statusList?.accessStatus;
    let data = {
      unitId: this.check_InForm.value.unitId,
      siteId: this.siteId,
      visitorName: this.check_InForm.value.fullName,
      mobileNumber: this.check_InForm.value.mobileNo,
      location: this.check_InForm.value.location,
      image: this.image,
      material: [
        {
          "materialName": "",
          "materialSerialNumber": ""
        },
      ],
      isActive: 1,
    }
    
    if (this.check_InForm.valid) {
      this.service.checkIn(data).subscribe((res: any) => {
        if (res?.isSuccess == true) {
          if (this.saveStatus === 'Yes') {
            this.alertify.success(`Thank you for checking in! We've sent a request for approval to your Unit Admin. 
              Please wait for their response`);
            this.check_InForm.reset();
            this.image = null;
            this.submitCheckinForm = false;
          } else {
            this.image = null;
            const mobileNo = this.check_InForm.value.mobileNo || '';
            this.router.navigate(['/qr-code-pass'], {
              queryParams: { m: mobileNo }
            });
            this.check_InForm.reset();
          }
          } else {
            this.alertify.confirm('Check-Out', 'Already checked in. Please check out first', 
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
      this.alertify.warning('Please fill required fields');
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

  filterUnits(event: KeyboardEvent): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUnitList = this.unitlist.filter((unit: any) =>
      unit.name?.toLowerCase().includes(input) || unit.unitNumberName?.includes(input)
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


  startCamera() {
    navigator.mediaDevices.getUserMedia({video: { facingMode: { exact: "environment" } } })
      .then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing camera: ', error);
      });
  }

  // Function to capture the image
  captureImage() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;

    // Draw the current frame from the video element onto the canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a data URL (image)
      this.image = canvas.toDataURL('image/jpeg');
    }
  }

  showVisitorPolicy(): void {
    this.showPopup = true;
  }

  // Close the popup
  closePopup(): void {
    this.showPopup = false;
  }

  // Accept and close the popup
  acceptPolicy(): void {
    this.alertify.success('Thank you for acknowledging the policy.');
    this.showPopup = false;
  }
  
}
