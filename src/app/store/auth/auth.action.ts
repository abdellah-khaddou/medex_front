import { Action } from '@ngrx/store';
export enum authActionsEnum {
    LOGIN                 = "[auth] login",
    FAILD_LOGIN           = "[auth] login is failed",
    SUCCESS_LOGIN         = "[auth] login is success",
    LOGOUT                = "[auth] logout",
    ISLOGIN               = "[auth] is login",
    VERIFIER_SUCCESS      = "[auth] is verifier success",
    FAILD_VERIFIER        = "[auth] is verifier faild",
    UPDATE_FAVORITE       = "[auth] update favorite",
    UPDATE_FAVORITE_SUCCESS = "[auth] update favorite success",
    UPDATE_FAVORITE_FAILED = "[auth] update favorite failed",
    UPDATE_ADRESS         = "[auth] update adress",
    UPDATE_ADRESS_SUCCESS = "[auth] update adress success",
    UPDATE_ADRESS_FAILED = "[auth] update adress failed",
    DELETE_ADRESS         = "[auth] delete adress",
    DELETE_ADRESS_SUCCESS = "[auth] delete adress success",
    DELETE_ADRESS_FAILED = "[auth] delete adress failed",
}


export class Login implements Action{
    readonly type = authActionsEnum.LOGIN;
    constructor(public payload :any){

    }
}
export class isLogin implements Action{
  readonly type = authActionsEnum.ISLOGIN;
  constructor(){

  }
}
export class Verifer_success implements Action{
  readonly type = authActionsEnum.VERIFIER_SUCCESS;
  constructor(public payload :any){

  }
}

export class Login_success implements Action{
    readonly type = authActionsEnum.SUCCESS_LOGIN;
    constructor(public payload :any){

    }
}
export class Login_failed implements Action{
    readonly type = authActionsEnum.FAILD_LOGIN;
    constructor(public payload :any){

    }
}
export class Verifer_failed implements Action{
  readonly type = authActionsEnum.FAILD_VERIFIER;
  constructor(public payload :any){

  }
}
export class Logout implements Action{
    readonly type= authActionsEnum.LOGOUT
}

export class UpdateFavorite implements Action{
  readonly type= authActionsEnum.UPDATE_FAVORITE
  constructor(public payload :any){

  }
}

export class UpdateFavorite_success implements Action{
  readonly type= authActionsEnum.UPDATE_FAVORITE_SUCCESS
  constructor(public payload :any){

  }
}
export class UpdateFavorite_failes implements Action{
  readonly type= authActionsEnum.UPDATE_FAVORITE_FAILED
  constructor(public payload :any){
      console.log(payload)
  }
}
export class UpdateAdresse implements Action{
  readonly type= authActionsEnum.UPDATE_ADRESS
  constructor(public payload :any){

  }
}

export class UpdateAdresse_success implements Action{
  readonly type= authActionsEnum.UPDATE_ADRESS_SUCCESS
  constructor(public payload :any){

  }
}
export class UpdateAdresse_failes implements Action{
  readonly type= authActionsEnum.UPDATE_ADRESS_FAILED

}
export class DeleteAdresse implements Action{
  readonly type= authActionsEnum.DELETE_ADRESS
  constructor(public payload :any){

  }
}

export class DeleteAdresse_success implements Action{
  readonly type= authActionsEnum.DELETE_ADRESS_SUCCESS
  constructor(public payload :any){

  }
}
export class DeleteAdresse_failed implements Action{
  readonly type= authActionsEnum.DELETE_ADRESS_FAILED

}
export type ActionAuth =
Login | Logout | Login_success
|Login_failed |Verifer_success
|Verifer_failed |isLogin |UpdateAdresse
|UpdateFavorite|UpdateFavorite_success|UpdateFavorite_failes
|UpdateAdresse_success|DeleteAdresse|DeleteAdresse_success
|DeleteAdresse_failed|UpdateAdresse_failes
