import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() setting : {display:string,message:string,type:string,title:string}

  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.setting.display = "none"
  }
}
