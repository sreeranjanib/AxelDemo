import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InvOverviewComponent } from './inv-overview/inv-overview.component';
import { SalesServiceOverviewComponent } from './sales-service-overview/sales-service-overview.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ServiceAppointmentsComponent } from './service-appointments/service-appointments.component';
import { ServiceAppointmentObjectiveComponent } from './service-appointment-objective/service-appointment-objective.component';
import { LognComponent } from './logn/logn.component';
import { SAGComponent } from './sag/sag.component';
import { AccountsCOAComponent } from './ADMIN/accounts-coa/accounts-coa.component';
import { RolesComponent } from './ADMIN/roles/roles.component';
import { AdminModulesComponent } from './ADMIN/admin-modules/admin-modules.component';
import { UsersComponent } from './ADMIN/users/users.component';
import { VehicleSalesCurrentMonthReportComponent } from './vehicle-sales-current-month-report/vehicle-sales-current-month-report.component';
import { PermissionsComponent } from './ADMIN/permissions/permissions.component';
import { DeniedAccessComponent } from './denied-access/denied-access.component';
import { ExcelService } from './excel.service';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupsStoresComponent } from './groups-stores/groups-stores.component';
import { UserGroupsStoresBrandsComponent } from './user-groups-stores-brands/user-groups-stores-brands.component';
import { StoreBrandsComponent } from './store-brands/store-brands.component';
import { TreeviewModule } from 'ngx-treeview';
import { FiltersPopupComponent } from './filters-popup/filters-popup.component';
import { MaloneyReportComponent } from './maloney-report/maloney-report.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { PageNotFound404Component } from './page-not-found404/page-not-found404.component';
import { PageNotFound401Component } from './page-not-found401/page-not-found401.component';
import { ServiceAppComponent } from './service-app/service-app.component';
import { TestSAGComponent } from './test-sag/test-sag.component';
import { TestCOAComponent } from './test-coa/test-coa.component';
import { GlobalVariablesComponent } from './global-variables/global-variables.component';
import { ChromeDataComponent } from './chrome-data/chrome-data.component';
import { DataDictionaryComponent } from './data-dictionary/data-dictionary.component';
import { VAutoInventoryComponent } from './vauto-inventory/vauto-inventory.component';
import { VAutoDataQueryComponent } from './vauto-data-query/vauto-data-query.component';
import { StoresComponent } from './stores/stores.component';
import { SalesReportComponent } from './Nightly/sales-report/sales-report.component';
import { FiReportComponent } from './Nightly/fi-report/fi-report.component';
import { Report3Component } from './Nightly/report3/report3.component';
import { ReportAccessingComponent } from './report-accessing/report-accessing.component';
import { NightlyTabsComponent } from './nightly-tabs/nightly-tabs.component';
import { DealsComponent } from './Nightly/deals/deals.component';
import { InventoryRawDataComponent } from './inventory-raw-data/inventory-raw-data.component';
import { NightlySummeryVariablesComponent } from './nightly-summery-variables/nightly-summery-variables.component';
import { KioskReportComponent } from './kiosk-report/kiosk-report.component';
import { DatePipe } from '@angular/common';
import { FinancialSummaryReportComponent } from './financial-summary-report/financial-summary-report.component';
import { ServiceContractFormComponent } from './ADMIN/Service-Contract/service-contract-form/service-contract-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    InventoryComponent,
    InvOverviewComponent,
    SalesServiceOverviewComponent,
    ServiceAppointmentsComponent,
    ServiceAppointmentObjectiveComponent,
    LognComponent,
    SAGComponent,
    AccountsCOAComponent,
    RolesComponent,
    AdminModulesComponent,
    UsersComponent,
    VehicleSalesCurrentMonthReportComponent,
    PermissionsComponent,
    DeniedAccessComponent,
    SideMenuComponent,
    GroupsComponent,
    GroupsStoresComponent,
    UserGroupsStoresBrandsComponent,
    StoreBrandsComponent,
    FiltersPopupComponent,
    MaloneyReportComponent,
    DefaultPageComponent,
    PageNotFound404Component,
    PageNotFound401Component,
    ServiceAppComponent,
    TestSAGComponent,
    TestCOAComponent,
    GlobalVariablesComponent,
    ChromeDataComponent,
    DataDictionaryComponent,
    VAutoInventoryComponent,
    VAutoDataQueryComponent,
    StoresComponent,
    SalesReportComponent,
    FiReportComponent,
    Report3Component,
    ReportAccessingComponent,
    NightlyTabsComponent,
    DealsComponent,
    InventoryRawDataComponent,
    NightlySummeryVariablesComponent,
    KioskReportComponent,
    FinancialSummaryReportComponent,
    ServiceContractFormComponent
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    TreeviewModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot()
  ],
 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
  providers: [ExcelService, GlobalVariablesComponent, DatePipe]
})
export class AppModule { }
