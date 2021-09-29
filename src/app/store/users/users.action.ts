import { Action } from '@ngrx/store';
export enum userActionEnum  {
    LOAD          = "[users] load",
    FAILD_LOAD    = "[users] load is failed",
    SUCCESS_LOAD  = "[users] load is success",

}


export class Load implements Action{
    readonly type = userActionEnum.LOAD;
    constructor(){

    }
}



export class Load_success implements Action{
    readonly type = userActionEnum.SUCCESS_LOAD;
    constructor(public payload :any){

    }
}
export class Load_failed implements Action{
    readonly type = userActionEnum.FAILD_LOAD;
    constructor(public payload :any){

    }
}



export type ActionUser = Load | Load_failed | Load_success
