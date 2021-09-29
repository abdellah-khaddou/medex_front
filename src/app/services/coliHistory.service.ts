import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseCtrl } from '../base/provider/base-ctrl';

@Injectable({
  providedIn: 'root'
})
export class ColisHistoryService extends BaseCtrl  {
    module="colishistory";
    constructor(public http:HttpClient){
      super(http)
    }



}
