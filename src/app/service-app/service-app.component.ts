import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../_providers/api-service/api.service';
import {ExcelService} from '../excel.service';
import { TreeviewItem, TreeviewConfig, TreeItem } from 'ngx-treeview';

@Component({
  selector: 'app-service-app',
  templateUrl: './service-app.component.html',
  styleUrls: ['./service-app.component.scss']
})
export class ServiceAppComponent implements OnInit {
  public AllHeaderkeys:any[];
  public All_LOC_Header:any[];
  public Required_HeaderKey:any[];
  public Appointment_Excel:any[];
  Service_App_Grid: any[];
  Marketdays : any = '7';
  valueFromChild: string;
  CoraCodes: any ;
  HeaderStatic: any[];
  keys: any[];
  datatime: any[];
  StoreName = "";
  public DetailedAppointmentData:any=[];
  DetailedAppointmentkeys: any = [];
  constructor(private excelService:ExcelService, private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router) { }
  ngOnInit() {
    this.ServiceAppointments();
  }
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.Appointment_Excel, 'ServiceAppointments');
 }
 ServiceAppointments(){
  const obj= {
    "INPUT_DATE":null
    }
      this.spinnerService.show();
      this.authService.AXELPostmethod('AXELData/GetServiceAppointments7DayReport',obj).subscribe(x =>{
        if (x.status == 200){
          this.Appointment_Excel = x.response.recordset;
          console.log("FullData",this.Appointment_Excel);
          this.datatime = x.response.recordset[0].CompanyName;
          this.Service_App_Grid = x.response.recordset.slice(1);
          this.AllHeaderkeys = Object.keys(x.response.recordset[0]);
          this.Required_HeaderKey = this.AllHeaderkeys.slice(1);
          this.keys = this.AllHeaderkeys.slice(1);
        }
          this.spinnerService.hide();
      });
}
AppointmentDetailed(Code, DateString, Storename){
  const obj=
    {
      "CORA_ACCT_CODE":Code,
      "APPOINTMENT_DATESTRING":DateString
    };
         this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetServiceAppointmentsDetailedReportv5',obj).subscribe(x =>{
          if (x.status == 200){
            
            this.DetailedAppointmentkeys = Object.keys(x.response.recordset[0]);
            this.StoreName = Storename;
            this.DetailedAppointmentData = x.response.recordset;
            // console.log("Detailed", this.DetailedAppointmentData);
          }
          this.spinnerService.hide();
        });
}
}
