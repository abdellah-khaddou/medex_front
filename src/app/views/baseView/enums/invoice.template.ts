import { Colis } from "../../modules/colis/colis.interface";

export function invoceTemplate(data:any[], images) {
  return {
    pageSize: "A4",
    pageOrientation: "landscape",
    content: generate(data  ,images),
    styles: {
      notesTitle: {
        fontSize: 10,
        bold: true,
        margin: [0, 50, 0, 3],
      },
      notesText: {
        fontSize: 10,
      },
    },
    defaultStyle: {
      columnGap: 20,
      //font: 'Quicksand',
    },

  };
}

function generate(data :Colis[] ,images){
  let arrayOfArrayOfObjects = []
  data.forEach(val=>{
    let isOpenStr = val.open  ?"" : "Interdit d'ouvrir le colis"
    let arrobj = [
      {
        columns: [
          [
            {
              image: images.wishLogo,
              width: 100,
              margin: [0, -22, 0, 15],
            },
            {
              columns: [
                {
                  text: "N°: " + val.traking,
                  color: "#000",
                  bold: true,
                  width: "100%",
                  fontSize: 28,
                  alignment: "left",
                },
                {
                  text: "("+ val.nb_order+")",
                  bold: true,
                  color: "#333333",
                  fontSize: 12,
                  alignment: "left",
                  width: "*",
                  margin: [-150, 20, 0, 0],
                },
              ],
            },
          ],
          [
            {
              text: "DECLARATION D'EXPIDITEUR",
              color: "#333333",
              width: "*",
              fontSize: 28,
              bold: true,
              alignment: "right",
              margin: [0, -22, 0, 15],
            },
            {
              text: "NETWORK "+ val.ville_depart,
              color: "#333333",
              width: "*",
              fontSize: 20,
              bold: false,
              alignment: "right",
              margin: [0, 5, 100, 15],
            },
          ],
        ],
      },
      {
        stack: [
          {
            columns: [
              {
                text: "Expéditeur : ",
                color: "#000",
                bold: true,
                width: 100,
                fontSize: 16,
                alignment: "left",
              },
              {
                text: val.store,
                bold: true,
                color: "#333333",
                fontSize: 16,
                alignment: "left",
                width: 100,
                margin: [-20, 0, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                text: "Téléphone  : ",
                color: "#000",
                bold: true,
                width: 100,
                fontSize: 16,
                alignment: "left",
              },
              {
                text: val.telVendeur,
                bold: true,
                color: "#333333",
                fontSize: 16,
                alignment: "left",
                width: 100,
                margin: [-20, 0, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                text: "Date  : ",
                color: "#000",
                bold: true,
                width: 100,
                fontSize: 16,
                alignment: "left",
              },
              {
                text: "02/23/2019",
                bold: true,
                color: "#333333",
                fontSize: 16,
                alignment: "left",
                width: 100,
                margin: [-20, 0, 0, 0],
              },
            ],
          },
        ],
      },
      "\n\n",

      {
        layout: {
          defaultBorder: false,
          hLineWidth: function (i, node) {
            return 1;
          },
          vLineWidth: function (i, node) {
            return 1;
          },
          hLineColor: function (i, node) {
            if (i === 1 || i === 0) {
              return "#bfdde8";
            }
            return "#eaeaea";
          },
          vLineColor: function (i, node) {
            return "#eaeaea";
          },
          hLineStyle: function (i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function (i, node) {
            return 10;
          },
          paddingRight: function (i, node) {
            return 10;
          },
          paddingTop: function (i, node) {
            return 2;
          },
          paddingBottom: function (i, node) {
            return 2;
          },
          fillColor: function (rowIndex, node, columnIndex) {
            return "#fff";
          },
        },
        table: {
          headerRows: 1,
          widths: ["25%", "25%", "25%", "25%"],
          body: [
            [
              {
                text: "Adresse ",
                fontSize: 16,
                bold: true,
                border: [false, true, false, false],
                margin: [0, 5, 0, 5],
                textTransform: "uppercase",
                alignment: "center",
              },
              {
                text: "Client ",
                fontSize: 16,
                bold: true,
                border: [false, true, false, false],
                margin: [0, 5, 0, 5],
                textTransform: "uppercase",
                alignment: "center",
              },

              {
                text: "Produit",
                fontSize: 16,
                bold: true,
                border: [false, true, false, false],
                alignment: "center",

                margin: [0, 5, 0, 5],
                textTransform: "uppercase",
              },
              {
                text: "HUB",
                border: [false, true, false, false],
                alignment: "center",
                fontSize: 16,
                bold: true,
                margin: [0, 5, 0, 5],
                textTransform: "uppercase",
              },
            ],
            [
              {
                text: val.adresse,
                border: [false, false, false, true],
                margin: [5, 5, 5, 5],
                fontSize: 14,
                alignment: "center",

                width: 100,
              },
              {
                text: val.name,
                border: [false, false, false, true],
                margin: [5, 5, 5, 5],
                fontSize: 14,
                alignment: "center",
                width: 100,
              },
              {
                text: val.produit,
                border: [false, false, false, true],
                margin: [5, 5, 5, 5],
                fontSize: 14,
                alignment: "center",
              },
              {
                border: [false, false, false, true],
                text: "HUB "+val.hub+" | "+val.ville_arrive,

                alignment: "center",
                margin: [5, 5, 5, 5],
                fontSize: 14,
              },
            ],

            [
              {
                text: "Contre espece",
                border: [false, false, false, true],
                margin: [5, 20, 5, 20],
                fontSize: 17,
                bold: true,
                alignment: "center",
                height: 30,
                width: 100,
              },
              {
                text: "",
                border: [false, false, false, true],
              },
              {
                text: "",
                border: [false, false, false, true],
              },
              {
                border: [false, false, false, true],
                text: val.prix + " DHS ",

                alignment: "center",
                margin: [5, 20, 5, 20],
                fontSize: 17,
                bold: true,
              },
            ],
          ],
        },
      },
      "\n",
      "\n\n",
      {
        columns: [
          {
            image:val.codebar,
            width: 600,
            height: 100,
            margin: [100, -12, 20, 15],
            alignment: "left",
          },
        ],
      },
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function (i, node) {
            return 1;
          },
          vLineWidth: function (i, node) {
            return 1;
          },
          hLineColor: function (i, node) {
            return "#eaeaea";
          },
          vLineColor: function (i, node) {
            return "#eaeaea";
          },
          hLineStyle: function (i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function (i, node) {
            return 10;
          },
          paddingRight: function (i, node) {
            return 10;
          },
          paddingTop: function (i, node) {
            return 3;
          },
          paddingBottom: function (i, node) {
            return 3;
          },
          fillColor: function (rowIndex, node, columnIndex) {
            return "#fff";
          },
        },

        table: {
          headerRows: 1,
          widths: ["20%", "60%", "20%"],
          body: [
            [
              {
                text: "Thanks for Service",
                border: [false, true, false, false],
                alignment: "center",
                margin: [0, 5, 0, 5],
                fontSize: 12,
                bold: true,
              },
              {
                text: isOpenStr,
                border: [false, true, false, false],
                alignment: "center",
                margin: [0, 15, 0, 15],
                fontSize: 16,
                bold: true,
              },
              {
                border: [false, true, false, false],
                text: "Need Help?",
                alignment: "center",

                margin: [0, 5, 0, 5],
                fontSize: 12,
                bold: true,
              },
            ],
            [
              {
                text: "wish team",
                border: [false, false, false, false],
                alignment: "center",
                margin: [0, -30, 0, 5],
              },
              {
                text: "",
                border: [false, false, false, false],
                alignment: "right",
                margin: [0, 5, 0, 5],
              },
              {
                text: "call : 0666889900",
                border: [false, false, false, false],

                alignment: "center",
                margin: [0, -30, 0, 5],
              },
            ],
          ],

        },
        pageBreak: 'after'
      },
    ]
    arrayOfArrayOfObjects.push(...arrobj)
  })
  console.log(arrayOfArrayOfObjects)
  return arrayOfArrayOfObjects
}




