import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-metric-detail',
  templateUrl: './metric-detail.component.html',
  styleUrls: ['./metric-detail.component.scss']
})
export class MetricDetailComponent implements OnInit {
  data: any[] = [];
  loading: boolean;
  error: boolean;

  constructor(public dialogRef: MatDialogRef<MetricDetailComponent>, private  httpClient: HttpClient,
              @Inject(MAT_DIALOG_DATA) public dataDiag: any) { }

  ngOnInit(): void {
    console.log('dialog data', this.dataDiag);
    if (this.dataDiag) {
      this.initialState();
    } else {
      this.error = true;
    }
  }

  initialState(): void {
    this.loading = true;
    this.httpClient.get(`https://www.indecon.online/values/${this.dataDiag.key}`).subscribe((resp: any) => {
      if (resp) {
        console.log('resp diag', resp);
        this.data = resp;
        this.data = Object.keys(resp).map( key =>  resp[key]);
      } else {
        this.error = true;
      }
      this.loading = false;
    }, (err) => {
      this.error = true;
      this.loading = false;
      console.log('Error:', err);
    });
  }

}
