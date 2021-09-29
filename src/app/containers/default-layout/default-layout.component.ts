import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user';
import { navItemsAdmin} from '../../_nav';
import * as fromApp from "../../store/app.reducer"
import { Store } from '@ngrx/store';
import * as actionResources from "../../store/resources/module.action"
import * as actionAuth from "../../store/auth/auth.action"
import { modules, TypesRoles } from '../../views/baseView/enums/enums';
import { PermissionService } from '../../services/permission.service';
import { element } from 'protractor';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems;
  user;
  ressources: any;
  oneRes: any;
  permissions: any[];
  Showresources: { name: string; value: string; }[];

  constructor(
    private currentUser: User,
    private permissionService:PermissionService,
    private auth: AuthService,
    private store : Store<fromApp.AppState>
  ) {
    this.store.dispatch(new actionResources.Load())
    this.store.dispatch(new actionAuth.isLogin())
    this.store.subscribe(res=>{
      this.ressources = res.resources.resources
      if(this.ressources)this.thisUser();
    })



  }

 thisUser() {

    let resources
      this.auth.cureentUser().subscribe(user => {
        this.user = user.user;
        if(this.user?.company.type=="ADMIN"){

          this.navItems = navItemsAdmin
      }else{
        this.permissionService.getPermission(this.user).subscribe(res=>{

          this.permissions = res

            resources = this.ressources.map(res=>{
              if(res?.companyType == this.user?.company?.type)return res
            })
            if(resources && this.permissions){
              this.oneRes = resources[0].resources
              this.choixNav();

            }
        })



        }

      })



 }

  choixNav() {

          this.Showresources  =  modules.filter(module=>{

            if(module.value == "dashboard")return module;
            else if (this.oneRes.some(val=> val == module.value))return module
          })
      let navItems = navItemsAdmin.filter(el=>{
            if( this.Showresources.some(val=>val.name == el.name))return el
            if(el.name == "Stock" || el.name == "Setting"){
                let childs =  el.children.filter(child=>{
                    if( this.Showresources.some(res=>res.name == child.name))return child
                })
                el.children = childs;
                if(childs.length >0) return el

            }
      });


      this.isUserHasPermission(navItems)


  }
  isUserHasPermission(navItems:any[]){
    let nav
      if(this.user.role == TypesRoles.ADMIN){
        nav = navItems
      }else{
        nav = navItems.filter(el=>{

            if(el.name == "Stock" || el.name == "Setting"){
                let childs =  el.children.filter(child=>{
                    let module = this.Showresources.find(res=>res.name == el.name)
                    let elms = child.children?.filter(res=>{
                      if(res.name == "All"){
                          if(this.permissions.some(per=>per.module == module?.value && per.per == "read"))return res

                      }else if(res.name== "Add"){
                          if(this.permissions.some(per=>per.module == module?.value && per.per=="create"))return res

                      }else if(res.name == "Non Envoye"){

                      }
                    })
                    el.children = elms;
                    if(elms?.length >0)return el
                })
                el.children = childs;
                if(childs?.length >0) return el

            }else{
              let module = this.Showresources.find(res=>res.name == el.name)
              let elms = el?.children?.filter(res=>{
                if(res.name == "All"){

                    if(this.permissions.some(per=>per.module == module?.value && per.per == "read"))return res

                }else if(res.name== "Add"){
                    if(this.permissions.some(per=>per.module == module?.value && per.per=="create"))return res

                }else if(res.name == "Non Envoye"){

                }
              })
              el.children = elms;
              if(elms?.length >0)return el
            }

        })
     }

    this.navItems = nav;
  }

  logout() {
    this.auth.logout();
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
