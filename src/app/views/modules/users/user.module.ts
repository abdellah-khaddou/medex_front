
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTablesComponent } from './tables/tables.component';
import { FormUserComponent } from './forms/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { usersRoutingModule } from './user.routing';
import { ButtonsComponent } from '../../baseView/buttons/buttons.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule,Actions } from '@ngrx/effects';
import { SharedModule } from '../shared.module';
import { UsersComponent } from './index/users.component';







@NgModule({
  declarations: [
    
    UsersTablesComponent,
    FormUserComponent,
    ProfileComponent,
    ButtonsComponent,
    UsersComponent
    
    
 
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    usersRoutingModule,
    SharedModule,
   
  ],
  exports:[
    
  ]
})
export class UserModule {}
