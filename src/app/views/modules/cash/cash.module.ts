
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared.module';
import { RoutingModule } from './cash.routing';
import { IndexComponent } from './index/index.component';
import { TablesComponent } from './tables/tables.component';
import { FormComponent } from './forms/form/form.component';
import { BeginOrPaidComponent } from './tables/begin-or-paid/begin-or-paid.component';
import { DetailsStoreComponent } from './tables/details-store/details-store.component';
import { DetailsOrdersComponent } from './tables/details-orders/details-orders.component';
import { TableModule } from 'primeng/table';





@NgModule({
  declarations: [
    IndexComponent,
    TablesComponent,
    FormComponent,
    DetailsComponent,
    BeginOrPaidComponent,
    DetailsStoreComponent,
    DetailsOrdersComponent,




  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    SharedModule,
    TableModule




  ],
  exports:[

  ]
})
export class CashModule { }
