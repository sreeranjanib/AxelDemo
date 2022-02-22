import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-variables',
  templateUrl: './global-variables.component.html',
  styleUrls: ['./global-variables.component.scss']
})

export class GlobalVariablesComponent implements OnInit {
  public g_SelectedMenuItem: any = "";
  public g_FullNameDisplay : any = "";
  public g_UserTitle: any = "";
  public SideMenu : boolean;
  public isSideMenu_Disabled : any = "N";
  public ReportId : any=0;
  public g_ReportUrl = '';
  public g_ReportUserId =0;
  constructor() { }

  ngOnInit() {
  }

}
