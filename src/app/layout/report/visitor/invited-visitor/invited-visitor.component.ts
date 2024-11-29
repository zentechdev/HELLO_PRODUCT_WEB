import { Component, OnInit } from '@angular/core';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';

@Component({
  selector: 'app-invited-visitor',
  templateUrl: './invited-visitor.component.html',
  styleUrls: ['./invited-visitor.component.css']
})
export class InvitedVisitorComponent implements OnInit {
  memberId: any;
  constructor(
    private encryptedData: StorageEncryptionService
  ) { }

  ngOnInit(): void {
    let memberId = String(localStorage.getItem('roleName'));
    this.memberId = this.encryptedData.decryptData(memberId);
    console.log(this.memberId);
  }

}
