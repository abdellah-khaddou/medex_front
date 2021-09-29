
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared.module';
import { RoutingModule } from './module.routing';
import { IndexComponent } from './index/index.component';
import { TablesComponent } from './tables/tables.component';
import { FormComponent } from './forms/form/form.component';





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
    SharedModule
    


   
  ],
  exports:[
    
  ]
})
export class CompanieModule { }
