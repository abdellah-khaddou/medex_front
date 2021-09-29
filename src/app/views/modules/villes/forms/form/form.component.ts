
import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { AuthService } from '../../../../../services/auth.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';
import { ActivatedRoute } from '@angular/router';
import { VillesService } from '../../services/service.service';
import * as actionsCompanies from "../../../../../store/companies/companies.action";
import * as actionsEnumValue from "../../../../../store/enum_value/module.action";
import * as actionsNetworks from "../../../../../store/networks/module.action"
import * as actionsVillesNames from "../../../../../store/villesnames/module.action"
import * as fromApp from "../../../../../store/app.reducer"
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TypesCompanies } from '../../../../baseView/enums/enums';

import * as actionsVilles from "../../../../../store/villes/module.action"
import { TypesColis, ValueTypeValues } from '../../../../baseView/enums/listStatusType';


@Component({
  selector: 'form-villes',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {
  ismessage
  form:FormGroup;
  errors:any;
  villes:any={};
  isLoad = false;
  message="success"
  invalidtLogin:Boolean
  sub: Subscription;
  networks: any[];
  allvilles: any[];
  villesNames:any[]
  valueType = TypesColis
  valueTypeValues: string[]=ValueTypeValues
  companies: any;
  modalSetting : {display:string,message:string,type:string,title:string}  =  {display:"none",message:"no selected colis",type:"danger",title:"Errors"}
  villesInDb: any;
  constructor(

    private error: ErorrFrormService,
    private service :VillesService,
    private route:ActivatedRoute,
    private auth:AuthService,
    private store:Store<fromApp.AppState>

  ) {
    this.store.dispatch(new actionsCompanies.Load())
    this.store.dispatch(new actionsNetworks.Load())
    this.store.dispatch(new actionsVillesNames.Load())
    this.store.dispatch(new actionsVilles.Load())
    this.villes.type_value = this.valueType[0].types[0]
    this.villes.type = this.valueType[0].name
    this.villes.livreur = "vendeur"
    this.sub = this.store.subscribe(state=>{
      this.villesInDb = state.villes.villes
      this.companies = state.companies.companies?.filter(companie=>{
        return companie.type == TypesCompanies.LIVREUR
      })
     this.networks =  state.networks.networks?.filter(net=>{
            return net.expidition
      })
      this.allvilles = state.villesnames.villesnames
    })
      let id = this.route.snapshot.queryParams.id;
      if(id){
        this.getEdit(id);
      }
  }







  ngOnInit(): void {

    this.form = new FormGroup({
      ville_depart: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),

      ville_arrive: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      prix_livrision: new FormControl('', [
        Validators.required,

      ]),
      prix_annule: new FormControl('', [
        Validators.required,
      ]),
      prix_refuse: new FormControl('', [
        Validators.required,
      ]),
      type: new FormControl('', [
        Validators.required,


      ]),

      type_value: new FormControl('', [
        Validators.required,


      ]),
      livreur: new FormControl('', [



      ]),



    });
  }
  getEdit(id){
    this.service.search({_id:id}).subscribe(res=>{
      this.villes = res;
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
  typeChange(value){
    this.valueType.filter(el=>{
      if(el.name == value){
        this.valueTypeValues = el.types
        this.villes.type_value = this.valueTypeValues[0]
      }
    })

  }
  save(){
    console.log(this.villesInDb)

    let res = this.villesInDb.some(ville=>{
     console.log (
        ville.ville_depart ,  this.villes.ville_depart,
        ville.ville_arrive ,  this.villes.ville_arrive,
        ville.type         ,  this.villes.type,
        ville.type_value   ,  this.villes.type_value,
        ville.livreur      ,  this.villes.livreur );

      return  (
         ville.ville_depart ==  this.villes.ville_depart &&
         ville.ville_arrive ==  this.villes.ville_arrive &&
         ville.type         ==  this.villes.type &&
         ville.type_value   ==  this.villes.type_value &&
         ville.livreur      ==  this.villes.livreur );
    })
    console.log(res)

    if(res){
      this.modalSetting.display = "block"
      this.modalSetting.message = "THIS_VILLE_WITH_THIS_VALUE_EXSISTE_DEJA "
      return;
    }
    this.isLoad = true
      this.service.save(this.villes).subscribe(res=>{
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


