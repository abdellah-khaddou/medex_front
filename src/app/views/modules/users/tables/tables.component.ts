import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { User } from '../classes/user.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { select, Store } from "@ngrx/store"
import { Subscription, Observable } from 'rxjs';
import * as fromApp from "../../../../store/app.reducer"
import * as userAction from "../../../../store/users/users.action"
import { selectUsers } from '../../../../store/users/users.reducer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'tables.component.html',
  styleUrls: ['./tables.component.css']

})
export class UsersTablesComponent {


  users: any[] = [];

  settings={
    module:"users",
    columns:[
      {title:"Name",field:"name"},
      {title:"Login",field:"login"},
      {title:"CIN",field:"cin"},
      {title:"Telephone",field:"tel"},
      {title:"Email",field:"email"},
      {title:"Companie",field:"companyName"},
      {title:"Role",field:"role"}
  ]
  };
 users$: Observable<any>
 errors$: Observable<any>

  constructor(

    private router:Router,
    private store:Store<fromApp.AppState>
    ) {

   }

  ngOnInit(): void {
      this.store.dispatch(new userAction.Load())
      this.users$ = this.store.select(selectUsers);

  }

  actionEvent(obj){
    console.log(obj)
    switch(obj.action){
      case "edit":this.edit(obj.value);break;
      case "delete":this.delete(obj.value);break;
      case "show":this.show(obj.value);break;
    }
  }
  delete(user:User){
    let res = confirm("are you sure want to delete")
    console.log(user)
    if(res){
      //this.store.dispatch(new userAction.Delete(user._id))
    }
  }

  edit(user){

    this.router.navigate(['/dashboard/users/edit'],{ queryParams: { id: user._id } });
  }
  show(user){
    this.router.navigate(['/dashboard/users/show'],{ queryParams: { id: user._id } });
  }
  ngOnDestroy(): void {
    //this.userSub.unsubscribe()
  }



}
