import { Action } from '@ngrx/store';
export enum ActionEnum {
    LOAD          = "[enum_value] load",
    FAILD_LOAD    = "[enum_value] load is failed",
    SUCCESS_LOAD  = "[enum_value] load is success",

}


export class Load implements Action{
    readonly type = ActionEnum.LOAD;
    constructor(){

    }
}



export class Load_success implements Action{
    readonly type = ActionEnum.SUCCESS_LOAD;
    constructor(public payload :any){

    }
}
export class Load_failed implements Action{
    readonly type = ActionEnum.FAILD_LOAD;
    constructor(public payload :any){

    }
}



export type Actions = Load | Load_failed | Load_success
