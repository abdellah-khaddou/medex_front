import { RedirectService } from './../../../services/redirect.service';

import * as _ from "lodash-es";
import { Observable, Subject, merge } from 'rxjs';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy, AfterViewInit } from "@angular/core";

import { DataTableDirective } from "angular-datatables";


@Component({
    selector: "data-table",
    templateUrl: "./tables.component.html",
    styleUrls: ["./tables.component.css"],
})
export class DataTablesComponent implements AfterViewInit, OnInit,OnDestroy {

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();



    @Input() data :Observable<any>
    thisData:any
    @Input() settings
    @Input() loading
    @Output() public event: EventEmitter<any> = new EventEmitter<any>();

    constructor(private redirect:RedirectService) {

     }
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;

    public ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
      };
        this.data.subscribe(data=>{
          this.thisData=JSON.parse(JSON.stringify(data));

      })




    }

    edit(release){
        this.redirect.toAction(this.settings.module,"edit",release)
        //this.event.emit({action:"edit",value:release})
    }
    delete(release){
        let res = confirm('are you sure ')
        if(res)this.event.emit({action:"delete",value:release})



    }
    buttonHandler(module){
        console.log(module)
    }
    show(release){
        //this.event.emit({action:"show",value:release})
        this.redirect.toAction(this.settings.module,"show",release)


    }


    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }
    ngAfterViewInit(): void {

       this.dtTrigger.next();





    }



    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });

    }
}
