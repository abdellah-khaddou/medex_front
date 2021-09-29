

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from './base-provider';


@Injectable(
    {
        providedIn:'root'
    }
)
export class BaseCtrl extends BaseProvider {
    module:string;
   constructor(public http:HttpClient){
       super(http)
   }

    get(params:any={}){
        return super.get(this.module,'search',params)
    }
    search(params:any={}){
        return super.post(this.module,'search',params)
    }
    save(params:any={}){
        return this.post(this.module,'save',params)
    }
    delete(params:any={}){

        return this.post(this.module,'delete',params)
    }
    update(params:any={}){

        return this.post(this.module,'update',params)
    }
    create(params:any={}){

        return this.post(this.module,'create',params)
    }


}
