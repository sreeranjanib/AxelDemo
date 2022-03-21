import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AccountsCOAComponent } from './ADMIN/accounts-coa/accounts-coa.component';
import { AdminModulesComponent } from './ADMIN/admin-modules/admin-modules.component';
import { PermissionsComponent } from './ADMIN/permissions/permissions.component';
import { RolesComponent } from './ADMIN/roles/roles.component';
import { UsersComponent } from './ADMIN/users/users.component';
import { ChromeDataComponent } from './chrome-data/chrome-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataDictionaryComponent } from './data-dictionary/data-dictionary.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { DeniedAccessComponent } from './denied-access/denied-access.component';
import { FiltersPopupComponent } from './filters-popup/filters-popup.component';
import { GroupsStoresComponent } from './groups-stores/groups-stores.component';
import { GroupsComponent } from './groups/groups.component';
import { InvOverviewComponent } from './inv-overview/inv-overview.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LognComponent } from './logn/logn.component';
import { MaloneyReportComponent } from './maloney-report/maloney-report.component';
import { SalesReportComponent } from './Nightly/sales-report/sales-report.component';
import { PageNotFound401Component } from './page-not-found401/page-not-found401.component';
import { PageNotFound404Component } from './page-not-found404/page-not-found404.component';
import { SAGComponent } from './sag/sag.component';
import { SalesServiceOverviewComponent } from './sales-service-overview/sales-service-overview.component';
import { ServiceAppComponent } from './service-app/service-app.component';
import { ServiceAppointmentObjectiveComponent } from './service-appointment-objective/service-appointment-objective.component';
import { ServiceAppointmentsComponent } from './service-appointments/service-appointments.component';
import { StoreBrandsComponent } from './store-brands/store-brands.component';
import { StoresComponent } from './stores/stores.component';
import { TestCOAComponent } from './test-coa/test-coa.component';
import { TestSAGComponent } from './test-sag/test-sag.component';
import { UserGroupsStoresBrandsComponent } from './user-groups-stores-brands/user-groups-stores-brands.component';
import { VAutoDataQueryComponent } from './vauto-data-query/vauto-data-query.component';
import { VAutoInventoryComponent } from './vauto-inventory/vauto-inventory.component';
import { ReportAccessingComponent } from './report-accessing/report-accessing.component';
import { VehicleSalesCurrentMonthReportComponent } from './vehicle-sales-current-month-report/vehicle-sales-current-month-report.component';
import { ApiService } from './_providers/api-service/api.service';
import { DealsComponent } from './Nightly/deals/deals.component';
import { InventoryRawDataComponent } from './inventory-raw-data/inventory-raw-data.component';
import { NightlySummeryVariablesComponent } from './nightly-summery-variables/nightly-summery-variables.component';
import { KioskReportComponent } from './kiosk-report/kiosk-report.component';
import {FinancialSummaryReportComponent } from './financial-summary-report/financial-summary-report.component';
import { ServiceContractFormComponent } from './ADMIN/Service-Contract/service-contract-form/service-contract-form.component';
import { CVVehiclesComponent } from './cv-vehicles/cv-vehicles.component';
import { AccountCoaComponent } from './account-coa/account-coa.component';


const routes: Routes = [
  
  { path: '', redirectTo: "Default", pathMatch: 'full'},
  { path:"SalesOverview", component:DashboardComponent },
  { path:"Inventory", component:InventoryComponent },
  { path:"InventoryOverview", component:InvOverviewComponent },
  { path:"SalesServiceOverview", component:SalesServiceOverviewComponent },
  // { path:"ServiceAppointments", component:ServiceAppointmentsComponent },
  { path:"AppointmentsObjectives", component:ServiceAppointmentObjectiveComponent },
  { path:"SAGReport", component:SAGComponent },
  { path:"MaloneyReport", component:ServiceAppointmentsComponent },
  { path:"Admin/AccountsCOA", component:AccountsCOAComponent },
  { path:"Admin/Roles", component:RolesComponent },
  { path:"Admin/Modules", component:AdminModulesComponent },
  { path:"Admin/Users", component:UsersComponent },
  { path:"VehicleSalesCurrentMonthReport", component:VehicleSalesCurrentMonthReportComponent },
  { path:"Admin/Permissions", component:PermissionsComponent },
  { path:"UserAuthentication", component:DeniedAccessComponent },
  { path:"UserAuthentication/:Name", component:DeniedAccessComponent },
  { path:"Groups", component:GroupsComponent },
  { path:"GroupsStores", component:GroupsStoresComponent },
  { path:"UserGroupsStoresBrands", component:UserGroupsStoresBrandsComponent },
  { path:"StoreBrands", component:StoreBrandsComponent },
  { path:"FiltersPopup", component:FiltersPopupComponent },
  { path:"ServiceAppointments" , component:MaloneyReportComponent },
  { path:"Default" , component:DefaultPageComponent },
  { path:"404Error" , component:PageNotFound404Component },
  { path:"401Error" , component:PageNotFound401Component },
  { path:"TestServiceApp" , component:ServiceAppComponent },
  { path:"TestSAG" , component:TestSAGComponent },
  { path:"TestCOA" , component:TestCOAComponent },
  { path:"ChromeData" , component:ChromeDataComponent },
  { path:"DataDictionary" , component:DataDictionaryComponent },
  { path:"VAutoInventoryOverview" , component:VAutoInventoryComponent },
  { path:"VAutoDataQuery" , component:VAutoDataQueryComponent },
  { path:"Stores" , component:StoresComponent },
  // { path:"NightlyReport/:Id/:ReportId/:ReportDate" , component:SalesReportComponent },
  { path:"NightlyReport/:Id" , component:SalesReportComponent },
  { path:"ReportAccessing" , component:ReportAccessingComponent },
  { path:"NightlyReportSales" , component:SalesReportComponent },
  { path:"NightlyReportDeals" , component:DealsComponent },
  { path: 'InvRawData', component:InventoryRawDataComponent},
  { path: 'NightlySummaryVariables', component:NightlySummeryVariablesComponent },
  { path: 'KioskReport', component:KioskReportComponent },
  { path: 'FinancialSummary', component:FinancialSummaryReportComponent},
  { path: 'ServiceContractForm', component:ServiceContractFormComponent},
  { path: 'CVVehicles', component:CVVehiclesComponent },
  { path: 'AccountCoa', component:AccountCoaComponent},
  // { path:"Login", component:LognComponent },
  {
    path: '**',
    redirectTo: '401Error',
    pathMatch: 'full',
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: false , onSameUrlNavigation: 'reload'})],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
