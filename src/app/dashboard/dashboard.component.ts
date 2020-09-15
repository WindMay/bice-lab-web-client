import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState, Logout} from '../store/auth/auth.actions';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MetricDetailComponent} from './metric-detail/metric-detail.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any[] = [];
  loading: boolean;
  error: boolean;

  constructor( private store: Store<AuthState>, private router: Router, private  httpClient: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initialState();
  }

  initialState(): void {
    this.loading = true;
    this.httpClient.get('https://www.indecon.online/last').subscribe((resp: any) => {
      if (resp) {
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

  getDate(date: number): Date {
    return new Date(date * 1000);
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.store.dispatch(new Logout());
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(MetricDetailComponent, {width: '70%', data});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
