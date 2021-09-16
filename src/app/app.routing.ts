import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolveResolver } from './base/resolve.resolver';
import { AuthGardService } from './services/auth.gard.service';

// Import Containers

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'


  },
  {
    path: 'dashboard',
    loadChildren: () => import('./views/modules/base.module').then(m => m.BaseModule),
    canLoad: [ AuthGardService],


  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },

  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }



