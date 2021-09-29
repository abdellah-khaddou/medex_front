import { Action } from "@ngrx/store"
import * as actions from "./auth.action"
export interface State{

        isAuth:boolean,
        user:any,
        hasErrors : string | null

}
const initialstate:State ={

        isAuth:false,
        user :null,
        hasErrors:null

}
export function authReducer(state = initialstate,action:actions.ActionAuth){
   switch(action.type){
       case actions.authActionsEnum.SUCCESS_LOGIN:
            return {

              ...state,
              isAuth: true,
              user: null,
              hasErrors: null


            }
       case actions.authActionsEnum.LOGOUT:
         {
           localStorage.removeItem('token')
          return {
            ...state,
            isAuth:false,
            user:null,
            hasErrors:null

          }

         }
       case actions.authActionsEnum.VERIFIER_SUCCESS:
         return {
           ...state,
           isAuth:true,
           user:{...action.payload.user.user},
           hasErrors:null
         }

         case actions.authActionsEnum.UPDATE_FAVORITE:
           let existe=false
          let favs = state.user.favourites.filter(fav=>{
            if(fav.product == action.payload.product){
              existe=true
              return null;
            }else return fav;

          })
          if(!existe)favs.push({product:action.payload.product,_id:action.payload.product})
         return {
           ...state,
           user:{
             ...state.user,
             favourites : [...favs]
          }
         }
         case actions.authActionsEnum.UPDATE_FAVORITE_SUCCESS:

         return {
           ...state,
           user:{
             ...state.user,
             favourites : [...action.payload]
          }
         }
         case actions.authActionsEnum.UPDATE_ADRESS_SUCCESS:

         return {
           ...state,
           user:{
             ...state.user,
             coordonnees : [...action.payload]
          }
         }

         case actions.authActionsEnum.DELETE_ADRESS_SUCCESS:

          return {
            ...state,
            user:{
              ...state.user,
              coordonnees : [...action.payload]
           }
          }
       default: return state
   }
}
