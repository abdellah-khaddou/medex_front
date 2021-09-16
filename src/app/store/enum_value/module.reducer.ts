import { Action, createSelector } from "@ngrx/store"
import * as actions from "./module.action"
import { AppState } from '../app.reducer'
export interface State{
        isLoad:boolean
        enum_value: any
        hasErrors:any

}
const initialstate:State ={

    isLoad:false,
    enum_value :null,
    hasErrors:null

}
export function Reducer(state = initialstate,action:actions.Actions){
   switch(action.type){
       case actions.ActionEnum.SUCCESS_LOAD:

            return {

              ...state,

              isLoad:true,
              enum_value: action.payload,
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

export const selectFatureEnumsValue = (state: AppState) => state.enumValue;

export const selectEnumValue = createSelector(
  selectFatureEnumsValue,
  (state: State) => state.enum_value

);
