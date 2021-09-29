
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { enumValueRoutingModule } from './enum-value.routing';
import { FormComponent } from './forms/form/form.component';
import { TablesComponent } from './tables/tables.component';
import { SharedModule } from '../shared.module';








@NgModule({
  declarations: [

    FormComponent,
    TablesComponent




  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    enumValueRoutingModule,
    SharedModule


  ],
  exports:[

  ]
})
export class EnumValueModule { }
