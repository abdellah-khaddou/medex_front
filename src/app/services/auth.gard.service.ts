import { AuthService } from './auth.service';
import { Injectable, OnDestroy } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { ActivatedRoute, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { RedirectService } from './redirect.service';
import { error } from 'protractor';
import { Observable, of, Subscription } from "rxjs";
import { PermissionService } from './permission.service';
import * as actionsAuth from "../store/auth/auth.action"
import * as actionsRessource from "../store/resources/module.action"
import * as fromApp from "../store/app.reducer"
import { Store } from '@ngrx/store';
@Injectable({
  providedIn:'root'
})

export class AuthGardService implements CanActivate,CanLoad,OnDestroy {
  resources: any;
  user: any;
  sub: Subscription;
  sub2: Subscription;
  permissions: any;

  constructor(
    private auth:AuthService ,
    private router:Router,
    ) {


   }
  ngOnDestroy(){
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
  canActivate(route,state:RouterStateSnapshot){

    return this.auth.cureentUser().pipe(map(user=>{
      if(user) return true;
      this.router.navigate(['/login'],{queryParams:{prevUrl: state?.url}});
      return false
    }),catchError((err,caught) =>{

      this.router.navigate(['/login'],{queryParams:{prevUrl: state?.url}});
      return of(false);
    }))
    return false

  }
  canLoad(){
    return this.auth.cureentUser().pipe(map(res=>{
      let user = res.user;
      if(user)  return true ;
      this.router.navigate(['/login']);
      return false
    }),catchError((err,caught) =>{

      this.router.navigate(['/login']);
      return of(false);
    }))
    return false
  }



}
