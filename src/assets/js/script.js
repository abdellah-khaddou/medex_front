
function biengCashFunction() {
var x = document.getElementById("being-cash");
var y = document.getElementById("paid");
x.style.display = "block";

if (y.style.display === "block") {
y.style.display = "none";
}
}
function paidFunction() {
var x = document.getElementById("paid");
var y = document.getElementById("being-cash");
var z = document.getElementById("being-cash");
var details =  document.getElementsByClassName("details-class");
var tb =  document.getElementsByClassName("table-details");

x.style.display = "block";
if (y.style.display === "block") {
y.style.display = "none";
}
for (var i=0;i<details.length;i+=1){
if (details[i].style.display === "block") {
  details[i].style.display = "none";
}
}
for (var i=0;i<tb.length;i+=1){
if (tb[i].style.display === "block") {
  tb[i].style.display = 'none';
}
}
z.style.width="100%";

}
function detailsFunction() {

var x = document.getElementsByClassName("table-details");
var y =  document.getElementsByClassName("row-profile");
var z = document.getElementById("being-cash");
var a =  document.getElementsByClassName("details-class");

console.log(x);
console.log(y);
console.log(a);
console.log(z,length);
for (var i=0;i<x.length;i+=1){
                x[i].style.display = 'block';
}
for (var i=0;i<a.length;i+=1){
a[i].style.height = '300px';
a[i].style.overflow = 'scroll';
a[i].style.display = 'block';
}
z.style.height = '300px';
z.style.overflow = 'scroll';
z.style.display = 'block';


}

function   myFunction() {
console.log("hello");
          var a;
          var x = document.getElementById("my-table");
          var yy = document.getElementById("being-cash");
          var row = x.getElementsByClassName("our-row");
          var cell = x.getElementsByClassName("our-cell");
          var xx = document.getElementById("main-container");
        var details = document.getElementsByClassName("details-class");
        //  xx.style.display="flex";
          var i;
          console.log(x);
          console.log(row.length);
          console.log(xx);
          console.log(details.length);

          if (a==1) {
            x.style.display = "block";
            return a=0;
          }
          else {
              xx.style.display ="flex";
              yy.style.width = "70%";
              for (var i=0;i<details.length;i+=1){
                details[i].style.display = 'block';
}
            for (i = 0; i < cell.length; i++) {
            //   cell[i].style.padding = "10px";
            //   cell[i].style.borderBottom = "1px solid #e0e0e0";
            }
            for (i = 0; i < row.length; i++) {
            //   row[i].style.justifyContent = "initial";
            //   row[i].style.width = "165px";
            }

            return a=1;
          }

        }

function closeDetails(){

var details =  document.getElementsByClassName("details-class");
var yy = document.getElementById("being-cash");
var x = document.getElementById("main-container");
var z = document.getElementById("being-cash");

z.style.width = '100%';


                x.style.display = 'block';

 for (var i=0;i<details.length;i+=1){
                details[i].style.display = 'none';

}
yy.style.width = "100%";
  }
// document.getElementById("btn-close").addEventListener("click", close);
function closeTablee(){
var tb =  document.getElementsByClassName("table-details");
var z = document.getElementById("being-cash");
var a =  document.getElementsByClassName("details-class");
z.style.width="100%";
for (var i=0;i<a.length;i+=1){
a[i].style.height = 'auto';
}
z.style.height = 'auto';


for (var i=0;i<tb.length;i+=1){
                tb[i].style.display = 'none';
}

}


function selectedRow(){

var index,
table = document.getElementById("first-tb");
  console.log("hi");


for(var i = 1; i < table.rows.length; i++)
{
  table.rows[i].onclick = function()
  {
       // remove the background from the previous selected row
      if(typeof index !== "undefined"){
         table.rows[index].classList.toggle("selected");
      }
      console.log(typeof index);
      // get the selected row index
      index = this.rowIndex;
      // add class selected to the row
      this.classList.toggle("selected");
      console.log(typeof index);
   };
}

}

selectedRow();
