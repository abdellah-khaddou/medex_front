import { Component, OnDestroy, OnInit } from "@angular/core";
import { ColisService } from "../services/service.service";
import { Subject, Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducer";
import * as actions from "../../../../store/colis/module.action";
import * as moduleReducer from "../../../../store/bon/module.reducer";
import { TranslateService } from "@ngx-translate/core";
import { FilterMatchMode, PrimeNGConfig } from "primeng/api";
import { pdfMaker } from "pdf-maker";
import * as FileSaver from "file-saver";
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { StatusColis } from "../../../baseView/enums/status.colis";
import { TypesCompanies } from "../../../baseView/enums/enums";
@Component({
  templateUrl: "tables.component.html",
  styleUrls: ["./tables.component.css"],
})
export class TablesNonEnvoyeComponent implements OnInit, OnDestroy {
  /* traking vendeur name ville_arrive ville_distination, tel, status, prix situation_cache date_payement  emplacement
  type store  nb_order shipping_cost BL*/

  modalSetting : {display:string,message:string,type:string,title:string}  =  {display:"none",message:"no selected colis",type:"danger",title:"Errors"}
  settings = {
    module: "colis",
    columns: [
      { title: "TRAKING", field: "traking", typeData: "text" },
      { title: "VENDEUR", field: "vendeurName", typeData: "enum" },
      //{ title: "NAME",    field: "name" ,typeData:"text" },
      { title: "DEPART", field: "ville_depart", typeData: "text" },
      { title: "ARRIVE", field: "ville_arrive", typeData: "text" },
      {
        title: "STATUS",
        field: "statusName",
        type: "span",
        typeData: "enum",
        name: "status",
      },
      { title: "PRIX", field: "prix", typeData: "numeric" },
      { title: "prix livrison", field: "prix_livrison", typeData: "numeric" },
      //{ title: "SITUATION_CACHE", field: "situation_cache" },
      //{ title: "DATE_PAYEMENT", field: "date_payement" },
      { title: "EMPLACEMENT", field: "emplacement", typeData: "text" },
      //{ title: "STORE", field: "store"  ,typeData:"text"},
      //{ title: "NB_ORDER", field: "nb_order"  ,typeData:"text"},
      { title: "TEL", field: "tel", typeData: "text" },
      { title: "TYPE", field: "typeCode", typeData: "text" },
    ],
  };
  modules$: Observable<any>;
  colis: any;
  selectedColis: any[] =[];
  multiSortMeta = [];

  filters: { statusName: any[]; vendeurName: any[] } = {
    statusName: [],
    vendeurName: [],
  };
  sub: Subscription;
  user: any;
  colisBarCode: any[]=[];
  testcolis: any;
  showDitailes: boolean;
  colisIdShow: any;
  allColis: any[];
  buttonTypeColis: any;
  constructor(
    private service: ColisService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    public translate: TranslateService
  ) {



  }

  ngOnInit(): void {
    this.store.dispatch(new actions.Load());
    this.sub =this.store.subscribe((res) => {
      let vendeurs = res.colis.colis?.map((re) => re.vendeurName);
      let status = res.colis.colis?.map((re) => re.status);
      this.filters.vendeurName = this.getUnique(vendeurs);
      this.filters.statusName = this.getUnique(status)?.map((el) => el.value);
      this.allColis =res.colis.colis?.filter(coli=>coli).map(coli=>{return {...coli}})
      this.colis = res.colis.colis?.filter(col=>{
        this.user = res.auth.user
        if(this.user.company.type == TypesCompanies.ADMIN) {
          this.buttonTypeColis ="ACCEPTE_EN_NETWORK"
          return col.status.value == StatusColis.ENVOYE
        }
        else if(this.user.company.type == TypesCompanies.LIVREUR) {
          this.buttonTypeColis = "ACCEPTE"
          return col.status.value == StatusColis.RECEPTION_HUB
        }
        return col.status.value == StatusColis.NON_ENVOYE
      }).map((coli) => {
        return { ...coli };
      });

    });
  }

  getUnique(value: any[]) {
    console.log(value);
    return value?.filter((val, index, arry) => {
      return arry.indexOf(val) === index;
    });
  }
  delete(module) {}

  edit(module) {
    this.router.navigate(["/dashboard/" + this.service.module + "/edit"], {
      queryParams: { id: module._id },
    });
  }
  show(module) {
    this.showDitailes = false
    setTimeout(()=>{
      this.colisIdShow = module._id
      this.showDitailes = true
    },30)

  }
  clickOnFilter(event: Event) {
    event.stopPropagation();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }




enSubmitBarCode(input){

  this.colis.filter((coli:any)=>{
      if(coli.traking == input.value){
        if(this.colisBarCode.some(coli=>coli.traking== input.value)){
          coli.class =''
            this.colisBarCode = this.colisBarCode.filter(coli=>coli.traking !=input.value)
        }else{
          coli.class="background:#5E3"
          this.colisBarCode.push(coli)
        }

      }
      return coli
    })

   input.value=""

}
selectValue(value){
  let input ={
    value :value
  }
  if(this.user.company.type != TypesCompanies.VENDEUR){
    this.enSubmitBarCode(input)
  }
}
envoye(){
  let res = this.selectedColis?.some(coli=>coli.statusName !==StatusColis.NON_ENVOYE)
  if(!this.selectedColis || this.selectedColis.length <=0 ){
    this.modalSetting.display = "block";
    return;
  }else if(res){
    this.modalSetting.display = "block"
    this.modalSetting.message = "can not envoye un colis envoye deja "
    return;
  }


  this.store.dispatch(new actions.ChangeStatus({colis:this.selectedColis,status:StatusColis.ENVOYE,date:new Date()}))

}
retourner(){
  let res = this.selectedColis?.some(coli=>coli.statusName !==StatusColis.ANUULE || coli.statusName !==StatusColis.REFUSE)
  if(!this.selectedColis || this.selectedColis.length <=0 ){
    this.modalSetting.display = "block";
    return;
  }else if(res){
    this.modalSetting.display = "block"
    this.modalSetting.message = "can not retourner un colis  not refuse or anuule deja "
    return;
  }


  this.store.dispatch(new actions.ChangeStatus({colis:this.selectedColis,status:StatusColis.RETOURE_TO_NETWORK,date:new Date()}))

}
accepte(){

  if(this.user.company.type == TypesCompanies.ADMIN){
    let res;
    if(this.buttonTypeColis == "ACCEPTE_EN_NETWORK" ){
       res = this.colisBarCode?.some(coli=>coli.statusName !==StatusColis.ENVOYE)
    }else if(this.buttonTypeColis == "RETOUR_EN_NETWORK"){
      res = this.colisBarCode?.some(coli=>coli.statusName !==StatusColis.RETOURE_TO_NETWORK)
    }else if(this.buttonTypeColis == "RETEURNER"){
      res = this.colisBarCode?.some(coli=>coli.statusName !==StatusColis.RETOURE_EN_NETWORK)
    }
    if(!this.colisBarCode || this.colisBarCode.length <=0 ){
      this.modalSetting.display = "block";
      return;
    }else if(res){
      this.modalSetting.display = "block"
      this.modalSetting.message = "can not accept un colis not En reciption "
      return;
    }

    if(this.buttonTypeColis == "ACCEPTE_EN_NETWORK" ){
      this.store.dispatch(new actions.ChangeStatus({colis:this.colisBarCode,status:StatusColis.EN_NETWORK,date:new Date()}))
    }else if(this.buttonTypeColis == "RETOUR_EN_NETWORK"){
      this.store.dispatch(new actions.ChangeStatus({colis:this.colisBarCode,status:StatusColis.RETOURE_EN_NETWORK,date:new Date()}))
    }else if(this.buttonTypeColis == "RETEURNER"){
      this.store.dispatch(new actions.ChangeStatus({colis:this.colisBarCode,status:StatusColis.RETOURE_TO_VENDEUR,date:new Date()}))
    }

  }else if(this.user.company.type == TypesCompanies.LIVREUR){
    let res = this.colisBarCode?.some(coli=>coli.statusName !==StatusColis.RECEPTION_HUB)
    if(!this.colisBarCode || this.colisBarCode.length <=0 ){
      this.modalSetting.display = "block";
      return;
    }else if(res){
      this.modalSetting.display = "block"
      this.modalSetting.message = "can not accept un colis not En reciption "
      return;
    }

    this.store.dispatch(new actions.ChangeStatus({colis:this.colisBarCode,status:StatusColis.EN_HUB,date:new Date()}))

  }


}



  reset(){
    this.store.dispatch(new actions.ChangeStatus({colis:this.testcolis}))
  }

  changeTypesColis(val){

    this.buttonTypeColis =val
    if(val == "ACCEPTE"){
      this.colis = this.allColis.filter(coli=>{
        return coli.status.value == StatusColis.RECEPTION_HUB
      })

    }else if(val =="RETOUR"){
      this.colis = this.allColis.filter(coli=>{
        return coli.status.value == StatusColis.REFUSE || coli.status.value == StatusColis.ANUULE
      })
    }else if(val ==  "RETOUR_EN_NETWORK"){
      this.colis = this.allColis.filter(coli=>{
        return coli.status.value == StatusColis.RETOURE_TO_NETWORK
      })
    }else if(val ==  "RETEURNER"){
      this.colis = this.allColis.filter(coli=>{
        return coli.status.value == StatusColis.RETOURE_EN_NETWORK
      })
    }else if(val == "ACCEPTE_EN_NETWORK" ){
      this.colis = this.allColis.filter(coli=>{
        return coli.status.value == StatusColis.ENVOYE
      })
    }

  }
}
