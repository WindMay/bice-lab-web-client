import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LostComponent} from '../lost/lost.component';
import {RouteGuard} from './route-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'lost',
    component: LostComponent
  },
  {
    path: 'protected',
    canActivate: [RouteGuard],
    component: LostComponent
  },
  {
    path: '**',
    redirectTo: 'lost'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule {}
