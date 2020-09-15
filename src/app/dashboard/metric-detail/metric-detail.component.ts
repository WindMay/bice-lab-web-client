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

  // Chart Related
  chartOptions = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MMM D',
            },
          },
        },
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: this.dataDiag.key,
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  constructor(public dialogRef: MatDialogRef<MetricDetailComponent>, private  httpClient: HttpClient,
              @Inject(MAT_DIALOG_DATA) public dataDiag: any) { }

  ngOnInit(): void {
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
        this.data = resp;
        this.data = Object.keys(resp.values)
          .map( key =>
            ({x: new Date(parseInt(key, 10) * 1000), y: resp.values[key]}));
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
