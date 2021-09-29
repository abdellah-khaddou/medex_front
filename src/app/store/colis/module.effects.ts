import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as Action from './module.action'

import { RedirectService } from '../../services/redirect.service';
import * as service  from '../../views/modules/colis/services/service.service';
import { DesignColisService } from "../../views/modules/colis/services/design.service";
import * as actionBon from "../bon/module.action"
@Injectable()
export class Effects{
    constructor(
        private service:service.ColisService,
        private actions$:Actions,
        private redirect : RedirectService,
        private designColis:DesignColisService

    ){}

    load$ = createEffect(() => this.actions$.pipe(
        ofType(Action.ActionEnum.LOAD),
        mergeMap((action:any)=>this.service.search().pipe(
            map(res =>{
              res.map(el=>{
                el["vendeurName"] = el.vendeur.name
                el["statusName"] = el.status
                el["class"] = ""

                el["typeCode"] = el.type.name?.charAt(0).toUpperCase() +' ['+el.type.value?.charAt(0).toUpperCase()+'] '
                this.designColis.status.filter(state=>{
                  if(state.value == el.status){
                    el.status = state
                  }
                })

              })

                return new Action.Load_success(res);
            }),
            catchError(err=>of(new Action.Load_failed(err)))
        ))

       ));
    changestatus$ = createEffect(()=> this.actions$.pipe(
      ofType(Action.ActionEnum.CHANGE_STATUS),
      mergeMap((action:any)=> this.service.changeStatus(action.payload).pipe(map(res=>{

           new actionBon.Load()
          return new Action.Load();

      }),
      catchError(err=>of(new Action.Load_failed(err)))
      ))

    ));





}
