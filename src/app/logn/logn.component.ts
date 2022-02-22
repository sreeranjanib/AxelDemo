import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../_models/login';
import { ApiService } from '../_providers/api-service/api.service';

@Component({
  selector: 'app-logn',
  templateUrl: './logn.component.html',
  styleUrls: ['./logn.component.scss']
})
export class LognComponent implements OnInit {
  username: any = '';
  password: any = '';
  constructor(private authService: ApiService,private router: Router) { }

  ngOnInit() {
    // if(localStorage.getItem('LoginUserId')) {
    //   this.router.navigate(['/SalesOverview']);
    // }
  }
  islogin() {
    const loginModel = new LoginModel(this.username, this.password);
    // this.authService.login(loginModel).subscribe((x: any) => {
      
    //   if (x.status === 200) {
    //     const UserFull_Name = x.response[0].U_FULL_NAME
    //     const LoginUserId = x.response[0].U_ID
    //     localStorage.setItem('LoginUserId', LoginUserId);
    //     localStorage.setItem('FirstName', x.response[0].U_FIRST_NAME);
    //     localStorage.setItem('LastName', x.response[0].U_LAST_NAME);
    //     localStorage.setItem('FullName', UserFull_Name);
    //     localStorage.setItem('RoleId', x.response[0].U_ROLEID);
    //     console.log("Name", UserFull_Name);
    //     this.router.navigate(['/SalesOverview']);
    //   }
    //   else {
    //     alert(x.message);
    //   }
    // });
  }
  
  
}
