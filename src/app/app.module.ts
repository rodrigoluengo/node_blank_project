import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

import {AuthService} from './services/auth.service';

import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';

import { UserService } from './services/user.service';
import { SectionService } from './services/section.service';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/admin/item-list/item-list.component';
import { ItemFormComponent } from './components/admin/item-form/item-form.component';

// Create config options (see ILocalStorageServiceConfigOptions) for more details:
let localStorageServiceConfig = {
  prefix: 'marketplace',
  storageType: 'sessionStorage'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemListComponent,
    ItemFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    LocalStorageService,
    {
      provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
    },
    AuthService,
    UserService,
    SectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
