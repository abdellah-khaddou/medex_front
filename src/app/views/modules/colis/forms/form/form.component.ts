
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { ErorrFrormService } from '../../../../../services/error.form.service';
import { ActivatedRoute } from '@angular/router';
import { ColisService } from '../../services/service.service';
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../../store/app.reducer";
import * as actionsEnum from "../../../../../store/enum/module.action";
import * as actionsEnumValue from "../../../../../store/enum_value/module.action";
import { CompanieService } from '../../../companies/services/companie.service';
import { VillesService } from '../../../villes/services/service.service';
import { Networks } from '../../../villes/villes.interface';
import { TranslateService } from '@ngx-translate/core';
import * as actionsNetworks from "../../../../../store/networks/module.action"
import * as actionsVillesNames from "../../../../../store/villesnames/module.action"
import { Subscription } from 'rxjs';
import { TypesColis, ValueTypeValues } from '../../../../baseView/enums/listStatusType';

@Component({
  selector: 'form-colis',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit,OnDestroy {
  ismessage
  valueType =TypesColis
  form:FormGroup;
  errors:any;
  colis:any={type:{name:"STANDARD",value:"NORMAL"}};
  isLoad = false;
  message="edit Module success";
  invalidtLogin:Boolean
  villes: any[];
  VillesNetwork: any[];
  statusColis: any[];
  companies: any[];
  trakings: any[];
  valueTypeValues: string[]=ValueTypeValues
  alert = {type:"success",message:"Success add"}
  sub: Subscription;
  networks: any;
  allvilles: any;
  constructor(
    private error: ErorrFrormService,
    private service :ColisService,
    private route:ActivatedRoute,
    private VillesService:VillesService,
    private companieService:CompanieService,
    private store:Store<fromApp.AppState>,
    public translate:TranslateService

  ) {
    this.store.dispatch(new actionsNetworks.Load())
    this.store.dispatch(new actionsVillesNames.Load())
    this.sub = this.store.subscribe(state=>{
     this.networks =  state.networks.networks?.filter(net=>{
            return net.expidition
      })
      this.allvilles = state.villesnames.villesnames
    })

    let id = this.route.snapshot.queryParams.id;

    if(id)this.getEdit(id);
    this.ismessage=false;
    this.store.dispatch(new actionsEnum.Load())
    this.store.dispatch(new actionsEnumValue.Load())
    //this.store.subscribe(store=>{ })
    this.getCompanies()
    this.getVilles()
  }

  getCompanies(){
    this.companieService.search().subscribe((res:any[])=>{
      this.companies = res
      if(this.companies.length<=1){
        this.colis.vendeur = this.companies[0]._id
      }
    })
  }
  getVilles(){
    this.VillesService.distinct().subscribe(res=>{
      this.VillesNetwork = res
    })
    this.VillesService.search().subscribe(res=>{
      this.villes = res.filter(ville=>ville.livreur =="vendeur");

    })

  }


 /* traking vendeur name ville_arrive ville_distination, tel, status, prix situation_cache date_payement  emplacement
  type store  nb_order shipping_cost BL*/
  ngOnInit(): void {
    this.calculPrix()
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      vendeur: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      ville_arrive: new FormControl('', [
        Validators.required,
        //IsExsiste(this.villes)

      ]),
      ville_depart: new FormControl('', [
        Validators.required,
        //IsExsiste(this.VillesNetwork)

      ]),
      prix: new FormControl('', [
        Validators.required,

      ]),
      store: new FormControl('', [
        Validators.required,

      ]),
      nb_order: new FormControl('', [
        Validators.required,

      ]),
      prix_livrison: new FormControl('', [
        Validators.required,

      ]),

      tel: new FormControl('', [
        Validators.required,

      ]),
      adresse: new FormControl('', [
        Validators.required,

      ]),

      type: new FormControl('', [
        Validators.required,


      ]),
      produit: new FormControl('', [

      ]),
      type_value: new FormControl('', [
        Validators.required,


      ])



    });
  }
  getEdit(id){
    this.service.search({_id:id}).subscribe(res=>{

    })

  }
  typeChange(value){
    this.valueType.filter(el=>{
      if(el.name == value){
        this.valueTypeValues = el.types
        this.colis.type.value = this.valueTypeValues[0]
      }
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
    this.colis['hub'] =this.allvilles.find(ville=> ville.name == this.colis.ville_arrive).hub
      this.companies.filter(comp=>{
        if(comp._id == this.colis.vendeur){
          this.colis.vendeurName = comp.name
          this.colis.telVendeur = comp.tel
        }

    })

    this.isLoad = true
      this.service.save(this.colis).subscribe(res=>{
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

  calculPrix(){
    if(this.colis.ville_arrive && this.colis.ville_depart && this.colis.type.name && this.colis.type.value){

      this.villes.filter(( ville : Networks)=>{



        if(
          ville.ville_depart == this.colis.ville_depart &&
          ville.ville_arrive==this.colis.ville_arrive &&
          ville.type == this.colis.type.name &&
          ville.type_value == this.colis.type.value
          ){
          this.colis.prix_livrison = ville.prix_livrision
          this.colis.prix_anulle = ville.prix_annule
          this.colis.prix_refuse = ville.prix_refuse
        }else{


          console.log("not_found")
        }
      })
    }

  }

ngOnDestroy(){
  this.sub.unsubscribe()
}


}


