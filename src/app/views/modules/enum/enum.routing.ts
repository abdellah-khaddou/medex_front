import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGardService } from '../../../services/permission.gard.service';
import { FormComponent,  } from './forms/form/form.component';
import { TablesComponent } from './tables/tables.component';



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

  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class enumRoutingModule { }
