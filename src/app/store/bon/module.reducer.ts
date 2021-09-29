import { Action, createSelector } from "@ngrx/store"
import * as actions from "./module.action"
import { AppState } from '../app.reducer'
export interface State{
        isLoad:boolean
        bon: any
        hasErrors:any

}
const initialstate:State ={

    isLoad:false,
    bon :null,
    hasErrors:null

}
export function Reducer(state = initialstate,action:actions.Actions){
   switch(action.type){
       case actions.ActionEnum.SUCCESS_LOAD:

            return {

              ...state,

              isLoad:true,
              bon: action.payload,
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

export const selectFatureBon = (state: AppState) =>state.bon;

export const selectBon = createSelector(
  selectFatureBon,
  (state: State) => state.bon

);
