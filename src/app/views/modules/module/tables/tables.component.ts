
import { Component } from '@angular/core';
import { ModuleService } from '../services/service.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../../store/app.reducer"
import * as actions from "../../../../store/products/module.action"
import * as moduleReducer from '../../../../store/products/module.reducer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'tables.component.html',
  styleUrls: ['./tables.component.css']

})
export class TablesComponent {


  settings={
    module:"products",
    columns:[{title:"Name",field:"name"},{title:"Email",field:"email"},
    {title:"Tel",field:"tel"},{title:"Type",field:"type"}]
  };
  modules$: Observable<any>;


  constructor(
    private service: ModuleService,
    private router:Router,
    private store:Store<fromApp.AppState>,
    public translate:TranslateService
    ) { }

   ngOnInit(): void {
    this.store.dispatch(new actions.Load())
    this.modules$ = this.store.select(moduleReducer.selectProducts);

  }
  delete(module){

  }

  edit(module){
    this.router.navigate(['/dashboard/'+this.service.module+'/edit'],{ queryParams: { id: module._id } });
  }
  show(module){
    this.router.navigate(['/dashboard/'+this.service.module+'/show'],{ queryParams: { id: module._id } });
  }
  ngOnDestroy(): void {

  }

}
