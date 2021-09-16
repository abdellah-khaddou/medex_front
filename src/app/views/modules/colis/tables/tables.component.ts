import { Component, OnDestroy, OnInit } from "@angular/core";
import { ColisService } from "../services/service.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducer";
import * as actions from "../../../../store/colis/module.action";
import * as actionsusers from "../../../../store/users/users.action";
import { TranslateService } from "@ngx-translate/core";
import * as FileSaver from "file-saver";
import autoTable from "jspdf-autotable";
import { StatusColis } from "../../../baseView/enums/status.colis";
import { trigger,state,style,animate,transition} from '@angular/animations';
import { Observable } from "rxjs";
import { listStatus } from "../../../baseView/enums/listStatusType";
import * as csv from "csvtojson"
@Component({
  templateUrl: "tables.component.html",
  styleUrls: ["./tables.component.css"],
  animations:[
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0.8,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class TablesComponent implements OnInit, OnDestroy {
  /* traking vendeur name ville_arrive ville_distination, tel, status, prix situation_cache date_payement  emplacement
  type store  nb_order shipping_cost BL*/

  modalSetting : {display:string,message:string,type:string,title:string}  =  {display:"none",message:"no selected colis",type:"danger",title:"Errors"}
  settings = {
    module: "colis",
    columns: [
      { title: "TRAKING", field: "traking", typeData: "text" },
      { title: "VENDEUR", field: "vendeurName", typeData: "enum" },
      { title: "DEPART", field: "ville_depart", typeData: "text" },
      { title: "ARRIVE", field: "ville_arrive", typeData: "text" },
      {title: "STATUS", field: "statusName", type: "span",typeData: "enum", name: "status",},
      { title: "PRIX", field: "prix", typeData: "numeric" },
      { title: "prix livrison", field: "prix_livrison", typeData: "numeric" },
      { title: "EMPLACEMENT", field: "emplacement", typeData: "text" },
      { title: "BL", field: "BL", typeData: "text" },
      { title: "TEL", field: "tel", typeData: "text" },
      { title: "TYPE", field: "typeCode", typeData: "text" },
    ],
  };
  modules$: Observable<any>;
  colis: any;
  selectedColis: any[];
  multiSortMeta = [];

  filters: { statusName: any[]; vendeurName: any[] } = {
    statusName: [],
    vendeurName: [],
  };
  exportColumns: any[];
  exportColumnsField: any[];
  notexportColumn = ["type", "statusName"];
  colisIdShow: any;
  showDitailes: boolean;
  user: any;
  listStatusLivreur
  showLivreurList:Boolean
  statusSelect :any
  livreurStatus : {
      name :String,
      date:Date,
      description:String,
      user:String

  } = {name:"",date:null,description:"",user:""}
  users: any[];
  constructor(
    private service: ColisService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    public translate: TranslateService
  ) {

    this.listStatusLivreur = listStatus.livreur
    this.exportColumns = this.settings.columns
      .map((col) => {
        if (!this.notexportColumn.some((val) => val == col.field))
          return col.title;
      })
      .filter(function (element) {
        return element !== undefined;
      });
    this.exportColumnsField = this.settings.columns
      .map((col) => {
        if (!this.notexportColumn.some((val) => val == col.field))
          return col.field;
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.Load());
    this.store.dispatch(new actionsusers.Load());
    this.store.subscribe((res) => {
      this.user = res.auth.user
      this.users = res.users.users

      let vendeurs = res.colis.colis?.map((re) => re.vendeurName);
      let status = res.colis.colis?.map((re) => re.status);
      this.filters.vendeurName = this.getUnique(vendeurs);
      this.filters.statusName = this.getUnique(status)?.map((el) => el.value);
      this.colis = res.colis.colis?.map((coli) => {
        return { ...coli };
      });
    });
  }

  getUnique(value: any[]) {
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
  closeDetails(val){
    this.showDitailes = false
  }

  clickOnFilter(event: Event) {
    event.stopPropagation();
  }
  ngOnDestroy(): void {}

  exportPdf() {
    let data = [];
    this.colis.filter((el) => {
      let dataR = [];
      this.exportColumnsField.filter((col) => {
        dataR.push(el[col]);
      });

      data.push(dataR);
    });
    import("jspdf").then((jsPDF) => {
      const doc = new jsPDF.default();
      this.exportColumns.push("BARCODE");
      autoTable(doc, {
        head: [this.exportColumns],
        body: data,
        didDrawPage: (dataArg) => {
          doc.text("Colis", dataArg.settings.margin.left, 10);
        },
        didDrawCell: (data) => {
          if (data.section == "body" && data.column.index == 9) {
            let str = "#" + data.row.raw[0] + " " + "img";
            let img: any = document.querySelector(str);
            var dim = data.cell.height - data.cell.padding("vertical");
            var textPos = data.cell;
            doc.addImage(
              img.src,
              "png",
              textPos.x,
              textPos.y,
              data.column.width,
              data.cell.height
            );
          }
        },
        styles: { fontSize: 8 },
      });
      doc.save("colis.pdf");
    });
  }




  exportExcel() {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.colis);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "colis");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  goToGenerate(){
    if(!this.selectedColis || this.selectedColis.length <=0){
      this.modalSetting.display = "block";
      return;
    }

    this.router.navigate(["/dashboard/colis/genereate",{colis:JSON.stringify(this.selectedColis)}])
  }
  envoyesToBL(){
    let res = this.selectedColis?.some(coli=>coli.statusName !=="NON_ENVOYE")
    if(!this.selectedColis || this.selectedColis.length <=0 ){
      this.modalSetting.display = "block";
      return;
    }else if(res){
      this.modalSetting.display = "block"
      this.modalSetting.message = "can not envoye un colis envoye deja "
      return;
    }

    //this.router.navigate(["/dashboard/colis/genereate",{colis:JSON.stringify(this.selectedColis)}])
  }

  expidition(){
    let colisEnNetwork = this.colis.filter(coli=>{
      return coli.status.value == StatusColis.EN_NETWORK
    })


    if(!colisEnNetwork || colisEnNetwork.length <=0 ){
      this.modalSetting.display = "block";
      this.modalSetting.message = "NOT_FOUND_COLIS_"+StatusColis.EN_NETWORK
      return;
    }

    this.store.dispatch(new actions.ChangeStatus({colis:colisEnNetwork,status:StatusColis.EXPEDITION,date:new Date()}))

  }
  showBox(){
    if(!this.selectedColis || this.selectedColis?.length <=0 ){
      this.modalSetting.display = "block";
      this.modalSetting.message = "SELECT_COLIS"
      return;
    }else if(this.selectedColis?.some(coli=>coli.status.value == StatusColis.DELEVRY)){
      this.modalSetting.display = "block";
      this.modalSetting.message = "CANT_CHANGE_DELEVRY_COLIS"
      return;
    }
    this.showLivreurList =true
  }
  changeStatus(){

    this.statusSelect = this.listStatusLivreur.find(res=>{
      return res.name == this.livreurStatus.name
    })
    console.log(this.users)
  }
  changeStatusByLivreur(){
    let colisSelectione = this.selectedColis
    //if(this.selectedColis.some(coli=>coli.status ==StatusColis.DEL ))
    if(this.livreurStatus.name == StatusColis.RECOMANDER && this.livreurStatus.date ==null ){
      this.modalSetting.display = "block";
      this.modalSetting.message = "SELECT DATE BEFORE"
      return;
    }else if(this.livreurStatus.name == StatusColis.ENCOUR_DELEVRY && this.livreurStatus.user == ""){
      this.modalSetting.display = "block";
      this.modalSetting.message = "SELECT USER BEFORE"
      return;
    }
    this.showLivreurList=false

           this.store.dispatch(new actions.ChangeStatus({
             colis:colisSelectione,
             status:this.livreurStatus.name,
             date: new Date(),
             dateReclame: this.livreurStatus.date,
             description:this.livreurStatus.description,
             user:this.livreurStatus.user
            }))
            this.livreurStatus ={name:"",date:null,description:"",user:""}
  }

  fileChangeListener(event){
    csv().fromFile(event.target.value).then(json=>{
      console.log(json)
    })
  }

}
