import { Component, Input, OnInit, Output } from '@angular/core';
import { ColisHistoryService } from '../../../../services/coliHistory.service';
import { ActivatedRoute } from '@angular/router';
import { DesignColisService } from '../services/design.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'colis-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() coliID
  @Output() close  = new EventEmitter()
  history: any;
  isShow ="block"
  constructor(
    private colisHistoryService:ColisHistoryService,
    private route:ActivatedRoute,
    private designColis : DesignColisService

    ) {

   }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParams.id;
    if(id){
      this.coliID = id
    }
    console.log(this.coliID)
    this.colisHistoryService.search({coli:this.coliID}).subscribe(res=>{
      console.log(res)
      this.history = res?.sort(function(a,b){
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      console.log(this.history)

      this.history?.filter(el=>{
        this.designColis.status.filter(state=>{
          if(state.value == el.status){
            el.status = state
          }
        })
      })

      console.log(this.history)

    })
  }
    closeFn(){
      this.close.emit("close")
    }
}
