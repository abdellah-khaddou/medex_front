import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'begin-or-paid',
  templateUrl: './begin-or-paid.component.html',
  styleUrls: ['./begin-or-paid.component.scss']
})
export class BeginOrPaidComponent implements OnInit {

  constructor(private translate:TranslateService) { }
  @Input() cashs
  @Input() isPaid
  @Output() cash =new EventEmitter()

  ngOnInit(): void {
  }

  sendCash(cash){
      console.log(cash)

      this.cash.emit(cash)
  }

}
