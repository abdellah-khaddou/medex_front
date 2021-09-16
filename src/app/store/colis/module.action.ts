import { Action } from '@ngrx/store';
export enum ActionEnum {
    LOAD                  = "[colis] load",
    FAILD_LOAD            = "[colis] load is failed",
    SUCCESS_LOAD          = "[colis] load is success",
    CHANGE_STATUS         = "[colis] change status",
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

export class ChangeStatus implements Action{
  readonly type = ActionEnum.CHANGE_STATUS;
  constructor(public payload:any){

  }
}





export type Actions = Load | Load_failed | Load_success |ChangeStatus
