import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import * as fromApp from "../store/app.reducer"
import * as actionAuth  from "../store/auth/auth.action"
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResolveResolver implements Resolve<boolean> {

  constructor(private store:Store<fromApp.AppState>){
    this.store.dispatch(new actionAuth.isLogin())
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
   return this.store.select(state=> state.auth.user).pipe(catchError(() => {
    return of('data not available at this time');
  }))
  }
}
