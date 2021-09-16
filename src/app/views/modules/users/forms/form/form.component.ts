import { Observable, Subscription } from 'rxjs';
import { Update } from '@ngrx/entity';


import { error } from 'protractor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from '../../../../../services/auth.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CompanieService } from '../../../companies/services/companie.service';
import * as fromApp from "../../../../../store/app.reducer"
import * as userAction from "../../../../../store/users/users.action"
import * as companieAction from "../../../../../store/companies/companies.action"
import { Store } from '@ngrx/store';
import { User } from '../../classes/user.interface';
import { TranslateService } from '@ngx-translate/core';
import { ResourcesService } from '../../../resources/services/service.service';
import { NameEnums } from '../../../enum/names/enums.names';
import { PermissionService } from '../../../../../services/permission.service';
import { RoleService } from '../../../role/services/service.service';
import { permissionEnum } from '../../../../baseView/enums/enums';


@Component({
  selector: 'form-user',
  templateUrl: 'form.component.html'
})
export class FormUserComponent implements OnInit,OnDestroy {
  companies
  form:FormGroup;
  errors:any;
  invalidtLogin=false;
  user:any={};
  isLoad = false;
  message;
  subscribtion: Subscription;
  sub: Subscription;
  resources: any;
  oldPermissions: any=[];
  permission: any=[];
  roles: any;
  permissionEnum: any;
  constructor(
    private userService: UserService,
    private error: ErorrFrormService,
    private route :ActivatedRoute,
    private redirect:RedirectService,
    private store:Store<fromApp.AppState>,
    private resourcesService:ResourcesService,
    private permissionService:PermissionService,
    private roleService: RoleService,



  ) {
      this.dispatch();
  }
  dispatch(){
    this.store.dispatch(new companieAction.Load())
    this.store.dispatch(new userAction.Load())
  }
  loadData(){
    let id = this.route.snapshot.queryParams.id;

    this.subscribtion = this.store.subscribe(state=>{
      if(state.auth.user) this.permissionEnum  =permissionEnum[state.auth.user.company.type]
      this.companies = state.companies.companies;
      if(id){
        let user =state.users.users.filter(user=>user._id==id)[0]
        if(this.user){
          Object.assign(this.user,user)

          this.permissionService.search({userID:this.user._id}).subscribe((resPermission:any[])=>{
            if(resPermission){
              resPermission.filter(el=>{
                this.oldPermissions.push(el.permission)
              })
              this.permission = this.oldPermissions;
            }

         })
        }
      }
    })
    this.roleService.search().subscribe(res=>{
      this.roles = res
    })


  }



  ngOnInit(): void {

    this.loadData();
    this.loadResources();
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      role: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      tel: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      cin: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      company: new FormControl('', [

      ])

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
    this.user.permission = this.permission
    let role = this.roles.find(val=>val.name==this.user.role)
    this.user.role = role.name;
    this.user['roleID'] = role._id;
    this.companies.filter(el=>{
      if(el._id==this.user.company){
        this.user.companyName = el.name;
      }
    })

     this.userService.save(this.user).subscribe(res=>{
        if(res){

            this.redirect.toUsers();
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


  isChecked(value){
    return this.oldPermissions.some(el=>el==value)
  }

  loadResources() {
    this.sub = this.resourcesService.search({type:true,name:NameEnums.RESOURCES}).subscribe(res=>{
      this.resources = res[0];
    })
  }

  onCheckChange(event){
    if(event.target.checked){
        this.permission.push(event.target.value)
    }else{
      let i = this.permission.indexOf(event.target.value)
      this.permission.splice(i,1)
    }

    console.log(this.permission)
}

  ngOnDestroy(){
    this.subscribtion.unsubscribe()
    this.sub.unsubscribe();
  }
}


