
import { error } from 'protractor';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { AuthService } from '../../../../../services/auth.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';
import { ActivatedRoute } from '@angular/router';
import { VillesNamesService } from '../../services/service.service';
import { TranslateService } from '@ngx-translate/core';
import * as fromApp from "../../../../../store/app.reducer"
import { Store } from '@ngrx/store';
import * as networksAction from "../../../../../store/networks/module.action"
import { Subscription } from 'rxjs';

@Component({
  selector: 'form-villesNames',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit,OnDestroy {
  ismessage
  valueType ;
  form:FormGroup;
  errors:any;
  villesNames:any={};
  isLoad = false;
  message="edit villesnames success"
  invalidtLogin:Boolean
  sub: Subscription;
  hubs: any;
  constructor(
    private error: ErorrFrormService,
    private service :VillesNamesService,
    private route:ActivatedRoute,
    private auth:AuthService,
    public translate:TranslateService,
    public store:Store<fromApp.AppState>
  ) {
    this.store.dispatch(new networksAction.Load())
    this.getEdit();
    this.ismessage=false;
    this.sub =this.store.subscribe(state=>{
              this.hubs = state.networks.networks
    })
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      hub:new FormControl('', [
        Validators.required,

      ]),

    });
  }
  getEdit(){
    let id = this.route.snapshot.queryParams.id;
    this.service.search({_id:id}).subscribe(res=>{

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
    this.isLoad = true
      this.service.save(this.villesNames).subscribe(res=>{
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
  ngOnDestroy(){
    this.sub.unsubscribe()
  }

}


