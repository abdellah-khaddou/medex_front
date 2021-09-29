
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashService } from '../services/service.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../../store/app.reducer"
import * as actions from "../../../../store/cash/module.action"
import * as moduleReducer from '../../../../store/cash/module.reducer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'tables.component.html',
  styleUrls: ['./tables.component.css']

})
export class TablesComponent implements OnInit,OnDestroy {


  isPaid:Boolean =false
  formShow
  modules$: Observable<any>;
  cashs: any;
  payedVendeur: boolean;
  payedLivreur: boolean;
  showOrders:boolean
  storeV: any;
  orders: any;
  classBegin:String ="col-12"
  classStore:String =""
  fixHeight


  constructor(
    private service: CashService,
    private router:Router,
    private store:Store<fromApp.AppState>,
    public translate:TranslateService
    ) { }

   ngOnInit(): void {
    this.store.dispatch(new actions.Load())
     this.store.subscribe(res=>{
        this.cashs = res.cash.cash
    });

  }
  sendCash(value){

      if(value.store.length>0){
          this.payedVendeur = true,
          this.payedLivreur = false
          this.storeV = value.store
          this.classBegin ="col"
          this.classStore ="col"

      }else if( value.orders.length >0){
          this.payedVendeur = false,
          this.payedLivreur = true
          this.orders = value.orders
          this.classStore = ""
          this.classBegin="col-12"
      }
      this.fixhight()

  }
  fixhight(){
    if(this.showOrders && this.payedVendeur){
      this.fixHeight = "fix-height"
    }

  }

  changeOrders(value){

    this.orders = value.orders
    this.showOrders=true
    this.fixhight()
  }
  delete(module){

  }

  edit(module){
    //this.router.navigate(['/dashboard/'+this.service.module+'/edit'],{ queryParams: { id: module._id } });
  }
  show(module){
    this.formShow = "edit"

    //this.router.navigate(['/dashboard/'+this.service.module+'/show'],{ queryParams: { id: module._id } });
  }
  ngOnDestroy(): void {

  }

  closeFormStore(val){
    console.log("val")
        if(val){
          this.payedVendeur = false
          this.classBegin = "col-12"
          this.classStore = ""
        }
        this.fixhight()
  }
  closeFormDetails(val){
    console.log(val)
      if(val){
        this.payedLivreur = false
        this.showOrders = false

      }

      this.fixhight()

  }

}
