import { Component, OnDestroy, OnInit } from "@angular/core";
import { BonService } from "../services/service.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducer";
import * as actionsColis from "../../../../store/colis/module.action";
import * as actionsBon from "../../../../store/bon/module.action";
import * as actionsCompanies from "../../../../store/companies/companies.action";
import * as moduleReducer from "../../../../store/bon/module.reducer";
import { TranslateService } from "@ngx-translate/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as actions from "../../../../store/colis/module.action";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import * as FileSaver from "file-saver";
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { invoceTemplate } from "../../../baseView/enums/invoice.template";
import { Images } from "../../../baseView/enums/images/base64";
import { throwIfEmpty } from "rxjs/operators";
import { Subscription } from "rxjs";
import { TypesCompanies } from "../../../baseView/enums/enums";
import { StatusColis } from "../../../baseView/enums/status.colis";
import * as actionsusers from "../../../../store/users/users.action";

@Component({
  templateUrl: "tables.component.html",
  styleUrls: ["./tables.component.css"],
})
export class TablesComponent implements OnInit, OnDestroy {
  /* traking vendeur name ville_arrive ville_distination, tel, status, prix situation_cache date_payement  emplacement
  type store  nb_order shipping_cost BL*/

  modalSetting : {display:string,message:string,type:string,title:string}  =  {display:"none",message:"no selected colis",type:"danger",title:"Errors"}
  settings = {
    module: "bon",
    columns: [
      { title: "Code", field: "code", typeData: "text" },
      { title: "Type", field: "type", typeData: "enum" },
      { title: "Status", field: "status", typeData: "text" ,type:"status" },
      { title: "Companie", field: "companyName", typeData: "text" },

    ],
  };
  columns=[
    { title: "TRAKING", field: "traking", typeData: "text" },
    { title: "VENDEUR", field: "vendeurName", typeData: "enum" },
    { title: "ARRIVE", field: "ville_arrive", typeData: "text" },
    { title: "DEPART", field: "ville_depart", typeData: "text" },
    { title: "PRIX", field: "prix", typeData: "numeric" },
    { title: "prix livrison", field: "prix_livrison", typeData: "numeric" },
    { title: "EMPLACEMENT", field: "emplacement", typeData: "text" },
    { title: "TEL", field: "tel", typeData: "text" },
  ]
  selectedBons: any[];
  multiSortMeta = [];

  exportColumns: any[];
  exportColumnsField: any[];
  bons: any;
  filters: { type: any[]; vendeurName: any[] } = {
    type: ["BL","BE"],
    vendeurName: [],
  };
  type: any = "all";
  allBons: any;
  sub: Subscription;
  livreur: any;
  livreurs: any;
  selectedBon: any;
  showLivreurList: boolean;
  user: any;
  constructor(
    private service: BonService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    public translate: TranslateService

  ) {
    this.exportColumns = this.columns.map((col) => col.title)
    this.exportColumnsField = this.columns.map((col) => col.field)

  }
  load(){
    this.store.dispatch(new actionsBon.Load());
    this.store.dispatch(new actionsCompanies.Load());
    this.store.dispatch(new actionsusers.Load());
  }
  ngOnInit(): void {
    this.load()
    this.sub =this.store.subscribe((res) => {
      this.user = res.auth.user
      this.allBons =this.bons = res.bon.bon?.map((coli) => {
        return { ...coli };
      });

      this.livreurs = res.companies.companies?.filter(comp=>{

        return comp.type == TypesCompanies.LIVREUR
      })
      console.log(this.livreurs,res.companies.companies)

    });
  }

  delete(module) {}

  edit(module) {
    this.router.navigate(["/dashboard/" + this.service.module + "/edit"], {
      queryParams: { id: module._id },
    });
  }
  show(module) {
    this.router.navigate(["/dashboard/" + this.service.module + "/show"], {
      queryParams: { id: module._id },
    });
  }
  clickOnFilter(event: Event) {
    event.stopPropagation();
  }
  ngOnDestroy(): void {this.sub.unsubscribe()}
  exportTickit(bon){
    let colis  = JSON.parse(JSON.stringify(bon.colis)) // pour disable object is extensible

    colis =colis.map(el=>{
         let str = "#" + el.traking + " " + "img";
         let img: any = document.querySelector(str)
          el["codebar"] = img.src
          return el
    })
    return  pdfMake.createPdf(invoceTemplate(colis,Images)).download();

  }
  exportPdf(bon) {
    let data = [];
    let colis  = bon.colis

    colis.filter((el) => {
      let dataR = [];
      this.exportColumnsField.filter((col) => {
        dataR.push(el[col]);
      });

      data.push(dataR);
    });
    import("jspdf").then((jsPDF) => {
      const doc = new jsPDF.default();
      if(this.exportColumns.indexOf("BARCODE") <0)this.exportColumns.push("BARCODE");
      autoTable(doc, {
        head: [this.exportColumns],
        body: data,
        didDrawPage: (dataArg) => {
          doc.text(bon.code, dataArg.settings.margin.left, 10);
        },
        didDrawCell: (data) => {
          if (data.section == "body" && data.column.index == 8) {
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
  filterBon(value){
    this.type=value
    this.bons = this.allBons.filter(bon=>{
      return bon.type == value
    })
    if(value == "all")this.bons = this.allBons
  }

  send(bon){
    if(bon.type !="BE")return;
    this.selectedBon = bon
    this.showLivreurList = true

  }
  reteur(bon){
    if(bon.type !="BRE")return;

    this.store.dispatch(new actions.ChangeStatus({colis:bon.colis,bonID:bon._id,status:StatusColis.RETOURNER,date:new Date()}))
    setTimeout(() => {
      this.load()

    }, 1000);

  }
  delevry(bon){
      if(this.livreur)this.store.dispatch(new actions.ChangeStatus({colis:bon.colis,bonID:bon._id,status:StatusColis.RECEPTION_HUB,date:new Date(),livreur:this.livreur}))
      //add MessageBox if not chose livreur
      this.showLivreurList = false
        setTimeout(() => {
          this.load()

        }, 1000);

  }
}
