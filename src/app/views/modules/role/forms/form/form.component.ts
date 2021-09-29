import { RoleService } from './../../../role/services/service.service';

import { error } from 'protractor';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from '../../../../../services/auth.service';
import { ResourcesService } from '../../../resources/services/service.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../../store/app.reducer";
import * as actions from "../../../../../store/resources/module.action";
import * as moduleReducer from "../../../../../store/resources/module.reducer";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NameEnums } from '../../../enum/names/enums.names';
import { PermissionService } from '../../../../../services/permission.service';
import { permissionEnum } from '../../../../baseView/enums/enums';


@Component({
  selector: 'form-role',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit,OnDestroy{

  form:FormGroup;
  errors:any;
  invalidtLogin=false;
  role:any={name:"",displayName:"",permission:[]};
  isLoad = false;
  message;
  resources: any;
  sub: Subscription;
  subscribtion: Subscription;
  permission:any[]=[]
  oldPermissions: any =[];
  permissionEnum: any[];
  constructor(
    private service:RoleService ,
    private error: ErorrFrormService,
    private route :ActivatedRoute,
    private permissionService:PermissionService,
    private redirect:RedirectService,
    private resourcesService:ResourcesService,
    private store:Store<fromApp.AppState>,

  ) {
    this.subscribtion = this.store.subscribe(state=>{
      if(state.auth.user) this.permissionEnum  =permissionEnum[state.auth.user.company.type]

    })

    let id = this.route.snapshot.queryParams.id;
    if(id){
      this.getEdit(id);
    }


  }

  ngOnInit(): void {
    this.loadResources();

    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),


    });
  }
  loadResources() {
    this.sub = this.resourcesService.search({type:true,name:NameEnums.RESOURCES}).subscribe(res=>{
      this.resources = res[0];
      console.log(this.resources)
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
  create(){

    this.isLoad = true
    this.role.permission = this.permission
     this.service.save(this.role).subscribe(res=>{
        if(res){

            this.redirect.toRole();
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
        this.role =res[0];
          this.permissionService.search({roleID:this.role._id}).subscribe((resPermission:any[])=>{
            if(resPermission){
              resPermission.filter(el=>{
                this.oldPermissions.push(el.permission)
              })
              this.permission = this.oldPermissions;
            }

         })


      }

    })
  }

  isChecked(value){
    return this.oldPermissions.some(el=>el==value)
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
    this.subscribtion.unsubscribe()
  }
  onCheckChange(event){
      console.log(event)
      if(event.target.checked){
          this.permission.push(event.target.value)
      }else{
        let i = this.permission.indexOf(event.target.value)
        this.permission.splice(i,1)
      }

      console.log(this.permission)
  }

}


