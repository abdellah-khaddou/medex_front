import { AuthEffects } from "./auth/auth.effects";
import *  as users from './users/users.effects';
import *  as companies from './companies/companies.effects';
import *  as products from './products/module.effects';
import *  as orders from './orders/module.effects';
import *  as catagories from './catagories/module.effects';
import *  as enums from './enum/module.effects';
import *  as enumsValue from './enum_value/module.effects';
import *  as roles from './role/module.effects';
import *  as resources from './resources/module.effects';
import *  as colis from './colis/module.effects';
import *  as villes from './villes/module.effects';
import *  as bons from './bon/module.effects';
import *  as villesnames from './villesnames/module.effects';
import *  as networks from './networks/module.effects';
import *  as cash from './cash/module.effects';
import *  as statusVedeur from './cash/module.effects';


 export let appeffects : any[]= [
     AuthEffects,
    users.UsersEffects,
    companies.Effects,
    products.Effects,
    orders.Effects,
    catagories.Effects,
    enums.Effects,
    enumsValue.Effects,
    roles.Effects,
    resources.Effects,
    colis.Effects,
    villes.Effects,
    bons.Effects,
    villesnames.Effects,
    networks.Effects,
    cash.Effects,
    statusVedeur.Effects,
]
