import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ItemListComponent} from './item-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: ItemListComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class ItemListRoutingModule {}
