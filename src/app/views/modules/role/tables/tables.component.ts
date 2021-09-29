import { Component, OnDestroy, OnInit } from "@angular/core";
import { RoleService } from "../services/service.service";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducer";
import * as actions from "../../../../store/role/module.action";
import * as moduleReducer from "../../../../store/role/module.reducer";
import { TranslateService } from "@ngx-translate/core";

@Component({
  templateUrl: "tables.component.html",
  styleUrls: ["./tables.component.css"],
})
export class TablesComponent implements OnInit,OnDestroy {
  /* traking vendeur name ville_arrive ville_distination, tel, status, prix situation_cache date_payement  emplacement
  type store  nb_order shipping_cost BL*/
  settings = {
    module: "roles",
    columns: [
      { title: "NAME", field: "name" },
      { title: "display name", field: "displayName" },

    ],
  };
  modules$: Observable<any>;

  constructor(

    private service: RoleService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new actions.Load());
    this.modules$ = this.store.select(moduleReducer.selectRole);
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
  ngOnDestroy(): void {}
}
