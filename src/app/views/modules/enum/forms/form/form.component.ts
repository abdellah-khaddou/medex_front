import { EnumService } from './../../../enum/services/service.service';

import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from '../../../../../services/auth.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';

import { ActivatedRoute } from '@angular/router';
import { CompanieService } from '../../../companies/services/companie.service';


@Component({
  selector: 'form-enum',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {

  form:FormGroup;
  errors:any;
  invalidtLogin=false;
  enum:any ={};
  isLoad = false;
  message;
  constructor(
    private enumService: EnumService,
    private error: ErorrFrormService,
    private route :ActivatedRoute,
    private auth:AuthService,
    private redirect:RedirectService,
    private companieService:CompanieService
  ) {
    let id = this.route.snapshot.queryParams.id;
    if(id){
      this.getEdit(id);
    }


  }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),


    });
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
  create(){

    this.isLoad = true

     this.enumService.create(this.enum).subscribe(res=>{
        if(res){

            this.redirect.redirectToenums()
            this.message = ' Your save Success'


        }
        if(!res)this.invalidtLogin = true;
         this.isLoad = false

     },error=>{
       this.errors =  error.error.error;
       if(!this.errors){
        this.invalidtLogin = true;
       }
      this.isLoad = false
     });

  }
  getEdit(id){
    this.enumService.search({_id:id}).subscribe(res=>{
      if(res)this.enum =res[0];

    })
  }

}


