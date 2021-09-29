import { Action, createSelector } from "@ngrx/store"
import * as actions from "./module.action"
import { AppState } from '../app.reducer'
export interface State{
        isLoad:boolean
        catagories: any
        hasErrors:any

}
const initialstate:State ={

    isLoad:false,
    catagories :null,
    hasErrors:null

}
export function Reducer(state = initialstate,action:actions.Actions){
   switch(action.type){
       case actions.ActionEnum.SUCCESS_LOAD:

            return {

              ...state,

              isLoad:true,
              catagories: action.payload,
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

export const selectFatureCatagories = (state: AppState) => state.catagories;
 
export const selectCatagories = createSelector(
  selectFatureCatagories,
  (state: State) => state.catagories
  
);