import { Injectable } from '@angular/core';
import { StatusColis } from '../../../baseView/enums/status.colis';

@Injectable({
  providedIn: 'root'
})
export class DesignColisService   {
  status=[
    {value:StatusColis.NON_ENVOYE,class:"badge badge-pill  badge-danger"},
    {value:StatusColis.ENVOYE,class:"badge badge-pill  badge-info"},
    {value:StatusColis.EN_NETWORK,class:"badge badge-pill  badge-warning"},
    {value:StatusColis.EXPEDITION,class:"badge badge-pill  badge-secondary"},
    {value:StatusColis.RECEPTION_HUB,class:"badge badge-pill  badge-primary"},
    {value:StatusColis.EN_HUB,class:"badge badge-pill  badge-dark"},
    {value:StatusColis.ENCOUR_DELEVRY,class:"badge badge-pill  badge-light"},
    {value:StatusColis.RECOMANDER,class:"badge badge-pill color1 "},
    {value:StatusColis.RAPALLE,class:"badge badge-pill color1 "},
    {value:StatusColis.ANUULE,class:"badge badge-pill   color2 "},
    {value:StatusColis.REFUSE,class:"badge badge-pill   color3 "},
    {value:StatusColis.DELEVRY,class:"badge badge-pill  badge-success "},
    {value:StatusColis.RECUPIRER,class:"badge badge-pill  color3 "},
    {value:StatusColis.RETOURE_TO_NETWORK,class:"badge badge-pill  color3 "},
    {value:StatusColis.RETOURE_EN_NETWORK,class:"badge badge-pill  color3 "},
    {value:StatusColis.RETOURE_TO_VENDEUR,class:"badge badge-pill  color3 "},
    {value:StatusColis.RETOURNER_ATT,class:"badge badge-pill  color3 "},
    {value:StatusColis.RETOURNER,class:"badge badge-pill  color3 "}
  ]



}
