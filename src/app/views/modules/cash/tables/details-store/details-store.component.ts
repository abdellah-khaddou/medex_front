import {EventEmitter, Component, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'details-store',
  templateUrl: './details-store.component.html',
  styleUrls: ['./details-store.component.scss']
})
export class DetailsStoreComponent implements OnInit {

  constructor(private translate:TranslateService) { }
  @Input() stores
  @Output() orders = new EventEmitter()
  @Output() close = new EventEmitter()
  ngOnInit(): void {
    console.log(this.stores)
  }

  sendOrders(value){
    this.orders.emit(value)
  }
  closeForm(){
    this.close.emit(true)
  }


}
