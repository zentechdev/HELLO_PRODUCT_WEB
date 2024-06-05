import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  get<T>(arg0: string) {
    throw new Error('Method not implemented.');
  }
  fetchemployeeheadcountaspercategory: any;


  constructor(private http:HttpClient) { }

  getAllBranchByEmployeeCode(employeeCode:String) {
    return this.http.get<any>(`${baseUrl}/api/Branch/getAllBranchByEmployeeCode/`+employeeCode);
  }

  getAllSeatReport() {
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllSeatReport`);
  }

  getSeatReportbyBranchId(branchId:Number) {
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllSeatReportByBranchId/`+branchId);
  }

  getSeatTypeReport() {
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllSeatTypeReport`);
  }

  getSeatTypeReportByBranchId(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllSeatTypeReportByBranchId/`+branchId)
  }

  getSeatCategoryReport(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllSeatCategoryReport`)
  }

  getSeatCategoryReportByBranchId(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllSeatCategoryReportByBranchId/`+branchId)
  }

  getHeadCountReport(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getEemployeeHeadCountAsPerCategory`)
  }

  getHeadCountReportByBranchId(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getEemployeeHeadCountAsPerCategory/` +branchId)
  }

  getZoneWiseWorkstations(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getZoneWiseWorkStation`)
  }

  getZoneWiseSeatBooking(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getZoneWiseTotalSeatBooking`)
  }

  getTopZoneWiseBooking(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getTopSeatBookingLocation`)
  }

  getCategoryWiseSeatBooking(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getCategoryWiseSeatBookingPanIndia`)
  }

  getZoneWiseMeetingRoomStations(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllZoneWiseMeetingRoomStation`)
  }

  getAllMeetingRoomTypeZoneWisePanIndia(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllMeetingRoomTypeZoneWisePanIndia`)
  }

  getAllTopMeetingBookingLocation(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllTopMeetingBookingLocation`)
  }

  getAllZoneWiseMeetingSeatBookingPanIndia(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllZoneWiseMeetingSeatBookingPanIndia`)
  }

  getAllCategoryWiseMeetingBookingPanIndia(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllCategoryWiseMeetingBookingPanIndia`)
  }

  getCategoryWiseEmployeeDownloadedAppReport(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getCategoryWiseEmployeeDownloadedAppReport`)
  }

  getSeatQrcodeScaningPanIndiaReport(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getSeatQrcodeScaningPanIndiaReport`)
  }

  getWorkStationTypeZoneWisePanIndiaReport(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getWorkStationTypeZoneWisePanIndiaReport`)
  }

  // MEETING ROOM

  getAllMeetingRoomReport() {
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllMeetingRoomReport`);
  }

  getAllMeetingRoomReportByBranchId(branchId:Number) {
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllMeetingRoomReportByBranchId/`+branchId);
  }

  getAllMeetingRoomTypeReport() {
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllMeetingRoomTypeReport`);
  }

  getAllMeetingRoomTypeReportByBranchId(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllMeetingRoomTypeReportByBranchId/`+branchId)
  }

  getAllMeetingRoomCategoryReport(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllMeetingRoomCategoryReport`)
  }

  getAllMeetingRoomCategoryReportByBranchId(branchId:Number){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getAllMeetingRoomCategoryReportByBranchId/`+branchId)
  }

  getMeetingRoomQrcodeScaningPanIndia(){
    return this.http.get<any>(`${baseUrl}/api/DashBoardReport/getMeetingRoomQrcodeScaningPanIndia`)
  }

  getCountAllVisitor(){
    return this.http.get<any>(`${baseUrl}/api/Visitors/getAllVisitorsCount`)
  }

  getAllVisitorsCountBySiteId(id:Number){
    return this.http.get<any>(`${baseUrl}/api/Visitors/getAllVisitorsCountBySiteId/`+id)
  }

  getAllVisitorsCountByUnitId(id:Number){
    return this.http.get<any>(`${baseUrl}/api/Visitors/getAllVisitorsCountByUnitId/`+id)
  }

  getAllVisitorsCountByClintId(id:Number){
    return this.http.get<any>(`${baseUrl}/api/Visitors/getAllVisitorsCountByClintId/`+id)
  }


  getAllOccupiedParking(){
    return this.http.get(`${baseUrl}/api/OccupiedParking/getAllOccupiedParking`);
  }

  getAllParkingBySiteID(Id: any){
    return this.http.get(`${baseUrl}/api/parkingDetails/getParkingBySiteId/` +Id);
  }
}
