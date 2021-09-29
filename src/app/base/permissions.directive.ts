import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from "../store/app.reducer"
import { permissionEnum, TypesCompanies, TypesRoles } from '../views/baseView/enums/enums';

@Directive({
  selector: '[ifPer]'
})
export class PermissionsDirective implements OnDestroy {
  user: any;
  sub: Subscription;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store :Store<fromApp.AppState>
  ) {
    this.sub = this.store.subscribe(state=>{
      this.user = state.auth.user


    })
  }

  @Input()
  set ifPer(val) {
    this.update(this.hasPermission(val))
  }
  update(val){
    if(val) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  hasPermission(val){

    let isExsiteAdminCustomPer = permissionEnum.ADMIN.some(el=>el.value == val)
    let isExsiteVendeurCustomPer = permissionEnum.VENDEUR.some(el=>el.value == val)
    let isExsiteLivreurCustomPer = permissionEnum.LIVREUR.some(el=>el.value == val)
    if(this.user?.company.type == TypesCompanies.ADMIN){
      if(this.user?.role == TypesRoles.ADMIN){
          if(isExsiteAdminCustomPer || isExsiteLivreurCustomPer || isExsiteVendeurCustomPer){
            return isExsiteAdminCustomPer
          }
          return false
      }else{
            return this.user?.permission.some(value => value.permission == val)
      }

    }else if(this.user?.company.type == TypesCompanies.VENDEUR){
      if(this.user?.role == TypesRoles.ADMIN){
        if(isExsiteAdminCustomPer || isExsiteLivreurCustomPer || isExsiteVendeurCustomPer)return isExsiteVendeurCustomPer
          return false
      }else{
            return this.user?.permission.some(value => value.permission == val)
      }

    }else if(this.user?.company.type == TypesCompanies.LIVREUR){
      if(this.user?.role == TypesRoles.ADMIN){
        if(isExsiteAdminCustomPer || isExsiteLivreurCustomPer || isExsiteVendeurCustomPer)return isExsiteLivreurCustomPer
        return false
      }else{
            return this.user?.permission.some(value => value.permission == val)
      }

    }

  }
  ngOnDestroy(){
    this.sub.unsubscribe
  }
}
