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
  
    // Replace Base64 characters with URL-safe ones
    const urlSafeEncryptedData = encryptedData.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return urlSafeEncryptedData;
  }
  
  decryptData(encryptedData: string): any {
    const base64Data = encryptedData.replace(/-/g, '+').replace(/_/g, '/');
  
    try {
      const decryptedBytes = CryptoJS.AES.decrypt(base64Data, this.SECRET_KEY);
      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }

}
