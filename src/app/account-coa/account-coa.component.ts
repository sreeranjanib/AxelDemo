import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_providers/api-service/api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient, HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-account-coa',
  templateUrl: './account-coa.component.html',
  styleUrls: ['./account-coa.component.scss']
})
export class AccountCoaComponent implements OnInit {
  
  progress: number;
  data: AOA = [
    ['select file']
  ];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  constructor(
    private authService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService,private http: HttpClient
  ) { }

  ngOnInit() {

  }
  onFileChange(evt: any) {
    this.progress = 1;
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      // this.progress = Math.round((100 / e.total) * e.loaded);
   
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[1];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
        this.data = <AOA>XLSX.utils.sheet_to_json(ws,{header:1});
     console.log(this.data.length);
     let convertedJson = JSON.stringify(this.data);
     console.log(convertedJson);
    };
    reader.readAsBinaryString(target.files[0]);
     
  }
  
  // upload(file) {
  //   this.progress = 1;
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   this.http
  //     .post("yout-url-here", formData, {
  //       reportProgress: true,
  //       observe: "events"
  //     })
  //     .pipe(
  //       map((event: any) => {
  //         if (event.type == HttpEventType.UploadProgress) {
  //           this.progress = Math.round((100 / event.total) * event.loaded);
  //         } else if (event.type == HttpEventType.Response) {
  //           this.progress = null;
  //         }
  //       }),
  //       catchError((err: any) => {
  //         this.progress = null;
  //         alert(err.message);
  //         return throwError(err.message);
  //       })
  //     )
  //     .toPromise();
  // }
}

