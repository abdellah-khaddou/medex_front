import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCtrl } from '../../../../base/provider/base-ctrl';

@Injectable({
  providedIn: 'root'
})
export class VillesNamesService extends BaseCtrl  {
    module="villesnames";
    constructor(public http:HttpClient){
      super(http)
    }
}
