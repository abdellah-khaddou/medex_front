
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn:'root'
})
export class User {
 
  constructor(private auth:AuthService){

  }
  setuser(user){
    if(localStorage.getItem('user')){
      localStorage.removeItem('user');
    }else
      localStorage.setItem('user',JSON.stringify(user));
       
  }
   getuser(){
    if(localStorage.getItem('user')){
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  }
 
  

}
