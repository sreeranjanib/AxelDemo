import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_providers/api-service/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DatePipe } from '@angular/common'
import { GlobalVariablesComponent } from 'src/app/global-variables/global-variables.component';

@Component({
  selector: 'app-service-contract-form',
  templateUrl: './service-contract-form.component.html',
  styleUrls: ['./service-contract-form.component.scss']
})
export class ServiceContractFormComponent implements OnInit {

  VehicleDet: FormGroup;
  ReasonsForCancel: FormGroup;
  ContractType: FormGroup;
  RefundDet: FormGroup;

  cancellationData: any[];
  vehicleyear: any = [];
  vehiclemake: any = [];
  vehiclemodel: any = [];
  stores: any = [];
  states: any = [];

  CollectInfo = 'N';

  dtofcntrct: any;
  dtofcnclton: any;
  uploadcontract: any
  ContractName: any;
  uploadreason: any;
  reasonName: any;
  outstandingLoan:any;

  constructor(private router: Router, private api: ApiService, private fB: FormBuilder, private location: Location, private globalVarComponent: GlobalVariablesComponent, private datepipe: DatePipe) {
    this.VehicleDet = this.fB.group({
      firstName: [''],
      lastName: [''],
      phone: [''],
      emailid: [''],
      sellingDealership: [''],
      contract: [''],
      vin: [''],
      year: ['0'],
      make: ['0'],
      model: ['0'],
      dateOfContract: [''],
      dateOfCancellation: [''],
      mileage: [''],
    });
    this.ReasonsForCancel = this.fB.group({
      customerRequest: [''],
      vehicleSold: [true],
      repossession: [''],
      satisfiedLien: [''],
      totalLossofVehicle: [''],
      other: [''],
      otheretext: [''],
      // upload: [''],

    });
    this.ContractType = this.fB.group({
      type: ['0'],
      vehicleServiceContract: [''],
      gap: [''],
      ancillary: [''],
      ancillaryType: [''],
      uploadContract: [''],

    });
    this.RefundDet = this.fB.group({
      contractOwner: [''],
      address: [''],
      city: [''],
      state: ['0'],
      zip: [''],
      ach: [''],
      bankName: [''],
      routing: [''],
      acct: [''],
      outstandingLoan: [''],
      reqExpedited: [''],
      approveExpedited: [''],
      agreeCancellationTerms: [''],
      customerSignchk: [''],
      customersign: [''],
      acknowledge: [''],
    });

  }

  ngOnInit() {
    this.globalVarComponent.SideMenu = false;
    this.globalVarComponent.isSideMenu_Disabled = "Y";
    this.cancellationList()
    this.getyear();
    this.getstores();
    this.getStates();

  }
  getStates() {
    const obj = {}
    this.api.postmethod('CancellationForm/GetStates', obj).subscribe(res => {
      console.log('store', res.response.recordset)
      this.states = res.response.recordset
    })
  }
  getstores() {
    const obj = {
      as_id: ''
    }
    this.api.postmethod('CancellationForm/GetStores', obj).subscribe(res => {
      console.log('store', res.response.recordset)
      this.stores = res.response.recordset
    })
  }
  getyear() {
    const obj = {
      y_id: ''
    }
    this.api.postmethod('CancellationForm/GetYears', obj).subscribe(res => {
      console.log('year', res)
      this.vehicleyear = res.response.recordset
      console.log('year', this.vehicleyear)

    })

  }
  getmake(year) {
    if (this.VehicleDet.value.year.length > 0) {
      const obj = {
        d_year: year
      }
      this.api.postmethod('CancellationForm/GetMake', obj).subscribe(res => {
        console.log('make', res)
        this.vehiclemake = res.response.recordset
      })
    }
  }

  getmodel(year, make) {

    const obj = {
      division_id: make,
      year: year
    }
    this.api.postmethod('CancellationForm/GetModel', obj).subscribe(res => {
      console.log('model', res)
      this.vehiclemodel = res.response.recordset
    })


  }
  
  PreviousUrl() {
    this.location.back();
  }

  cancellationList() {
    console.log('cancel')
    const obj = {};
    this.cancellationData = [];
    this.api.postmethod('CancellationForm/GetServiceCancellations', obj).subscribe(res => {
      console.log(res)
      this.cancellationData = res.response.recordset
      console.log(this.cancellationData)
    });



  }






  openform(data) {
    this.dtofcnclton = this.datepipe.transform(data.CANCELLATION_DATE, 'yyyy-MM-dd')
    this.dtofcntrct = this.datepipe.transform(data.CONTRACT_DATE, 'yyyy-MM-dd')
    this.uploadcontract='http://swickardapi.axelautomotive.com/api/resources/images/'+data.CF_CONTRACTTYPE_UPLOADFILE
    this.uploadreason='http://swickardapi.axelautomotive.com/api/resources/images/'+data.CF_REASON_UPLOADFILE
    this.ContractName=data.CF_CONTRACTTYPE_UPLOADFILE
    this.reasonName=data.CF_REASON_UPLOADFILE
    if(data.CF_REFUND_ISEXISTSOUTSTANDINGLOAN!=null){
      if(data.CF_REFUND_ISEXISTSOUTSTANDINGLOAN=='Y'){
        this.outstandingLoan='Y'
      }
      else{
        this.outstandingLoan='N'
      }
    }
    else{
      this.outstandingLoan=''
    }
    if (data.CF_REFUND_ACH == 'Y') {
      this.CollectInfo = 'Y'
    }
    else {
      this.CollectInfo = 'N'
    }
    this.getmake(data.CF_YEAR)
    this.getmodel(data.CF_YEAR, data.CF_MAKE)
    console.log(data)
    this.VehicleDet = this.fB.group({
      firstName: [data.CF_CUST_FIRSTNAME],
      lastName: [data.CF_CUST_LASTNAME],
      phone: [data.CUST_PHONE],
      emailid: [data.CUST_EMAILID],
      sellingDealership: [data.CF_AS_ID],
      contract: [data.CONTRACT_NUM],
      vin: [data.CUST_VIN],
      year: [data.CF_YEAR],
      make: [data.CF_MAKE],
      model: [data.CF_MODEL],
      dateOfContract: [this.dtofcntrct],
      dateOfCancellation: [this.dtofcnclton ],
      mileage: [data.CF_MILEAGEATCANCELLATION],
    });
    this.ReasonsForCancel = this.fB.group({
      customerRequest: [data.CF_REASON_CUSTOMER == 'Y' ? true : false],
      vehicleSold: [data.CF_REASON_VEHICLESOLD == 'Y' ? true : false],
      repossession: [data.CF_REASON_REPOSSESSION == 'Y' ? true : false],
      satisfiedLien: [data.CF_REASON_SATISFIEDLIEN == 'Y' ? true : false],
      totalLossofVehicle: [data.CF_REASON_TOTALLOSS == 'Y' ? true : false],
      other: [data.CF_REASON_OTHER == 'Y' ? true : false],
      otheretext: [data.CF_REASON_OTHERTEXT],
      // upload: [''],

    });
    this.ContractType = this.fB.group({
      type: [data.CONTRACT_TYPE],
      vehicleServiceContract: [data.CF_CONTRACTTYPE_VSC == 'Y' ? true : false],
      gap: [data.CF_CONTRACTTYPE_GAP == 'Y' ? true : false],
      ancillary: [data.CF_CONTRACTTYPE_ANCILLARY == 'Y' ? true : false],
      ancillaryType: [data.CF_CONTRACTTYPE_ANCILLARYTEXT],
      uploadContract: [''],

    });
    this.RefundDet = this.fB.group({
      contractOwner: [data.CF_CONTRACTOWNER],
      address: [data.CF_ADDRESS],
      city: [data.CF_CITY],
      state: [data.CF_STATE],
      zip: [data.CF_ZIP],
      ach: [data.CF_REFUND_ACH == 'Y' ? true : false],
      bankName: [data.CF_REFUND_ACH_BANKNAME],
      routing: [data.CF_REFUND_ACH_ROUTING_NUM],
      acct: [data.CF_REFUND_ACH_ACCOUNT_NUM],
      outstandingLoan: [this.outstandingLoan],
      reqExpedited: [data.CF_REFUND_PROCESSINGFEE == 'Y' ? true : false],
      approveExpedited: [data.CF_REFUND_PROCESSINGFEE_APPROVE == 'Y' ? true : false],
      agreeCancellationTerms: [data.CF_REFUND_TERMSAGGREEMENT == 'Y' ? true : false],
      customerSignchk: [true],
      customersign: [''],
      acknowledge: [true],
    });

  }
  save() {

  }


}
