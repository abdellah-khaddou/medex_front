import { Companie } from '../../companies.interface';
import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { AuthService } from '../../../../../services/auth.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';
import { ActivatedRoute } from '@angular/router';
import { CompanieService } from '../../services/companie.service';
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../../store/app.reducer";
import * as actionsEnum from "../../../../../store/enum/module.action";
import * as actionsEnumValue from "../../../../../store/enum_value/module.action";
import * as moduleReducerEnum from "../../../../../store/enum/module.reducer";
import { TypesEnums } from '../../../../baseView/enums/enums';

@Component({
  selector: 'edit-user',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {
  ismessage
  valueType ;
  form:FormGroup;
  errors:any;
  companie:any={};
  isLoad = false;
  message="edit Companie success"
  invalidtLogin:Boolean
  constructor(
    private error: ErorrFrormService,
    private companieService :CompanieService,
    private route:ActivatedRoute,
    private auth:AuthService,
    private store:Store<fromApp.AppState>
  ) {
    this.getEdit();
    this.ismessage=false;
    this.store.dispatch(new actionsEnum.Load())
    this.store.dispatch(new actionsEnumValue.Load())
    this.store.subscribe(store=>{
      let enums:any[] =store.enum.enum;
      let enumsValue:any[] = store.enumValue.enum_value;
      if(enums && enumsValue){
        enums.filter(en=>{
          if(en.name==TypesEnums.TYPE_COMPANIE){
            this.valueType = enumsValue.filter(val=>val.enumeration == en._id)
            console.log(this.valueType)
          }
        })
      }

    })
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


      ]),
      adresse: new FormControl('', [
        Validators.required,


      ]),
      RC: new FormControl('', [
        Validators.required,


      ]),

      banque: new FormControl('', [
        Validators.required,


      ]),
      RIB: new FormControl('', [
        Validators.required,


      ]),
      ville: new FormControl('', [
        Validators.required,


      ])



    });
  }
  getEdit(){
    let id = this.route.snapshot.queryParams.id;
    if(id){
      this.companieService.search({_id:id}).subscribe(companie=>{
        if(companie)this.companie =companie[0];
      })
    }


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
      this.companieService.save(this.companie).subscribe(res=>{
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


