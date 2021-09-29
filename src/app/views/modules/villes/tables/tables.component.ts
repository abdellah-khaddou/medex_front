
import { Component } from '@angular/core';
import { VillesService } from '../services/service.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../../store/app.reducer"
import * as actions from "../../../../store/villes/module.action"
import * as moduleReducer from '../../../../store/villes/module.reducer';

@Component({
  templateUrl: 'tables.component.html',
  styleUrls: ['./tables.component.css']

})
export class TablesComponent {


  settings={
    module:"villes",
    columns:[
      {title:"ville_depart",field:"ville_depart"},
      {title:"ville_arrive",field:"ville_arrive"},
      {title:"Company",field:"livreur"},
      {title:"type",field:"type"},
      {title:"type Value",field:"type_value"},
      {title:"prix_livrision",field:"prix_livrision"},
      {title:"prix_annule",field:"prix_annule"},
      {title:"prix_refuse",field:"prix_refuse"}
    ]
  };
  modules$: Observable<any>;


  constructor(
    private service: VillesService,
    private router:Router,
    private store:Store<fromApp.AppState>) { }

   ngOnInit(): void {
    this.store.dispatch(new actions.Load())
    this.modules$ = this.store.select(moduleReducer.selectVilles);

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
