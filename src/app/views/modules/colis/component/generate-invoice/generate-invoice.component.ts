import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {
  colis: any;

  constructor(private route:ActivatedRoute) {
    this.colis = JSON.parse(this.route.snapshot.params.colis)
    console.log(this.colis)
  }

  ngOnInit(): void {

  }



  async exportPdf(){
    const doc = new jsPDF("l","mm","a4")
    let items:any[] = this.colis.map(el=>el.traking)
    let x=2,y=2;
    let pageW = doc.internal.pageSize.width;
    let pageH = doc.internal.pageSize.height;
    items.forEach((value,index)=>{
        let data = document.getElementById(value)

        html2canvas(data,{useCORS:true,scale:3}).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/jpeg', 1.0)
          console.log(x,y);

           doc.addImage(contentDataURL, 'jpeg',x,y,doc.internal.pageSize.width/2-3, doc.internal.pageSize.height/2-3);
           if(x== 2 && y==2){
            x= pageW/2
          }else if(x==2 && y==pageH/2 ){
              x=pageW/2
          }else if(x==pageW/2 && y==2 ){
            x=2;
            y=pageH/2
          } else if(x==pageW/2 && y==pageH/2 ){
            x=2;y=2
            doc.addPage("a4","l")
          }

          if(value == items[items.length -1 ])doc.output('dataurlnewwindow');


        });






     })




  //  // doc.save('invo.pdf')
  //   //doc.output('dataurlnewwindow');
   }

}
