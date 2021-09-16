
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared.module';
import { RoutingModule } from './bon.routing';
import { IndexComponent } from './index/index.component';
import { TablesComponent } from './tables/tables.component';
import { FormComponent } from './forms/form/form.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';





@NgModule({
  declarations: [
    IndexComponent,
    TablesComponent,
    FormComponent,
    DetailsComponent,




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
export class BonModule { }
