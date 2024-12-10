import { Component, OnInit } from '@angular/core';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { baseUrl } from 'src/environments/environment';
@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.css']
})
export class GenerateQRComponent implements OnInit {
  siteId: any;
  elementType: any = `${baseUrl}/check-in-form`;
  value: any;
  qrNumber: any;
  
  constructor(
    private storageEncryptionService: StorageEncryptionService,
  ) { 
    const siteId = String(localStorage.getItem('siteId'));
    this.siteId = this.storageEncryptionService.decryptData(siteId);

    let qrNumber = String(localStorage.getItem('qrNumber'));
    this.qrNumber = this.storageEncryptionService.decryptData(qrNumber);
  }

  ngOnInit(): void {
  }

  downloadQRCode(){
    const printContent = document.getElementById('print-section');
    const WindowPrt:any = window.open('', '', 'width= 1000,height=750');
    WindowPrt.document.write(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 10px;
              border: 1px solid #ddd;
              text-align: left;
            }
            th {
              background-color: #4CAF50;
              color: white;
            }
          </style>
        </head>
        <body>
          ${printContent?.innerHTML}
        </body>
      </html>
    `);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}
