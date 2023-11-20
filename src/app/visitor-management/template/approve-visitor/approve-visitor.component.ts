import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { VisitorApprovalService } from 'src/app/service/template/visitor-approval.service';

@Component({
  selector: 'app-approve-visitor',
  templateUrl: './approve-visitor.component.html',
  styleUrls: ['./approve-visitor.component.css']
})
export class ApproveVisitorComponent implements OnInit {
  parmValue!: string | null;
  statusId!: number;

  constructor(public service: VisitorApprovalService, public alertify: AlertifyService) { }

  async ngOnInit(): Promise<void> {
    await this.getParameter();
  }

  getParameter() {
    debugger
    let querystring = window.location.search;
    let urlParam = new URLSearchParams(querystring);
    
    this.parmValue = urlParam.get('m');
    
    // Check if this.parmValue is not null before replacing curly braces
    if (this.parmValue !== null) {
      let parmValue = this.parmValue.replace(/[{}]/g, '');
      localStorage.setItem('parmValue', parmValue);
    } else {
      console.warn('Parameter "m" not found in the URL.');
    }
    

  }

  approveVisitor() {
    let formData={
      statusId : 1 ,
    }

    let mobileNumber = String(localStorage.getItem('parmValue'));

    this.service.updateVisitorStatus(formData,mobileNumber)
      .subscribe({
        next: (res) => {
          if (res.isSuccess == true) {
            this.alertify.success(res.message);
          }
          else {
            this.alertify.error(res.message);
          }
        },
        error: (res) => {
          this.alertify.error("500 Internal Server Error")
        }
      })

  }

  rejectVisitor() {
    
    let formData={
      statusId : 2 ,
    }

    let mobileNumber = String(localStorage.getItem('parmValue'))

    this.service.updateVisitorStatus(formData,mobileNumber)
      .subscribe({
        next: (res) => {
          if (res.isSuccess == true) {
            this.alertify.success(res.message);
          }
          else {
            this.alertify.success(res.message);
          }
        },
        error: (res) => {
          this.alertify.error("500 Internal Server Error")
        }
      })
  }

}
