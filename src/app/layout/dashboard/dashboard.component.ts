import { Component, ElementRef,  OnInit,  ViewChild } from '@angular/core';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis } from "ng-apexcharts";
import jsPDF from 'jspdf';
import * as html2canvasModule from 'html2canvas';
import { forkJoin, map, Observable } from 'rxjs';


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
  parkingTotal = 0;
  unitTotal = 0;
  wingATotal = 0;
  wingBTotal = 0;
  chartOptions: any;
  unitName: any;
  countTotalActive = 0;
  countTotalInactive = 0;
  optionChart1: any;
  wingCounts: any = [];
  wingAUnit = 0;
  wingBUnit = 0;
  totalAssignedParking = 0;
  activeParkingCount = 0;
  countFreeParking = 0;

  constructor(
    private formBuilder: FormBuilder,
    private storageEncryptionService: StorageEncryptionService,
    private service1: DashboardService) {}



  async ngOnInit() {
    setInterval(() => {
      this.getCountAllVisitor(); // Refresh every 1 minute
    }, 300000);

    this.formGroup = this.formBuilder.group({
      branchId: ['']
    });

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

    

    await Promise.all([
      this.getCountAllVisitor(),
      // this.getParkingDetails(this.siteId)
      // this.getTotalAssignedParking(),
      // this.getCountTotalParkingAvailabel(),
      this.getMergeParkingCountFreeAndOccupied()
    ])

  }

  async filterBranches(event: any): Promise<void> {
    const searchText = event.target.value.toLowerCase();
    this.filteredBranches = await this.branchList.filter((branch: { branchName: string; stateName: string; }) => {
      return branch.branchName.toLowerCase().includes(searchText) || branch.stateName.toLowerCase().includes(searchText);
    });
  }

  async getCountAllVisitor() {
    if (this.roleName == "Master Admin") {
      await this.service1.getCountAllVisitor().subscribe({
        next: (res) => {
          this.visitorBookingList = res.data;
          this.visitorBookingList.map((item: any) => {
            if(item.visitorType === 'allNonInvitedVisitor') {
              item.visitorType = 'Walk-In Visitor (All)';
              item['icon'] = 'fa fa-user-slash';
              item['color'] = '#3faae3';
            } else if(item.visitorType === 'todayNonInvitedVisitor') {
              item.visitorType = 'Walk-In Visitor (Today)';
              item['icon'] = 'fa fa-user-slash';
              item['color'] = '#f96787';
            } else if(item.visitorType === 'allInvitedVisitor') {
              item.visitorType = 'Invited (All)';
              item['icon'] = 'fa fa-users';
              item['color'] = '#3ec7a7';
            } else {
              item.visitorType = 'Invited (Today)';
              item['icon'] = 'fa fa-calendar';
              item['color'] = '#fea74d';
            }
          });
          this.visitorCount(res.data);
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      });
    } else if (this.roleName == "Super Admin") {
      await this.service1.getAllVisitorsCountByClintId(this.clientId).subscribe({
        next: (list) => {
          this.visitorBookingList = list.data;
          this.visitorBookingList.map((item: any) => {
            if(item.visitorType === 'allNonInvitedVisitor') {
              item.visitorType = 'Walk-In Visitor (All)';
              item['icon'] = 'fa fa-user-slash';
              item['color'] = '#3faae3';
            } else if(item.visitorType === 'todayNonInvitedVisitor') {
              item.visitorType = 'Walk-In Visitor (Today)';
              item['icon'] = 'fa fa-user-slash';
              item['color'] = '#f96787';
            } else if(item.visitorType === 'allInvitedVisitor') {
              item.visitorType = 'Invited (All)';
              item['icon'] = 'fa fa-users';
              item['color'] = '#3ec7a7';
            } else {
              item.visitorType = 'Invited (Today)';
              item['icon'] = 'fa fa-calendar';
              item['color'] = '#fea74d';
            }
          });
          this.visitorCount(list.data);
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      });
    } else if (this.roleName == "Site Admin") {
      await this.service1.getAllVisitorsCountBySiteId(this.siteId).subscribe({
        next: (res) => {
          this.visitorBookingList = res.data;
          this.visitorBookingList.map((item: any) => {
            if(item.visitorType === 'allNonInvitedVisitor') {
              item.visitorType = 'Walk-In Visitor (All)';
              item['icon'] = 'fa fa-user-slash';
              item['color'] = '#3faae3';
            } else if(item.visitorType === 'todayNonInvitedVisitor') {
              item.visitorType = 'Walk-In Visitor (Today)';
              item['icon'] = 'fa fa-user-slash';
              item['color'] = '#f96787';
            } else if(item.visitorType === 'allInvitedVisitor') {
              item.visitorType = 'Invited (All)';
              item['icon'] = 'fa fa-users';
              item['color'] = '#3ec7a7';
            } else {
              item.visitorType = 'Invited (Today)';
              item['icon'] = 'fa fa-calendar';
              item['color'] = '#fea74d';
            }
          });
          this.visitorCount(res.data);
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }  
      });
    } else if (this.roleName == "Unit Admin") {
      await this.service1.getAllVisitorsCountByUnitId(this.unitId).subscribe({
        next: (data) => {
          this.visitorBookingList = data.data;
          this.visitorBookingList.map((item: any) => {
            if(item.visitorType === 'allNonInvitedVisitor') {
              item.visitorType = 'Walk-In Visitor (All)';
              item['icon'] = 'fa fa-user-times';
              item['color'] = '#3faae3';
            } else if(item.visitorType === 'todayNonInvitedVisitor') {
              item.visitorType = 'Walk-In Visitor (Today)';
              item['icon'] = 'fa fa-user-times';
              item['color'] = '#f96787';
            } else if(item.visitorType === 'allInvitedVisitor') {
              item.visitorType = 'Invited (All)';
              item['icon'] = 'fa fa-users';
              item['color'] = '#3ec7a7';
            } else {
              item.visitorType = 'Invited (Today)';
              item['icon'] = 'fa fa-user-plus';
              item['color'] = '#fea74d';
            }
          });
          this.visitorCount(data.data);
          this.getUnitAdminData("Unit Admin");
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      });
    }
  }


  visitorCount(data: any) {
    const arrayName: string[] = [];
    const arrayCount: number[] = [];
    
    // Process data
    for (let i = 0; i < data.length; i++) {
      if (data[i].visitorType !== 'Invited (All)') {
        arrayCount.push(data[i].total);
        arrayName.push(data[i].visitorType);
      }
      if (data[i].visitorType === 'Invited (Today)') {
        this.todayInvitedVisitor = data[i].total;
      }
      if (data[i].visitorType === 'Walk-In Visitor (Today)') {
        this.todayNonInvitedVisitor = data[i].total;
      }
      if (data[i].visitorType === 'Invited (All)') {
        this.allInvitedVisitor = data[i].total;
      }
      if (data[i].visitorType === 'Walk-In Visitor (All)') {
        this.allNonInvitedVisitor = data[i].total;
      }
    }
    
    // Calculate total visitors
    this.allVisitor = 
      this.todayInvitedVisitor + 
      this.todayNonInvitedVisitor + 
      this.allInvitedVisitor + 
      this.allNonInvitedVisitor;
  
    // Configure chart options
    this.chartOptions2 = {
      series: [{
        name: 'Visitors',
        data: [
          this.todayInvitedVisitor, 
          this.allInvitedVisitor, 
          this.allNonInvitedVisitor, 
          this.todayNonInvitedVisitor
        ]
      }],
      chart: {
        type: 'bar',
        height: 350,
        width: 450,
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#000000']
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Invited (Today)', 
          'Invited (All)', 
          'Walk-In Visitor (All)', 
          'Walk-In Visitor (Today)'
        ],
        title: {
          text: 'Visitor Types'
        }
      },
      yaxis: {
        title: {
          text: 'Number of Visitors'
        }
      },
      fill: {
        opacity: 1,
        colors: ['#00E396', '#008FFB', '#FEB019', '#FF4560']
      },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        y: {
          formatter: (val: number) => `${val} Visitors`
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center'
      }
    };
  }
  



  // Parking functionality started here 
  addSpaceAndTitleCase(text: string): string {
    const spacedText = text.replace(/([A-Z])/g, ' $1');
    return spacedText;
  }

  getTotalAvailableParking(): Observable<any[]> {
    return this.service1.getCountForAvailabelParking().pipe(
      map((res: any) => {
        if(res?.isSuccess == true && this.roleName == 'Unit Admin') {
          return res.data.filter((item: any) => item.siteId == this.siteId && item.unitId == this.unitId);
        }
        return []
      })
    )
  }

  getTotalAssignedParking(): Observable<any[]> {
    return this.service1.getCountForTotalParkingAssigned().pipe(
      map((res: any) => {
        if (res?.isSuccess == true && this.roleName == 'Site Admin') {
          return res.data.filter((item: any) => item.siteId == this.siteId && item.isActive == 'Active' && item.assignId !== null);
        } else if(res?.isSuccess == true && this.roleName == 'Unit Admin'){
          return res.data.filter((item: any) => item.siteId == this.siteId && item.unitId == this.unitId &&item.isActive == 'Active' && item.assignId !== null);
        }
        return [];
      })
    );
  }
  
  getCountTotalParkingAvailabel(): Observable<any[]> {
    return this.service1.getCountForTotalFreeParking().pipe(
      map((res: any) => {
        if (res?.isSuccess == true && this.roleName == 'Site Admin') {
          return res.data.filter((item: any) => item.siteId == this.siteId && item.isActive == 'Active');
        } else if (res?.isSuccess == true && this.roleName == 'Unit Admin'){
          return res.data.filter((item: any) => item.siteId == this.siteId &&  item.unitId == this.unitId && item.isActive == 'Active');
        }
        return [];
      })
    );
  }
  
  getMergeParkingCountFreeAndOccupied() {
    forkJoin({
      assignedParking: this.getTotalAssignedParking(),
      freeParking: this.getCountTotalParkingAvailabel()
    }).subscribe(({ assignedParking, freeParking }) => {
      const parkingArray = [
        {
          assignedParking,
          freeParking
        }
      ];
      this.getCountParkingDetails(parkingArray);
    });
  }
  
  
  getCountParkingDetails(parkingData: any) {
    this.totalAssignedParking = 0;
    this.activeParkingCount = 0;
    this.countFreeParking = 0;
  
    const data = parkingData[0];
    const assignedParkingArray = data.assignedParking;
    const freeParkingArray = data.freeParking;

    for(let i = 0 ; i < assignedParkingArray.length ; i++) {
      if (assignedParkingArray[i].unitNumber) {
        this.totalAssignedParking ++;
      }
      if(assignedParkingArray[i].isActive == 'Active'){
        this.activeParkingCount++;
      }
    }

    for(let k = 0; k < freeParkingArray.length; k++) {
      if (freeParkingArray[k].parkingNumber !== '' && freeParkingArray[k].isActive == 'Active') {
        this.countFreeParking++;
      }
    }
    // Configure chart options
    this.chartOptions = {
      series: [
        {
          name: 'Parking Data',
          data: [
            {
              x: 'Active Parking',
              y: this.activeParkingCount,
              fillColor: '#00e396'
            },
            {
              x: 'Assigned Parking',
              y: this.totalAssignedParking,
              fillColor: '#feb019'
            },
            {
              x: 'Free Parking',
              y: this.countFreeParking,
              fillColor: '#ff69b4'
            }
          ]
        }
      ],
      chart: {
        type: 'bar',
        width: 430,
        stacked: true,
      }
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