import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {AccordionModule} from 'primeng/accordion';     // accordion and accordion tab
import {MenuItem} from 'primeng/api';                  // api

// const APP_CONTAINERS = [
//   DefaultLayoutComponent
// ];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ChartsModule } from 'ng2-charts';
import { AppInjector } from './services/inject-service';
import { SppinerComponent } from './views/spinner/spinner.component';
import { EnumModule } from './views/modules/enum/enum.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import {TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './views/modules/shared.module';
import { AlertsComponent } from './views/baseView/alerts/alerts.component';

import { DataTablesModule } from 'angular-datatables';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appeffects } from './store/app.effects';
import * as fromAppStore from './store/app.reducer';
const config: SocketIoConfig = { url: environment.url, options: {} };
import { NgxBarcodeModule } from 'ngx-barcode';
import { PermissionsDirective } from './base/permissions.directive';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppAsideModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    AppBreadcrumbModule.forRoot(),
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(fromAppStore.appReducer),
    EffectsModule.forRoot(appeffects),
    StoreDevtoolsModule.instrument(),
    SocketIoModule.forRoot(config),
    ChartsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),



  ],
  declarations: [
    AppComponent,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    SppinerComponent,
    AlertsComponent,


  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    IconSetService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(injector: Injector) {

    AppInjector.setInjector(injector);
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
