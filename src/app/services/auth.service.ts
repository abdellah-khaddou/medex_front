import { HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";

import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BaseProvider } from '../base/provider/base-provider';


@Injectable({
  providedIn:'root'
})
export class AuthService implements OnInit {
  url = environment.url+ 'user';
  
  users;
  constructor( 
    private baseCtrl: BaseProvider,
    private router:Router,

  ) {
  }
  ngOnInit() {}

 
  logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return this.router.navigate(['/login'])
    }
  }
  register(data){
    return this.baseCtrl.post('companies','register',data);
  }
  login(data){
    return this.baseCtrl.post('users','login',data).pipe(map(token=>{
      
          if(token){
            console.log(token)
            console.log(token.token)
            localStorage.setItem('token',token.token)
            return true;
          }else{
            return false;
          }

    }));
  }
  loggedIn(){
    const token  = localStorage.getItem('token');
    if(!token)return false;
    return  !new JwtHelperService ().isTokenExpired(token);

  }
  
    cureentUser(){
      return this.baseCtrl.post('users','verifierToken',{token:localStorage.getItem('token')});
    }
    verifierToken(){
      return this.cureentUser();
    }
 
}
