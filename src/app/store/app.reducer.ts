import { ActionReducerMap } from "@ngrx/store";
import * as authReducer from "./auth/auth.reducer";
import * as userReducer from "./users/users.reducer";
import * as companies from "./companies/companies.reducer";
import * as products from "./products/module.reducer";
import * as orders from "./orders/module.reducer";
import * as catagories from "./catagories/module.reducer";
import * as enums from "./enum/module.reducer";
import * as enumsValue from "./enum_value/module.reducer";
import * as roles from "./role/module.reducer";
import * as resources from "./resources/module.reducer";
import * as colis from "./colis/module.reducer";
import * as villes from "./villes/module.reducer";
import * as bons from "./bon/module.reducer";
import * as villesnames from "./villesnames/module.reducer";
import * as networks from "./networks/module.reducer";
import * as cash from "./cash/module.reducer";
import * as statusVedeur from "./statusVedeur/module.reducer";


export interface AppState {
    auth: authReducer.State,
    users:userReducer.State,
    companies:companies.State,
    products: products.State,
    orders: orders.State,
    catagories:catagories.State,
    enum:enums.State,
    enumValue:enumsValue.State,
    roles:roles.State,
    resources:resources.State
    colis:colis.State
    villes:villes.State
    bon:bons.State
    networks:networks.State
    villesnames:villesnames.State
    cash:cash.State
    statusVedeur:statusVedeur.State


}
export const appReducer : ActionReducerMap<AppState> = {
    auth:authReducer.authReducer,
    users:userReducer.userReducer,
    companies:companies.Reducer,
    products:products.Reducer,
    orders:orders.Reducer,
    catagories:catagories.Reducer,
    enum:enums.Reducer,
    enumValue:enumsValue.Reducer,
    roles:roles.Reducer,
    resources:resources.Reducer,
    colis:colis.Reducer,
    villes:villes.Reducer,
    bon:bons.Reducer,
    networks:networks.Reducer,
    villesnames:villesnames.Reducer,
    cash:cash.Reducer,
    statusVedeur:statusVedeur.Reducer


};
