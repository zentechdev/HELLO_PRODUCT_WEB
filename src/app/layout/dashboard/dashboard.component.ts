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

  totalSeatCount: any;
  totalOccupiedSeatCount: any;
  meeetingReportList: any;
  totalMeetingRoomCount: any;
  totalOccupiedMeetingRoomCount: any;
  meetingRoomReportTypeList: any;
  totalVacanteCount: any;
  usedPercentage: any;
  meetingRoomCount: any;
  boardRoomCount: any;
  conferenceRoomCount: any;
  trainingRoomCount: any;

  cubicalCount: any;
  cabinCount: any;
  linearCount: any;
  lTypeCount: any;
  hatWorkstationsCount: any;
  vacanteCount: any;
  employeeCount: any;
  categoryWiseSeatBookingList: any;
  onceAMonoth: any;
  onceAMonothTotal: any;
  onceAMonothWFO: any;
  onceAMonothTwice: any;
  onceAMonothWFH: any;
  zoneWiseSeatBookingList: any;
  eastWorkStations: any;
  northWorkStations: any;
  southWorkStations: any;
  westWorkStations: any;
  totalWorkStations: any;
  zoneWiseTotalSeatBookingList: any;
  eastZoneTotal: any;
  northZoneTotal: any;
  southZoneTotal: any;
  westZoneTotal: any;
  grandTotal: any;
  topSeatBookingList: any;
  kolTotal: any;
  tnaTotal: any;
  hydTotal: any;
  delTotal: any;
  bhanTotal: any;
  andheriTotal: any;
  mgroadTotal: any;
  chandigarhTotal: any;
  boravaliTotal: any;
  neharupalaceTotal: any;
  chartOptions11: any;
  onceMonthBooking: any;
  wfhBooking: any;
  allDayBooking: any;
  twiceBooking: any;
  totalBooking: any;
  categoryWiseBookingList: any;
  zoneWiseTotalRoomBookingList: any;
  topMeetingRoomList: any;
  ahmedabadTotal: any;
  chandigarTotal: any;
  delhiTotal: any;
  kolkataTotal: any;
  hydrabadTotal: any;
  churchgateTotal: any;
  bangMGTotal: any;
  andheriMumTotal: any;
  delNeharuTotal: any;
  bhandupTotal: any;
  zoneWiseTotalRoomBookingPanIndiaList: any;
  eastPanZoneTotal: any;
  northPanZoneTotal: any;
  southPanZoneTotal: any;
  westPanZoneTotal: any;
  grandPanTotal: any;
  occupiedCount: any;
  totalCount: any;
  twiceInWeek: any;
  allDayOffice: any;
  catTotalBooking: any;
  categoryWisePanBookingList: any;
  totalRoom: any;
  meetingRoom: any;
  trainingRoom: any;
  boardRoom: any;
  conferenceRoom: any;
  receptionCabin: any;
  discussionRoom: any;
  colors: any;
  categoryWiseAppDownlodedList: any;
  allDayOfficeAppDownload: any;
  wfhAppDownload: any;
  twiceAppDownload: any;
  wfoAppDownload: any;
  totalAppDownload: any;
  allWfhOfficeAppDownload: any;
  onceMonthAppDownload: any;
  totalBookingQr: any;
  occupiedCountQr: any;
  canceledCountQr: any;
  totalBookingQrNorth: any;
  occupiedCountQrNorth: any;
  canceledCountQrNorth: any;
  occupiedCountQrSouth: any;
  totalBookingQrSouth: any;
  canceledCountQrSouth: any;
  totalBookingQrWest: any;
  occupiedCountQrWest: any;
  canceledCountQrWest: any;
  totalQrEast: any;
  totalQr: any;
  totalQrCanceled: any;
  totalQrOccupied: any;
  totalSeatBookingQr: any;
  occupiedSeatCountQr: any;
  canceledSeatCountQr: any;
  totalSeatBookingQrNorth: any;
  occupiedSeatCountQrNorth: any;
  canceledSeatCountQrNorth: any;
  totalSeatBookingQrSouth: any;
  canceledSeatCountQrSouth: any;
  occupiedSeatCountQrSouth: any;
  totalSeatBookingQrWest: any;
  occupiedSeatCountQrWest: any;
  canceledSeatCountQrWest: any;
  totalSeatQr: any;
  totalSeatQrOccupied: any;
  totalSeatQrCanceled: any;
  categorySeatQrWiseAppDownlodedList: any;
  workStationTypeZoneWisePanIndiaList: any;
  eastWorkStationType: any;
  northWorkStationType: any;
  southWorkStationType: any;
  westWorkStationType: any;
  totalWorkStationType: any;
  eastCabinWorkStationType: any;
  northCabinWorkStationType: any;
  westCabinWorkStationType: any;
  southCabinWorkStationType: any;
  totalCabinWorkStationType: any;
  eastHatWorkStationType: any;
  northHatWorkStationType: any;
  westHatWorkStationType: any;
  southHatWorkStationType: any;
  totalHatWorkStationType: any;
  totalCubicleWorkStationType: any;
  eastCubicleWorkStationType: any;
  northCubicleWorkStationType: any;
  southCubicleWorkStationType: any;
  westCubicleWorkStationType: any;
  eastLtypeWorkStationType: any;
  northLtypeWorkStationType: any;
  southLtypeWorkStationType: any;
  westLtypeWorkStationType: any;
  totalLtypeWorkStationType: any;
  eastLinearWorkStationType: any;
  northLinearWorkStationType: any;
  southLinearWorkStationType: any;
  westLinearWorkStationType: any;
  totalLinearWorkStationType: any;
  eastTotalWorkStationType: any;
  northTotalWorkStationType: any;
  southTotalWorkStationType: any;
  westTotalWorkStationType: any;
  totalTotalWorkStationType: any;

  showMeetingRoom = false;
  showSeatBooking = true;
  vacanteCountMeeting: any;
  usedPercentageMetting: any;
  grandTotalRoom: any;
  westZoneTotalRoom: any;
  southZoneTotalRoom: any;
  northZoneTotalRoom: any;
  eastZoneTotalRoom: any;
  visitorBookingList: any;
  allInvitedVisitor: any;
  allNonInvitedVisitor: any;
  todayInvitedVisitor: any;
  todayNonInvitedVisitor: any;
  allVisitor: any;
  pendingSeatCountQr: any;
  northpendingSeatCountQr: any;
  southpendingSeatCountQr: any;
  westpendingSeatCountQr: any;
  totalSeatQrPending: any;
  pendingMeetingCountQr: any;
  totalPendingMeetingCountQr: any;
  westPendingMeetingCountQr: any;
  southPendingMeetingCountQr: any;
  northPendingMeetingCountQr: any;

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

    const roleName = String(localStorage.getItem("roleName"));
    this.roleName = this.storageEncryptionService.decryptData(roleName);

    const encryptedData = String(localStorage.getItem('employeeCode'));
    let employeeCode = this.storageEncryptionService.decryptData(encryptedData);



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

    if (this.roleName.length > 0) {
      if (this.condition1 == false) {
        this.condition1 = true;
      }
      else {
        this.condition = false;
      }
    }
    else {
      if (this.condition == false) {
        this.condition = true;
      }
      else {
        this.condition1 = false;
      }
    }


    // await new Promise(resolve => {
    //   setTimeout(resolve, 5000); 
    // }); 

    await Promise.all([
      this.getAllBranchByEmployeeCode(employeeCode),
      this.getAllSeatReport(),
      this.getSeatTypeReport(),
      this.getAllMeetingRoomReport(),
      this.getAllMeetingRoomTypeReport(),
      this.getHeadCountReport(),
      this.getZoneWiseWorkstations(),
      this.getTopZoneWiseBooking(),
      this.getCategoryWiseSeatBooking(),
      this.getZoneWiseMeetingRoomStations(),
      this.getAllTopMeetingBookingLocation(),
      this.getAllZoneWiseMeetingSeatBookingPanIndia(),
      this.getAllCategoryWiseMeetingBookingPanIndia(),
      this.getAllMeetingRoomTypeZoneWisePanIndia(),
      this.getCategoryWiseEmployeeDownloadedAppReport(),
      this.getMeetingRoomQrcodeScaningPanIndia(),
      this.getSeatQrcodeScaningPanIndiaReport(),
      this.getWorkStationTypeZoneWisePanIndiaReport(),
      this.getZoneWiseSeatBooking(),
      this.getCountAllVisitor()
    ]);

  }
  refreshDashboard() {
    window.location.reload();
  }

  toggleMeetingRoom() {
    if (this.showMeetingRoom == false) {
      this.showSeatBooking = false
      this.showMeetingRoom = true
    }
    else {
      this.showMeetingRoom = false
    }
  }

  async showAllBranches(): Promise<void> {
    this.filteredBranches = await this.branchList;
  }

  toggleSeatBooking() {
    if (this.showSeatBooking == false) {
      this.showSeatBooking = true
      this.showMeetingRoom = false
    }
    else {
      this.showSeatBooking = false
    }
  }

  async selectStatus(event: any) {

    if (this.formGroup.value.branchId == "None") {
      await Promise.all([
        this.getAllSeatReport(),
        this.getSeatTypeReport(),
        this.getAllMeetingRoomReport(),
        this.getAllMeetingRoomTypeReport(),
        this.getHeadCountReport(),
        this.getZoneWiseWorkstations(),
        this.getTopZoneWiseBooking(),
        this.getCategoryWiseSeatBooking(),
        this.getZoneWiseMeetingRoomStations(),
        this.getAllTopMeetingBookingLocation(),
        this.getAllZoneWiseMeetingSeatBookingPanIndia(),
        this.getAllCategoryWiseMeetingBookingPanIndia(),
        this.getAllMeetingRoomTypeZoneWisePanIndia(),
        this.getCategoryWiseEmployeeDownloadedAppReport(),
        this.getMeetingRoomQrcodeScaningPanIndia(),
        this.getSeatQrcodeScaningPanIndiaReport(),
        this.getWorkStationTypeZoneWisePanIndiaReport(),
        this.getZoneWiseSeatBooking(),
        this.getCountAllVisitor()
      ]);
    }
    else {
      for (var i = 0; i < this.branchList.length; i++) {
        if (this.branchList[i].branchName == this.formGroup.value.branchId) {
          this.branchId = this.branchList[i].branchId;
        }
      }


      this.value = this.branchId;
      await this.getSeatReportByBranchId(this.value);
      await this.getSeatTypeReportByBranchId(this.value);
      // this.getSeatCategoryReportByBranchId(this.value);

      await this.getAllMeetingRoomReportByBranchId(this.value);
      await this.getAllMeetingRoomTypeReportByBranchId(this.value);
      await this.getCountVisitorByBranchId(this.value)
      // this.getHeadCountReportByBranchId(this.value);

    }

  }


  getAllBranchByEmployeeCode(employeeCode: String) {
    this.service1.getAllBranchByEmployeeCode(employeeCode)
      .subscribe({
        next: (res) => {
          this.branchList = res.filter((item: any) => item.stateName).sort((a: { stateName: string; }, b: { stateName: any; }) => a.stateName.localeCompare(b.stateName));

          localStorage.removeItem('branchList');

          const encriptedData = this.storageEncryptionService.encryptData(this.branchList);
          localStorage.setItem('branchList', encriptedData);
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }


  getAllSeatReport() {
    this.service1.getAllSeatReport()
      .subscribe({
        next: (res: any) => {

          // this.chart.destroy();

          this.seatReportList = res;
          const seatReportListArray: any[] = [];

          this.seatReportList.map((item: any) => {
            seatReportListArray.push(item.vacanteCount, item.occupiedCount, item.usedPercentage);
            this.totalSeatCount = item.totalCount;
            this.totalOccupiedSeatCount = item.occupiedCount;
            this.totalVacanteCount = item.vacanteCount;
            this.usedPercentage = item.usedPercentage.toFixed(2);
          })

          this.chartOptions = {

            series: seatReportListArray,
            chart: {
              width: 440,
              // height:500,

              type: "pie"

            },
            labels: ["Available Count", "Occupied Count", "Used Percentage"],
            responsive: [
              {
                breakpoint: 480,

                options: {
                  chart: {
                    width: 200,
                    height:300
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 250,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res: any) => {
          this.alertify.error("Error While fetching The Records!!")
        }

      })
  }
  // exportToPDF() {
  //   const doc = new jsPDF();
  //   doc.text('Hello, this is a sample PDF!', 10, 10);
  //   doc.save('sample.pdf');
  // }
  getSeatTypeReport() {
    this.service1.getSeatTypeReport()
      .subscribe({
        next: (res) => {

          this.seatReportTypeList = res;
          const seatReportTypeListArray: any[] = []
          this.seatReportTypeList.map((item: any) => {
            seatReportTypeListArray.push(item.cabinCount, item.cubicalCount, item.lTypeCount, item.linearCount, item.hatWorkstationsCount)
            this.cabinCount = item.cabinCount;
            this.cubicalCount = item.cubicalCount;
            this.linearCount = item.linearCount;
            this.lTypeCount = item.lTypeCount;
            this.hatWorkstationsCount = item.hatWorkstationsCount;

          })

          this.chartOptions1 = {
            series: [
              {
                name: "Count",
                data: seatReportTypeListArray
              },
            ],
            chart: {
              width: 500,

              type: "bar"
            },
            labels: ["Cabin Count", "Cubical Count", "lType Count", "Linear Count", "H-Type Count"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 300
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }
  // exportToPDF() {
  //   const doc = new jsPDF();
  // doc.text('Cabin Count: ' + this.cabinCount, 10, 10);
  // doc.text('Cubical Count: ' + this.cubicalCount, 10, 20);
  // doc.text('lType Count: ' + this.lTypeCount, 10, 30);
  // doc.text('Linear Count: ' + this.linearCount, 10, 40);
  // doc.text('H-Type Count: ' + this.hatWorkstationsCount, 10, 50);

  // // Save the PDF with a specific name
  // doc.save('seat_report.pdf');
  // Add content to the PDF
  // doc.text('Meeting Room Type Report', 15, 10);
  // doc.fromHTML(document.getElementById('meetingRoomTypeReport'), 15, 20);
  // doc.text('Employee Category Report', 15, 10);
  // doc.fromHTML(document.getElementById('employeeCategoryReport'), 15, 20);
  // doc.text('Meeting Room Booking Report', 15, 10);
  // doc.fromHTML(document.getElementById('meetingRoomBookingReport'), 15, 20);

  // Save the PDF with a specific name
  //       doc.save('report.pdf');

  // }


  getAllMeetingRoomReport() {
    this.service1.getAllMeetingRoomReport()
      .subscribe({
        next: (res: any) => {

          // this.chart.destroy();
          this.meeetingReportList = res;
          const meetingReportListArray: any[] = [];

          this.meeetingReportList.map((item: any) => {
            meetingReportListArray.push(item.vacanteCount, item.occupiedCount, item.usedPercentage);
            this.totalMeetingRoomCount = item.totalCount;
            this.totalOccupiedMeetingRoomCount = item.occupiedCount;
            this.vacanteCountMeeting = item.vacanteCount;
            this.usedPercentageMetting = item.usedPercentage.toFixed(2);
          })

          this.chartOptions3 = {

            series: meetingReportListArray,
            chart: {
              width: 430,
              type: "pie"
            },
            labels: ["Available Count", "Occupied Count", "Used Percentage"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                    height: 300
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 230,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res: any) => {
          this.alertify.error("Error While fetching The Records!!")
        }

      })
  }

  getAllMeetingRoomTypeReport() {
    this.service1.getAllMeetingRoomTypeReport()
      .subscribe({
        next: (res) => {

          this.meetingRoomReportTypeList = res;
          const meetingRoomReportTypeListArray: any[] = []
          this.meetingRoomReportTypeList.map((item: any) => {
            meetingRoomReportTypeListArray.push(item.meetingRoomCount, item.conferenceRoomCount, item.trainingRoomCount, item.boardRoomCount);
            this.meetingRoomCount = item.meetingRoomCount;
            this.boardRoomCount = item.boardRoomCount;
            this.trainingRoomCount = item.trainingRoomCount;
            this.conferenceRoomCount = item.conferenceRoomCount;
          })

          this.chartOptions4 = {
            series: meetingRoomReportTypeListArray,
            chart: {
              width: 450,
              // height:600,
              type: "pie"
            },
            labels: ["Meeting Room", "Conference Room", "Training Room", "Board Room"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                    height: 300
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 250,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getHeadCountReport() {
    this.service1.getHeadCountReport()
      .subscribe({
        next: (res) => {
          this.categoryWiseSeatBookingList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.categoryWiseSeatBookingList.length; i++) {
            if (this.categoryWiseSeatBookingList[i].categoryName !== 'Total Employees') {
              arrayCount.push(res[i].employeeCount);
              arrayName.push(res[i].categoryName);
            }

            if (this.categoryWiseSeatBookingList[i].categoryName == 'WFH – Once a month in office') {
              this.onceAMonoth = res[i].employeeCount
            }

            if (this.categoryWiseSeatBookingList[i].categoryName == 'WFH – No physical office location') {
              this.onceAMonothWFH = res[i].employeeCount
            }

            if (this.categoryWiseSeatBookingList[i].categoryName == 'WFH – Twice a week in office') {
              this.onceAMonothTwice = res[i].employeeCount
            }

            if (this.categoryWiseSeatBookingList[i].categoryName == 'WFO - All days in office') {
              this.onceAMonothWFO = res[i].employeeCount
            }
            if (this.categoryWiseSeatBookingList[i].categoryName == 'Total Employees') {
              this.onceAMonothTotal = res[i].employeeCount;
            }
          }

          this.chartOptions7 = {
            series: arrayCount,
            chart: {
              width: 520,
              type: "pie"
            },
            labels: arrayName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 220,
                    height: 300
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 250,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!");
        }
      })
  }

  getZoneWiseWorkstations() {
    this.service1.getZoneWiseWorkstations()
      .subscribe({
        next: (res) => {
          this.zoneWiseSeatBookingList = res;
          const zoneName: any[] = [];
          const zoneCount: any[] = [];

          for (let i = 0; i < this.zoneWiseSeatBookingList.length; i++) {
            if (this.zoneWiseSeatBookingList[i].zone !== 'GrandTotal') {
              zoneCount.push(res[i].workStations);
              zoneName.push(res[i].zone);
            }

            if (this.zoneWiseSeatBookingList[i].zone == 'East') {
              this.eastWorkStations = res[i].workStations
            }

            if (this.zoneWiseSeatBookingList[i].zone == 'North') {
              this.northWorkStations = res[i].workStations
            }


            if (this.zoneWiseSeatBookingList[i].zone == 'South') {
              this.southWorkStations = res[i].workStations
            }


            if (this.zoneWiseSeatBookingList[i].zone == 'West') {
              this.westWorkStations = res[i].workStations
            }

            if (this.zoneWiseSeatBookingList[i].zone == 'GrandTotal') {
              this.totalWorkStations = res[i].workStations
            }

          }

          this.chartOptions8 = {
            series: zoneCount,
            chart: {
              width: 380,
              // height:600,
              type: "donut"
            },
            labels: zoneName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                    height: 300
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 250,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getZoneWiseSeatBooking() {
    this.service1.getZoneWiseSeatBooking()
      .subscribe({
        next: (res) => {

          this.zoneWiseTotalSeatBookingList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.zoneWiseTotalSeatBookingList.length; i++) {
            if (this.zoneWiseTotalSeatBookingList[i].zone !== 'GrandTotal') {
              arrayCount.push(res[i].seatbookingCount);
              arrayName.push(res[i].zone);
            }

            if (this.zoneWiseTotalSeatBookingList[i].zone == 'East') {
              this.eastZoneTotal = res[i].seatbookingCount
            }

            if (this.zoneWiseTotalSeatBookingList[i].zone == 'North') {
              this.northZoneTotal = res[i].seatbookingCount
            }


            if (this.zoneWiseTotalSeatBookingList[i].zone == 'South') {
              this.southZoneTotal = res[i].seatbookingCount
            }


            if (this.zoneWiseTotalSeatBookingList[i].zone == 'West') {
              this.westZoneTotal = res[i].seatbookingCount
            }


            if (this.zoneWiseTotalSeatBookingList[i].zone == 'GrandTotal') {
              this.grandTotal = res[i].seatbookingCount
            }

          }


          this.chartOptions9 = {
            series: arrayCount,
            chart: {
              width: 400,
              // height:600,
              type: "pie"
            },
            labels: arrayName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                    height: 300
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 250,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getTopZoneWiseBooking() {
    this.service1.getTopZoneWiseBooking()
      .subscribe({
        next: (res) => {

          this.topSeatBookingList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.topSeatBookingList.length; i++) {
            arrayCount.push(res[i].grandTotal);
            arrayName.push(res[i].branchName);

            if (this.topSeatBookingList[i].branchName == 'Mumbai - Andheri LBP') {
              this.andheriTotal = res[i].grandTotal
            }

            if (this.topSeatBookingList[i].branchName == 'Kolkata') {
              this.kolTotal = res[i].grandTotal
            }

            if (this.topSeatBookingList[i].branchName == 'Mumbai - Thane') {
              this.tnaTotal = res[i].grandTotal
            }

            if (this.topSeatBookingList[i].branchName == 'Hyderabad - Banjara hills') {
              this.hydTotal = res[i].grandTotal
            }

            if (this.topSeatBookingList[i].branchName == 'New Delhi - Noida 2') {
              this.delTotal = res[i].grandTotal
            }

            if (this.topSeatBookingList[i].branchName == 'Mumbai - Bhandup') {
              this.bhanTotal = res[i].grandTotal
            }

            if (this.topSeatBookingList[i].branchName == 'Bangalore - MG Road') {
              this.mgroadTotal = res[i].grandTotal
            }

            if (this.topSeatBookingList[i].branchName == 'Chandigarh') {
              this.chandigarhTotal = res[i].grandTotal
            }


            if (this.topSeatBookingList[i].branchName == 'New Delhi - Nehru Place') {
              this.neharupalaceTotal = res[i].grandTotal
            }

            if (this.topSeatBookingList[i].branchName == 'Mumbai - Borivali') {
              this.boravaliTotal = res[i].grandTotal
            }
          }

          this.chartOptions10 = {
            series: [
              {
                name: "Count",
                data: arrayCount
              },
            ],
            chart: {
              width: 500,

              type: "bar"
            },
            labels: arrayName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getCategoryWiseSeatBooking() {
    this.service1.getCategoryWiseSeatBooking()
      .subscribe({
        next: (res) => {

          this.categoryWiseBookingList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.categoryWiseBookingList.length; i++) {
            if (this.categoryWiseBookingList[i].employeeCategory !== 'TotalBooking') {
              arrayCount.push(res[i].bookingCount);
              arrayName.push(res[i].employeeCategory);
            }

            if (this.categoryWiseBookingList[i].employeeCategory == 'WFO - All days in office') {
              this.allDayBooking = res[i].bookingCount
            }
            if (this.categoryWiseBookingList[i].employeeCategory == 'WFH – Once a month in office') {
              this.onceMonthBooking = res[i].bookingCount
            }

            if (this.categoryWiseBookingList[i].employeeCategory == 'WFH – No physical office location') {
              this.wfhBooking = res[i].bookingCount
            }

            if (this.categoryWiseBookingList[i].employeeCategory == 'WFH – Twice a week in office') {
              this.twiceBooking = res[i].bookingCount
            }

            if (this.categoryWiseBookingList[i].employeeCategory == 'TotalBooking') {
              this.totalBooking = res[i].bookingCount
            }
          }

          this.chartOptions11 = {
            series: [
              {
                name: "Count",
                data: arrayCount
              },
            ],
            chart: {
              width: 550,

              type: "bar"
            },
            labels: arrayName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getSeatReportByBranchId(branchId: Number) {
    this.service1.getSeatReportbyBranchId(branchId)
      .subscribe({
        next: (res) => {
          this.seatReportList = res;
          const seatReportListArray: any[] = [];

          this.seatReportList.map((item: any) => {
            seatReportListArray.push(item.vacanteCount, item.occupiedCount, item.usedPercentage);
            this.totalSeatCount = item.totalCount;
            this.totalOccupiedSeatCount = item.occupiedCount;
            this.totalVacanteCount = item.vacanteCount;
            this.usedPercentage = item.usedPercentage.toFixed(2);
          })

          this.chartOptions = {

            series: seatReportListArray,
            chart: {
              width: 430,
              // height:500,

              type: "pie"

            },
            labels: ["Available Count", "Occupied Count", "Used Percentage"],
            responsive: [
              {
                breakpoint: 480,

                options: {
                  chart: {
                    width: 250,
                    height:300
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 250,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res: any) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getSeatTypeReportByBranchId(branchId: Number) {
    this.service1.getSeatTypeReportByBranchId(branchId)
      .subscribe({
        next: (res) => {

          this.seatReportTypeList = res;
          const seatReportTypeListArray: any[] = []
          this.seatReportTypeList.map((item: any) => {
            seatReportTypeListArray.push(item.cabinCount, item.cubicalCount, item.lTypeCount, item.linearCount, item.hatWorkstationsCount)
            this.cabinCount = item.cabinCount;
            this.cubicalCount = item.cubicalCount;
            this.linearCount = item.linearCount;
            this.lTypeCount = item.lTypeCount;
            this.hatWorkstationsCount = item.hatWorkstationsCount;

          })

          this.chartOptions1 = {
            series: [
              {
                name: "Count",
                data: seatReportTypeListArray
              },
            ],
            chart: {
              width: 520,

              type: "bar"
            },
            labels: ["Cabin Count", "Cubical Count", "lType Count", "Linear Count", "H-Type Count"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllMeetingRoomReportByBranchId(branchId: Number) {
    this.service1.getAllMeetingRoomReportByBranchId(branchId)
      .subscribe({
        next: (res: any) => {

          // this.chart.destroy();
          this.meeetingReportList = res;
          const meetingReportListArray: any[] = [];

          this.meeetingReportList.map((item: any) => {
            meetingReportListArray.push(item.vacanteCount, item.occupiedCount, item.usedPercentage);
            this.totalMeetingRoomCount = item.totalCount;
            this.totalOccupiedMeetingRoomCount = item.occupiedCount;
            this.vacanteCountMeeting = item.vacanteCount;
            this.usedPercentageMetting = item.usedPercentage.toFixed(2);
          })

          this.chartOptions3 = {

            series: meetingReportListArray,
            chart: {
              width: 430,
              type: "pie"
            },
            labels: ["Available Count", "Occupied Count", "Used Percentage"],
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
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 230,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res: any) => {
          this.alertify.error("Error While fetching The Records!!")
        }

      })
  }

  getAllMeetingRoomTypeReportByBranchId(branchId: Number) {
    this.service1.getAllMeetingRoomTypeReportByBranchId(branchId)
      .subscribe({
        next: (res) => {

          this.meetingRoomReportTypeList = res;
          const meetingRoomReportTypeListArray: any[] = []
          this.meetingRoomReportTypeList.map((item: any) => {
            meetingRoomReportTypeListArray.push(item.meetingRoomCount, item.conferenceRoomCount, item.trainingRoomCount, item.boardRoomCount);
            this.meetingRoomCount = item.meetingRoomCount;
            this.boardRoomCount = item.boardRoomCount;
            this.conferenceRoomCount = item.conferenceRoomCount;
            this.trainingRoomCount = item.trainingRoomCount;
          })

          this.chartOptions4 = {
            series: meetingRoomReportTypeListArray,
            chart: {
              width: 430,
              // height:600,
              type: "pie"
            },
            labels: ["Meeting Room", "Conference Room", "Training Room", "Board Room"],
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
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 250,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getZoneWiseMeetingRoomStations() {
    this.service1.getZoneWiseMeetingRoomStations()
      .subscribe({
        next: (res) => {

          this.zoneWiseTotalRoomBookingList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.zoneWiseTotalRoomBookingList.length; i++) {
            if (this.zoneWiseTotalRoomBookingList[i].zone !== 'GrandTotal') {
              arrayCount.push(res[i].meetingRoomCount);
              arrayName.push(res[i].zone);
            }

            if (this.zoneWiseTotalRoomBookingList[i].zone == 'East') {
              this.eastZoneTotalRoom = res[i].meetingRoomCount
            }

            if (this.zoneWiseTotalRoomBookingList[i].zone == 'North') {
              this.northZoneTotalRoom = res[i].meetingRoomCount
            }

            if (this.zoneWiseTotalRoomBookingList[i].zone == 'South') {
              this.southZoneTotalRoom = res[i].meetingRoomCount
            }


            if (this.zoneWiseTotalRoomBookingList[i].zone == 'West') {
              this.westZoneTotalRoom = res[i].meetingRoomCount
            }

            if (this.zoneWiseTotalRoomBookingList[i].zone == 'GrandTotal') {
              this.grandTotalRoom = res[i].meetingRoomCount
            }

          }

          this.chartOptions12 = {
            series: arrayCount,
            chart: {
              width: 400,
              // height:600,
              type: "pie"
            },
            labels: arrayName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 250,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllTopMeetingBookingLocation() {
    this.service1.getAllTopMeetingBookingLocation()
      .subscribe({
        next: (res) => {

          this.topMeetingRoomList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.topMeetingRoomList.length; i++) {
            arrayCount.push(res[i].grandTotal);
            arrayName.push(res[i].branchName);

            if (this.topMeetingRoomList[i].branchName == 'Mumbai - Bhandup') {
              this.bhandupTotal = res[i].grandTotal
            }

            if (this.topMeetingRoomList[i].branchName == 'New Delhi - Nehru Place') {
              this.delNeharuTotal = res[i].grandTotal
            }

            if (this.topMeetingRoomList[i].branchName == 'Mumbai - Andheri LBP') {
              this.andheriMumTotal = res[i].grandTotal
            }

            if (this.topMeetingRoomList[i].branchName == 'Bangalore - MG Road') {
              this.bangMGTotal = res[i].grandTotal
            }

            if (this.topMeetingRoomList[i].branchName == 'Mumbai - Churchgate') {
              this.churchgateTotal = res[i].grandTotal
            }

            if (this.topMeetingRoomList[i].branchName == 'Hyderabad - Banjara hills') {
              this.hydrabadTotal = res[i].grandTotal
            }

            if (this.topMeetingRoomList[i].branchName == 'Kolkata') {
              this.kolkataTotal = res[i].grandTotal
            }

            if (this.topMeetingRoomList[i].branchName == 'New Delhi - Noida 2') {
              this.delhiTotal = res[i].grandTotal
            }


            if (this.topMeetingRoomList[i].branchName == 'Chandigarh') {
              this.chandigarTotal = res[i].grandTotal
            }

            if (this.topMeetingRoomList[i].branchName == 'Ahmedabad') {
              this.ahmedabadTotal = res[i].grandTotal
            }
          }

          this.chartOptions13 = {
            series: [
              {
                name: "Count",
                data: arrayCount
              },
            ],
            chart: {
              width: 500,

              type: "bar"
            },
            labels: arrayName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllZoneWiseMeetingSeatBookingPanIndia() {
    this.service1.getAllZoneWiseMeetingSeatBookingPanIndia()
      .subscribe({
        next: (res) => {

          this.zoneWiseTotalRoomBookingPanIndiaList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.zoneWiseTotalRoomBookingPanIndiaList.length; i++) {
            if (this.zoneWiseTotalRoomBookingPanIndiaList[i].zone !== 'GrandTotal') {
              arrayCount.push(res[i].meetingbookingCount);
              arrayName.push(res[i].zone);
            }

            if (this.zoneWiseTotalRoomBookingPanIndiaList[i].zone == 'East') {
              this.eastPanZoneTotal = res[i].meetingbookingCount
            }

            if (this.zoneWiseTotalRoomBookingPanIndiaList[i].zone == 'North') {
              this.northPanZoneTotal = res[i].meetingbookingCount
            }

            if (this.zoneWiseTotalRoomBookingPanIndiaList[i].zone == 'South') {
              this.southPanZoneTotal = res[i].meetingbookingCount
            }


            if (this.zoneWiseTotalRoomBookingPanIndiaList[i].zone == 'West') {
              this.westPanZoneTotal = res[i].meetingbookingCount
            }

            if (this.zoneWiseTotalRoomBookingPanIndiaList[i].zone == 'GrandTotal') {
              this.grandPanTotal = res[i].meetingbookingCount
            }

          }

          this.chartOptions14 = {
            series: arrayCount,
            chart: {
              width: 400,
              // height:600,
              type: "pie"
            },
            labels: arrayName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 230,
                    height: 350
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllCategoryWiseMeetingBookingPanIndia() {
    this.service1.getAllCategoryWiseMeetingBookingPanIndia()
      .subscribe({
        next: (res) => {

          this.categoryWisePanBookingList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.categoryWisePanBookingList.length; i++) {
            if (this.categoryWisePanBookingList[i].employeeCategory !== 'TotalBooking') {
              arrayCount.push(res[i].bookingCount);
              arrayName.push(res[i].employeeCategory);
            }

            if (this.categoryWisePanBookingList[i].employeeCategory == 'WFH – Once a month in office') {
              this.onceInWeek = res[i].bookingCount
            }
            if (this.categoryWisePanBookingList[i].employeeCategory == 'WFH – Twice a week in office') {
              this.twiceInWeek = res[i].bookingCount
            }
            if (this.categoryWisePanBookingList[i].employeeCategory == 'WFO - All days in office') {
              this.allDayOffice = res[i].bookingCount
            }

            if (this.categoryWisePanBookingList[i].employeeCategory == 'TotalBooking') {
              this.catTotalBooking = res[i].bookingCount
            }
          }

          this.chartOptions15 = {
            series: [
              {
                name: "Count",
                data: arrayCount
              },
            ],
            chart: {
              width: 530,

              type: "bar",
            },
            labels: arrayName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllMeetingRoomTypeZoneWisePanIndia() {
    this.service1.getAllMeetingRoomTypeZoneWisePanIndia()
      .subscribe({
        next: (res) => {

          this.zoneWiseTotalRoomBookingList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.zoneWiseTotalRoomBookingList.length; i++) {
            if (this.zoneWiseTotalRoomBookingList[i].seatType !== 'grandTotal') {
              arrayCount.push(res[i].grandTotal);
              arrayName.push(res[i].seatType);
            }

            if (this.zoneWiseTotalRoomBookingList[i].seatType == 'Discussion Room') {
              this.eastZoneWiseType = res[i].east
              this.northZoneWiseType = res[i].north
              this.southZoneWiseType = res[i].south
              this.westZoneWiseType = res[i].west
              this.discussionRoom = res[i].grandTotal
            }

            if (this.zoneWiseTotalRoomBookingList[i].seatType == 'Reception Cabin For Customer') {
              this.eastCabinZoneWiseType = res[i].east
              this.northCabinZoneWiseType = res[i].north
              this.southCabinZoneWiseType = res[i].south
              this.westCabinZoneWiseType = res[i].west
              this.receptionCabin = res[i].grandTotal
            }

            if (this.zoneWiseTotalRoomBookingList[i].seatType == 'Conference Room') {
              this.eastConferenceZoneWiseType = res[i].east
              this.northConferenceZoneWiseType = res[i].north
              this.southConferenceZoneWiseType = res[i].south
              this.westConferenceZoneWiseType = res[i].west
              this.conferenceRoom = res[i].grandTotal
            }


            if (this.zoneWiseTotalRoomBookingList[i].seatType == 'Board Room') {
              this.eastBoardZoneWiseType = res[i].east
              this.northBoardZoneWiseType = res[i].north
              this.southBoardZoneWiseType = res[i].south
              this.westBoardZoneWiseType = res[i].west
              this.boardRoom = res[i].grandTotal
            }

            if (this.zoneWiseTotalRoomBookingList[i].seatType == 'Training Room') {
              this.eastTrainingZoneWiseType = res[i].east
              this.northTrainingZoneWiseType = res[i].north
              this.southTrainingZoneWiseType = res[i].south
              this.westTrainingZoneWiseType = res[i].west
              this.trainingRoom = res[i].grandTotal
            }

            if (this.zoneWiseTotalRoomBookingList[i].seatType == 'Meeting Room') {
              this.eastMeetingZoneWiseType = res[i].east
              this.northMeetingZoneWiseType = res[i].north
              this.southMeetingZoneWiseType = res[i].south
              this.westMeetingZoneWiseType = res[i].west
              this.meetingRoom = res[i].grandTotal
            }

            if (this.zoneWiseTotalRoomBookingList[i].seatType == 'grandTotal') {
              this.eastTotalZoneWiseType = res[i].east
              this.northTotalZoneWiseType = res[i].north
              this.southTotalZoneWiseType = res[i].south
              this.westTotalZoneWiseType = res[i].west
              this.totalRoom = res[i].grandTotal
            }

          }

          this.chartOptions16 = {
            series: [
              {
                name: "Count",
                data: arrayCount
              },
            ],
            chart: {
              width: 500,
              // height:600,
              type: "bar"
            },
            labels: arrayName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };


        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getCategoryWiseEmployeeDownloadedAppReport() {
    this.service1.getCategoryWiseEmployeeDownloadedAppReport()
      .subscribe({
        next: (res) => {

          this.categoryWiseAppDownlodedList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.categoryWiseAppDownlodedList.length; i++) {
            if (this.categoryWiseAppDownlodedList[i].employeeCategory !== 'grandTotal') {
              arrayCount.push(res[i].downloadCount);
              arrayName.push(res[i].employeeCategory);
            }

            if (this.categoryWiseAppDownlodedList[i].employeeCategory == 'WFO - All days in office') {
              this.wfoAppDownload = res[i].downloadCount
            }

            if (this.categoryWiseAppDownlodedList[i].employeeCategory == 'WFH – No physical office location') {
              this.allWfhOfficeAppDownload = res[i].downloadCount
            }

            if (this.categoryWiseAppDownlodedList[i].employeeCategory == 'WFH – Once a month in office') {
              this.onceMonthAppDownload = res[i].downloadCount
            }

            if (this.categoryWiseAppDownlodedList[i].employeeCategory == 'WFH – Twice a week in office') {
              this.twiceAppDownload = res[i].downloadCount
            }

            if (this.categoryWiseAppDownlodedList[i].employeeCategory == 'grandTotal') {
              this.totalAppDownload = res[i].downloadCount
            }
          }

          this.chartOptions17 = {
            series: [
              {
                name: "Count",
                data: arrayCount
              },
            ],
            chart: {
              width: 530,

              type: "bar"
            },
            labels: arrayName,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getMeetingRoomQrcodeScaningPanIndia() {
    this.service1.getMeetingRoomQrcodeScaningPanIndia()
      .subscribe({
        next: (res) => {

          this.categoryWiseAppDownlodedList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];
          const arrayCount1: any[] = [];
          const arrayCount2: any[] = [];
          const arrayCount3: any[] = [];

          for (let i = 0; i < this.categoryWiseAppDownlodedList.length; i++) {
            arrayCount.push(res[i].totalBooking);
            arrayCount1.push(res[i].occupiedCount);
            arrayCount2.push(res[i].canceledCount);
            arrayCount3.push(res[i].pendingCount);
            arrayName.push(res[i].zone);

            if (this.categoryWiseAppDownlodedList[i].zone == 'East') {
              this.totalBookingQr = res[i].totalBooking
              this.occupiedCountQr = res[i].occupiedCount
              this.canceledCountQr = res[i].canceledCount
              this.pendingMeetingCountQr = res[i].pendingCount
            }

            if (this.categoryWiseAppDownlodedList[i].zone == 'North') {
              this.totalBookingQrNorth = res[i].totalBooking
              this.occupiedCountQrNorth = res[i].occupiedCount
              this.canceledCountQrNorth = res[i].canceledCount
              this.northPendingMeetingCountQr = res[i].pendingCount
            }

            if (this.categoryWiseAppDownlodedList[i].zone == 'South') {
              this.totalBookingQrSouth = res[i].totalBooking
              this.occupiedCountQrSouth = res[i].occupiedCount
              this.canceledCountQrSouth = res[i].canceledCount
              this.southPendingMeetingCountQr = res[i].pendingCount
            }

            if (this.categoryWiseAppDownlodedList[i].zone == 'West') {
              this.totalBookingQrWest = res[i].totalBooking
              this.occupiedCountQrWest = res[i].occupiedCount
              this.canceledCountQrWest = res[i].canceledCount
              this.westPendingMeetingCountQr = res[i].pendingCount
            }

            if (this.categoryWiseAppDownlodedList[i].zone == 'GrandTotal') {
              this.totalQr = res[i].totalBooking
              this.totalQrCanceled = res[i].canceledCount
              this.totalQrOccupied = res[i].occupiedCount
              this.totalPendingMeetingCountQr = res[i].pendingCount
            }
          }
          this.chartOptions5 = {
            series: [
              {
                name: "Total Booking",
                data: arrayCount
              },
              {
                name: "Canceled",
                data: arrayCount2
              },
              {
                name: "Occupied",
                data: arrayCount1
              },
              {
                name: "Pending",
                data: arrayCount3
              }
            ],
            chart: {
              type: "bar",
              width: 530,
              // height: 400
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "85%",
                endingShape: "rounded"
              }
            },
            dataLabels: {
              enabled: true
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"]
            },
            xaxis: {
              categories: [
                "East",
                "North",
                "South",
                "West",
                "Total",
              ]
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  },
                  bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded"
                  }

                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  },
                  bar: {
                    horizontal: false,
                    columnWidth: "25%",
                    endingShape: "rounded"
                  }
                }
              }
            ],
            yaxis: {
              title: {
                text: "$ (thousands)"
              }
            },
            fill: {
              opacity: 1
            },
          };
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }
  getSeatQrcodeScaningPanIndiaReport() {
    this.service1.getSeatQrcodeScaningPanIndiaReport()
      .subscribe({
        next: (res) => {

          this.categorySeatQrWiseAppDownlodedList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];
          const arrayCount1: any[] = [];
          const arrayCount2: any[] = [];
          const arrayCount3: any[] = [];

          for (let i = 0; i < this.categorySeatQrWiseAppDownlodedList.length; i++) {
            arrayCount.push(res[i].totalBooking);
            arrayCount1.push(res[i].occupiedCount);
            arrayCount2.push(res[i].canceledCount);
            arrayCount3.push(res[i].pendingCount);
            arrayName.push(res[i].zone);

            if (this.categorySeatQrWiseAppDownlodedList[i].zone == 'East') {
              this.totalSeatBookingQr = res[i].totalBooking
              this.occupiedSeatCountQr = res[i].occupiedCount
              this.canceledSeatCountQr = res[i].canceledCount
              this.pendingSeatCountQr = res[i].pendingCount
            }

            if (this.categorySeatQrWiseAppDownlodedList[i].zone == 'North') {
              this.totalSeatBookingQrNorth = res[i].totalBooking
              this.occupiedSeatCountQrNorth = res[i].occupiedCount
              this.canceledSeatCountQrNorth = res[i].canceledCount
              this.northpendingSeatCountQr = res[i].pendingCount
            }

            if (this.categorySeatQrWiseAppDownlodedList[i].zone == 'South') {
              this.totalSeatBookingQrSouth = res[i].totalBooking
              this.occupiedSeatCountQrSouth = res[i].occupiedCount
              this.canceledSeatCountQrSouth = res[i].canceledCount
              this.southpendingSeatCountQr = res[i].pendingCount
            }

            if (this.categorySeatQrWiseAppDownlodedList[i].zone == 'West') {
              this.totalSeatBookingQrWest = res[i].totalBooking
              this.occupiedSeatCountQrWest = res[i].occupiedCount
              this.canceledSeatCountQrWest = res[i].canceledCount
              this.westpendingSeatCountQr = res[i].pendingCount
            }

            if (this.categorySeatQrWiseAppDownlodedList[i].zone == 'GrandTotal') {
              this.totalSeatQr = res[i].totalBooking
              this.totalSeatQrCanceled = res[i].canceledCount
              this.totalSeatQrOccupied = res[i].occupiedCount
              this.totalSeatQrPending = res[i].pendingCount
            }
          }
          this.chartOptions18 = {
            series: [
              {
                name: "Total Booking",
                data: arrayCount
              },
              {
                name: "Canceled",
                data: arrayCount2
              },
              {
                name: "Occupied",
                data: arrayCount1
              },

              {
                name: "Pending",
                data: arrayCount3
              },

            ],
            chart: {
              type: "bar",
              width: 530,
              // height: 400
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "80%",
                endingShape: "rounded"
              }
            },
            dataLabels: {
              enabled: true
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"]
            },
            xaxis: {
              categories: [
                "East",
                "North",
                "South",
                "West",
                "Total",
              ]
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  },
                  bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded"
                  }

                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  },
                  bar: {
                    horizontal: false,
                    columnWidth: "25%",
                    endingShape: "rounded"
                  }
                }
              }
            ],
            yaxis: {
              title: {
                text: "$ (thousands)"
              }
            },
            fill: {
              opacity: 1
            },
          };
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getWorkStationTypeZoneWisePanIndiaReport() {
    this.service1.getWorkStationTypeZoneWisePanIndiaReport()
      .subscribe({
        next: (res) => {

          this.workStationTypeZoneWisePanIndiaList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.workStationTypeZoneWisePanIndiaList.length; i++) {
            if (this.workStationTypeZoneWisePanIndiaList[i].seatType !== 'grandTotal') {
              arrayCount.push(res[i].grandTotal);
              arrayName.push(res[i].seatType);
            }

            if (this.workStationTypeZoneWisePanIndiaList[i].seatType == 'Senior Workstations') {
              this.eastWorkStationType = res[i].east
              this.northWorkStationType = res[i].north
              this.southWorkStationType = res[i].south
              this.westWorkStationType = res[i].west
              this.totalWorkStationType = res[i].grandTotal
            }

            if (this.workStationTypeZoneWisePanIndiaList[i].seatType == 'Cabin') {
              this.eastCabinWorkStationType = res[i].east
              this.northCabinWorkStationType = res[i].north
              this.southCabinWorkStationType = res[i].south
              this.westCabinWorkStationType = res[i].west
              this.totalCabinWorkStationType = res[i].grandTotal
            }

            if (this.workStationTypeZoneWisePanIndiaList[i].seatType == 'Hat Workstations') {
              this.eastHatWorkStationType = res[i].east
              this.northHatWorkStationType = res[i].north
              this.southHatWorkStationType = res[i].south
              this.westHatWorkStationType = res[i].west
              this.totalHatWorkStationType = res[i].grandTotal
            }

            if (this.workStationTypeZoneWisePanIndiaList[i].seatType == 'Cubicle') {
              this.eastCubicleWorkStationType = res[i].east
              this.northCubicleWorkStationType = res[i].north
              this.southCubicleWorkStationType = res[i].south
              this.westCubicleWorkStationType = res[i].west
              this.totalCubicleWorkStationType = res[i].grandTotal
            }

            if (this.workStationTypeZoneWisePanIndiaList[i].seatType == 'L Shape') {
              this.eastLtypeWorkStationType = res[i].east
              this.northLtypeWorkStationType = res[i].north
              this.southLtypeWorkStationType = res[i].south
              this.westLtypeWorkStationType = res[i].west
              this.totalLtypeWorkStationType = res[i].grandTotal
            }
            if (this.workStationTypeZoneWisePanIndiaList[i].seatType == 'Linear') {
              this.eastLinearWorkStationType = res[i].east
              this.northLinearWorkStationType = res[i].north
              this.southLinearWorkStationType = res[i].south
              this.westLinearWorkStationType = res[i].west
              this.totalLinearWorkStationType = res[i].grandTotal
            }
            if (this.workStationTypeZoneWisePanIndiaList[i].seatType == 'grandTotal') {
              this.eastTotalWorkStationType = res[i].east
              this.northTotalWorkStationType = res[i].north
              this.southTotalWorkStationType = res[i].south
              this.westTotalWorkStationType = res[i].west
              this.totalTotalWorkStationType = res[i].grandTotal
            }
          }
          this.chartOptions19 = {
            series: [
              {
                name: "Count",
                data: arrayCount
              },
            ],
            chart: {
              width: 530,
              type: "bar"
            },
            xaxis: {
              categories: [
                "Senior Workstations",
                "Cabin",
                "Hat Workstations",
                "Cubicle",
                "L Shape",
                "Linear",
              ]
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 250
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              },
              {
                breakpoint: 820,
                options: {
                  chart: {
                    width: 300,
                    height: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getCountAllVisitor() {
    this.service1.getCountAllVisitor()
      .subscribe({
        next: (res) => {
          this.visitorBookingList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.visitorBookingList.length; i++) {
            if (this.visitorBookingList[i].visitorType !== 'allVisitor') {
              arrayCount.push(res[i].total);
              arrayName.push(res[i].visitorType);

            }
            if (this.visitorBookingList[i].visitorType == 'todayInvitedVisitor') {
              this.todayInvitedVisitor = res[i].total
            }
            if (this.visitorBookingList[i].visitorType == 'todayNonInvitedVisitor') {
              this.todayNonInvitedVisitor = res[i].total
            }
            if (this.visitorBookingList[i].visitorType == 'allInvitedVisitor') {
              this.allInvitedVisitor = res[i].total
            }
            if (this.visitorBookingList[i].visitorType == 'allNonInvitedVisitor') {
              this.allNonInvitedVisitor = res[i].total
            }
            if (this.visitorBookingList[i].visitorType == 'allVisitor') {
              this.allVisitor = res[i].total
            }

          }
          this.chartOptions2 = {
            series: arrayCount,
            chart: {
              width: 500,
              type: "pie"
            },
            labels: ["Todays Invited Visitors", "Todays Non-Invited Visitors", " All Invited Visitors", "All Non Invited Visitors",],
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
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getCountVisitorByBranchId(branchId: Number) {
    this.service1.getCountVisitorByBranchId(branchId)
      .subscribe({
        next: (res) => {

          this.visitorBookingList = res;
          const arrayName: any[] = [];
          const arrayCount: any[] = [];

          for (let i = 0; i < this.visitorBookingList.length; i++) {
            if (this.visitorBookingList[i].visitorType !== 'allVisitor') {
              arrayCount.push(res[i].total);
              arrayName.push(res[i].visitorType);

            }
            if (this.visitorBookingList[i].visitorType == 'todayInvitedVisitor') {
              this.todayInvitedVisitor = res[i].total
            }
            if (this.visitorBookingList[i].visitorType == 'todayNonInvitedVisitor') {
              this.todayNonInvitedVisitor = res[i].total
            }
            if (this.visitorBookingList[i].visitorType == 'allInvitedVisitor') {
              this.allInvitedVisitor = res[i].total
            }
            if (this.visitorBookingList[i].visitorType == 'allNonInvitedVisitor') {
              this.allNonInvitedVisitor = res[i].total
            }
            if (this.visitorBookingList[i].visitorType == 'allVisitor') {
              this.allVisitor = res[i].total
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
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })

  }
}