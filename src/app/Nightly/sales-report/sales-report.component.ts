import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { filter, sample } from 'rxjs/operators';
import { ExcelService } from 'src/app/excel.service';
import { GlobalVariablesComponent } from 'src/app/global-variables/global-variables.component';
import { ApiService } from 'src/app/_providers/api-service/api.service';
import { Location } from '@angular/common';
import * as $ from 'jquery'
@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  public href: string = "";
  public GetStores: any =[]; 
  DEALER_Change=0;
  ChangeDate =new Date( new Date().setDate(new Date().getDate()-1)).toISOString().split('T')[0];
  
  SalesGridData: any = [];
  SalesGridData_excel : any = [];
  DealesGridData: any = [];
  FIGridData: any = [];
  FIGridData_excel: any = [];
  FIGridData_PP: any = [];
  FIGridData_LD: any = [];
  SummaryGridData_FI: any = [];
  SummaryGridData_LD: any = [];
  New: any = [];
  PreOwned: any = [];
  New_Front_Gross: any = [];
  New_Back_Gross: any = [];
  New_Gross_SubTotal: any = [];
  PreOwned_Front_Gross: any = [];
  PreOwned_Back_Gross: any = [];
  PreOwned_Gross_SubTotal: any = [];
  Total: any = [];
  TODAY_New : any = [];
  TODAY_Used: any = [];
  TODAY_Total : any = [];
  MTD_New : any = [];
  MTD_Used : any = [];
  MTD_Total: any = [];
  VSC: any = [];
  Summary_VSC: any = [];
  Execshield: any = [];
  Summary_Execshield: any = [];
  CASH: any = [];
  CHASE : any = [];
  CAPTIVE : any = [];
  USBANK : any = [];  
  Summary_CASH: any = [];
  Summary_CHASE : any = [];
  Summary_CAPTIVE : any = [];
  Summary_USBANK : any = []; 
  Summary_ALLY: any = [];
  AllHeaderkeys: any = [];  
  DealesDetailedData : any = [];  
  SalesPersonData: any = [];  
  SalesPersonData_excel: any = [];
  Count_SubTotal: any = [];
  previousUrl: string;
  TabChange = '0';
  Sortby ="TR";
  SortChange = 'Rank';
  TabDisable = false;
  Deals :boolean = true;
  Sales:boolean = true;
  FI:boolean = true;
  Sub:boolean = false;
  Summary_Sub:boolean = false;
  SalesPerson:boolean = false;
  SortButtons:boolean = false;
  public ActualDecodeparam: string;
  ReportUserId = null;
  ReportId = null;
  ReportDate = null;
  Tradediv:boolean = false;
  Trade1:boolean = false;
  Trade2:boolean = false;
  ServiceContract:boolean = false;
  Exec:boolean = false;
  GapGross:boolean = false;
  public ascNumberSort = true;

  constructor(private _Activatedroute: ActivatedRoute, private location: Location, private excelService:ExcelService, public globalVarComponent:GlobalVariablesComponent, private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService,private router: Router, private StoreData: FormBuilder) { 
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
        
     // this.globalVarComponent.g_ReportUserId != 0
      this.resetlocation();
      // this.router.navigateByUrl('http://axel.swickard.com/landing.aspx');
      }
    }
  
  }
  

  resetlocation(){
    location.replace('http://demo.axelautomotive.com/landing.aspx');
  }
  
  ngOnInit() {
    // this.href = this.router.url;
    // console.log(this.router.url);
    if(this.globalVarComponent.ReportId > 0){
      this.TabChange = this.globalVarComponent.ReportId;
     this.ChangeDate= new Date(new Date().setDate(new Date(this.ReportDate).getDate())).toISOString().split('T')[0];
    }
    else
    { this.TabChange = '1';}
    // this.Sales = true;
    // this.Deals = false;
    this.getToday();
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    this.StoresData();
    this.TabClick(this.TabChange);
    
    // this.SalesReport();
  }
  TabClick(event){
    this.TabChange = event;
    if(event == "1"){
      this.SortButtons =  false;
      this.Sales = true;
      this.Deals = false;
      this.FI = false;
      this.SalesPerson = false;
      this.SalesReport("LI"); //"SS";
      this.SalesReport("FI");
      this.SalesReport("LD");
    }
    else if(event == "2"){
      this.SortButtons =  false;
      this.Sales = false;
      this.Deals = false;
      this.FI = true;
      this.SalesPerson = false;
      this.FIReport("FI");
      this.FIReport("PP");
      this.FIReport("LD");
    }
    else if(event == "5"){
      this.SortButtons =  false;
      this.Sales = false;
      this.Deals = true;
      this.FI = false;
      this.SalesPerson = false;
      this.DealesReport();
    }
    else if(event == "6"){
     this.SortButtons =  true;
      this.Sales = false;
      this.Deals = false;
      this.FI = false;
      this.SalesPerson = true;
      this.SalesPersonReport();
    }
  }
  getToday(): string {

   var InputDate = new Date( new Date().setDate(new Date().getDate()-1));
    if(this.ReportDate == null && this.TabChange == '1')
   return InputDate.toISOString().split('T')[0];
   else if(this.ReportDate == null && this.TabChange != '1')
   return new Date().toISOString().split('T')[0];
   else  if(this.ReportDate != null)
    return new Date(new Date().setDate(new Date(this.ReportDate).getDate())).toISOString().split('T')[0];
 
}
  PreviousUrl(){
    this.location.back();
  }

  StoresData(){
    if(this.TabChange == '6' ){}
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
    if(this.TabChange == '1' ){
      this.SalesReport("LI"); // this.SalesReport("SS");
      this.SalesReport("FI");
      this.SalesReport("LD");
    }
    else if(this.TabChange == '2' ){
      this.FIReport("FI");
      this.FIReport("PP");
      this.FIReport("LD");
    }
   else if(this.TabChange == '5' ){
    this.DealesReport();
  }
  else if(this.TabChange == '6' ){
    this.SalesPersonReport();
  }
  }
  updatedate(event) {
    this.ChangeDate = new Date(event).toString();
    if(this.TabChange == '1' ){
      this.SalesReport("LI");
      this.SalesReport("FI");
      this.SalesReport("LD");
    }
    else if(this.TabChange == '2'){
      this.FIReport("FI");
      this.FIReport("PP");
      this.FIReport("LD");
    }
   else if(this.TabChange == '5'){
    this.DealesReport();
  }
  else if(this.TabChange == '6' ){
    this.SalesPersonReport();
  }
    // alert(this.ChangeDate);
}
BtnClose(){
  $('.modal').dialog('close');
  
}

SalesReport(Block_val){
  this.Summary_Sub = true;
    this.Sub = false;
  const obj = {
    "block":Block_val,
    "au_id":localStorage.getItem('User_ID'),
    "as_Id":this.DEALER_Change,
    "SalesDate":this.ChangeDate
    }
    this.spinnerService.show();
      this.authService.AXELPostmethod('AXELData/GetSalesReport', obj).subscribe(x =>{
       
        if (x.status == 200){
          if(Block_val == "LI"){
          this.SalesGridData = x.response.recordset;
          this.SalesGridData_excel= x.response.recordset.map(({SNo,...rest}) => ({...rest}));
          // console.log("this.SalesGridData",this.SalesGridData);
          
          var sorted = {};
          for( var i = 0, max = this.SalesGridData.length; i < max ; i++ ){
            if( sorted[this.SalesGridData[i].LABLE1] == undefined ){
                sorted[this.SalesGridData[i].LABLE1] = [];
              }
              sorted[this.SalesGridData[i].LABLE1].push(this.SalesGridData[i]);
            }
              this.New = sorted["New_Count"];
              this.PreOwned = sorted["Pre-Owned_Count"];
              this.New_Front_Gross = sorted["New_Front_Gross"];
              this.New_Back_Gross = sorted["New_Back_Gross"];
              this.New_Gross_SubTotal = sorted["New_Gross_SubTotal"];
              this.PreOwned_Front_Gross = sorted["Pre-Owned_Front_Gross"];
              this.PreOwned_Back_Gross = sorted["Pre-Owned_Back_Gross"];
              this.PreOwned_Gross_SubTotal = sorted["Pre-Owned_Gross_SubTotal"];
              this.Count_SubTotal = sorted["Count_SubTotal"];
              this.Total = sorted["Total"];
              if(this.SalesGridData.length > 0 ){
                this.Summary_Sub = true;
              }
              else 
              this.Summary_Sub = false;
          }
          else if(Block_val == "FI"){
            this.SummaryGridData_FI = x.response.recordset;
            console.log("SummaryGridData_FI",this.SummaryGridData_FI);
            
           
                
                
            }
            else if(Block_val == "LD"){
              this.SummaryGridData_LD = x.response.recordset;
              console.log("SummaryGridData_LD",this.SummaryGridData_LD);
              
              // var sorted = {};
              // for( var i = 0, max = this.SummaryGridData_LD.length; i < max ; i++ ){
              //   if( sorted[this.SummaryGridData_LD[i].Lender_Name] == undefined ){
              //       sorted[this.SummaryGridData_LD[i].Lender_Name] = [];
              //     }
              //     sorted[this.SummaryGridData_LD[i].Lender_Name].push(this.SummaryGridData_LD[i]);
              //   }
              //   this.Summary_CAPTIVE = sorted["CAPTIVE"]; 
              //   this.Summary_CHASE = sorted["CHASE"];
              //   this.Summary_USBANK = sorted["US BANK"];
              //   this.Summary_ALLY = sorted["ALLY"];
              //   this.Summary_CASH = sorted["CASH"];
                  
                  // console.log("CASH", this.CASH );
                  // console.log("CHASE", this.CHASE );
                  // console.log("CAPTIVE", this.CAPTIVE);
                  // console.log("USBANK", this.USBANK );
              }
        }
       
              this.spinnerService.hide();
         
      });
      
    }
      DealesReport(){
        this.Summary_Sub = false;
        this.Sub = false;
        const obj = { 
          "AU_ID":localStorage.getItem('User_ID'),
          "AS_ID":this.DEALER_Change,
          "DATE":this.ChangeDate
       };
       this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetNightlyDealsReport',obj).subscribe(x =>{
          if(x !== ''){
            this.DealesGridData=x.response.recordset;
            var Deales_Grid_VS_ID= x.response.recordset.map(({VS_ID,...rest}) => ({...rest}));
            var Deales_Grid_AS_ID = Deales_Grid_VS_ID.map(({AS_ID,...rest}) => ({...rest}));
            var Deales_Grid_CONTRACTDATE = Deales_Grid_AS_ID.map(({CONTRACTDATE,...rest}) => ({...rest}));
            this.SalesGridData_excel = Deales_Grid_CONTRACTDATE.map(({AS_DEALERNAME,...rest}) => ({...rest}));
            // console.log("NightlyDealsReport", this.DealesGridData);
          }
          this.spinnerService.hide();
          // $('body').css('overflow','hidden');
          });
      }
      sort(colName) {
        if(colName == 'Rank'){
          this.Sortby = 'TR';
          
        }
        else if(colName == 'Vsc Rank'){
          this.Sortby = 'VR';
          
        }
        else if(colName == 'Exec Rank'){
          this.Sortby = 'ER';
          
        }
        this.SalesPersonReport();
      }

      SalesPersonReport(){
      // alert(this.DEALER_Change);
        this.Summary_Sub = false;
        this.Sub = false;
        if(this.DEALER_Change == 0){
          this.SortButtons = false;
        }
        else 
        this.SortButtons = true;
        const obj = { 
          "AU_ID":localStorage.getItem('User_ID'),
          "AS_ID":this.DEALER_Change,
          "SalesDate":this.ChangeDate,
          "OrderBy":this.Sortby
       };
       this.SalesPersonData = [];
       if(this.DEALER_Change != 0){
        this.authService.AXELPostmethod('AXELData/GetNightlySalesPersonReport',obj).subscribe(x =>{
          if(x !== ''){
            this.SalesPersonData=x.response.recordset;
            this.SalesPersonData_excel= x.response.recordset.map(({AS_ID,...rest}) => ({...rest}));
            // console.log("final", this.SalesPersonData_excel);
          }
          // $('body').css('overflow','hidden');
          });
        }
        
        
      }
      
      FIReport(Block_val){
        this.Sub = true;
        this.Summary_Sub = false;
        const obj = {
            "block":Block_val,
            "au_id":localStorage.getItem('User_ID'),
            "as_Id":this.DEALER_Change,
            "SalesDate":this.ChangeDate,

          }
          this.spinnerService.show();
            this.authService.AXELPostmethod('AXELData/GetNightlyFIReport', obj).subscribe(x =>{
             
              if (x.status == 200){
                if(Block_val == "FI"){
                this.FIGridData = x.response.recordset;
                this.FIGridData_excel= x.response.recordset.map(({SNo,...rest}) => ({...rest}));
                
                // console.log("this.FIGridData",this.FIGridData);
                
                var sorted = {};
                for( var i = 0, max = this.FIGridData.length; i < max ; i++ ){
                  if( sorted[this.FIGridData[i].LABLE1] == undefined ){
                      sorted[this.FIGridData[i].LABLE1] = [];
                    }
                    sorted[this.FIGridData[i].LABLE1].push(this.FIGridData[i]);
                  }
                    this.TODAY_New = sorted["TODAY_New"];
                    this.TODAY_Used = sorted["TODAY_Used"];
                    this.TODAY_Total = sorted["TODAY_Total"];
                    this.MTD_New = sorted["MTD_New"];
                    this.MTD_Used = sorted["MTD_Used"];
                    this.MTD_Total = sorted["MTD_Total"];
                    if(this.FIGridData.length > 0 ){
                      this.Sub = true;
                    }
                    else 
                    this.Sub = false;
                }
                else if(Block_val == "PP"){
                  this.FIGridData_PP = x.response.recordset;
                  console.log("FIGridData_PP",this.FIGridData_PP);
                  
                  // var sorted = {};
                  // for( var i = 0, max = this.FIGridData_PP.length; i < max ; i++ ){
                  //   if( sorted[this.FIGridData_PP[i].Lable1] == undefined ){
                  //       sorted[this.FIGridData_PP[i].Lable1] = [];
                  //     }
                  //     sorted[this.FIGridData_PP[i].Lable1].push(this.FIGridData_PP[i]);
                  //   }
                  //     this.VSC = sorted["VSC"];
                  //     this.Execshield = sorted["Execshield"];
                  //     console.log("Execshield", this.Execshield);
                      
                      
                  }
                  else if(Block_val == "LD"){
                    this.FIGridData_LD = x.response.recordset;
                    console.log("FIGridData_LD",this.FIGridData_LD);
                    
                    // var sorted = {};
                    // for( var i = 0, max = this.FIGridData_LD.length; i < max ; i++ ){
                    //   if( sorted[this.FIGridData_LD[i].Lender_Name] == undefined ){
                    //       sorted[this.FIGridData_LD[i].Lender_Name] = [];
                    //     }
                    //     sorted[this.FIGridData_LD[i].Lender_Name].push(this.FIGridData_LD[i]);
                    //   }
                    //     this.CASH = sorted["Cash"];
                    //     this.CHASE = sorted["Chase"];
                    //     this.CAPTIVE = sorted["Captive"];
                    //     this.USBANK = sorted["US Bank"];
                        // console.log("CASH", this.CASH );
                        // console.log("CHASE", this.CHASE );
                        // console.log("CAPTIVE", this.CAPTIVE);
                        // console.log("USBANK", this.USBANK );
                    }
              }
               this.spinnerService.hide();
            });
            this.Sub = true;
          }

      
      DealesDetailed(id){
        this.Summary_Sub = false;
        this.Sub = false;
            const obj = { 
              "ID":id
           };
           this.spinnerService.show();
            this.authService.AXELPostmethod('AXELData/GetNightlyDealsDetailed',obj).subscribe(x =>{
              if(x !== ''){
                this.DealesDetailedData=x.response.recordset;
                
                if(this.DealesDetailedData[0].Trade1VIN == "-"){
                  this.Trade1 = false;
                }
                else{this.Trade1 = true;}
                if(this.DealesDetailedData[0].Trade2VIN == "-"){
                  this.Trade2 = false;
                }
                else{this.Trade2 = true;}
                // if(this.DealesDetailedData[0].Trade1VIN == "-" && this.DealesDetailedData[0].Trade2VIN == "-"){
                //   this.Tradediv = false;
                // }
                // else
                // this.Tradediv = true;
                if(this.DealesDetailedData[0].VSC == "-"){
                  this.ServiceContract = false;
                }
                else{this.ServiceContract = true;}
                if(this.DealesDetailedData[0]['EXEC Gross'] == "-"){
                  this.Exec = false;
                }
                else{this.Exec = true;}
                if(this.DealesDetailedData[0]['Gap Gross'] == "-"){
                  this.GapGross = false;
                }
                else{this.GapGross = true;}
                console.log("DealesDetailedData", this.DealesDetailedData);
              }
              
              this.spinnerService.hide();
              });
          }
      exportAsXLSX() {
        if(this.TabChange == '1' ){this.excelService.exportAsExcelFile(this.SalesGridData_excel, 'Nightly_Summary_Report');}
        else if(this.TabChange == '2'){this.excelService.exportAsExcelFile(this.FIGridData_excel, 'Nightly_FI_Report');}
        else if(this.TabChange == '5'){this.excelService.exportAsExcelFile(this.SalesGridData_excel, 'Nightly_Deal_Report');}
        else if(this.TabChange == '6'){this.excelService.exportAsExcelFile(this.SalesPersonData_excel, 'Nightly_SalesPreson_Report');}
     }
}
