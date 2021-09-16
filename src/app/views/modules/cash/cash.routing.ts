import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { TablesComponent } from './tables/tables.component';
import { FormComponent } from './forms/form/form.component';
import { PermissionGardService } from '../../../services/permission.gard.service';





const routes: Routes = [

  {
    path: "",
    component: TablesComponent,
    canActivate: [PermissionGardService],
    data: {
      action: "read",
    },
  },
  {
    path: "edit",
    component: FormComponent,
    canActivate: [PermissionGardService],
    data: {
      action: "update",
    },
  },
  {
    path: "add",
    component: FormComponent,
    canActivate: [PermissionGardService],
    data: {
      action: "create",
    },
  },
  {
    path: "show",
    component: DetailsComponent,
    canActivate: [PermissionGardService],
    data: {
      action: "read",
    },
  },



  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
