
import { Component } from '@angular/core';
import { NetworksService } from '../services/service.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../../store/app.reducer"
import * as actions from "../../../../store/networks/module.action"
import * as moduleReducer from '../../../../store/networks/module.reducer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'tables.component.html',
  styleUrls: ['./tables.component.css']

})
export class TablesComponent {


  settings={
    module:"networks",
    columns:[
      {title:"Name",field:"name"},

    ]
  };
  modules$: Observable<any>;


  constructor(
    private service: NetworksService,
    private router:Router,
    private store:Store<fromApp.AppState>,
    public translate:TranslateService
    ) { }

   ngOnInit(): void {
    this.store.dispatch(new actions.Load())
    this.modules$ = this.store.select(moduleReducer.selectNetworks);

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
