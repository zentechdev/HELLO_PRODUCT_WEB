import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadExcelService {

  private excelFilePath: string = "../../../assets/Static File/Employee_Details_Sheet.xlsx";

  constructor(private http: HttpClient) { }

  downloadExcel(): Observable<Blob> {
    const url = this.excelFilePath;
    return this.http.get(url, { responseType: 'blob' });
  }

}
