import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_providers/api-service/api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ExcelService } from 'src/app/excel.service';

@Component({
  selector: 'app-cv-vehicles',
  templateUrl: './cv-vehicles.component.html',
  styleUrls: ['./cv-vehicles.component.scss']
})
export class CVVehiclesComponent implements OnInit {
  public Dealer_DD: any =[];
  DEALER_Change: any=0;
  Showbuttons :boolean = false;
  isDisabled : any = true;
  vehicledata:any=[];
  recid:any ='';
  editbutton:boolean = true;
  updatebutton:boolean = false;
  cartype:any;



  constructor(private authService: ApiService, private spinnerService: Ng4LoadingSpinnerService,
    private excelService:ExcelService) { }

  ngOnInit() {
    this.DealerDropDown();
    this.GridBind();
  }

  DealerDropDown(){
    const obj = { 
      "AU_ID" : localStorage.getItem('User_ID')
     };
    this.authService.AXELPostmethod('AXELData/GetCorporatesbyUser',obj).subscribe(x =>{
      if(x !== ''){
        this.Dealer_DD=x.response.recordset;
        console.log("Errors", this.Dealer_DD);
      }
      });
  }
  DealerChange(newValue){
    this.DEALER_Change = newValue.target.value;
    this.recid = '';
    this.GridBind();
  }

  GridBind() {
   const obj={
    "ACTION":"R",
     "AS_ID":0,
     "AMC_ID":'',
     "Remark":""
   }
   console.log(obj,'obj')
   this.spinnerService.show();
   this.authService.getgrid(obj).subscribe((x:any) =>{
    console.log('response', x)
    if (x.status == 200) {
    
      for(const i  in x.response.recordset)
      this.vehicledata.push(x.response.recordset[i]) ;
      console.log(this.vehicledata)
    
  }
    this.spinnerService.hide();
   });
   
}
// editCarType(item){
//   console.log(item)
//   this.recid = item;
//   this.Showbuttons = true;
//   this.isDisabled  = false;
//   this.editbutton = false;
//   this.updatebutton = true;
// }
// Update(){
//   this.cartype = (<HTMLInputElement>document.getElementById("cartype")).value;
//   this.editbutton = true;
//   this.updatebutton = false;
//   const obj={
//     "ACTION":"U",
//      "AS_ID":this.DEALER_Change,
//      "AMC_ID":this.recid,
//      "Remark":this.cartype
//    }
//    console.log(obj,'updateobj')
//    this.spinnerService.show();
//    this.authService.getgrid(obj).subscribe((x:any) =>{
//     console.log('updateresponse', x)
//     if (x.status == 200) {
//       alert(x.response);
//      this.GridBind();
//      this.recid ='';
//     }
//    })
//    this.spinnerService.hide();

// }

// cancel(){
//   this.recid = '';
// }

exportAsXLSX() {
   this.excelService.exportAsExcelFile(this.vehicledata, 'CV_Vehicles_report');
}
}
