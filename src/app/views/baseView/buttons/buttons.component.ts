

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ConfigButton } from './interface/config.interface';



@Component({
    selector: "base-button",
    templateUrl: "./buttons.component.html",
    styleUrls: ["./buttons.component.css"],
})

export class ButtonsComponent implements OnInit {
    
    @Input() config:ConfigButton
   
    @Output() public event: EventEmitter<any> = new EventEmitter<any>();
    constructor() { }

   
    public ngOnInit(): void {
         if(this.config.class == ""){
            switch(this.config.action){
                case "edit":{
                    this.config.class ="btn btn-info"
                    
                    break;
                }
                case "delete":{
                    this.config.class ="btn btn-danger"
                    break;
                }
                case "show":{
                    this.config.class ="btn btn-success"
                    break;
                }
            }
        }
        if(this.config.icon.class == ""){
            switch(this.config.icon.class){
                case "edit":{
                    this.config.icon.class ="fa fa-edit"
                    break;
                }
                case "delete":{
                this.config.icon.class ="fa fa-trash"
                break;
                }
                case "show":{
                this.config.icon.class ="fa fa-eye"
                break;
                }
            }
        }
       
        
    }
    
}