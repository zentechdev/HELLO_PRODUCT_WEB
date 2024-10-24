import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class StorageEncryptionService {

  private readonly SECRET_KEY: string;

  constructor() {
    // this.SECRET_KEY = this.generateSecretKey();
    this.SECRET_KEY="d420dfe9ad4d05c671a5430d77d692cf";
  }

  // private generateSecretKey(): string {
  //   // Generate a random string for the secret key
  //   const randomBytes = CryptoJS.lib.WordArray.random(16);
  //   return CryptoJS.enc.Hex.stringify(randomBytes);
  // }

  encryptData(data: any): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.SECRET_KEY).toString();
    return encryptedData;
  }

  decryptData(encryptedData: string): any {
    console.log('encryptedData', encryptedData);
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    console.log('decryptedData', decryptedData);
    return decryptedData;
  }

}
