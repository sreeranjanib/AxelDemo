import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { LoginModel } from '../../_models/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { TreeviewItem } from 'ngx-treeview';


const headersData ={ headers: new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})};
 

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  CoraCodes = new BehaviorSubject(''); 
  RoleId = new BehaviorSubject(0);//0 is the initial value. 
  Default_Rolebased_Pagename = new BehaviorSubject('');
  g_SideMenu = new BehaviorSubject([]);
  FullSideMenu = new BehaviorSubject([]);
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  Postmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.ApiUrl}${endpoint}`, obj)
    .pipe(map(
      (res: any) => {
      return res;
    }));
    }
    AXELPostmethod(endpoint: string, obj: object): Observable<any> {
      return this.http.post(`${environment.AXELapiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
        return res;
      }));
      }
    DMSpostmethod(endpoint: string, obj: object): Observable<any> {
      return this.http.post(`${environment.DMSapiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
        return res;
      }));
      } 
      AXELDeletemethod(obj,modname){
        return this.http.request('delete', `${environment.AXELapiUrl}`+modname, { body: obj });
      }
      UserDataMethod(endpoint: string, obj: object): Observable<any> {
        return this.http.post(`${environment.USerDataApiUrl}${endpoint}`, obj)
        .pipe(map(
          (res: any) => {
          return res;
        }));
        }
      // Login(userName: string, psword: string, logindet: object): Observable<any> {
      //   const httpheadrs = new HttpHeaders({ 'USERNAME': userName, 'PASSWORD': psword, 'Content-Type':'application/json; charset=utf-8' });
      //   return this.http.post(`${environment.AXELapiUrl}Login/UserLogin`, JSON.stringify(logindet), { headers: httpheadrs }).pipe(map((response: Response) => {
      //     return response;
      //   }));
      // }
      // login(model: LoginModel) {
      //   return this.http.post(`${environment.AXELapiUrl}Login/UserLogin`, model);
      // }
      getCoraVals(): Observable<any> {
        return this.CoraCodes.asObservable();
    }

    setCoraVals(Codes: any) {
        this.CoraCodes.next(Codes);
    }
    getRoleID(): Observable<any> {
      return this.RoleId.asObservable();
      // console.log("Get", this.RoleId);
  }
  setRoleID(Codes: any) {
      this.RoleId.next(Codes);
      // console.log("Set", this.RoleId);
  }

  getPageName(): Observable<any> {
    return this.Default_Rolebased_Pagename.asObservable();
}
  setPagename(Pagename: any) {
    this.Default_Rolebased_Pagename.next(Pagename);
}
getSideMenu(): Observable<any> {
  return this.g_SideMenu.asObservable();
}
setSideMenu(Sidemenu_list: any) {
  this.g_SideMenu.next(Sidemenu_list);
}
getFullSideMenu(): Observable<any> {
  return this.FullSideMenu.asObservable();
}
setFullSideMenu(FullSidemenu_list: any) {
  this.FullSideMenu.next(FullSidemenu_list);
}
postmethod(url: string, obj: object): Observable<any> {

  return this.http.post(`${environment.CustomerSwickardUrl}${url}`, obj)

    .pipe(map(

      (res: Response) => {

        return res;

      }));

}

}
