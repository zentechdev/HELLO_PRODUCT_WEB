import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  @ViewChild('content', { static: false }) el !: ElementRef
  @ViewChild('content1', { static: false }) el1 !: ElementRef
  branchId: any;
  branch: any;
  filteredBranches: any;
  siteId: any;
  unitId: any;
  clientId!: number;
  roleName!: string;
  branchList: any
  alertify: any;
  formGroup!: FormGroup;
  chartOptions2: any;
  visitorBookingList: any;
  allInvitedVisitor: any;
  allNonInvitedVisitor: any;
  todayInvitedVisitor: any;
  todayNonInvitedVisitor: any;
  allVisitor: any;
  options: any;
  // @Output() tabSelected = new EventEmitter<string>();
  // selectedTab: 'visitors' | 'parking' = 'visitors';
  parkingDetails: any;
  totalUnit: any;
  wingNameTotal: any;
  parkingTotal: any;
  unitTotal: any;
  wingATotal: any;
  wingBTotal: any;
  chartOptions: any;
  constructor(
    private formBuilder: FormBuilder,
    private storageEncryptionService: StorageEncryptionService,
    private service: BranchService,
    private service1: DashboardService) {
  }


  async filterBranches(event: any): Promise<void> {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = await this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }


  async ngOnInit(): Promise<void> {
    this.formGroup = await this.formBuilder.group({
      branchId: ['']
    })

    setInterval(() => {
      this.getCountAllVisitor(); // Refresh every 1 minute
    }, 300000);

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const unitId = String(localStorage.getItem("unitId"));
    this.unitId = Number(this.storageEncryptionService.decryptData(unitId));

    const roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);

    this.getParkingDetails(this.siteId);

    await Promise.all([
      this.getCountAllVisitor(),
      this.visitorCount(),
    ])

  }

  async getCountAllVisitor() {
    if (this.roleName == "Master Admin") {
      await this.service1.getCountAllVisitor()
        .subscribe({
          next: (res) => {
            this.visitorBookingList = res.data;
            this.visitorCount();
          },
          error: (res) => {
            this.alertify.error("Error While fetching The Records!!")
          }
        })
    } else if (this.roleName == "Super Admin") {
      await this.service1.getAllVisitorsCountByClintId(this.clientId)
        .subscribe({
          next: (res) => {
            this.visitorBookingList = res.data;
            this.visitorCount();
          },
          error: (res) => {
            this.alertify.error("Error While fetching The Records!!")
          }
        });
    } else if (this.roleName == "Site Admin") {
      await this.service1.getAllVisitorsCountBySiteId(this.siteId)
        .subscribe({
          next: (res) => {
            this.visitorBookingList = res.data;
            this.visitorCount();
          },
          error: (res) => {
            this.alertify.error("Error While fetching The Records!!")
          }
        })
    } else if (this.roleName == "Unit Admin") {
      await this.service1.getAllVisitorsCountByUnitId(this.unitId)
        .subscribe({
          next: (res) => {
            console.log('unit admin response', res.data);
            this.visitorBookingList = res.data;
            this.visitorCount();
          },
          error: (res) => {
            this.alertify.error("Error While fetching The Records!!")
          }
        })
    }
  }


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
        width: 430,
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

  // selectTab(tab: 'visitors' | 'parking') {
  //   this.selectedTab = tab;
  //   this.tabSelected.emit(tab);
  // }

  // Parking functionality started here 

  addSpaceAndTitleCase(text: string): string {
    const spacedText = text.replace(/([A-Z])/g, ' $1');
    return spacedText.charAt(0).toUpperCase() + spacedText.slice(1).toLowerCase();
  }

  getParkingDetails(siteId: any) {
    this.service1.getAllParkingBySiteID(siteId).subscribe((res: any) => {
      if (res && res.parkingfloor) {
        const allParkingDetails = res.parkingfloor.filter((item: any) => item.siteId == siteId);
        this.getCountParkingDetails(allParkingDetails);
      }
    });
  }

  getCountParkingDetails(data: any) {
    this.parkingDetails = data;
    this.wingATotal = data.filter((detail: any) => detail.wingName === 'A').length;
    this.wingBTotal = data.filter((detail: any) => detail.wingName === 'B').length;
    this.parkingTotal = data.filter((detail: any) => detail.floorType === 'Parking').length;
    this.unitTotal = data.filter((detail: any) => detail.floorType === 'Unit').length;
    this.chartOptions = {
      series: [{
        name: 'count',
        data: [{
          x: 'Wing A',
          y: this.wingATotal
        },
        {
          x: 'Wing B',
          y: this.wingBTotal
        }, 
        {
          x: 'Parking',
          y: this.parkingTotal
        }, 
        {
          x: 'Unit',
          y: this.unitTotal
        }
      ]}
    ],
    chart: {
      type: 'bar',
      width: 430,
      toolbar: {
      show: false
    }
  },
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    title: {
      text: 'Wing and Parking Details'
    },
    dataLabels: {
      enabled: true
    },
    colors: ['#ff4560'],
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
    }
  }

  exportToPDF() {
    const pdfWidth = this.el.nativeElement.offsetWidth;
    const pdfHeight = this.el.nativeElement.offsetHeight;
    const pdf = new jsPDF({
      unit: 'px',
      format: [pdfWidth, pdfHeight],
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
}