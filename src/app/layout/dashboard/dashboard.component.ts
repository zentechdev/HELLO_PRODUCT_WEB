import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BranchService } from 'src/app/service/masters/branch.service';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis } from "ng-apexcharts";
import { auto } from '@popperjs/core';
import { Branch } from 'src/app/model/masters/branch';
import jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as html2canvasModule from 'html2canvas';
import 'jspdf-autotable';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;

  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  branchId: any;
  branch: any;
  filteredBranches: any;
  onceInWeek: any;
  eastZoneWiseType: any;
  northZoneWiseType: any;
  southZoneWiseType: any;
  westZoneWiseType: any;
  eastCabinZoneWiseType: any;
  northCabinZoneWiseType: any;
  southCabinZoneWiseType: any;
  westCabinZoneWiseType: any;
  eastConferenceZoneWiseType: any;
  northConferenceZoneWiseType: any;
  southConferenceZoneWiseType: any;
  westConferenceZoneWiseType: any;
  eastBoardZoneWiseType: any;
  northBoardZoneWiseType: any;
  southBoardZoneWiseType: any;
  westBoardZoneWiseType: any;
  eastTrainingZoneWiseType: any;
  northTrainingZoneWiseType: any;
  southTrainingZoneWiseType: any;
  westTrainingZoneWiseType: any;
  eastMeetingZoneWiseType: any;
  southMeetingZoneWiseType: any;
  westMeetingZoneWiseType: any;
  northMeetingZoneWiseType: any;
  eastTotalZoneWiseType: any;
  northTotalZoneWiseType: any;
  southTotalZoneWiseType: any;
  westTotalZoneWiseType: any;
  siteId: any;
  unitId: any;
  clientId!: number;

  async filterBranches(event: any): Promise<void> {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = await this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }

  @ViewChild('content', { static: false }) el !: ElementRef
  @ViewChild('content1', { static: false }) el1 !: ElementRef

  // exportToPDF() {
  //   let pdf = new jsPDF()
  //   pdf.html(this.el.nativeElement,{
  //     callback:(pdf)=>{
  //       pdf.save("pdf downloaded")
  //     }
  //   })
  // }
  exportToPDF() {

    const pdfWidth = this.el.nativeElement.offsetWidth; // Get the width of the content
    const pdfHeight = this.el.nativeElement.offsetHeight; // Get the height of the content


    const pdf = new jsPDF({
      unit: 'px', // Set the unit to pixels
      format: [pdfWidth, pdfHeight], // Set the width and height of the PDF
    });


    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("pdf_downloaded.pdf");
      }
    });

    const html2canvas = html2canvasModule as any;
    html2canvas(this.el.nativeElement).then((canvas: any) => {
      callback: (pdf: { save: (arg0: string) => void; }) => {
        pdf.save("pdf_downloaded.pdf");
      }
    });
  }

  exportToPDF1() {
    const pdfWidth = this.el1.nativeElement.offsetWidth; // Get the width of the content
    const pdfHeight = this.el1.nativeElement.offsetHeight; // Get the height of the content

    const pdf = new jsPDF({
      unit: 'px', // Set the unit to pixels
      format: [pdfWidth, pdfHeight], // Set the width and height of the PDF
    });

    pdf.html(this.el1.nativeElement, {
      callback: (pdf) => {
        pdf.save("pdf_downloaded.pdf");
      }
    });
  }



  condition: boolean = false;
  condition1: boolean = false;
  roleName!: string;
  branchList: any
  alertify: any;
  formGroup!: FormGroup;
  value: any;
  totalSeat: any;
  seatReportList: any;
  seatReportTypeList: any;
  seatCategoryReportList: any;
  headCountReportTypeList: any;
  zoneWiseList: any;
  workStations: any;

  chartOptions: any;
  chartOptions1: any;

  chartOptions3: any;
  chartOptions4: any;
  chartOptions5: any;

  chartOptions7: any;
  chartOptions8: any;

  chartOptions9: any;
  chartOptions10: any;
  chartOptions12: any;
  chartOptions13: any;
  chartOptions14: any;
  chartOptions15: any;
  chartOptions16: any;
  chartOptions17: any;
  chartOptions18: any;
  chartOptions19: any;

  chartOptions2: any;
  chartOptions6: any;

  
  visitorBookingList: any;
  allInvitedVisitor: any;
  allNonInvitedVisitor: any;
  todayInvitedVisitor: any;
  todayNonInvitedVisitor: any;
  allVisitor: any;
  options: any;

  constructor(private formBuilder: FormBuilder, private storageEncryptionService: StorageEncryptionService, private service: BranchService, private service1: DashboardService) {
    setTimeout(
      function () {
        location.reload();
      }, 300000);
    // this.chartOptions5 = {};

  }


  async ngOnInit(): Promise<void> {

    this.formGroup = await this.formBuilder.group({
      branchId: ['']
    })

    // Initial refresh when the component is loaded
    // setInterval(() => {
    //   this.refreshDashboard(); // Refresh every 1 minute
    // }, 300000);

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const unitId = String(localStorage.getItem("unitId"));
    this.unitId = Number(this.storageEncryptionService.decryptData(unitId));

    const roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);



    // if (this.roleName == 'Super Admin') {
    //   if (this.condition == false) {
    //     this.condition1 = true;
    //   }
    //   else {
    //     this.condition = false;
    //   }
    // }

    // const branchList = String(localStorage.getItem("branchList"));
    // this.branchList = this.storageEncryptionService.decryptData(branchList)
    // .filter((item: any) => item.stateName)
    // .sort((a: { stateName: string; }, b: { stateName: any; }) => a.stateName.localeCompare(b.stateName));

    // if (this.roleName.length > 0) {
    //   if (this.condition1 == false) {
    //     this.condition1 = true;
    //   }
    //   else {
    //     this.condition = false;
    //   }
    // }
    // else {
    //   if (this.condition == false) {
    //     this.condition = true;
    //   }
    //   else {
    //     this.condition1 = false;
    //   }
    // }

    if(this.roleName=="Master Admin"){
      this.service1.getCountAllVisitor()
      .subscribe({
        next:(res)=>{
          this.visitorBookingList = res.data;
          this.visitorCount();
        },
        error:(res)=>{
          this.alertify.error("Error While fetching The Records!!")
        }
      })
    }else if(this.roleName=="Super Admin"){
      this.service1.getAllVisitorsCountByClintId(this.clientId)
      .subscribe({
        next:(res)=>{
          this.visitorBookingList = res.data;
          this.visitorCount();
        },
        error:(res)=>{
          this.alertify.error("Error While fetching The Records!!")
        }
      })
    }else if(this.roleName=="Site Admin"){
      this.service1.getAllVisitorsCountBySiteId(this.siteId)
      .subscribe({
        next:(res)=>{
          this.visitorBookingList = res.data;
          this.visitorCount();
        },
        error:(res)=>{
          this.alertify.error("Error While fetching The Records!!")
        }
      })
    }else if(this.roleName=="Unit Admin"){
      this.service1.getAllVisitorsCountByUnitId(this.unitId)
      .subscribe({
        next:(res)=>{
          this.visitorBookingList = res.data;
          this.visitorCount();
        },
        error:(res)=>{
          this.alertify.error("Error While fetching The Records!!")
        }
      })
    }

  }

  // getCountAllVisitor() {
  //   this.service1.getCountAllVisitor()
  //     .subscribe({
  //       next: (res) => {
  //         this.visitorBookingList = res;
  //         const arrayName: any[] = [];
  //         const arrayCount: any[] = [];

  //         for (let i = 0; i < this.visitorBookingList.length; i++) {
  //           if (this.visitorBookingList[i].visitorType !== 'allVisitor') {
  //             arrayCount.push(res[i].total);
  //             arrayName.push(res[i].visitorType);

  //           }
  //           if (this.visitorBookingList[i].visitorType == 'todayInvitedVisitor') {
  //             this.todayInvitedVisitor = res[i].total
  //           }
  //           if (this.visitorBookingList[i].visitorType == 'todayNonInvitedVisitor') {
  //             this.todayNonInvitedVisitor = res[i].total
  //           }
  //           if (this.visitorBookingList[i].visitorType == 'allInvitedVisitor') {
  //             this.allInvitedVisitor = res[i].total
  //           }
  //           if (this.visitorBookingList[i].visitorType == 'allNonInvitedVisitor') {
  //             this.allNonInvitedVisitor = res[i].total
  //           }
  //           if (this.visitorBookingList[i].visitorType == 'allVisitor') {
  //             this.allVisitor = res[i].total
  //           }

  //         }
  //         this.chartOptions2 = {
  //           series: arrayCount,
  //           chart: {
  //             width: 500,
  //             type: "pie"
  //           },
  //           labels: ["Todays Invited Visitors", "Todays Non-Invited Visitors", " All Invited Visitors", "All Non Invited Visitors",],
  //           responsive: [
  //             {
  //               breakpoint: 480,
  //               options: {
  //                 chart: {
  //                   width: 200
  //                 },
  //                 legend: {
  //                   position: "bottom"
  //                 }
  //               }
  //             }
  //           ]
  //         };
  //       },
  //       error: (res) => {
  //         this.alertify.error("Error While fetching The Records!!")
  //       }
  //     })
  // }

  visitorCount() {

    const arrayName: any[] = [];
    const arrayCount: any[] = [];

    for (let i = 0; i < this.visitorBookingList.length; i++) {
      if (this.visitorBookingList[i].visitorType !== 'allVisitor') {
        arrayCount.push(this.visitorBookingList[i].total);
        arrayName.push(this.visitorBookingList[i].visitorType);
      }
      if (this.visitorBookingList[i].visitorType == 'todayInvitedVisitor') {
        this.todayInvitedVisitor = this.visitorBookingList[i].total
      }
      if (this.visitorBookingList[i].visitorType == 'todayNonInvitedVisitor') {
        this.todayNonInvitedVisitor = this.visitorBookingList[i].total
      }
      if (this.visitorBookingList[i].visitorType == 'allInvitedVisitor') {
        this.allInvitedVisitor = this.visitorBookingList[i].total
      }
      if (this.visitorBookingList[i].visitorType == 'allNonInvitedVisitor') {
        this.allNonInvitedVisitor = this.visitorBookingList[i].total
      }
      if (this.visitorBookingList[i].visitorType !== 'allVisitor') {
        this.allVisitor = this.todayInvitedVisitor + this.todayNonInvitedVisitor + this.allInvitedVisitor + this.allNonInvitedVisitor
      }
    }
    this.chartOptions2 = {
      series: arrayCount,
      chart: {
        width: 500,
        type: "pie"
      },
      labels: arrayName,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}