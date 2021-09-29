export enum TypesEnums{
  TYPE_COMPANIE="TYPE_COMPANIE",
  NETWORK="NETWORK",
  STATUS_COLIS="STATUS_COLIS",
}



export let modules = [
    {name:"Dashboard",value:"dashboard"},
    {name:"Users",value:"users"},
    {name:"Bons",value:"bon"},
    {name:"Colis",value:"colis"},
    {name:"Companies",value:"companies"},
    {name:"Stock",value:"stock"},
    {name:"orders",value:"orders"},
    {name:"Products",value:"products"},
    {name:"Categories",value:"categories"},
    {name:"Setting",value:"setting,"},
    {name:"Villes",value:"villes"},
    {name:"Villes Names",value:"villesnames"},
    {name:"Networks",value:"networks"},
    {name:"Enumeration",value:"enum"},
    {name:"Enumeration Value",value:"enum_value"},
    {name:"Roles",value:"role"},
    {name:"resources",value:"resources"}
]

export enum TypesRoles{
  ADMIN="ADMIN",

}


export enum TypesCompanies{
  ADMIN="ADMIN",
  VENDEUR="VENDEUR",
  LIVREUR="LIVREUR"

}

export let permissionEnum = {
  ADMIN   :[{value:"expedition-colis",title:"EXPEDITION_COLIS"},{value:"delevery-colis",title:"DELEVERY_COLIS"}],
  LIVREUR :[],
  VENDEUR :[{value:"envoye-colis",title:"ENVOYE_COLIS"}],

}
