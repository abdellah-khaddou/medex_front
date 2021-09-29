import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { ErorrFrormService } from '../../services/error.form.service';
import { RedirectService } from '../../services/redirect.service';
import { User } from '../../services/user';
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as actionsEnum from "../../store/enum/module.action";
import * as actionsEnumValue from "../../store/enum_value/module.action";
import * as moduleReducerEnum from "../../store/enum/module.reducer";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JsonService } from '../../services/data_json.service ';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  form:FormGroup;
  errors:any;
  invalidtLogin=false;
  isLoad = false;
  valueType
  villes: any;
  constructor(
    private currentUser:User,
    private auth: AuthService,
    private redirect:RedirectService,
    private jsonService:JsonService,
    private error: ErorrFrormService,
    private store:Store<fromApp.AppState>


  ) {

    this.store.dispatch(new actionsEnum.Load())
    this.store.dispatch(new actionsEnumValue.Load())
    this.store.subscribe(store=>{
      let enums:any[] =store.enum.enum;
      let enumsValue:any[] = store.enumValue.enum_value;
      if(enums && enumsValue){
        enums.filter(en=>{
          if(en.name=="TYPE_COMPANIE"){
            this.valueType = enumsValue.filter(val=>val.enumeration == en._id)
            console.log(this.valueType)
          }
        })
      }

    })

  }


  ngOnInit(): void {
    this.jsonService.getVilles().subscribe(villes=>{
      this.villes=villes
    })
    this.form = new FormGroup({
      name_companie: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      tel_companie: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      ville: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      adresse: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      email_companie: new FormControl('', [
        Validators.required,
        Validators.minLength(4),

      ]),
      RC: new FormControl('', [

      ]),
      banque: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      RIB: new FormControl('', [

      ]),
      type: new FormControl('', [

      ]),
      name_user: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      cin: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10),
      ]),
      tel_user: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),


      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),

      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
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
  register(){
   console.log(this.form.getRawValue());
    this.isLoad = true
     this.auth.register(this.form.getRawValue()).subscribe((res:any)=>{
        if(res){

          localStorage.setItem('token',res.token)
            this.auth.cureentUser().subscribe(user=>{

              this.currentUser.setuser(user);
              this.redirect.toRoot();


            })
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

}


