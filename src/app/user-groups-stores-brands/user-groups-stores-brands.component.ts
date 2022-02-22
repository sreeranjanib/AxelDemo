import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../_providers/api-service/api.service';

@Component({
  selector: 'app-user-groups-stores-brands',
  templateUrl: './user-groups-stores-brands.component.html',
  styleUrls: ['./user-groups-stores-brands.component.scss']
})
export class UserGroupsStoresBrandsComponent implements OnInit {
  Roles: any = [];
  Locations: any = [];
  constructor(private authService: ApiService,private router: Router) { }

  ngOnInit() {
    this.getRoles();
    this.StoresData();
  }
  getRoles() {
    const obj={
      "ID":0,
      "NAME":"",
      "STATUS":"",
      "StartCnt":0
    }
      this.authService.AXELPostmethod('Login/GetRolesData',obj).subscribe((roleData: any) => {
     if (roleData.status == 200) {
       this.Roles = roleData.response.recordset; 
      // console.log(this.Roles)    
     }
   }, err => {

   })
 }
 StoresData(){
  const obj = { };
  this.authService.AXELPostmethod('Group/GetDealershipNamesDD',obj).subscribe(x =>{
    if(x !== ''){
      this.Locations=x.response.recordset;
     // console.log("Errors", this.Locations);
    }
    });
}

}
