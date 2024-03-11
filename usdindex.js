// SETTING USD DISPLAY

function viewUsd() {
    let usd = document.getElementById("usd");
    let eur = document.getElementById("eur");
    let ngn = document.getElementById("ngn");
    let gbp = document.getElementById("gbp");
    usd.setAttribute("style","display: ");
    eur.setAttribute("style","display: none");
    ngn.setAttribute("style","display: none");
    gbp.setAttribute("style","display: none");
    document.getElementById("usdbtn").setAttribute("style","background-color: white");
    document.getElementById("eurbtn").setAttribute("style","background-color: transparent");
    document.getElementById("ngnbtn").setAttribute("style","background-color: transparent");
    document.getElementById("gbpbtn").setAttribute("style","background-color: transparent");
}

//------------------------------------ USD OUT LOGIC------------------------------------//
// ADDING EVENT LISTENER FOR EACH INPUT
let usdForms = document.querySelectorAll(".usdcal");

usdForms.forEach(function () {
  
  let f = '';
  for (let i = 0; i < forms.length; i++) {
     
    f = f + i;
    fi = forms[i];
    fi = addEventListener('change',usdEditSheet);
    fi = addEventListener('change',usdCalSum);
    fi = addEventListener('change',usdCalBbd);
  }
});

// CALCULATING THE TOTAL FOR ALL OUT DENOMINATION
function usdEditSheet() {
  let tr = document.getElementsByClassName("usdcal");
  // LOOPING THROUGH ALL INPUT TO GET THEIR VALUE AND ADDING THEM
  for (i = 0; i < tr.length; i++) {
    rowTotal = 0;
    for (ii = 0; ii < tr[i].getElementsByClassName("usdinput").length; ii++) {
      rowTotal = rowTotal + Number(tr[i].getElementsByClassName("usdinput")[ii].value.replace(/,/g, ''));
      // replace(/,/g, '')) IS TO REMOVE ALL COMMAS WHEN CALCULATING THE VALUES SO AS NOT TO TROW NaN ERROR
    };
    // TOTALING ALL VALUE AND DISPLAYING THEM ON THE TOTAL COLUMN
    let total = tr[i].getElementsByClassName('usdbfft');
    
    for (let b = 0; b < total.length; b++) {
    
      total[b].innerHTML = rowTotal.toLocaleString();
    }
    
  }
  
}

// CALCULATING THE SUM FOR ALL COLUMNS EXCLUDING THE BBF ROW AND DETAILS AND TOTAL COLUMS
function usdCalSum() {
    let final = 0;
    let tbody = document.querySelectorAll("table")[5];
    // ("table")[5] IS TO CHOOSE THE FIFTH ARRAY OF THE QUERY SELECTOR
    let howManyCols = tbody.rows[3].cells.length;
    // tbody.rows[3] IS TO EXCLUDE THE BBF ROW
    let totalRow = document.getElementsByClassName("usdtot")[document.getElementsByClassName("usdtot").length - 1];
    for (let j = 1; j < howManyCols - 1; j++) {
      // j = 1 IS TO EXCLUDE THE DETAILS COLUMN AND howManyCols - 1 IS TO EXCLUDE THE TOTAL COLUMN
      final = usdComputeTableColumnTotal(j);
      totalRow.cells[j].innerHTML = final.toLocaleString();
      totalRow.cells[j].setAttribute("style","min-width: 154px");
    }
  
    // TOTALING ALL OUT VALUE AND DISPLAYING THEM ON THE OUT SUM ROW
    function usdComputeTableColumnTotal(colNumber) {
  
      let result = 0;
  
      try {
        let tableBody = document.querySelectorAll("table")[5];
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
    let allTotal = document.getElementsByClassName("usdbfft");
    let sumTotal = 0;
    for (let at = 1; at < allTotal.length; at++) {
      // at = 1 IS TO EXCLUDE TOTAL OF BBF
      let val = Number(allTotal[at].innerHTML.replace(/,/g, ''));
      sumTotal += val;
    }
    document.querySelector(".usdtotalOutSum").innerHTML = sumTotal.toLocaleString();
}

// ADDIND COMMA TO SEPERATE EACH THOUSAND
function usdUpdateComma() {
    // ADDING EVENT LISTNER TO ADD COMMA ON KEYUP
    let numInput = document.querySelectorAll(".usdinput");
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
usdUpdateComma();

// ADDING ROW ON CLICK OF ADD ROW BUTTON
function usdAddRow(){
    // COPYING THE TABLE WITH ID 'usdadd' AND APPENDING IT TO THE LAST ROW
    let add = document.getElementById("usdadd");
    let clone = add.cloneNode(true);
    document.getElementById("usdtable").appendChild(clone);
    clone.setAttribute("style","display: ");
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    let remove = document.getElementsByClassName("usdtr");
    if (remove.length >= 12) {
      document.getElementById('usdremovebtn').setAttribute("style","visibility: visible");
    }
    if (remove.length === 29) {
      document.getElementById('usdaddbtn').setAttribute("style","visibility: hidden");
    }
    // CALLING UPDATE COMMA FUNCTION ON EVERY RAW ADDED
    usdUpdateComma();
}

// REMOVING ROW ON CLICK OF REMOVE ROW BUTTON
function usdRemoveRow(){
    let remove = document.getElementsByClassName("usdtr");
    let last = remove[remove.length-2];
    // [remove.length-2] IS TO EXCLUDE SUM ROW
    last.parentNode.removeChild(last);
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    if (remove.length === 11) {
      document.getElementById('usdremovebtn').setAttribute("style","visibility: hidden");
    }
    if (remove.length < 29) {
      document.getElementById('usdaddbtn').setAttribute("style","visibility: visible");
    }
    // CALLING UPDATE COMMA FUNCTION ON EVERY RAW REMOVED
    usdCalSum();
    usdCalBbd();
}

//------------------------------------ USD IN LOGIC------------------------------------//

// ADDING EVENT LISTENER FOR EACH IN INPUT
let usdInForms = document.querySelectorAll(".usdincal");

inForms.forEach(function () {
  
  let f = '';
  for (let i = 0; i < forms.length; i++) {
     
    f = f + i;
    fi = inForms[i];
    fi = addEventListener('change',usdEditInSheet);
    fi = addEventListener('change',usdCalInSum);
    fi = addEventListener('change',usdCalBbd);
  }
});

// CALCULATING THE TOTAL FOR ALL DENOMINATION
function usdEditInSheet() {
    let tr = document.getElementsByClassName("usdincal");
    // LOOPING THROUGH ALL INPUT TO GET THEIR VALUE AND ADDING THEM
    for (i = 0; i < tr.length; i++) {
      rowTotal = 0;
      for (ii = 0; ii < tr[i].getElementsByClassName("usdinputin").length; ii++) {
        rowTotal = rowTotal + Number(tr[i].getElementsByClassName("usdinputin")[ii].value.replace(/,/g, ''));
        // replace(/,/g, '')) IS TO REMOVE ALL COMMAS WHEN CALCULATING THE VALUES SO AS NOT TO TROW NaN ERROR
      };
      // TOTALING ALL VALUE AND DISPLAYING THEM ON THE TOTAL COLUMN
      let total = tr[i].getElementsByClassName('usdinbfft');
      for (let b = 0; b < total.length; b++) {
      
        total[b].innerHTML = rowTotal.toLocaleString();
      }
    }
}

// CALCULATING THE SUM FOR ALL COLUMNS EXCLUDING THE BBF ROW AND DETAILS AND TOTAL COLUMS
function usdCalInSum() {
    let final = 0;
    let tbody = document.querySelectorAll("table")[7];
    // ("table")[7] IS TO CHOOSE THE SEVENTH ARRAY OF THE QUERY SELECTOR
    let howManyCols = tbody.rows[2].cells.length;
    // tbody.rows[2] IS TO EXCLUDE THE INSERTNEWROW BOTTON ROW
    let totalRow = document.getElementsByClassName("usdtin")[document.getElementsByClassName("usdtin").length - 1];
    for (let j = 1; j < howManyCols - 1; j++) {
      // j = 1 IS TO EXCLUDE THE DETAILS COLUMN AND howManyCols - 1 IS TO EXCLUDE THE TOTAL COLUMN
      final = usdComputeTableColumnTotalIn(j);
      totalRow.cells[j].innerHTML = final.toLocaleString();
      totalRow.cells[j].setAttribute("style","min-width: 154px");
    }
  
    // TOTALING ALL VALUE AND DISPLAYING THEM ON THE OUT SUM ROW
    function usdComputeTableColumnTotalIn(colNumber) {
  
      let result = 0;
  
      try {
        let tableBody = document.querySelectorAll("table")[7];
        // ("table")[7] IS TO CHOOSE THE SEVENTH ARRAY OF THE QUERY SELECTOR
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
    let allTotal = document.getElementsByClassName("usdinbfft");
    let sumTotal = 0;
    for (let at = 0; at < allTotal.length; at++) {
      let val = Number(allTotal[at].innerHTML.replace(/,/g, ''));
      sumTotal += val;
    }
    document.querySelector(".usdtotalinSum").textContent = sumTotal.toLocaleString();
}
  
// ADDIND COMMA TO SEPERATE EACH THOUSAND
function usdUpdateInComma() {
    // ADDING EVENT LISTNER TO ADD COMMA ON KEYUP
    let numInput = document.querySelectorAll(".usdinputin");
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
usdUpdateInComma();

// ADDING ROW ON CLICK OF ADD ROW BUTTON
function usdAddInRow(){
    // COPYING THE TABLE WITH ID 'usdaddin' AND APPENDING IT TO THE LAST ROW
    let add = document.getElementById("usdaddin");
    let clone = add.cloneNode(true);
    document.getElementById("usdintable").appendChild(clone);
    clone.setAttribute("style","display: ");
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    let remove = document.getElementsByClassName("usdintr");
    if (remove.length >= 11) {
      document.getElementById('usdinremovebtn').setAttribute("style","visibility: visible");
    }
    if (remove.length === 28) {
      document.getElementById('usdinaddbtn').setAttribute("style","visibility: hidden");
    }
    // CALLING UPDATE COMMA FUNCTION ON EVERY RAW ADDED
    usdUpdateInComma();
}

// REMOVING ROW ON CLICK OF REMOVE ROW BUTTON
function usdRemoveInRow(){
    let remove = document.getElementsByClassName("usdintr");
    let last = remove[remove.length-2];
    // [remove.length-2] IS TO EXCLUDE SUM ROW
    last.parentNode.removeChild(last);
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    if (remove.length === 10) {
      document.getElementById('usdinremovebtn').setAttribute("style","visibility: hidden");
    }
    if (remove.length < 28) {
      document.getElementById('usdinaddbtn').setAttribute("style","visibility: visible");
    }
    // CALLING CALCULATE INSUM FUNCTION ON EVERY RAW REMOVED
    usdCalInSum();
    usdCalBbd();
}

// FUNCTION TO CALCULATE BBD
function usdCalBbd() {
    let bbd = 0;
    let bbf = document.querySelector(".usdbbf").getElementsByClassName("usdinput");
    let bbdt = document.querySelector(".usdbbdtr").getElementsByClassName("usdbbd");
    for (let index = 0; index < bbdt.length; index++) {
      bbd  = Number(bbf[index].value.replace(/,/g, '')) - usdComputeTableColumnTotal(index) + usdComputeTableColumnTotalIn(index);
      bbdt[index].innerHTML = bbd.toLocaleString();
        
    }
    // GETTING VALUE FOR VAULT OUTS
    function usdComputeTableColumnTotal(colNumber) {
  
        let result = 0;
    
        try {
          let tableBody = document.querySelectorAll("table")[5];
          // ("table")[5] IS TO CHOOSE THE FIFTH ARRAY OF THE QUERY SELECTOR
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
    function usdComputeTableColumnTotalIn(colNumber) {
  
        let result = 0;
    
        try {
          let tableBody = document.querySelectorAll("table")[7];
          // ("table")[7] IS TO CHOOSE THE SEVENTH ARRAY OF THE QUERY SELECTOR
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
    let allTotalBbd = document.getElementsByClassName("usdbbd");
    let sumTotal = 0;
    for (let at = 0; at < allTotalBbd.length; at++) {
      let val = Number(allTotalBbd[at].innerHTML.replace(/,/g, ''));
      sumTotal += val;
    }
      document.querySelector(".usdtotalbbd").textContent = sumTotal.toLocaleString();
}