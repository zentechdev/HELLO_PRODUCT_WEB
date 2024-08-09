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
  unitName: any;
  countTotalActive = 0;
  countTotalInactive = 0;
  optionChart1: any;
  wingCounts: any = [];
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
    setInterval(() => {
      this.getCountAllVisitor(); // Refresh every 1 minute
    }, 300000);

    this.formGroup = this.formBuilder.group({
      branchId: ['']
    })

    
    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = Number(this.storageEncryptionService.decryptData(clientId));

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = Number(this.storageEncryptionService.decryptData(siteId));

    const unitId = String(localStorage.getItem("unitId"));
    this.unitId = Number(this.storageEncryptionService.decryptData(unitId));

    const roleName = String(localStorage.getItem('roleName'));
    this.roleName = this.storageEncryptionService.decryptData(roleName);

    const unitName = String(localStorage.getItem('unitName'));
    this.unitName = this.storageEncryptionService.decryptData(unitName);

    this.getParkingDetails(this.siteId);

    await Promise.all([
      this.getCountAllVisitor(),
      // this.visitorCount(this.visitorBookingList),
    ])

  }

  async getCountAllVisitor() {
    if (this.roleName == "Master Admin") {
      await this.service1.getCountAllVisitor()
        .subscribe({
          next: (res) => {
            this.visitorBookingList = res.data;
            this.visitorCount(res.data);
          },
          error: (res) => {
            this.alertify.error("Error While fetching The Records!!")
          }
        })
    } else if (this.roleName == "Super Admin") {
      await this.service1.getAllVisitorsCountByClintId(this.clientId)
        .subscribe({
          next: (list) => {
            this.visitorBookingList = list.data;
            this.visitorCount(list.data);
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
            this.visitorCount(res.data);
          },
          error: (res) => {
            this.alertify.error("Error While fetching The Records!!")
          }
        })
    } else if (this.roleName == "Unit Admin") {
      await this.service1.getAllVisitorsCountByUnitId(this.unitId)
        .subscribe({
          next: (data) => {
            this.visitorBookingList = data.data;
            this.visitorCount(data.data);
            this.getUnitAdminData("Unit Admin");
          },
          error: (res) => {
            this.alertify.error("Error While fetching The Records!!")
          }
        })
    }
  }


  visitorCount(data: any) {
    const arrayName: any[] = [];
    const arrayCount: any[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].visitorType !== 'allVisitor') {
        arrayCount.push(data[i].total);
        arrayName.push(data[i].visitorType);
      }
      if (data[i].visitorType == 'todayInvitedVisitor') {
        this.todayInvitedVisitor = data[i].total
      }
      if (data[i].visitorType == 'todayNonInvitedVisitor') {
        this.todayNonInvitedVisitor = data[i].total
      }
      if (data[i].visitorType == 'allInvitedVisitor') {
        this.allInvitedVisitor = data[i].total
      }
      if (data[i].visitorType == 'allNonInvitedVisitor') {
        this.allNonInvitedVisitor = data[i].total
      }
      if (data[i].visitorType !== 'allVisitor') {
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
    const wingCountMap:any = {};
    this.wingATotal = data.filter((detail: any) => detail.wingName === 'A').length;
    this.wingBTotal = data.filter((detail: any) => detail.wingName === 'B').length;
    this.parkingTotal = data.filter((detail: any) => detail.floorType === 'Parking').length;
    this.unitTotal = data.filter((detail: any) => detail.floorType === 'Unit').length;
    this.chartOptions = {
      series: [{
        name: 'count',
        data: [
          {
          x: 'Wing A',
          y: this.wingATotal,
          fillColor: '#008ffb'
        },
        {
          x: 'Wing B',
          y: this.wingBTotal,
          fillColor: '#ff4560'
        }, 
        {
          x: 'Parking',
          y: this.parkingTotal,
          fillColor: '#feb019'
        }, 
        {
          x: 'Unit',
          y: this.unitTotal,
          fillColor: '#00e396'
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
      enabled: false
    },
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

  //  unit admin parking details functionality started here 

  getUnitAdminData(roleName: any) {
    this.service1.getAllParkingBySiteID(this.siteId).subscribe({
      next: (res: any) => {
        if (res && res.parkingfloor && res.parkingfloor.length !== null) {
          if (roleName === 'Unit Admin') {
            res.parkingfloor.forEach((floor: any) => {
              const allCurrentParkingStatus = floor.parking.filter((item: any) => item.status === true);
              const allCurrentStatus = floor.parking.filter((item: any) => item.status === false);
              console.log(allCurrentParkingStatus, allCurrentStatus);
              this.getParkingStatus(allCurrentParkingStatus, allCurrentStatus);
            });
          }
        }
      },
      error: (err: any) => {
        console.error('Error fetching parking data', err);
      }
    });
  }
  
  getParkingStatus(active: any, inactive: any) {
    try {
      const seriesData = [];
      if (active.length > 0) {
        this.countTotalActive = active.length;
        seriesData.push({ x: 'Active', y: this.countTotalActive });
      }
  
      if (inactive.length > 0) {
        this.countTotalInactive = inactive.length;
        seriesData.push({ x: 'InActive', y: this.countTotalInactive });
      }
  
      // if (seriesData.length > 0) {     
        this.optionChart1 = {
          series: [this.countTotalActive, this.countTotalInactive],
          chart: {
            width: 380,
            type: 'donut',
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    show: false
                  },
                  value: {
                    show: true
                  },
                  total: {
                    show: true,
                    showAlways: false
                  }
                }
              }
            }
          },
          colors: [
            '#008ffb',
            '#ff4560',
          ],
          labels: ['Active', 'InActive'],
          dataLabels: {
            enabled: true,
          },
          legend: {
            show: true
          },
        };
      // }
    } catch (err) {
      console.error('Error setting parking status', err);
    }
  }
  
  
}