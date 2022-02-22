
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiService } from 'src/app/_providers/api-service/api.service';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';


@Component({
  selector: 'app-report-accessing',
  templateUrl: './report-accessing.component.html',
  styleUrls: ['./report-accessing.component.scss']
})
export class ReportAccessingComponent implements OnInit {
  
  category:any=[];
  percentDone: number;
  uploadSuccess: boolean;
  ReportDate : any;
  ExpiryDate :any;
  UserDropDown : any=[];
  SubModulesData : any=[];
  SelectedUser:"0";
  SelectedModule:"";
  categoryList:any=[];
  parentID:any;
  subCategoryList:any=[];
  isChecked;
  selctdID:any=[];
  pdfStatus :any= 'N';
  
  constructor(private http: HttpClient,private spinnerService: Ng4LoadingSpinnerService, private authService: ApiService, private router: Router, private Userdata: FormBuilder) {
   
   }

  ngOnInit() {
    this.GetUserDropDown();
    this.GetModulesList();
     this.getReportCategry();
  }
 GetUserDropDown(){
    const obj = {
      "Id":0,
      "UserName":""
      }
        this.authService.AXELPostmethod('Login/GetADUsers', obj).subscribe(x =>{
          if (x.status == 200){
            this.UserDropDown = x.response.recordset;
           console.log("Users_Data", x.response.recordset);
          }
          
        });
      }
      categoryChange(event, cat, sub) {
        sub.selected = event.target.checked;
        var items = cat.sub_categories.filter((s) => s.selected);
        cat.selected = items.length > 0;
        alert(sub);
        }
      
  selected(Name, SelectedValue){
    this.SelectedUser = SelectedValue;
    // if(Name == "Username"){
    //   this.SelectedUser = SelectedValue;
    // }
    // else
    // this.SelectedModule = SelectedValue;
  
    
  }
  GetModulesList(){
    const obj = {}
          this.authService.AXELPostmethod('Login/GetAllSubModules', obj).subscribe(x =>{
            if (x.status == 200){
            this.SubModulesData = x.response.recordset;
            console.log("SubModulesData", x.response.recordset);
          }
          });
  }
  Date(Type) {
    if(Type == "ReportDate"){
      this.ReportDate = this.ReportDate.toString();
    }
    else if(Type == "ExpiryDate"){
      this.ExpiryDate = this.ExpiryDate.toString();
    }
    }
    
  upload(files: File[]){
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  basicUpload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('https://file.io', formData)
      .subscribe(event => {  
        console.log('done')
      })
  }
  
  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  basicUploadSingle(file: File){    
    this.http.post('https://file.io', file)
      .subscribe(event => {  
        console.log('done')
      })
  }
  
  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }
  
  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File){    
    this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }
  
  
 getReportCategry(){
   const obj={
    "REPORT_CATEGORY_TYPE":"P",
    "ARC_ID":0
   }
   console.log(obj)
   this.authService.AXELPostmethod('AXELData/GetNightlyReportCategories', obj).subscribe(x =>{
    if (x.status == 200){
    this.categoryList = x.response.recordset;
    console.log("categorylist",this.categoryList);
    for(let i=0;i<this.categoryList.length;i++){
       this.getSubCategory(this.categoryList[i].ARC_ID);
      console.log("subparentID",this.parentID); 
    }
    
  }
  });
  
 }

 getSubCategory(parentID){
  const obj={
    "REPORT_CATEGORY_TYPE":"C",
    "ARC_ID":parentID
   }
   console.log(obj)
   this.authService.AXELPostmethod('AXELData/GetNightlyReportCategories', obj).subscribe(x =>{
    if (x.status == 200){
        this.subCategoryList = x.response.recordset;
        console.log("childrenList",this.subCategoryList);

  }
  });
  }

  checkModule(item,event){
      let target = event.target;
      this.selctdID=[]
      if(target.checked){
       for(let i = 0; i< this.subCategoryList.length;i++){
         if(item.ARC_SUBMOD_ID == this.subCategoryList[i].ARC_SUBMOD_ID){
           this.subCategoryList[i].isChecked="Y";
         }
       }
       this.subCategoryList.forEach(element => {
         if(element.isChecked == "Y"){
          this.arry2.push(element.ARC_ID);
          console.log('arrY',this.arry2)
            var arr = this.arry2.map(i=> element.ARC_SUBMOD_ID+'_'+i);
            this.selctdID = arr;
           
         } 
       });
        // this.selctdID.push(item.ARC_SUBMOD_ID+'_'+element.ARC_ID);
      }
      else{
        for(let i = 0; i< this.subCategoryList.length;i++){
       if(item.ARC_SUBMOD_ID == this.subCategoryList[i].ARC_SUBMOD_ID){
        this.subCategoryList[i].isChecked="N";
       }
      }
      this.subCategoryList.forEach(element => {
        if(element.isChecked == "N"){
          this.arry2.forEach((e,index)=>{
            if(e == element.ARC_ID){
              this.arry2.splice(index,1);
              console.log('arryYRE',this.arry2);
              let arryFilter = this.arry2.filter(function (item, index, inputArray) {
                return inputArray.indexOf(item) == index;
              });
              var arr = arryFilter.map(i=> element.ARC_SUBMOD_ID+'_'+i);
                 console.log('removeselctdID',arryFilter)
                  this.selctdID = arr;
            }
          })
        }
      });
      // this.selctdID.forEach((e, index) => {
      //   if (e ==item.ARC_ID) {
      //     this.selctdID.splice(index, 1)
      //     }
      // });
      }
    }

  arry2 = [];
    checkChild(id, main, evt) {
      //console.log(id);;
      let arry1: any = [];
      let target = evt.target;
      if (target.checked) {
        for (let i = 0; i < this.categoryList.length; i++) {
          if (id.ARC_SUBMOD_ID == this.categoryList[i].ARC_SUBMOD_ID) {
            console.log(this.categoryList[i]);
            id.isChecked = "Y";
            this.categoryList[i].isChecked = "Y";
            
          }
        }
      } else {
         for (let i = 0; i < this.subCategoryList.length; i++) {
          if (main.ARC_SUBMOD_ID == this.subCategoryList[i].ARC_SUBMOD_ID) {
            console.log(this.categoryList[i]);
            arry1.push(this.subCategoryList[i]);
            id.isChecked = "N";
          }
        }
        const allEqual = arr => arr.every(val => val.isChecked === "N");
        const result = allEqual(arry1) // output: false
        result == true ? main.isChecked = "N" : main.isChecked = "Y"
      }

      if (target.checked) {
         this.selctdID = []
        this.subCategoryList.forEach(el => {
          if (el.isChecked == "Y") {
            this.arry2.push(el.ARC_ID);
            console.log('arrY',this.arry2)
              //  var arr = this.arry2;
               let arryFilter = this.arry2.filter(function (item, index, inputArray) {
               return inputArray.indexOf(item) == index;
              });
              console.log('arrY2',arryFilter);
            var arr = arryFilter.map(i=> el.ARC_SUBMOD_ID+'_'+i);
            // console.log('arrY3',arr)
                // this.selctdID.push(arr);
              this.selctdID = arr;
               console.log("check",this.selctdID)

          }
        })
      } else {
        
        this.subCategoryList.forEach(el => {
          if (el.isChecked == "N") {
            this.arry2.forEach((e, index) => {
               if (e == el.ARC_ID) {
                   this.arry2.splice(index, 1);
                  let arryFilter = this.arry2.filter(function (item, index, inputArray) {
                   return inputArray.indexOf(item) == index;
                 });
                 console.log('arrNO',arryFilter);
                // arryFilter.splice(index,1);
                arryFilter.forEach((ele,index)=>{
                  if(ele == el.ARC_ID){
                    arryFilter.splice(index, 1);
                    var arr = arryFilter.map(i=> el.ARC_SUBMOD_ID+'_'+i);
                    console.log('arrNO12',arr);
                     this.selctdID = arr;
                  }
                })
               }
             })
          }
        })
      }
     }
  
  checkPdfStatus(event){
    let target = event.target;
    if(target.checked){
      this.pdfStatus ="Y";
    }else{
      this.pdfStatus = "N";
    }
     }
SaveReport(){
    let selctedID = this.selctdID.filter(function (item, index, inputArray) {
       return inputArray.indexOf(item) == index;
     });
  const obj = {
    "AU_ID":localStorage.getItem('User_ID'),
    "AR_AU_ID":this.SelectedUser,
    "AR_ARC_IDs":selctedID.join(','),
    "AR_REPORT_DATE":this.ReportDate,
    "AR_REPORT_EXPIRY_DATE":this.ExpiryDate,
    "AR_PDF_ATTACH":this.pdfStatus
  }
  console.log('saveobj',obj);
      this.authService.AXELPostmethod('AXELData/CustomizedReportAction', obj).subscribe(x =>{
        console.log('resp',x);
        if (x.status == 200){
        alert("Record Added Successfully.");
      }
     });
 }
}  
