import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MenuNameService } from '../service/data/menu-name.service';
import { browserRefresh } from '../app.component';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard/dashboard.service';
import { AlertifyService } from '../service/alertify/alertify.service';
import { StorageEncryptionService } from '../service/encryption/storage-encryption.service';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  windowWidth: any;
  public browserRefresh: boolean | undefined;
  checkSidenav: any;

  constructor(private storageEncryptionService: StorageEncryptionService, public menuService: MenuNameService, private alertify: AlertifyService, public router: Router, private service1: DashboardService) {
    this.windowWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.checkSidenav();
  }

  ngOnInit(): void {
    //check if page is reload

    // if(this.browserRefresh = browserRefresh){
    //   this.router.navigate(['/layout/dashboard']);
    // }

    const encryptedData = String(localStorage.getItem("menuName"));
    const storedMenuName = this.storageEncryptionService.decryptData(encryptedData);

    if (storedMenuName) {
      this.menuService.menuName = storedMenuName;
    }

  }

}
