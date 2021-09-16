import { StatusColis } from "./status.colis";


export let listStatus = {
  livreur : [
    {name:StatusColis.ENCOUR_DELEVRY, type:"user"},
    {name:StatusColis.RECOMANDER, type:"date",placeholder:"WHAT_SAID_THIS_CLIENT"},
    {name:StatusColis.RAPALLE, type:"date",placeholder:"WHAT_SAID_THIS_CLIENT"},
    {name:StatusColis.REFUSE, type:"text", placeholder:"WHY_THIS_CLIENT_REFUSE"},
    {name:StatusColis.ANUULE, type:"text", placeholder:"WHY_THIS_CLIENT_RETEUR"},
    {name:StatusColis.DELEVRY, type:"text", placeholder:"REMARQUE_OF_THIS_CLIENT"},
    {name:StatusColis.RETOURE_TO_NETWORK, type:"text", placeholder:"REMARQUE_OF_THIS_CLIENT"},
  ]
}


export enum TypesColisEnum{
  STANDARD="STANDARD",
  WHEREHOUSE="WHERHOUSE"
}
export enum SubTypesColisEnum{
  NORMAL="NORMAL",
  REMBERCEMENT="REMBERSEMENT",
  ECHANGE="ECHANGE"
}
export let TypesColis =[
  {name:TypesColisEnum.STANDARD,code:"S" ,types:[SubTypesColisEnum.NORMAL,SubTypesColisEnum.ECHANGE,SubTypesColisEnum.REMBERCEMENT]},
  {name:TypesColisEnum.WHEREHOUSE,code:"WH" ,types:["TYPE1","TYPE2"]}
];
export let ValueTypeValues=[SubTypesColisEnum.NORMAL,SubTypesColisEnum.ECHANGE,SubTypesColisEnum.REMBERCEMENT];
