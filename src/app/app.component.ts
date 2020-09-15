import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState, getAuthState} from './store/auth/auth.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<AuthState>) {
    this.store.select(getAuthState).subscribe((data: AuthState) => {
      console.log('app sub');
      console.log(data);
    });
  }
}
