import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../_providers/api-service/api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-service-appointment-objective',
  templateUrl: './service-appointment-objective.component.html',
  styleUrls: ['./service-appointment-objective.component.scss']
})
export class ServiceAppointmentObjectiveComponent implements OnInit {
  AddObj : FormGroup;
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
  UpdateData: any = {
  MF_Obj: '',
  Sat_Obj: '',
}
  
  constructor(private spinnerService: Ng4LoadingSpinnerService, private formBuilder: FormBuilder, private authService: ApiService, private router: Router, private _Activatedroute: ActivatedRoute) {
  
   this.AddObj = this.formBuilder.group({
    MF_Obj :[''],
    Sat_Obj:['']
 });
  }

  ngOnInit() {
   
    this.GridBind();
  }
  
  GridBind() {
    const obj=
    {};
        this.spinnerService.show();
        this.authService.AXELPostmethod('AXELData/GetAppointmentsObjective',obj).subscribe(x =>{
        this.Service_App_Grid = x.response.recordset;
        // this.Grid_Header = x.response.recordset[x.response.recordset.length - 1]; 
        // this.Service_App_Grid.shift();
        this.spinnerService.hide();
        //  console.log("Body", this.Service_App_Grid);
        //  console.log("Value", this.Service_App_Grid.MF_Objective, this.Service_App_Grid.Sat_Objective);
         
  });
}
SaveObective(id){
  if(this.AddObj.value.Sat_Obj == ''){
    this.AddObj.value.Sat_Obj = -1;
  }
  if(this.AddObj.value.MF_Obj == ''){
    this.AddObj.value.MF_Obj = -1;
  }
  if(this.AddObj.value.MF_Obj == -1  && this.AddObj.value.Sat_Obj == -1){
    alert("Please made change atleast any one objective");
  } else
  {
  const obj = {
      "recId":id,
      "sat_Objective":this.AddObj.value.Sat_Obj, 
      "M_F_Objectice":this.AddObj.value.MF_Obj
      }
      this.spinnerService.show();
      this.authService.AXELPostmethod('AXELData/AppointmentsObjectiveAction',obj).subscribe(x =>{
        
        if (x.status == 200){
          alert("Record updated Sucessfully");
        }
        this.spinnerService.hide();
      });
    }
      
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


