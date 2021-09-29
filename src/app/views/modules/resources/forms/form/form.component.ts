import { ResourcesService } from '../../../resources/services/service.service';

import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from '../../../../../services/auth.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';

import { ActivatedRoute } from '@angular/router';
import { CompanieService } from '../../../companies/services/companie.service';
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../../store/app.reducer";
import * as actionsEnum from "../../../../../store/enum/module.action";
import * as actionsEnumValue from "../../../../../store/enum_value/module.action";

@Component({
  selector: 'form-resources',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {

  form:FormGroup;
  errors:any;
  invalidtLogin=false;
  resources:{companyType:"" ,resources:any[]} ={companyType:"" ,resources:[]};
  isLoad = false;
  message;
  valueType: any[]=[];
  valueResources: any[]=[];
  items: any[];
  loadSelect = true
  constructor(
    private service: ResourcesService,
    private error: ErorrFrormService,
    private route :ActivatedRoute,
    private auth:AuthService,
    private redirect:RedirectService,
    private store:Store<fromApp.AppState>
  ) {
    let id = this.route.snapshot.queryParams.id;
    if(id){
      this.loadSelect =false
      this.getEdit(id);
    }
    this.store.dispatch(new actionsEnum.Load())
    this.store.dispatch(new actionsEnumValue.Load())


  }

  ngOnInit(): void {
    this.store.subscribe(store=>{
      let enums:any[] =store.enum.enum;
      let enumsValue:any[] = store.enumValue.enum_value;
      if(enums && enumsValue){
        let valuesTypes =[]
        let valuesResources =[]
        enums.filter(en=>{
          if(en.name=="TYPE_COMPANIE"){
             enumsValue.filter(val=>{
               if(val.enumeration == en._id && val.value !="ADMIN"){
                valuesTypes.push(val.value)
               }
              })


          }

          if(en.name=="RESOURCES"){
            enumsValue.filter(val=>{
              if(val.enumeration == en._id){
                valuesResources.push(val.value)
              }
             })


         }
        })

        this.valueType = valuesTypes
        this.valueResources = valuesResources
      }

    })
    this.form = new FormGroup({
      companyType: new FormControl('', [
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
    this.resources.resources = this.items
     this.service.save(this.resources).subscribe(res=>{
        if(res){

            this.redirect.toRoseurces();
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
    this.service.search({_id:id}).subscribe(res=>{
      if(res){
        this.resources =res[0];

      }
      this.loadSelect=true

    })
  }

  shareCheckedList(item:any[]){

    this.items = item
  }
  shareIndividualCheckedList(item:{}){
    console.log(item);
  }

}


