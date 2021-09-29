
import { Component } from '@angular/core';
import { ProductService } from '../services/service.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../../store/app.reducer"
import * as actions from "../../../../store/products/module.action"
import * as moduleReducer from '../../../../store/products/module.reducer';
import { SocketService } from '../../../../services/socket.service';

@Component({
  templateUrl: 'tables.component.html',
  styleUrls: ['./tables.component.css']

})
export class TablesComponent {


  settings={
    module:"products",
    columns:[
      {title:"Name Arabe",field:"name"},
      {title:"Name Francais ",field:"name_en"},
      {title:"Name Anglais",field:"name_fr"},
      {title:"image",field:"images",type:"image"},
      {title:"Prix de Vende",field:"price",type:"input"},
      {title:"Prix d'Achat",field:"PA",type:"input"},
      {title:"Nomber de Vendre",field:"nb_vendere"},
      {title:"publish",field:"published",type:"button"},
      

    ]
  };
  modules$: Observable<any>;
  showTabel: boolean=true;


  constructor(
    private service: ProductService,
    private router:Router,
    private socket:SocketService,
    private store:Store<fromApp.AppState>) { }

   ngOnInit(): void {
    this.store.dispatch(new actions.Load())
    this.modules$ = this.store.select(moduleReducer.selectProducts);
    this.socket.getMessage('products').subscribe(data=>{
      this.showTabel = false
      console.log('socket',data)
      this.store.dispatch(new actions.Load_success(data))
      this.showTabel =true

    })
   
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
