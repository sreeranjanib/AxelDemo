import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../_providers/api-service/api.service';
import {ExcelService} from '../excel.service';

@Component({
  selector: 'app-test-sag',
  templateUrl: './test-sag.component.html',
  styleUrls: ['./test-sag.component.scss']
})
export class TestSAGComponent implements OnInit {
  public AllHeaderkeys:any[];
  public All_LOC_Header:any[];
  public Required_HeaderKey:any[];
  public Appointment_Loc_Name_Grid:any[];
  Marketdays : any = '7';
  valueFromChild: string;
  CoraCodes: any ;
  keys: any[];
  constructor(private excelService:ExcelService, private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router) { }


  ngOnInit() {
    setTimeout(() => {
      this.authService.getCoraVals().subscribe(Codes => this.SAGAppiontmentReport(Codes))
     }, 1500);
  }
  MarketDays(value:string){
    this.Marketdays = value;
    this.SAGAppiontmentReport("");
}
exportAsXLSX() {
  this.excelService.exportAsExcelFile(this.Appointment_Loc_Name_Grid, 'SAG_Report');
}   
  SAGAppiontmentReport(Codes){
    const obj= {"marketdays":this.Marketdays, "cora_acct_code":Codes}
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetSagAppointmentReportStoreBased',obj).subscribe(x =>{
          if (x.status == 200){
            this.AllHeaderkeys = Object.keys(x.response.recordset[0]);
            this.Required_HeaderKey = this.AllHeaderkeys.slice(1);
            this.Appointment_Loc_Name_Grid = x.response.recordset;
            this.keys = this.AllHeaderkeys.slice(1);
          }
            this.spinnerService.hide();
        });
        
      }

}
