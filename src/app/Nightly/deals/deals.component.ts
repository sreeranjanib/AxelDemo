import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { filter } from 'rxjs/operators';
import { ExcelService } from 'src/app/excel.service';
import { GlobalVariablesComponent } from 'src/app/global-variables/global-variables.component';
import { ApiService } from 'src/app/_providers/api-service/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  public GetStores: any =[]; 
  DEALER_Change=0;
  ChangeDate =new Date();
  SalesGridData: any = [];
  New: any = [];
  Used: any = [];
  New_Front_Gross: any = [];
  New_Back_Gross: any = [];
  New_Gross_SubTotal: any = [];
  Used_Front_Gross: any = [];
  Used_Back_Gross: any = [];
  Used_Gross_SubTotal: any = [];
  Total: any = [];
  previousUrl: string;

  constructor(private location: Location, private excelService:ExcelService, public globalVarComponent:GlobalVariablesComponent, private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService,private router: Router, private StoreData: FormBuilder) { 
    
  }
  
  ngOnInit() {
    this.getToday();
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    this.StoresData();
    this.SalesReport();
  }
  getToday(): string {
   return new Date().toISOString().split('T')[0]
}
  PreviousUrl(){
    this.location.back();
  }
  StoresData(){
    const obj = { "AU_ID":localStorage.getItem('User_ID') };
    this.authService.AXELPostmethod('AXELData/GetCorporatesbyUser',obj).subscribe(x =>{
      if(x !== ''){
        this.GetStores=x.response.recordset;
        console.log("GetStores", this.GetStores);
      }
      });
  }
  DealerChange(newValue){
    this.DEALER_Change = newValue.target.value;
    this.SalesReport();
  }
  updatedate(event) {
    this.ChangeDate = new Date(event);
    this.SalesReport();
    // alert(this.ChangeDate);
}

  SalesReport(){
    
    const obj = {
      "AS_ID":this.DEALER_Change,
      "SalesDate":this.ChangeDate
      }
      this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetSalesReport', obj).subscribe(x =>{
         
          if (x.status == 200){
            this.SalesGridData = x.response.recordset;
            console.log("this.SalesGridData",this.SalesGridData);
            
            var sorted = {};
            for( var i = 0, max = this.SalesGridData.length; i < max ; i++ ){
              if( sorted[this.SalesGridData[i].LABLE1] == undefined ){
                  sorted[this.SalesGridData[i].LABLE1] = [];
                }
                sorted[this.SalesGridData[i].LABLE1].push(this.SalesGridData[i]);
              }
                this.New = sorted["New_Count"];
                this.Used = sorted["Used_Count"];
                this.New_Front_Gross = sorted["New_Front_Gross"];
                this.New_Back_Gross = sorted["New_Back_Gross"];
                this.New_Gross_SubTotal = sorted["New_Gross_SubTotal"];
                this.Used_Front_Gross = sorted["Used_Front_Gross"];
                this.Used_Back_Gross = sorted["Used_Back_Gross"];
                this.Used_Gross_SubTotal = sorted["Used_Gross_SubTotal"];
                this.Total = sorted["Total"];
            }
            setTimeout(() => {
              this.spinnerService.hide();
            },10000);
        });
        
      }
      exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.SalesGridData, 'Nightly_Sales_Report');
     }
}
