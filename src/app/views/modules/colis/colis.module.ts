
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared.module';
import { RoutingModule } from './colis.routing';
import { IndexComponent } from './index/index.component';

import { FormComponent } from './forms/form/form.component';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import {MultiSelectModule} from 'primeng/multiselect';
import { TablesComponent } from './tables/tables.component';
import {ButtonModule} from 'primeng/button';
import { GenerateInvoiceComponent } from './component/generate-invoice/generate-invoice.component';
import { TablesNonEnvoyeComponent } from './tables_/tables.component';




@NgModule({
  declarations: [
    IndexComponent,
    TablesComponent,
    FormComponent,
    DetailsComponent,
    GenerateInvoiceComponent,
    TablesNonEnvoyeComponent




  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    SharedModule,
    TableModule,
    MultiSelectModule,
    ButtonModule








  ],
  exports:[

  ]
})
export class ColisModule {

 }
