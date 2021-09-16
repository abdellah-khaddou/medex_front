
import { error } from 'protractor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromApp from "../../../../../store/app.reducer"

import { AuthService } from '../../../../../services/auth.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/service.service';
import { LoadService } from '../../../../../services/load.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'edit-user',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit,OnDestroy {
  ismessage
  errors:any;
  product:any={};
  companies;
  categories
  isLoad = false;
  message="edit Module success"
  invalidRequest:Boolean
  sub: Subscription;
  products: any;
  constructor( 
    private error: ErorrFrormService,
    private service :ProductService,
    private route:ActivatedRoute,
    private store:Store<fromApp.AppState>,
    private load:LoadService
  ) {
    this.load.loadAll();

    
    this.ismessage=false;
    
  }
          
  
  ngOnInit(){
    this.sub = this.store.subscribe(store=>{
      this.companies = store.companies.companies;
      this.categories = store.catagories.catagories;
      this.products = store.products.products
      if(this.products)this.getEdit();
    })
  }
  
  getEdit(){
    let id = this.route.snapshot.queryParams.id;
    if(id){
      let product= this.products.filter(prod=>prod._id==id)[0]
      Object.assign(this.product,product)
    }
    
    
  }
  isValid(control) {
   // console.log(control)
    //return this.error.inValid(control);
  }

  messageError(control) {
    //return this.error.messageError(control);
  }
  isInputValid(control){
    //return this.error.isInputvalid(control)
  }
  
  save(){
    this.isLoad = true
    console.log(this.product)
      this.service.save(this.product).subscribe(res=>{
          if(res){
            console.log(res)
              // this.ismessage=true
              // setTimeout(() => {
              //   this.ismessage = false;
              // }, 3000)
              
            
          }
          
          this.isLoad = false
          
      },error=>{
        console.log(error)
        
          this.isLoad = false
      });
  
    
  }
   ngOnDestroy(){
     this.sub.unsubscribe();
   } 

}


