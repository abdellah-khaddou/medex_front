import {EventEmitter, Component, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'details-orders',
  templateUrl: './details-orders.component.html',
  styleUrls: ['./details-orders.component.scss']
})
export class DetailsOrdersComponent implements OnInit {
  @Input() orders
  @Output() close = new EventEmitter()
  constructor(private translate:TranslateService) { }

  ngOnInit(): void {
    this.orders = this.orders.map(order=>{
      return {...order}
    })
  }
  closeForm(){
    console.log("close")
    this.close.emit(true)

  }
}
