
import { Component } from '@angular/core';
import { Companie } from '../companies.interface';
import { CompanieService } from '../services/companie.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../../store/app.reducer"
import * as actions from "../../../../store/companies/companies.action"
import { selectCompanies } from '../../../../store/companies/companies.reducer';

@Component({
  templateUrl: 'tables.component.html',
  styleUrls: ['./tables.component.css']

})
export class TablesComponent {




  ville

  companies: Observable<Companie>;
  settings={
    module:"companies",
    columns:[
      {title:"Name",field:"name"},
      {title:"Email",field:"email"},
      {title:"Tel",field:"tel"},
      {title:"Ville",field:"ville"},
      {title:"Adresse",field:"adresse"},
      {title:"Register Comerce",field:"RC"},
      {title:"Banque",field:"banque"},
      {title:"RIB",field:"RIB"},
      {title:"Type",field:"type"}
  ]
  };
  companies$: Observable<any>;


  constructor(
    private companieService: CompanieService,
    private router:Router,
    private store:Store<fromApp.AppState>) { }

   ngOnInit(): void {
    this.store.dispatch(new actions.Load())
    this.companies$ = this.store.select(selectCompanies);

  }
  delete(companie){
    let res = confirm("are you sure want to delete")
    if(res){
      this.companieService.delete({_id:companie._id}).subscribe(res=>{
        if(res){
          //this.chargeData()
        }
      });
    }
  }

  edit(companie){
    this.router.navigate(['/dashboard/companies/edit'],{ queryParams: { id: companie._id } });
  }
  show(companie){
    this.router.navigate(['/dashboard/companies/show'],{ queryParams: { id: companie._id } });
  }
  ngOnDestroy(): void {

  }

}
