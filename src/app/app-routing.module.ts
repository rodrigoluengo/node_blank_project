import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthService} from "./services/auth.service";
import {HomeComponent} from "./components/home/home.component";
import {ItemListComponent} from './components/admin/item-list/item-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: HomeComponent, canActivate: [AuthService]},
      {path: 'login', loadChildren: () => new Promise(function (resolve) {
        (require as any).ensure([], function (require: any) {
          resolve(require('./components/login/login.module.ts')['LoginModule']);
        });
      })},
      {path: 'admin/tables/expenses', component: ItemListComponent, canActivate: [AuthService]}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
