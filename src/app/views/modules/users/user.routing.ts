import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { PermissionGardService } from '../../../services/permission.gard.service';
import { FormUserComponent } from './forms/form/form.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersTablesComponent } from './tables/tables.component';



const routes: Routes = [

        {
          path:'',component:UsersTablesComponent ,
          canActivate:[PermissionGardService],
          data:{
            action:"read"
          }
        },
        {
          path:'edit',component:FormUserComponent,
          canActivate:[PermissionGardService],
          data:{
            action:"update"
          }
        },
        {
          path:'add',component:FormUserComponent,
          canActivate:[PermissionGardService],
          data:{
            action:"create"
          }
        },
        {
          path:'show',component:ProfileComponent,
          canActivate:[PermissionGardService],
          data:{
            action:"read"
          }
        },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class usersRoutingModule { }
