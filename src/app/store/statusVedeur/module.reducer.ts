import { Action, createSelector } from "@ngrx/store"
import * as actions from "./module.action"
import { AppState } from '../app.reducer'
export interface State{
        isLoad:boolean
        statusVedeur: any
        hasErrors:any

}
const initialstate:State ={

    isLoad:false,
    statusVedeur :null,
    hasErrors:null

}
export function Reducer(state = initialstate,action:actions.Actions){
   switch(action.type){
       case actions.ActionEnum.SUCCESS_LOAD:

            return {

              ...state,

              isLoad:true,
              statusVedeur: action.payload,
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

export const selectFaturestatusVedeur = (state: AppState) => state.statusVedeur;

export const selectstatusVedeur = createSelector(
  selectFaturestatusVedeur,
  (state: State) => state.statusVedeur

);
