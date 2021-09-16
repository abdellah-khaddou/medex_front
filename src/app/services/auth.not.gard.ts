import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RedirectService } from './redirect.service';

import { of } from "rxjs";

@Injectable({
  providedIn:'root'
})

export class AuthNotGardService implements CanActivate {

  constructor(private auth:AuthService ,private redirect:RedirectService) {
   }
  
  canActivate(){
   
    // return this.auth.loginStatut().pipe(map(user=>{
    //   if(!user) return true;
    //   this.redirect.toRoot();
    //   return false
    // }))
    return false;
  }

}
