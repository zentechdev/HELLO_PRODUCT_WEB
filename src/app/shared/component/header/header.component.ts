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

    const encryptedData = String(localStorage.getItem('employeeName'));
    this.userDisplayName = this.storageEncryptionService.decryptData(encryptedData);

    const encryptedData1 = String(localStorage.getItem('image'));
    this.image = this.storageEncryptionService.decryptData(encryptedData1);

    // this.userDisplayName = localStorage.getItem('employeeName');
    // this.image = localStorage.getItem('image');

  }



  logout(){
    this.alertify.success("Logout Successfull!!");
    localStorage.removeItem('employeeName');
    localStorage.removeItem('employeeCode');
    localStorage.removeItem('emailId');
    localStorage.removeItem('dateOfBirth');
    localStorage.removeItem('mobileNumber');
    localStorage.removeItem('department');
    localStorage.removeItem('employeeName');
    localStorage.removeItem('image');
    localStorage.removeItem('token');
    localStorage.removeItem('roleName');
    localStorage.removeItem('actionName');
    localStorage.removeItem('branchList');
    this.router.navigate(['/'])
  }

}
