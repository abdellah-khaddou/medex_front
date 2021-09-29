import { EnumService } from './../../../enum/services/service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';

import { ActivatedRoute } from '@angular/router';
import { EnumValueService } from '../../services/service.service';



@Component({
  selector: 'form-enum',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {

  form:FormGroup;
  errors:any;
  invalidtLogin=false;
  enum:any ={};
  enumerations;
  isLoad = false;
  message;
  constructor(
    private enumValueService: EnumValueService,
    private error: ErorrFrormService,
    private route :ActivatedRoute,
    private redirect:RedirectService,
    private enumService:EnumService,
  ) {
    let id = this.route.snapshot.queryParams.id;
    if(id){
      this.getEdit(id);
    }
    this.enumService.search().subscribe(res=>{
      this.enumerations = res
    })


  }

  ngOnInit(): void {

    this.form = new FormGroup({
      enumeration: new FormControl('', [
        Validators.required,

      ]),
      value: new FormControl('', [
        Validators.required,

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
    console.log(this.enum)
     this.enumValueService.save(this.enum).subscribe(res=>{
        if(res){
            this.redirect.redirectToenums()
        }

         this.isLoad = false

     },error=>{
       this.errors =  error.error.error;
      this.isLoad = false
     });

  }
  getEdit(id){
    this.enumValueService.search({_id:id}).subscribe(res=>{
      if(res)this.enum =res[0];

    })
  }

}


