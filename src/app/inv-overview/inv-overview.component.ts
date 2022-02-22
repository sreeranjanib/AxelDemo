import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../_providers/api-service/api.service';
import { NavigationExtras } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-inv-overview',
  templateUrl: './inv-overview.component.html',
  styleUrls: ['./inv-overview.component.scss']
})
export class InvOverviewComponent implements OnInit {
  public Inventory_Overview:any=[];
  public Inv_Header:any=[];
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
  
  constructor(private authService: ApiService, private router: Router, private _Activatedroute: ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) {
   
   }

  ngOnInit() {
   
    this.GridBind();
  }
  onClick(check){
    //    console.log(check);
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
  // onClick(e) {
  //   this.IsLink_Underline =true;
  //   this.elementClicked = e.target.innerHTML;
  //   if(this.elementClicked == "MTD"){
  //     this.SalesType = 'M';
  //    }
  //    else if(this.elementClicked == "QTD"){
  //     this.SalesType = 'Q';
  //    }
  //    else if(this.elementClicked == "YTD"){
  //     this.SalesType = 'Y';
  //    }
  //    this.GridBind(this.SalesType);
  // }
  GridBind() {
    const obj=
    {};
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetAxelInventoryOverview',obj).subscribe(x =>{
        this.Inventory_Overview = x.response.recordset;
        // this.list_items.splice(this.list_items.length-1, 1);
        
        this.Inv_Header = x.response.recordset[0];
        this.Inventory_Overview.shift();
        this.spinnerService.hide();
        //  console.log("Body", this.Inventory_Overview);
        //  console.log("Header", this.Inv_Header);
         
  });
}
 RedirectToDataQuery(item) {
  let navigationExtras: NavigationExtras = {
    state: {
      Store_Id: item.STORE_ID
    }
  };
  // console.log("StoreID", navigationExtras);
  this.router.navigate(['Inventory'], navigationExtras);
}
SideTabClick(event) {
  if(event == 1.1){
    this.router.navigate(['SalesOverview']);
  }
  else if(event == 2.1){
    this.router.navigate(['InventoryOverview']);
  }
  else if(event == 2.4){
    this.router.navigate(['Inventory']);
  }
  else if(event == 4.1){
    this.router.navigate(['SalesServiceOverview']);
  }
  else if(event == 5.1){
    this.router.navigate(['ServiceAppointments']);
  }
  else if(event == 5.2){
    this.router.navigate(['AppointmentsObjectives']);
  }
  else if(event == 5.3){
    this.router.navigate(['SAGReport']);
  }
  else if(event == 6.1){
    this.router.navigate(['Admin/AccountsCOA']);
  }
}
Close() {
  this.Isinactive = false;
  this.IsDivinactive = false;
}


}

