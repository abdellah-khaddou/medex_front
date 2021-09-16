import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { BaseProvider } from '../../base/provider/base-provider';
import { AuthService } from '../../services/auth.service';
import { ErorrFrormService } from '../../services/error.form.service';
import { RedirectService } from '../../services/redirect.service';
import { User } from '../../services/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'

})
export class LoginComponent  implements OnInit {
  form:FormGroup;
  loginToken: any;
  message;
  invalidtLogin=false;
  data={} ;
  isLoad = false;
  constructor(
    private currentUser:User,
    private auth: AuthService,
    private redirect:RedirectService,
    private error: ErorrFrormService,
    //private route :ActivatedRoute
  ) {
    if(localStorage.getItem('register')){
      this.message = localStorage.getItem('register');
      localStorage.removeItem('register');
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
    });
  }

  isValid(control) {
    return this.error.inValid(control, this.form);
  }

  messageError(control) {
    return this.error.messageError(control, this.form);
  }

  async login() {
    this.data['login']= this.form.getRawValue().username;
    this.data['password']= this.form.getRawValue().password;
    this.isLoad = true
     this.auth.login(this.data).subscribe(res=>{
       console.log(res)
        if(res){
          this.auth.cureentUser().subscribe(user=>{

            this.currentUser.setuser(user);
            this.redirect.fromLogin();


          })

        }else{

          this.invalidtLogin = true;

          this.isLoad = false
        }
     },error=>{
      this.invalidtLogin = true;

      this.isLoad = false
     });
    //var token = await this.baseCtrl.post('oauth','token',this.data).toPromise();

    //this.auth.redirectFromLogin(token);



  }


}
