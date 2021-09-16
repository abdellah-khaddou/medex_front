import { UserService } from './../../users/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Companie } from '../companies.interface';
import { CompanieService } from '../services/companie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../../store/app.reducer"
import * as actions from "../../../../store/users/users.action"
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

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
  users$: Observable<any>;
  constructor(

    private companieService: CompanieService,
    private route:ActivatedRoute,
    private store:Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new actions.Load())
    let id = this.route.snapshot.queryParams.id;

    this.users$ = this.store.pipe(map(res=>{
          return res.users.users.filter(user=>user.company._id==id)
    }));
  }

}
