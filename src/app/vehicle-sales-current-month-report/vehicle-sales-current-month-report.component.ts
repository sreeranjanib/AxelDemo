import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../_providers/api-service/api.service';

@Component({
  selector: 'app-vehicle-sales-current-month-report',
  templateUrl: './vehicle-sales-current-month-report.component.html',
  styleUrls: ['./vehicle-sales-current-month-report.component.scss']
})
export class VehicleSalesCurrentMonthReportComponent implements OnInit {
  public AllHeaderkeys:any[];
  public All_LOC_Header:any[];
  public Required_HeaderKey:any[];
  Appointment_Loc_Name_Grid :any[];
  viewmore = false;
  i=0;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router) { }

  ngOnInit() {
    this.GetData();
  }

  GetData(){
    this.viewmore = true;
    const obj= {
      "DealNo":"",
      "StockNo":"",
      "VIN":"",
      "NU":"",
      "StartCnt":this.i
    }      
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetVehicleSalesCurrentMonthReport',obj).subscribe(x =>{
          if (x.status == 200){
            this.AllHeaderkeys = Object.keys(x.response.recordset[0]);
            this.Required_HeaderKey = this.AllHeaderkeys.slice(1);
            this.Appointment_Loc_Name_Grid = x.response.recordset;
          //  console.log("Actual_Data", this.Appointment_Loc_Name_Grid);
          }
          this.spinnerService.hide();
        });
      }

      ViewMore() {
        this.viewmore = true;
        this.i= this.i + 100;
        this.GetData();
      }

}
