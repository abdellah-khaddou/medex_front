import { Action, createSelector } from "@ngrx/store"
import * as actions from "./module.action"
import { AppState } from '../app.reducer'
export interface State{
        isLoad:boolean
        colis: any
        hasErrors:any

}
const initialstate:State ={

    isLoad:false,
    colis :null,
    hasErrors:null

}
export function Reducer(state = initialstate,action:actions.Actions){
   switch(action.type){
       case actions.ActionEnum.SUCCESS_LOAD:

            return {

              ...state,

              isLoad:true,
              colis: action.payload,
              hasErrors: null


            }
       case actions.ActionEnum.FAILD_LOAD:
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

export const selectFatureColis = (state: AppState) =>state.colis;

export const selectColis = createSelector(
  selectFatureColis,
  (state: State) => state.colis

);
