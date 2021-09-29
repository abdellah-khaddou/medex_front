import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import * as authActions from './auth.action'
import { AuthService } from '../../services/auth.service';
import { RedirectService } from '../../services/redirect.service';
@Injectable()
export class AuthEffects{
    constructor(
        private authService:AuthService,
        private actions$:Actions,
        private redirect : RedirectService,
    ){}

    login$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.authActionsEnum.LOGIN),
        mergeMap((action:any)=>this.authService.login(action.payload).pipe(
            map((res:any) =>{
                localStorage.setItem('token',res.token)

                this.redirect.toRoot();

                  return new authActions.Login_success(res);
            }),
            catchError(err=>of(new authActions.Login_failed(err)))
        ))

       ));
      //islogin
       islogin$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.authActionsEnum.ISLOGIN),
        mergeMap((action:any)=>this.authService.verifierToken().pipe(
            map(res =>{
                if(res && res.user)
                    return new authActions.Verifer_success({user:res});
                else return new authActions.Verifer_failed(res);
            }),
            catchError(err=>{

              return of(new authActions.Verifer_failed(err))
            })
        ))

       ));






}
