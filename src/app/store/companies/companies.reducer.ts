import { Action, createSelector } from "@ngrx/store"
import * as actions from "./companies.action"
import { AppState } from '../app.reducer'
export interface State{
        isLoad:boolean
        companies: any
        hasErrors:any

}
const initialstate:State ={

    isLoad:false,
    companies :null,
    hasErrors:null

}
export function Reducer(state = initialstate,action:actions.Actions){
   switch(action.type){
       case actions.ActionEnum.SUCCESS_LOAD:

            return {

              ...state,

              isLoad:true,
              companies: action.payload,
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

export const selectFatureCompanies = (state: AppState) => state.companies;
 
export const selectCompanies = createSelector(
  selectFatureCompanies,
  (state: State) => state.companies
  
);