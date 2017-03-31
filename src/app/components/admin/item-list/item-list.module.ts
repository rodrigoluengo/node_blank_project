import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import {ItemListComponent} from './item-list.component';
import {ItemListRoutingModule} from './item-list-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ItemListRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ItemListComponent
  ]
})
export class ItemList {}
