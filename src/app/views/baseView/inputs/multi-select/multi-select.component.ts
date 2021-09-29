import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() list:any[];
  @Input() listSlected:any[]=[];

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();


  checkedList : any[];
  currentSelected : {};
  showDropDown:boolean
  newList : {name:string,checked:boolean}[] =[]

  constructor(){
      this.checkedList = [];
  }
  ngOnInit(){
    if(this.listSlected.length>0){
      this.checkedList = this.listSlected
      this.newList =[]
      this.list.filter(el=>{
        this.listSlected.filter(sel=>{
          if(sel == el){
            let obj = {name:el,checked:true}

              this.newList.push(obj);
          }else if(!this.isExsistonArray(this.newList,el) && !this.listSlected.includes(el)){
            let obj = {name:el,checked:false}
              this.newList.push(obj);
          }
        })

      })

    }else{

      this.list.filter(el=>{
        let obj = {name:el,checked:false}
           this.newList.push(obj);
      })

    }

    console.log(this.newList)


  }
  isExsistonArray(array:{name:string,checked:boolean}[] , el:string):boolean{
        let isExsiste = false
          array.forEach(val=>{
            if(val.name==el){
              isExsiste = true
            }
          })

        return isExsiste;
  }
  getSelectedValue(status:Boolean,value:String){
      if(status){
        this.checkedList.push(value);
      }else{
          var index = this.checkedList.indexOf(value);
          this.checkedList.splice(index,1);
      }

      this.currentSelected = {checked : status,name:value};

      //share checked list
      this.shareCheckedlist();

      //share individual selected item
      this.shareIndividualStatus();
  }
  shareCheckedlist(){
       this.shareCheckedList.emit(this.checkedList);
  }
  shareIndividualStatus(){
      this.shareIndividualCheckedList.emit(this.currentSelected);
  }

}
