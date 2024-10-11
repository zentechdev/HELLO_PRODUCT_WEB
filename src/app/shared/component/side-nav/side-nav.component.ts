import { Component, Inject, OnInit,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { MenuNameService } from 'src/app/service/data/menu-name.service';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { SideNavService } from 'src/app/service/shared/side-nav/side-nav.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  siteId!: number;
  // siteLogoImage: any = "../../../../../../../../assets/images/main logo.png";
  parentMenuList: any;
  childMenuList: any;
  standalone!: true;
  employeeCode: any;
  menuName!: string;

  constructor(private router:Router,private storageEncryptionService: StorageEncryptionService, private service: SideNavService, private alertify: AlertifyService,public menuService:MenuNameService) { }

  async ngOnInit(): Promise<void> {
    await this.getParentMenuList();
  }

  reload(){
    window.location.reload();
  }

  async getParentMenuList() {
    const encryptedData = String(localStorage.getItem("memberId"));
    this.employeeCode = this.storageEncryptionService.decryptData(encryptedData);

    await this.service.getParentMenuList(this.employeeCode)
      .subscribe({
        next: (res) => {
          this.parentMenuList = res;
          console.log(res);
          // this.menuService.menuName=this.parentMenuList[0].subMenuList[0].menuName;
          // this.router.navigate([this.parentMenuList[0].subMenuList[0].menuUrl]);
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  // getChildMenuList(menuListId: Number) {
  //   this.service.getChildMenuList(menuListId).pipe()
  //     .subscribe({
  //       next: (res) => {
  //         this.childMenuList = res;
  //         (res);
  //       },
  //       error: (res) => {
  //         this.alertify.error("Error While fetching The Records!!")
  //       }
  //     })
  // }

  onClick(menuName:any) {
     this.menuName=menuName;
     this.menuService.menuName=menuName;   
     
    //set token to local storage
    const encryptedData1 = this.storageEncryptionService.encryptData(this.menuService.menuName);
    localStorage.setItem('menuName', encryptedData1);
  }

}
