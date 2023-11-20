import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MenuService } from 'src/app/service/masters/menu.service';
import { MenuNameService } from 'src/app/service/data/menu-name.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string = "Dashboard";

  userDisplayName: string | null | undefined;
  image:any;
  memberId!: number;
  menuName!: string;

  constructor(private storageEncryptionService: StorageEncryptionService,private alertify:AlertifyService,private router:Router) { }

  ngOnInit(): void {

    const encryptedData = String(localStorage.getItem('memberName'));
    this.userDisplayName = this.storageEncryptionService.decryptData(encryptedData);

    // const encryptedData1 = String(localStorage.getItem('image'));
    // this.image = this.storageEncryptionService.decryptData(encryptedData1);

    // this.userDisplayName = localStorage.getItem('employeeName');
    // this.image = localStorage.getItem('image');

  }



  logout(){
    this.alertify.success("Logout Successfull!!");
    localStorage.removeItem('memberId');
    localStorage.removeItem('clientId');
    localStorage.removeItem('siteId');
    localStorage.removeItem('unitId');
    localStorage.removeItem('unitNumber');
    localStorage.removeItem('clientName');
    localStorage.removeItem('siteName');
    localStorage.removeItem('memberName');
    localStorage.removeItem('roleName');
    localStorage.removeItem('menuName');
    localStorage.removeItem('mobileNumber');
    localStorage.removeItem('qrNumber');
    localStorage.removeItem('image');
    localStorage.removeItem('token');
    localStorage.removeItem('employeeTechAccessId');
    localStorage.removeItem('visitorTechAccessId');
    this.router.navigate(['/'])
  }

}
