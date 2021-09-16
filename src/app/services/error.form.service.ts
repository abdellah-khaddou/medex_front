
import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';




@Injectable({
  providedIn:'root'
})
export class ErorrFrormService implements OnInit {

  constructor() { 


  }
  ngOnInit(){
      
  }
  inValid(control:string,form:FormGroup){
    const ctrl =form.get(control);
    
    return ctrl.invalid && (ctrl.dirty || ctrl.touched)
  }
  isInputvalid(control:string,form:FormGroup){
    const ctrl =form.get(control);
    return !this.inValid(control,form) && (ctrl.dirty || ctrl.touched)
  }
  messageError(control:string,form:FormGroup){
    const ctrl =form.get(control);
    let erorrs= new Array();
    if(this.inValid(control,form)){
      if(ctrl.errors.required){
        erorrs.push( "this "+ control + " is require");
      }
      if(ctrl.errors.minlength){
        erorrs.push( "this "+ control + " should be grat than "+ ctrl.errors.minlength.requiredLength);
      }
      if(ctrl.errors.maxlength){
        erorrs.push( "this "+ control + " should be less than "+ ctrl.errors.maxlength.requiredLength);
      }

      
    }
   
    return erorrs
  }
 
  

}
