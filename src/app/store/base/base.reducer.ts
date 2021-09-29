import { Action, createSelector } from "@ngrx/store"
import * as actions from "./base.action"
import { AppState } from '../app.reducer'
export interface State{
        isLoad:boolean
        users: any[]
        hasErrors:any

}
const initialstate:State ={

    isLoad:false,
    users :[],
    hasErrors:null

}
export function userReducer(state = initialstate,action:actions.ActionUser){
   switch(action.type){
       case actions.userActionEnum.SUCCESS_LOAD:

            return {

              ...state,

              isLoad:true,
              users: action.payload,
              hasErrors: null


            }
       case actions.userActionEnum.FAILD_LOAD:
         {
          return {
            ...state,
            isAuth:false,
            hasErrors:action.payload

          }

         }
       default: return state
   }
}

export const selectFatureUsers = (state: AppState) => state.users;
 
export const selectUsers = createSelector(
  selectFatureUsers,
  (state: State) => state.users
);