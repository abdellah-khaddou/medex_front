import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseCtrl } from '../base/provider/base-ctrl';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseCtrl  {
    module="permission";
    constructor(public http:HttpClient){
      super(http)
    }


    getPermission(user:any){
        return this.search({}).pipe(map(allper=>{
          let permissions = allper.filter(res=>{
            if(res.roleID == user.roleID || res.userID == user._id)return res
          })
          return permissions.map(per=>{
            let name = (per.permission as string)?.split('-')
            return {per:name[0],module:name[1]}
          })

        }))
    }
}
