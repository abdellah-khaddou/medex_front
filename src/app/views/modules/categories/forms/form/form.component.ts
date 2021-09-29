
import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { AuthService } from '../../../../../services/auth.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';
import { ActivatedRoute } from '@angular/router';
import { CatagoryService } from '../../services/service.service';


@Component({
  selector: 'edit-user',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {
  ismessage
  valueType ;
  form:FormGroup;
  errors:any;
  module:any={};
  isLoad = false;
  message="edit Module success"
  invalidtLogin:Boolean
  constructor( 
    private error: ErorrFrormService,
    private service :CatagoryService,
    private route:ActivatedRoute,
    private auth:AuthService
  ) {
    this.getEdit();
    this.ismessage=false;
    this.valueType=['Transporteur','Administrateur','Chargeur']
  }
          
  
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      tel: new FormControl('', [
        Validators.required,

      ]),
      type: new FormControl('', [
        Validators.required,

        
      ])
       
 
     
    });
  }
  getEdit(){
    let id = this.route.snapshot.queryParams.id;
    this.service.search({_id:id}).subscribe(res=>{
     
    })
    
  }
  isValid(control) {
    return this.error.inValid(control, this.form);
  }

  messageError(control) {
    return this.error.messageError(control, this.form);
  }
  isInputValid(control){
    return this.error.isInputvalid(control,this.form)
  }
  save(){
    this.isLoad = true
      this.service.create(this.module).subscribe(res=>{
          if(res){
            
              this.ismessage=true
              setTimeout(() => {
                this.ismessage = false;
              }, 3000)
              
            
          }
          
          this.isLoad = false
          
      },error=>{
        console.log(error)
        
          this.isLoad = false
      });
  
    
  }
    

}


