
import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { AuthService } from '../../../../../services/auth.service';
import { ErorrFrormService } from '../../../../../services/error.form.service';
import { RedirectService } from '../../../../../services/redirect.service';
import { ActivatedRoute } from '@angular/router';
import { NetworksService } from '../../services/service.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'edit-user',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {
  ismessage
  valueType ;
  form:FormGroup;
  errors:any;
  networks:any={};
  isLoad = false;
  message="edit Module success"
  invalidtLogin:Boolean
  constructor(
    private error: ErorrFrormService,
    private service :NetworksService,
    private route:ActivatedRoute,
    private auth:AuthService,
    public translate:TranslateService
  ) {
    this.getEdit();
    this.ismessage=false;
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      expidition: new FormControl('', [
        Validators.required,
      ]),




    });
  }
  getEdit(){
    let id = this.route.snapshot.queryParams.id;
    if(id){
      this.service.search({_id:id}).subscribe(res=>{
          this.networks = res[0]
      })
    }


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
      this.service.save(this.networks).subscribe(res=>{
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


}


