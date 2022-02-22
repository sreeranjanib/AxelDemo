import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nightly-tabs',
  templateUrl: './nightly-tabs.component.html',
  styleUrls: ['./nightly-tabs.component.scss']
})
export class NightlyTabsComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }
  TabClick(event){
    if(event == "1"){
      this.router.navigate(['NightlyReportSales']);
    }
    else if(event == "5"){
      this.router.navigate(['NightlyReportDeals']);
    }
  }

}
