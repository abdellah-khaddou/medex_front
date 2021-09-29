
import { Component } from '@angular/core';
import { OrderService } from '../services/service.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../../store/app.reducer"
import * as actions from "../../../../store/orders/module.action"
import * as moduleReducer from '../../../../store/orders/module.reducer';
import { SocketService } from '../../../../services/socket.service';

@Component({
  templateUrl: 'tables.component.html',
  styleUrls: ['./tables.component.css']

})
export class TablesComponent {


  settings={
    module:"orders",
    columns:[{title:"Date",field:"Date"},{title:"TotalHT",field:"TotalHT"},
    {title:"paied",field:"paied"},{title:"status",field:"status"}]
  };
  modules$: Observable<any>;


  constructor(
    private service: OrderService,
    private router:Router,
    private socket:SocketService,
    private store:Store<fromApp.AppState>) { }

   ngOnInit(): void {
    this.store.dispatch(new actions.Load())
    this.modules$ = this.store.select(moduleReducer.selectOrders);
    this.socket.getMessage("broadcast").subscribe(data=>console.log(data))
   
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
