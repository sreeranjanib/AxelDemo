import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GlobalVariablesComponent } from 'src/app/global-variables/global-variables.component';
import { ApiService } from 'src/app/_providers/api-service/api.service';
import { Location } from '@angular/common';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-financial-summary-report',
  templateUrl: './financial-summary-report.component.html',
  styleUrls: ['./financial-summary-report.component.scss']
})
export class FinancialSummaryReportComponent implements OnInit {
  public href: string = "";
  public GetStores: any =[]; 
  DEALER_Change=0;
  public ActualDecodeparam: string;
  ReportUserId = null;
  ReportId = null;
  ReportDate = null;
  TabChange = '0';
  ReportGridData:any=[];
  New_Units:any=[];
  Used_Units :any=[];
  Unit_Retail_Sales:any=[];
  Pure_Gross:any=[];
  Front_Gross:any=[];
  Back_Gross:any=[];
  Wholesales:any=[];
  Chargebacks:any=[];
  Variable_Gross:any=[];
  Service_Gross:any=[];
  Parts_Gross:any=[];
  Total_Fixed :any=[];
  Total_Store_Gross : any =[];
  Variable_Expenses : any =[];
  Personnel_Expenses : any =[];
  Semi_Fixed_Expenses : any =[];
  Fixed_Expenses : any=[];
  Total_Expenses : any = [];
  Operating_Profit : any=[];
  Adjustments_Income : any=[];
  Manufacturer_Margin : any=[];
  Incentives : any=[];
  Pack : any=[];
  Doc_Fees : any=[];
  Other_Adjustments : any=[];
  Net_Additions_Deductions : any=[];
  Net_Profit : any=[];

  ChangeDate =new Date( new Date().setDate(new Date().getDate()-1)).toISOString().split('T')[0];

  constructor(private spinnerService: Ng4LoadingSpinnerService,private location: Location,
    private _Activatedroute: ActivatedRoute,
    public globalVarComponent:GlobalVariablesComponent,private authService: ApiService,
    private router: Router)
     {
      //  if((localStorage.getItem('User_ID') )!= 'null'){
      //    setTimeout(()=>{
      //     this.authService.getSideMenu().subscribe(Sidemenu =>{
      //       this.authService.getFullSideMenu().subscribe(full_sidemenu =>{
      //         if(Sidemenu.some(x => x.SMOD_FILENAME =='Financialreport') == false){
      //           this.globalVarComponent.SideMenu = false;
      //         }
      //         else if((full_sidemenu.some(x => x.SMOD_FILENAME =='Financialreport') == false)){
      //           this.router.navigate(['404Error']);
      //        this.globalVarComponent.SideMenu = true;
      //         }
      //       })
      //     })
      //    })
      //  }
      if( this.globalVarComponent.g_ReportUserId != null && this.globalVarComponent.g_ReportUserId != 0 && this.globalVarComponent.g_ReportUserId != undefined){
        if(this._Activatedroute.snapshot.paramMap.get('Id')!=null){
          this.ActualDecodeparam = atob(this._Activatedroute.snapshot.paramMap.get('Id'));
        var DecodedValues = this.ActualDecodeparam.split('/');
        this.ReportUserId = DecodedValues[0];
        this.ReportId = DecodedValues[1];
        this.ReportDate = DecodedValues[2];
    
        if(this.ReportId != null)
          this.globalVarComponent.ReportId = this.ReportId;
          else
          this.globalVarComponent.ReportId =0;
        var pagename = window.location.hash.replace('#/','');
        
        let UserID = localStorage.getItem('User_ID');
        console.log("UserID_LS", UserID);
        console.log("ReportUserId", this.ReportUserId);
        
        // let UserID = '39';
       if( this.ReportUserId == UserID){
        setTimeout(() => {
          this.authService.getSideMenu().subscribe(sidemenu => {
           this.authService.getFullSideMenu().subscribe(full_sidemenu => {
             
             if(sidemenu.some(x => x.SMOD_FILENAME ==pagename) == false  ) {
               this.globalVarComponent.SideMenu = false;
              
             }
             else if((full_sidemenu.some(x => x.SMOD_FILENAME ==pagename) == false) ) {
               this.router.navigate(['404Error']);
               this.globalVarComponent.SideMenu = true;
             }
             
             else if((sidemenu.some(x => x.SMOD_FILENAME == pagename)== false) && (full_sidemenu.some(x => x.SMOD_FILENAME == pagename) == true)){
               this.router.navigate(['401Error']);
               this.globalVarComponent.SideMenu = true;
             }
            
           });
    
       });
       }, 2000);
       }
       else if (this.ReportUserId != null ){
       // this.globalVarComponent.g_SelectedMenuItem=localStorage.getItem('PageName');
        this.globalVarComponent.ReportId= 0;
        alert("Credentials didn’t match the report link");
        // alert("You dont have permission for this url. Please  login with " +  this._Activatedroute.snapshot.paramMap.get('Id'));
        this.router.navigate([localStorage.getItem('PageName')]);
       }
        }
      }
      else
      {
        if(this._Activatedroute.snapshot.paramMap.get('Id') != null && this._Activatedroute.snapshot.paramMap.get('Id') != '')
        {
        localStorage.setItem('ReportUrl', window.location.hash.replace('#/',''));
          console.log("Sales_ReportUrl",localStorage.getItem('ReportUrl'));
        }
      }
     }
     
 
    


  ngOnInit() {
    if(this.globalVarComponent.ReportId > 0){
      this.TabChange = this.globalVarComponent.ReportId;
      this.ChangeDate= new Date(new Date().setDate(new Date(this.ReportDate).getDate())).toISOString().split('T')[0];
    }
    else{
      //  this.getToday();
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    this.StoresData();
    this.SalesReport();
    }

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
    this.ChangeDate = new Date(event).toString();
    this.SalesReport();
  }


  SalesReport(){
    const obj = {
      "as_Id":this.DEALER_Change,
       "SalesDate":this.ChangeDate
    //  "SalesDate": "Sun Dec 26 2021 05:30:00 GMT+0530 (India Standard Time)"
      }
      console.log('obj',obj);
      this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetNightlyFinancialSummaryReport', obj).subscribe(x =>{
          if (x.status == 200){
            this.ReportGridData = x.response.recordset;  
           console.log("this.ReportGridData",this.ReportGridData); 
            var sorted = {};
            for( var i = 0, max = this.ReportGridData.length; i < max ; i++ ){
              if( sorted[this.ReportGridData[i].LABLE1] == undefined ){
                  sorted[this.ReportGridData[i].LABLE1] = [];
                }
                sorted[this.ReportGridData[i].LABLE1].push(this.ReportGridData[i]);
              }
                 this.New_Units = sorted["New_Units"];
                 this.Used_Units = sorted["Pre-Owned_Units"];
                 this.Unit_Retail_Sales = sorted["Unit_Retail_Sales"];
                 this.Front_Gross = sorted["Front_Gross"];
                 this.Back_Gross = sorted["Back_Gross"];
                 this.Pure_Gross = sorted["Pure_Gross"];
                 this.Wholesales = sorted["Wholesales"];
                 this.Chargebacks = sorted["Chargebacks"];
                 this.Variable_Gross = sorted["Variable Gross"];
                 this.Service_Gross = sorted["Service Gross"];
                 this.Parts_Gross = sorted["Parts Gross"];
                 this.Total_Fixed = sorted["Total Fixed"];
                 this.Total_Store_Gross = sorted["Total Store Gross"];
                 this.Variable_Expenses = sorted["Variable Expenses"];
                 this.Personnel_Expenses = sorted["Personnel Expenses"];
                 this.Semi_Fixed_Expenses = sorted["Semi-Fixed Expenses"];
                 this.Fixed_Expenses = sorted["Fixed Expenses"];
                 this.Total_Expenses = sorted["Total Expenses"];
                 this.Operating_Profit = sorted["Operating Profit"];
                 this.Adjustments_Income = sorted["Adjustments to Income"];
                 this.Manufacturer_Margin = sorted["Manufacturer Margin"];
                 this.Incentives = sorted["Incentives"];
                 this.Pack = sorted["Pack"];
                 this.Doc_Fees = sorted["Doc Fees"];
                 this.Other_Adjustments = sorted["Doc Fees"];
                 this.Net_Additions_Deductions = sorted["Net Additions & Deductions"];
                 this.Net_Profit = sorted["Net Additions & Deductions"];
              
               
            }
            this.spinnerService.hide();
});
}
}
