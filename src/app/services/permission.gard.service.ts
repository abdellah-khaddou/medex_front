import { AuthService } from './auth.service';
import { Injectable, OnDestroy } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { ActivatedRoute, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { RedirectService } from './redirect.service';
import { error } from 'protractor';
import { Observable, of, Subscription } from "rxjs";
import { PermissionService } from './permission.service';
import * as actionsAuth from "../store/auth/auth.action"
import * as actionsRessource from "../store/resources/module.action"
import * as fromApp from "../store/app.reducer"
import { Store } from '@ngrx/store';
import { TypesCompanies, TypesRoles } from '../views/baseView/enums/enums';
import { Location } from '@angular/common';
@Injectable({
  providedIn:'root'
})

export class PermissionGardService implements CanActivate,CanLoad,OnDestroy {
  resources: any;
  user: any;
  sub: Subscription;
  sub2: Subscription;
  permissions: any;

  constructor(
    private auth:AuthService ,
    private router:Router,
    private route:ActivatedRoute,
    private permissionService:PermissionService,
    private store : Store<fromApp.AppState>,
    private location: Location
    ) {


   }
  ngOnDestroy(){
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
  canActivate(route,state:RouterStateSnapshot){

    return this.auth.cureentUser().pipe(map(user=>{

      if(user) {
        if(this.hasPermision(user,route.data.module,route.data.action))return true
        this.router.navigate(['/dashboard']);
      }
      else
         this.router.navigate(['/login'],{queryParams:{prevUrl: state?.url}});
      return false
    }),catchError((err,caught) =>{

      this.router.navigate(['/login'],{queryParams:{prevUrl: state?.url}});
      return of(false);
    }))
    return false

  }
  canLoad(route: Route, segments: UrlSegment[]){

    return this.auth.cureentUser().pipe(map(res=>{
      let user = res.user;

      console.log(this.hasResourcePermission(user,route.data.module))
      if(user) {
        if(this.hasResourcePermission(user,route.data.module))return true
        this.router.navigate(['/dashboard']);

      }else{
        this.router.navigate(['/login']);

      }

      return false
    }),catchError((err,caught) =>{


      this.router.navigate(['/login']);
      return of(false);
    }))
    return false
  }

  hasPermision(user ,module,action):Boolean{

        let str = action +"-"+module
        let permissions = user.user.permission.map(per=>{
          return per.permission
        })
        if(user.user.role == TypesRoles.ADMIN)return true
        return permissions.some(val=>val ==str)



  }

  hasResourcePermission(user,module):Boolean{
    if(user.company.type == TypesCompanies.ADMIN){
      return true;
    }else{
              return user.resources.some(val=>val == module)
    }
  }


}
