import { CompanieModule } from './companies/companie.module';
import { UserModule } from './users/user.module';

import { UsersComponent } from './users/index/users.component';
// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { BaseRoutingModule } from './base-routing.module';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { AppAsideModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from './shared.module';




// Components Routing


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule,
    AppAsideModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    SharedModule




  ],
  declarations: [
    DashboardComponent,
    DefaultLayoutComponent,





  ],
  exports:[
    DashboardComponent,

  ]
})
export class BaseModule {}

