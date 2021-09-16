import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseCtrl } from '../base/provider/base-ctrl';

@Injectable({
  providedIn: 'root'
})
export class JsonService   {

    constructor(public http:HttpClient){

    }

     getVilles(){
      return  this.http.get("../../assets/data/ma.json").pipe(map((villes:any)=>{
        return villes.map(ville=>{
          return ville.city
        })
      }));
    }
}
