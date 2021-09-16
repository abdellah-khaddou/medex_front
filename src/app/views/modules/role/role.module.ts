
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  TablesComponent } from './tables/tables.component';
import { DataTablesModule } from 'angular-datatables';
import { FormComponent } from './forms/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './role.routing';
import { SharedModule } from '../shared.module';








@NgModule({
  declarations: [

    TablesComponent,
    FormComponent,




  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    RoutingModule,
    SharedModule


  ],
  exports:[

  ]
})
export class RolesModule { }
