import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {AboutRoutingModule} from './login-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [AboutRoutingModule]
})
export class LoginModule {}
