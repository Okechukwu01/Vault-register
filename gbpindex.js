// SETTING GBP DISPLAY

function viewGbp() {
    let gbp = document.getElementById("gbp");
    let eur = document.getElementById("eur");
    let usd = document.getElementById("usd");
    let ngn = document.getElementById("ngn");
    gbp.setAttribute("style","display: ");
    eur.setAttribute("style","display: none");
    usd.setAttribute("style","display: none");
    ngn.setAttribute("style","display: none");
    document.getElementById("gbpbtn").setAttribute("style","background-color: white");
    document.getElementById("eurbtn").setAttribute("style","background-color: transparent");
    document.getElementById("usdbtn").setAttribute("style","background-color: transparent");
    document.getElementById("ngnbtn").setAttribute("style","background-color: transparent");
}

//------------------------------------ GBP OUT LOGIC------------------------------------//
// ADDING EVENT LISTENER FOR EACH INPUT
let gbpForms = document.querySelectorAll(".gbpcal");

gbpForms.forEach(function () {
  
  let f = '';
  for (let i = 0; i < forms.length; i++) {
     
    f = f + i;
    fi = forms[i];
    fi = addEventListener('change',gbpEditSheet);
    fi = addEventListener('change',gbpCalSum);
    fi = addEventListener('change',gbpCalBbd);
  }
});

// CALCULATING THE TOTAL FOR ALL OUT DENOMINATION
function gbpEditSheet() {
    let tr = document.getElementsByClassName("gbpcal");
    // LOOPING THROUGH ALL INPUT TO GET THEIR VALUE AND ADDING THEM
    for (i = 0; i < tr.length; i++) {
      rowTotal = 0;
      for (ii = 0; ii < tr[i].getElementsByClassName("gbpinput").length; ii++) {
        rowTotal = rowTotal + Number(tr[i].getElementsByClassName("gbpinput")[ii].value.replace(/,/g, ''));
        // replace(/,/g, '')) IS TO REMOVE ALL COMMAS WHEN CALCULATING THE VALUES SO AS NOT TO TROW NaN ERROR
      };
      // TOTALING ALL VALUE AND DISPLAYING THEM ON THE TOTAL COLUMN
      let total = tr[i].getElementsByClassName('gbpbfft');
      
      for (let b = 0; b < total.length; b++) {
      
        total[b].innerHTML = rowTotal.toLocaleString();
      }
      
    }
    
}

// CALCULATING THE SUM FOR ALL COLUMNS EXCLUDING THE BBF ROW AND DETAILS AND TOTAL COLUMS
function gbpCalSum() {
    let final = 0;
    let tbody = document.querySelectorAll("table")[10];
    // ("table")[10] IS TO CHOOSE THE TENTH ARRAY OF THE QUERY SELECTOR
    let howManyCols = tbody.rows[3].cells.length;
    // tbody.rows[3] IS TO EXCLUDE THE BBF ROW
    let totalRow = document.getElementsByClassName("gbptot")[document.getElementsByClassName("gbptot").length - 1];
    for (let j = 1; j < howManyCols - 1; j++) {
      // j = 1 IS TO EXCLUDE THE DETAILS COLUMN AND howManyCols - 1 IS TO EXCLUDE THE TOTAL COLUMN
      final = gbpComputeTableColumnTotal(j);
      totalRow.cells[j].innerHTML = final.toLocaleString();
      totalRow.cells[j].setAttribute("style","min-width: 154px");
    }
  
    // TOTALING ALL OUT VALUE AND DISPLAYING THEM ON THE OUT SUM ROW
    function gbpComputeTableColumnTotal(colNumber) {
  
      let result = 0;
  
      try {
        let tableBody = document.querySelectorAll("table")[10];
        let howManyRows = tableBody.rows.length;
  
        for (let i = 3; i < (howManyRows); i++) {
          // let i = 3 IS TO EXCLUDE BBF ROW
          let thisNumber = Number(tableBody.rows[i].cells[colNumber].childNodes.item(0).value.replace(/,/g, ''));
          
  
  
          if (!isNaN(thisNumber))
            result += thisNumber;
        }
      } finally {
        return result;
      }
      
    }
    // TOTALING THE TOTAL COLUMN
    let allTotal = document.getElementsByClassName("gbpbfft");
    let sumTotal = 0;
    for (let at = 1; at < allTotal.length; at++) {
      // at = 1 IS TO EXCLUDE TOTAL OF BBF
      let val = Number(allTotal[at].innerHTML.replace(/,/g, ''));
      sumTotal += val;
    }
    document.querySelector(".gbptotalOutSum").innerHTML = sumTotal.toLocaleString();
}

// ADDIND COMMA TO SEPERATE EACH THOUSAND
function gbpUpdateComma() {
    // ADDING EVENT LISTNER TO ADD COMMA ON KEYUP
    let numInput = document.querySelectorAll(".gbpinput");
    let c = '';
    for (let i = 0; i < numInput.length; i++) {
       
      c = c + i;
      ci = forms[i];
      ci = addEventListener('keyup',addComma);
      // FUNCTION FOR ADDING COMMA
      function addComma() {
        let float = Number(numInput[i].value.replace(/,/g, ""));
        if (!isNaN(float)) {
         let formatNum = float.toLocaleString();
         numInput[i].value = formatNum;
        } else {
          numInput[i].value = "0";
        }
      }
    }
}
gbpUpdateComma();

// ADDING ROW ON CLICK OF ADD ROW BUTTON
function gbpAddRow(){
    // COPYING THE TABLE WITH ID 'gdpadd' AND APPENDING IT TO THE LAST ROW
    let add = document.getElementById("gbpadd");
    let clone = add.cloneNode(true);
    document.getElementById("gbptable").appendChild(clone);
    clone.setAttribute("style","display: ");
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    let remove = document.getElementsByClassName("gbptr");
    if (remove.length >= 12) {
      document.getElementById('gbpremovebtn').setAttribute("style","visibility: visible");
    }
    if (remove.length === 29) {
      document.getElementById('gbpaddbtn').setAttribute("style","visibility: hidden");
    }
    // CALLING UPDATE COMMA FUNCTION ON EVERY RAW ADDED
    gbpUpdateComma();
}

// REMOVING ROW ON CLICK OF REMOVE ROW BUTTON
function gbpRemoveRow(){
    let remove = document.getElementsByClassName("gbptr");
    let last = remove[remove.length-2];
    // [remove.length-2] IS TO EXCLUDE SUM ROW
    last.parentNode.removeChild(last);
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    if (remove.length === 11) {
      document.getElementById('gbpremovebtn').setAttribute("style","visibility: hidden");
    }
    if (remove.length < 29) {
      document.getElementById('gbpaddbtn').setAttribute("style","visibility: visible");
    }
    // CALLING UPDATE COMMA FUNCTION ON EVERY RAW REMOVED
    gbpCalSum();
    gbpCalBbd();
}

//------------------------------------ GBP IN LOGIC------------------------------------//

// ADDING EVENT LISTENER FOR EACH IN INPUT
let gbpInForms = document.querySelectorAll(".gbpincal");

inForms.forEach(function () {
  
  let f = '';
  for (let i = 0; i < forms.length; i++) {
     
    f = f + i;
    fi = inForms[i];
    fi = addEventListener('change',gbpEditInSheet);
    fi = addEventListener('change',gbpCalInSum);
    fi = addEventListener('change',gbpCalBbd);
  }
});

// CALCULATING THE TOTAL FOR ALL DENOMINATION
function gbpEditInSheet() {
    let tr = document.getElementsByClassName("gbpincal");
    // LOOPING THROUGH ALL INPUT TO GET THEIR VALUE AND ADDING THEM
    for (i = 0; i < tr.length; i++) {
      rowTotal = 0;
      for (ii = 0; ii < tr[i].getElementsByClassName("gbpinputin").length; ii++) {
        rowTotal = rowTotal + Number(tr[i].getElementsByClassName("gbpinputin")[ii].value.replace(/,/g, ''));
        // replace(/,/g, '')) IS TO REMOVE ALL COMMAS WHEN CALCULATING THE VALUES SO AS NOT TO TROW NaN ERROR
      };
      // TOTALING ALL VALUE AND DISPLAYING THEM ON THE TOTAL COLUMN
      let total = tr[i].getElementsByClassName('gbpinbfft');
      for (let b = 0; b < total.length; b++) {
      
        total[b].innerHTML = rowTotal.toLocaleString();
      }
    }
}

// CALCULATING THE SUM FOR ALL COLUMNS EXCLUDING THE BBF ROW AND DETAILS AND TOTAL COLUMS
function gbpCalInSum() {
    let final = 0;
    let tbody = document.querySelectorAll("table")[12];
    // ("table")[12] IS TO CHOOSE THE TWELVETH ARRAY OF THE QUERY SELECTOR
    let howManyCols = tbody.rows[2].cells.length;
    // tbody.rows[2] IS TO EXCLUDE THE INSERTNEWROW BOTTON ROW
    let totalRow = document.getElementsByClassName("gbptin")[document.getElementsByClassName("gbptin").length - 1];
    for (let j = 1; j < howManyCols - 1; j++) {
      // j = 1 IS TO EXCLUDE THE DETAILS COLUMN AND howManyCols - 1 IS TO EXCLUDE THE TOTAL COLUMN
      final = gbpComputeTableColumnTotalIn(j);
      totalRow.cells[j].innerHTML = final.toLocaleString();
      totalRow.cells[j].setAttribute("style","min-width: 154px");
    }
  
    // TOTALING ALL VALUE AND DISPLAYING THEM ON THE OUT SUM ROW
    function gbpComputeTableColumnTotalIn(colNumber) {
  
      let result = 0;
  
      try {
        let tableBody = document.querySelectorAll("table")[12];
        // ("table")[12] IS TO CHOOSE THE TWELVETH ARRAY OF THE QUERY SELECTOR
        let howManyRows = tableBody.rows.length;
        for (let i = 2; i < (howManyRows); i++) {
          let thisNumber = Number(tableBody.rows[i].cells[colNumber].childNodes.item(0).value.replace(/,/g, ''));
          
  
          if (!isNaN(thisNumber))
            result += thisNumber;
        }
      } finally {
        return result;
      }
      
    }
    // TOTALING THE TOTAL COLUMN
    let allTotal = document.getElementsByClassName("gbpinbfft");
    let sumTotal = 0;
    for (let at = 0; at < allTotal.length; at++) {
      let val = Number(allTotal[at].innerHTML.replace(/,/g, ''));
      sumTotal += val;
    }
    document.querySelector(".gbptotalinSum").textContent = sumTotal.toLocaleString();
}

// ADDIND COMMA TO SEPERATE EACH THOUSAND
function gbpUpdateInComma() {
    // ADDING EVENT LISTNER TO ADD COMMA ON KEYUP
    let numInput = document.querySelectorAll(".gbpinputin");
    let c = '';
    for (let i = 0; i < numInput.length; i++) {
       
      c = c + i;
      ci = forms[i];
      ci = addEventListener('keyup',addComma);
      // FUNCTION FOR ADDING COMMA
      function addComma() {
        let float = Number(numInput[i].value.replace(/,/g, ""));
        if (!isNaN(float)) {
         let formatNum = float.toLocaleString();
         numInput[i].value = formatNum;
        } else {
          numInput[i].value = "0";
        }
      }
    }
}
gbpUpdateInComma();

// ADDING ROW ON CLICK OF ADD ROW BUTTON
function gbpAddInRow(){
    // COPYING THE TABLE WITH ID 'gbpaddin' AND APPENDING IT TO THE LAST ROW
    let add = document.getElementById("gbpaddin");
    let clone = add.cloneNode(true);
    document.getElementById("gbpintable").appendChild(clone);
    clone.setAttribute("style","display: ");
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    let remove = document.getElementsByClassName("gbpintr");
    if (remove.length >= 11) {
      document.getElementById('gbpinremovebtn').setAttribute("style","visibility: visible");
    }
    if (remove.length === 28) {
      document.getElementById('gbpinaddbtn').setAttribute("style","visibility: hidden");
    }
    // CALLING UPDATE COMMA FUNCTION ON EVERY RAW ADDED
    gbpUpdateInComma();
}

// REMOVING ROW ON CLICK OF REMOVE ROW BUTTON
function gbpRemoveInRow(){
    let remove = document.getElementsByClassName("gbpintr");
    let last = remove[remove.length-2];
    // [remove.length-2] IS TO EXCLUDE SUM ROW
    last.parentNode.removeChild(last);
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    if (remove.length === 10) {
      document.getElementById('gbpinremovebtn').setAttribute("style","visibility: hidden");
    }
    if (remove.length < 28) {
      document.getElementById('gbpinaddbtn').setAttribute("style","visibility: visible");
    }
    // CALLING CALCULATE INSUM FUNCTION ON EVERY RAW REMOVED
    gbpCalInSum();
    gbpCalBbd();
}

// FUNCTION TO CALCULATE BBD
function gbpCalBbd() {
    let bbd = 0;
    let bbf = document.querySelector(".gbpbbf").getElementsByClassName("gbpinput");
    let bbdt = document.querySelector(".gbpbbdtr").getElementsByClassName("gbpbbd");
    for (let index = 0; index < bbdt.length; index++) {
      bbd  = Number(bbf[index].value.replace(/,/g, '')) - gbpComputeTableColumnTotal(index) + gbpComputeTableColumnTotalIn(index);
      bbdt[index].innerHTML = bbd.toLocaleString();
        
    }
    // GETTING VALUE FOR VAULT OUTS
    function gbpComputeTableColumnTotal(colNumber) {
  
        let result = 0;
    
        try {
          let tableBody = document.querySelectorAll("table")[10];
          // ("table")[10] IS TO CHOOSE THE TENTH ARRAY OF THE QUERY SELECTOR
          let howManyRows = tableBody.rows.length;
    
          for (let i = 3; i < (howManyRows); i++) {
            // let i = 3 IS TO EXCLUDE BBF ROW
            let thisNumber = Number(tableBody.rows[i].cells[colNumber + 1].childNodes.item(0).value.replace(/,/g, ''));
            // [colNumber + 1] IS TO EXCLUDE DETAILS COLUMN
    
            if (!isNaN(thisNumber))
              result += thisNumber;
          }
        
        } finally {
          return result;
        }
        
    }
    // GETTING VALUE FOR VAULT INS
    function gbpComputeTableColumnTotalIn(colNumber) {
  
        let result = 0;
    
        try {
          let tableBody = document.querySelectorAll("table")[12];
          // ("table")[12] IS TO CHOOSE THE SEVENTH ARRAY OF THE QUERY SELECTOR
          let howManyRows = tableBody.rows.length;
          for (let i = 2; i < (howManyRows); i++) {
            let thisNumber = Number(tableBody.rows[i].cells[colNumber + 1].childNodes.item(0).value.replace(/,/g, ''));
            // [colNumber + 1] IS TO EXCLUDE DETAILS COLUMN
    
            if (!isNaN(thisNumber))
              result += thisNumber;
        }
        } finally {
          return result;
        }
        
      }
    // TOTALING THE VALUE OF ALL BBD
    let allTotalBbd = document.getElementsByClassName("gbpbbd");
    let sumTotal = 0;
    for (let at = 0; at < allTotalBbd.length; at++) {
      let val = Number(allTotalBbd[at].innerHTML.replace(/,/g, ''));
      sumTotal += val;
    }
      document.querySelector(".gbptotalbbd").textContent = sumTotal.toLocaleString();
}