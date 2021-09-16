import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as UsersAction from './base.action'
import { UserService } from '../../views/modules/users/services/user.service';
import { RedirectService } from '../../services/redirect.service';
@Injectable()
export class UsersEffects{
    constructor(
        private userService:UserService,
        private actions$:Actions,
        private redirect : RedirectService,
       
    ){}

    load$ = createEffect(() => this.actions$.pipe(
        ofType(UsersAction.userActionEnum.LOAD),
        mergeMap((action:any)=>this.userService.search().pipe(
            map(res =>{

                return new UsersAction.Load_success(res);
            }),
            catchError(err=>of(new UsersAction.Load_failed(err)))
        ))

       ));





}
