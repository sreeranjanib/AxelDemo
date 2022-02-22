import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from '../_providers/api-service/api.service';
import {ExcelService} from '../excel.service';
import { TreeviewItem, TreeviewConfig, TreeItem } from 'ngx-treeview';
import { Observable, observable, Subject } from 'rxjs'; 
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-service-appointments',
  templateUrl: './service-appointments.component.html',
  styleUrls: ['./service-appointments.component.scss']
})
export class ServiceAppointmentsComponent implements OnInit {
  public Service_App_Grid:any=[];
  public Grid_Header:any=[];
  elementClicked: any= '';
  public SalesType="M";
  Isinactive:boolean=false;
  IsDivinactive:boolean=false;
  IsLink_Underline:boolean=false;
 public selectedName:any;
 public selecttr:any;
 tab : any = 'tab_M';
 tab_M : any;
 tab_Q : any;
 tab_Y : any;
 subParams: any;
 Store_Id: any = "0";
 public keys:any[];
 public TimeStamp:any;
 booleanValue: any = false;
 showpanel = false;
 public currentDate =new Date();
 public DateString: any;
 public SelectedDateString: any;
 public firstKeyValue: any;
 public Is_Prev_Nxt_Current ="C";
 public Var_Date: any = "";
 public Curr_Report_StartDate: any = ""; 
 public Prev: any;
 public Next: any;
public Is_Current_Week: any;
public IS_PREV_WEEK_EXIST = "";
public IS_NEXT_WEEK_EXIST ="";
StoreName = "";
public DetailedAppointmentData:any=[];
DetailedAppointmentkeys: any = [];
GetStores : any = [];
GetBrands: any = [];
GetBrandStores : any = [];
GetGroups : any = [];
public GetGroupsStores : any = [];
StoresItems:TreeviewItem[];
GroupItems:TreeviewItem[];
BrandItems:TreeviewItem[];
StoreTreeItems :TreeItem;
StoreTreeItemsAry:TreeItem[]=[];
GroupTreeItems :TreeItem;
GroupTreeItemsAry:TreeItem[]=[];
GroupStoresTreeItems:TreeItem;
GroupStoresTreeItemsAry:TreeItem[]=[];
BrandTreeItems :TreeItem;
BrandTreeItemsAry:TreeItem[]=[];
BrandStoresTreeItems:TreeItem;
BrandStoresTreeItemsAry:TreeItem[]=[];
values: number[];
config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    // maxHeight: 400
});

  constructor(private excelService:ExcelService, private spinnerService: Ng4LoadingSpinnerService,private authService: ApiService, private router: Router, private _Activatedroute: ActivatedRoute, ) {
   // Remove query params

   }

  ngOnInit() {
    this.GridBind();
    this.StoresData();
    this.GroupsParentData();
    this.BrandParentData();
    // let RoleID = localStorage.getItem('RoleID');
    // // alert("localStorage" + this.RoleID );
    // this.authService.setRoleID(RoleID);
  }
  onClick(check){
        if(check==1){
          this.tab = 'tab_M';
          this.SalesType = 'M';
        }else if(check==2){
          this.tab = 'tab_Q';
          this.SalesType = 'Q';
        }else{
          this.tab = 'tab_Y';
          this.SalesType = 'Y';
        }    
        this.GridBind();
    }

  CurrentDatestring()
  {
    
    const date = this.currentDate;
      const day = this.currentDate.toLocaleDateString('en-US',{weekday: 'short'});
      const yy = new Date().getFullYear().toString().substr(-2);
      const mm = date.toLocaleString('en-us', { month: 'short' })
      const dd = new Date(date).getDate();
      const Conv_dd = dd.toString().length == 1 ? '0' + dd : dd;
      this.DateString = '' + day + ' ' + Conv_dd + ' ' + mm + ' ' + yy;
      // console.log("CurrentDate", this.DateString);
  }
  GridBind() {
    if( this.Var_Date == "" && this.DateString != "" ){
      this.CurrentDatestring();
    }
  
    const obj=
    {
      "IsReport_Prev_Next_Current":this.Is_Prev_Nxt_Current,
      "Variance_DateString":this.Var_Date,
      "Current_Report_StartDateString":this.Curr_Report_StartDate
    };
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetServiceAppointmentsReportv5',obj).subscribe(x =>{
        this.Service_App_Grid = x.response.recordset.slice(1);
        this.Grid_Header = x.response.recordset[0];
        this.firstKeyValue = Object.keys(x.response.recordset[0])[2];
        this.TimeStamp = x.response.output.REPORT_UPDATE_TS;
        this.Is_Current_Week = x.response.output.IS_CURRENT_WEEK;
        this.IS_PREV_WEEK_EXIST = x.response.output.IS_PREV_WEEK_EXIST;
        this.IS_NEXT_WEEK_EXIST = x.response.output.IS_NEXT_WEEK_EXIST;
        this.keys = Object.keys(x.response.recordset[0]);
        // console.log("Keys", this.keys);
        this.keys =this.keys.slice(2);
        // this.Service_App_Grid.shift();
        this.spinnerService.hide();
        // console.log("Keys",this.keys );
         if(this.Is_Prev_Nxt_Current == "P"){
           if(this.Is_Current_Week == 'Y' && this.SelectedDateString =="")
           this.CurrentDatestring();
           else if(this.SelectedDateString != "")
           this.DateString = this.SelectedDateString;
           else if(this.DateString != "")
           this.DateString =  Object.keys(x.response.recordset[0])[6];

         }
        else if(this.Is_Prev_Nxt_Current == "N"){
          if(this.Is_Current_Week == 'Y' && this.SelectedDateString =="")
           this.CurrentDatestring();
           else if(this.SelectedDateString != "")
           this.DateString = this.SelectedDateString;
           else if(this.DateString != "")
          this.DateString =  Object.keys(x.response.recordset[0])[1];
         }
        this.SelectedDateString = "";
        
        
      
  });
}
CheckPrevDisablity(){
  if(this.IS_PREV_WEEK_EXIST == "N"){
    return true;
  } else {
    return false;
  }
}
CheckNextDisablity(){
if(this.IS_NEXT_WEEK_EXIST  == "N"){
          return true;
        } else {
          return false;
        }
}

sort(colName, boolean) {
 
  if (colName.toUpperCase() == 'VARIANCE'){
  if (boolean == true){
      this.Service_App_Grid.sort((a, b) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
      this.booleanValue = !this.booleanValue
  }
  else{
      this.Service_App_Grid.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
      this.booleanValue = !this.booleanValue
  }
}
this.HeaderClick(colName);
}

HeaderClick(Value){
  if(Value != "OBJECTIVE" && Value != "VARIANCE"){
    this.DateString = Value; 
    this.SelectedDateString  = Value; 
    this.Var_Date = Value;
    this.GridBind();
  }
}
CurrentWeek(){
  this.Is_Prev_Nxt_Current = "C";
  this.Var_Date = null;
  this.Curr_Report_StartDate = null;
  
  this.GridBind();
}
PrevWeek(){
if(this.IS_PREV_WEEK_EXIST == "Y"){
  this.Is_Prev_Nxt_Current = "P";
  this.Var_Date = null;
  this.Curr_Report_StartDate = this.firstKeyValue;
  this.GridBind();
}
}
NextWeek(){
  if(this.IS_NEXT_WEEK_EXIST == "Y"){
  this.Is_Prev_Nxt_Current = "N";
  this.Var_Date = null;
  this.Curr_Report_StartDate = this.firstKeyValue;
  this.GridBind();
}
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
exportAsXLSX() {
  this.excelService.exportAsExcelFile(this.DetailedAppointmentData, 'Maloney_Report');
} 
StoresData(){
  const obj = { };
  this.authService.AXELPostmethod('Group/GetDealershipNamesDD',obj).subscribe(x =>{
    if(x !== ''){

      this.GetStores=x.response.recordset;
      // console.log("Errors", this.GetStores);
    }
    });
} 

GroupsParentData(){
  const obj = {
    "GROUP_TYPE":"P",
    "GROUP_ID":0
   };
  this.authService.AXELPostmethod('Group/GetGroupsFilter',obj).subscribe(
   x =>{
    if(x !== ''){
      this.GetGroups=x.response.recordset;
      // console.log("Groups", this.GetGroups);
      for(var i =0; i<this.GetGroups.length; i++){
         this.GroupsChildData(this.GetGroups[i].G_Id);

      }
    }
    });
} 

  GroupsChildData(GroupID):any{
    
  const obj = {
    "GROUP_TYPE":"C",
    "GROUP_ID":GroupID
   };
   
this.authService.AXELPostmethod('Group/GetGroupsFilter',obj).subscribe(x =>{

  if(x !== ''){ 
    // for( var j = 0; j<x.response.recordset.length-1; j++){
      this.GetGroupsStores.push(x.response.recordset);
    // }
    // console.log("GetGroupsStores", this.GetGroupsStores);
  }
});
}
BrandParentData(){
  const obj = {
    "Type":"P",
    "Brand_ID":0
   };
  this.authService.AXELPostmethod('Group/GetBrandsFilter',obj).subscribe(x =>{
    if(x !== ''){
      this.GetBrands=x.response.recordset;
      // console.log("Brands", this.GetBrands);
      for(var i =0; i<this.GetBrands.length; i++){
        this.BrandChildData(this.GetBrands[i].brand_id);
     }
    }
    });
} 
BrandChildData(BrandId){
  const obj = {
    "Type":"C",
    "Brand_ID":BrandId
   };
  this.authService.AXELPostmethod('Group/GetBrandsFilter',obj).subscribe(x =>{
    if(x !== ''){

      this.GetBrandStores.push(x.response.recordset);
      // console.log("BrandStores", this.GetBrandStores);
    }
    });
}

Filters(){
  
  this.StoresItems = this.getCorporateItems();
  this.GroupItems = this.getGroupItems();
  
  this.BrandItems = this.getBrandItems();

}
  

storeChildItems(){ 
  for(var i =0; i<this.GetStores.length; i++){
    this.StoreTreeItems = { text: this.GetStores[i].dealershipname, value: this.GetStores[i].cora_acct_code };
    this.StoreTreeItemsAry.push(this.StoreTreeItems);
  }
  }

  getCorporateItems(): TreeviewItem[] {
    this.StoreTreeItemsAry=[];
    this.storeChildItems();
    const CorporateCategoryChild=this.StoreTreeItemsAry.map((item) => {
    return new TreeviewItem(item);  });  
    const CorporateCategory = new TreeviewItem({text: 'Select All', value: 0, children:CorporateCategoryChild});
    return [CorporateCategory];
    // const CorporateCategory = new TreeviewItem({
    //     text: 'Select All', value: 0, children: this.StoreTreeItemsAry
    // });
}
    getGroupItems(): TreeviewItem[] {
      this.GroupTreeItemsAry=[];
      
       let GroupCategory ;
       this.GroupParentItems();
      const GroupCategoryChild1=this.GroupTreeItemsAry.map((item) => {
        return new TreeviewItem(item);  });  
        GroupCategory = new TreeviewItem({text: 'Select All', value: 0, children:GroupCategoryChild1});
      return [GroupCategory];

}
     GroupParentItems(){
      //  let GroupStoresCategoryItems TreeviewItem: new (arg0: TreeItem) => any[]=[];
      for(var i =0; i<this.GetGroups.length; i++){
        const ChildArray = this.GetGroupsStores.map(item => item).filter(item => item[0].Parent_Id == this.GetGroups[i].G_Id);
        this.GroupStoresTreeItemsAry =[];
          for(var j =0; j<ChildArray[0].length; j++){
            this.GroupStoresTreeItems =  { text: ChildArray[0][j].dealershipname, value:ChildArray[0][j].cora_acct_code};
            this.GroupStoresTreeItemsAry.push(this.GroupStoresTreeItems);
         }
        const  GroupStoresCategoryItems=this.GroupStoresTreeItemsAry.map((item) => {
           return new TreeviewItem(item);  });
           this.GroupTreeItems =  { text: this.GetGroups[i].G_Name, value: this.GetGroups[i].G_Id, children:GroupStoresCategoryItems};
        this.GroupTreeItemsAry.push(this.GroupTreeItems);
      } 
    }
    
    
    getBrandItems(): TreeviewItem[] {
      this.BrandTreeItemsAry=[];
      this.BrandParentItems();
      const BrandCategoryChild1=this.BrandTreeItemsAry.map((item) => {
      return new TreeviewItem(item);  });  
      const BrandCategory = new TreeviewItem({text: 'Select All', value: 0, children:BrandCategoryChild1});
      return [BrandCategory];
}
    BrandParentItems(){
      for(var i =0; i<this.GetBrands.length; i++){
        const ChildArray = this.GetBrandStores.map(item => item).filter(item => item[0].PARENT_ID == this.GetBrands[i].brand_id);
        // console.log("Brand_Child", ChildArray);
        this.BrandStoresTreeItemsAry =[];
          for(var j =0; j<ChildArray[0].length; j++){
            this.BrandStoresTreeItems =  { text: ChildArray[0][j].AS_DEALERNAME, value:ChildArray[0][j].AS_CORA_ACCT_CODE};
            this.BrandStoresTreeItemsAry.push(this.BrandStoresTreeItems);
         }
        const  BrandStoresCategoryItems=this.BrandStoresTreeItemsAry.map((item) => {
           return new TreeviewItem(item);  });
           this.BrandTreeItems =  { text: this.GetBrands[i].brand_name, value: this.GetBrands[i].brand_id, children:BrandStoresCategoryItems};
        this.BrandTreeItemsAry.push(this.BrandTreeItems);
      } 
      
    }
onFilterChange(value: string) {
  // console.log('filter:', value);
}
}


