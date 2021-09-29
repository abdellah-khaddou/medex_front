
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { PermissionGardService } from '../../services/permission.gard.service'




const routes: Routes = [
  {
    path: '',
		component: DefaultLayoutComponent,
		// canActivate:[AuthGardService],
		children:[


			 {
				path: 'users',

			  	loadChildren: () => import('../modules/users/user.module').then(m => m.UserModule),
          canLoad:[PermissionGardService],
          data:{
            module :"users",

          }

			  },
			  {
				path: 'companies',

				loadChildren: () => import('../modules/companies/companie.module').then(m => m.CompanieModule),
        canLoad:[PermissionGardService],
          data:{
            module :"companies",

          }

			  },
			  {
			  path: 'enumerations',

			  	loadChildren: () => import('../modules/enum/enum.module').then(m => m.EnumModule),
          canLoad:[PermissionGardService],
          data:{
            module :"enum",

          }

			 },
			 {
				path: 'enumerations_value',

					loadChildren: () => import('../modules/enum_value/enum-value.module').then(m => m.EnumValueModule),
          canLoad:[PermissionGardService],
          data:{
            module :"enum_value",

          }

			},
			{
				path: 'products',

					loadChildren: () => import('../modules/products/module.module').then(m => m.ProductModule),
          canLoad:[PermissionGardService],
          data:{
            module :"products",

          }

			},
			{
				path: 'orders',

					loadChildren: () => import('../modules/orders/module.module').then(m => m.OrderModule),
          canLoad:[PermissionGardService],
          data:{
            module :"orders",

          }

			},
			{
				path: 'categories',

					loadChildren: () => import('../modules/categories/module.module').then(m => m.CatagoriesModule),
          canLoad:[PermissionGardService],
          data:{
            module :"categories",

          }

			},
      {
				path: 'role',

					loadChildren: () => import('../modules/role/role.module').then(m => m.RolesModule),
          canLoad:[PermissionGardService],
          data:{
            module :"role",

          }

			},
      {
				path: 'resources',

					loadChildren: () => import('../modules/resources/resources.module').then(m => m.ResourcesModule),
          canLoad:[PermissionGardService],
          data:{
            module :"resources",

          }

			},
      {
				path: 'colis',

					loadChildren: () => import('../modules/colis/colis.module').then(m => m.ColisModule),
          canLoad:[PermissionGardService],
          data:{
            module :"colis",

          }

			},
      {
				path: 'villes',

					loadChildren: () => import('../modules/villes/villes.module').then(m => m.VillesModule),
          canLoad:[PermissionGardService],
          data:{
            module :"villes",

          }

			},
      {
				path: 'bon',

					loadChildren: () => import('../modules/bon/bon.module').then(m => m.BonModule),
          canLoad:[PermissionGardService],
          data:{
            module :"bon",

          }

			},

      {
				path: 'villesnames',

					loadChildren: () => import('../modules/villesnames/villesnames.module').then(m => m.VillesNamesModule),
          canLoad:[PermissionGardService],
          data:{
            module :"villesnames",

          }

			},
      {
				path: 'networks',

					loadChildren: () => import('../modules/networks/networks.module').then(m => m.NetworksModule),
          canLoad:[PermissionGardService],
          data:{
            module :"networks",

          }

			},

      {
				path: 'cash',

					loadChildren: () => import('../modules/cash/cash.module').then(m => m.CashModule),
          canLoad:[PermissionGardService],
          data:{
            module :"cash",

          }

			},




			//{ path: 'companies',              component:CompanieComponent ,pathMatch:'full' },
		],

  },


];
@NgModule({
	imports: [RouterModule.forChild(routes)],
  	exports: [RouterModule]
  })

  export class BaseRoutingModule{}


