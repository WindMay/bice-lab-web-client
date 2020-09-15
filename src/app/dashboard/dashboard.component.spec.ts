import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ChartsModule} from 'ng2-charts';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

export const MOCK_RESPONSE = {
  cobre: {
    key: 'cobre',
    name: 'Precio del Cobre, dólares por libra',
    unit: 'dolar',
    date: 1584489600,
    value: 2.39
  },
  dolar: {
    key: 'dolar',
    name: 'Dólar observado',
    unit: 'pesos',
    date: 1598832000,
    value: 779.92
  },
  euro: {
    key: 'euro',
    name: 'Euro',
    unit: 'pesos',
    date: 1584489600,
    value: 938.42
  },
  ipc: {
    key: 'ipc',
    name: 'Indice de Precios al Consumidor (Var. c/r al período anterior)',
    unit: 'porcentual',
    date: 1577836800,
    value: 1.1
  },
  ivp: {
    key: 'ivp',
    name: 'Indice de valor promedio',
    unit: 'pesos',
    date: 1586390400,
    value: 29706.22
  },
  oro: {
    key: 'oro',
    name: 'Precio del Oro, dólares por onza',
    unit: 'dolar',
    date: 1584576000,
    value: 1473.2
  },
  plata: {
    key: 'plata',
    name: 'Precio de la Plata, dólares por onza',
    unit: 'dolar',
    date: 1584576000,
    value: 11.69
  },
  uf: {
    key: 'uf',
    name: 'Unidad de fomento',
    unit: 'pesos',
    date: 1599609600,
    value: 28687.77
  },
  utm: {
    key: 'utm',
    name: 'Unidad tributaria mensual',
    unit: 'pesos',
    date: 1583020800,
    value: 50021
  },
  yen: {
    key: 'yen',
    name: 'Yen',
    unit: 'dolar',
    date: 1584489600,
    value: 107.33
  }
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let baseService: HttpClient;
  let spy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        DashboardRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        HttpClientModule,
        CommonModule,
        MatCardModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        ChartsModule],
      declarations: [ DashboardComponent ],
      providers: [provideMockStore()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    baseService = TestBed.get(HttpClient);
    spy = spyOn(baseService, 'get').and.returnValue(of(MOCK_RESPONSE));

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display n cards for each metric from MOCK_RESPONSE', () => {
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('mat-card.example-card')).length;
    expect(Object.keys(MOCK_RESPONSE).length).toBe(cards);
  });

  it('should display an Error message when api call fails', () => {
    spy.and.returnValue(of(null));
    fixture.detectChanges();
    const error = fixture.debugElement.queryAll(By.css('.error-msg')).length;
    expect(error).toBe(1);
  });

  it('should recover after and error display and initialState invoked from retry button', () => {
    spy.and.returnValue(of(null));
    fixture.detectChanges();
    const error = fixture.debugElement.queryAll(By.css('.error-msg')).length;
    spy.and.returnValue(of(MOCK_RESPONSE));
    component.initialState();
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('mat-card.example-card')).length;
    expect(error === 1 && Object.keys(MOCK_RESPONSE).length).toBeTruthy();
  });
});
