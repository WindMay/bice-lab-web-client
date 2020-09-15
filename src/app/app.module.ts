import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppRoutingModule} from './router/app-routing.module';
import {RouterSerializer} from './router/router.serializer';
import {LostComponent} from './lost/lost.component';
import {ShopReducer} from './store/auth/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/auth/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    LostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      router: routerReducer,
      auth: ShopReducer
    }),
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      logOnly: true, // Restrict extension to log-only mode
    }),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer,
    }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
