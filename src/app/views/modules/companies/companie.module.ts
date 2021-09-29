
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import { DataTablesModule } from 'angular-datatables';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './forms/form/form.component';
import { DetailsComponent } from './details/details.component';
import { CompaniesComponent } from './index/companies.component';
import { companiesRoutingModule } from './companie.routing';
import { SharedModule } from '../shared.module';





@NgModule({
  declarations: [
    CompaniesComponent,
    TablesComponent,
    FormComponent,
    DetailsComponent,




  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    companiesRoutingModule,
    SharedModule




  ],
  exports:[

  ]
})
export class CompanieModule { }
