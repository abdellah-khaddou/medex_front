import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCtrl } from '../../../../base/provider/base-ctrl';

@Injectable({
  providedIn: 'root'
})
export class VillesService extends BaseCtrl  {
    module="villes";
    constructor(public http:HttpClient){
      super(http)
    }


    distinct(params:any={}){
      return this.post("villes","distinct")
    }
}
