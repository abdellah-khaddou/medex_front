import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as Action from './module.action'

import { RedirectService } from '../../services/redirect.service';
import * as service  from '../../views/modules/orders/services/service.service';
@Injectable()
export class Effects{
    constructor(
        private service:service.OrderService,
        private actions$:Actions,
        private redirect : RedirectService,
       
    ){}

    load$ = createEffect(() => this.actions$.pipe(
        ofType(Action.ActionEnum.LOAD),
        mergeMap((action:any)=>this.service.search().pipe(
            map(res =>{

                return new Action.Load_success(res);
            }),
            catchError(err=>of(new Action.Load_failed(err)))
        ))

       ));





}
