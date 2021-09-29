import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCtrl } from '../../../../base/provider/base-ctrl';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseCtrl {
  module="users"
  constructor(public http:HttpClient){
    super(http)
  }

}
