import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCtrl } from '../../../../base/provider/base-ctrl';

@Injectable({
  providedIn: 'root'
})
export class ColisService extends BaseCtrl  {
    module="colis";
    constructor(public http:HttpClient){
      super(http)
    }

    getTraking(){
      return this.post("colis","getTraking")
    }

    changeStatus(params:any={}){
      return this.post("colis","changestatus",params)
    }
}
