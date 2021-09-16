import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseProvider } from '../base/provider/base-provider';
import { Store } from '@ngrx/store';
import * as fromApp from "../store/app.reducer"
import * as actionUsers from "../store/users/users.action"
import * as actionproducts from "../store/products/module.action"
import * as actionCompanies from "../store/companies/companies.action"
import * as actionOrders from "../store/orders/module.action"
import * as actionCatagories from "../store/catagories/module.action"


@Injectable({
  providedIn:'root'
})
export class LoadService implements OnInit {


  constructor( 
    private baseCtrl: BaseProvider,
    private router:Router,
    private store:Store<fromApp.AppState>

  ) {
  }
  ngOnInit() {}
  loadAll(){
    this.store.dispatch(new actionUsers.Load());
    this.store.dispatch(new actionCompanies.Load());
    this.store.dispatch(new actionOrders.Load());
    this.store.dispatch(new actionproducts.Load());
    this.store.dispatch(new actionCatagories.Load());
  }
 
 
}
