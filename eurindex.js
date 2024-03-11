// SETTING GBP DISPLAY

function viewEur() {
    let eur = document.getElementById("eur");
    let gbp = document.getElementById("gbp");
    let usd = document.getElementById("usd");
    let ngn = document.getElementById("ngn");
    eur.setAttribute("style","display: ")
    gbp.setAttribute("style","display: none")
    usd.setAttribute("style","display: none");
    ngn.setAttribute("style","display: none");
    document.getElementById("eurbtn").setAttribute("style","background-color: white");
    document.getElementById("gbpbtn").setAttribute("style","background-color: transparent");
    document.getElementById("usdbtn").setAttribute("style","background-color: transparent");
    document.getElementById("ngnbtn").setAttribute("style","background-color: transparent");
}

//------------------------------------ EUR OUT LOGIC------------------------------------//
// ADDING EVENT LISTENER FOR EACH INPUT
let eurForms = document.querySelectorAll(".eurcal");

eurForms.forEach(function () {
  
  let f = '';
  for (let i = 0; i < forms.length; i++) {
     
    f = f + i;
    fi = forms[i];
    fi = addEventListener('change',eurEditSheet);
    fi = addEventListener('change',eurCalSum);
    fi = addEventListener('change',eurCalBbd);
  }
});

// CALCULATING THE TOTAL FOR ALL OUT DENOMINATION
function eurEditSheet() {
    let tr = document.getElementsByClassName("eurcal");
    // LOOPING THROUGH ALL INPUT TO GET THEIR VALUE AND ADDING THEM
    for (i = 0; i < tr.length; i++) {
      rowTotal = 0;
      for (ii = 0; ii < tr[i].getElementsByClassName("eurinput").length; ii++) {
        rowTotal = rowTotal + Number(tr[i].getElementsByClassName("eurinput")[ii].value.replace(/,/g, ''));
        // replace(/,/g, '')) IS TO REMOVE ALL COMMAS WHEN CALCULATING THE VALUES SO AS NOT TO TROW NaN ERROR
      };
      // TOTALING ALL VALUE AND DISPLAYING THEM ON THE TOTAL COLUMN
      let total = tr[i].getElementsByClassName('eurbfft');
      
      for (let b = 0; b < total.length; b++) {
      
        total[b].innerHTML = rowTotal.toLocaleString();
      }
      
    }
    
}

// CALCULATING THE SUM FOR ALL COLUMNS EXCLUDING THE BBF ROW AND DETAILS AND TOTAL COLUMS
function eurCalSum() {
    let final = 0;
    let tbody = document.querySelectorAll("table")[15];
    // ("table")[10] IS TO CHOOSE THE TENTH ARRAY OF THE QUERY SELECTOR
    let howManyCols = tbody.rows[3].cells.length;
    // tbody.rows[3] IS TO EXCLUDE THE BBF ROW
    let totalRow = document.getElementsByClassName("eurtot")[document.getElementsByClassName("eurtot").length - 1];
    for (let j = 1; j < howManyCols - 1; j++) {
      // j = 1 IS TO EXCLUDE THE DETAILS COLUMN AND howManyCols - 1 IS TO EXCLUDE THE TOTAL COLUMN
      final = eurComputeTableColumnTotal(j);
      totalRow.cells[j].innerHTML = final.toLocaleString();
      totalRow.cells[j].setAttribute("style","min-width: 154px");
    }
  
    // TOTALING ALL OUT VALUE AND DISPLAYING THEM ON THE OUT SUM ROW
    function eurComputeTableColumnTotal(colNumber) {
  
      let result = 0;
  
      try {
        let tableBody = document.querySelectorAll("table")[15];
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
    let allTotal = document.getElementsByClassName("eurbfft");
    let sumTotal = 0;
    for (let at = 1; at < allTotal.length; at++) {
      // at = 1 IS TO EXCLUDE TOTAL OF BBF
      let val = Number(allTotal[at].innerHTML.replace(/,/g, ''));
      sumTotal += val;
    }
    document.querySelector(".eurtotalOutSum").innerHTML = sumTotal.toLocaleString();
}

// ADDIND COMMA TO SEPERATE EACH THOUSAND
function eurUpdateComma() {
    // ADDING EVENT LISTNER TO ADD COMMA ON KEYUP
    let numInput = document.querySelectorAll(".eurinput");
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
eurUpdateComma();

// ADDING ROW ON CLICK OF ADD ROW BUTTON
function eurAddRow(){
    // COPYING THE TABLE WITH ID 'gdpadd' AND APPENDING IT TO THE LAST ROW
    let add = document.getElementById("euradd");
    let clone = add.cloneNode(true);
    document.getElementById("eurtable").appendChild(clone);
    clone.setAttribute("style","display: ");
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    let remove = document.getElementsByClassName("eurtr");
    if (remove.length >= 12) {
      document.getElementById('eurremovebtn').setAttribute("style","visibility: visible");
    }
    if (remove.length === 29) {
      document.getElementById('euraddbtn').setAttribute("style","visibility: hidden");
    }
    // CALLING UPDATE COMMA FUNCTION ON EVERY RAW ADDED
    eurUpdateComma();
}

// REMOVING ROW ON CLICK OF REMOVE ROW BUTTON
function eurRemoveRow(){
    let remove = document.getElementsByClassName("eurtr");
    let last = remove[remove.length-2];
    // [remove.length-2] IS TO EXCLUDE SUM ROW
    last.parentNode.removeChild(last);
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    if (remove.length === 11) {
      document.getElementById('eurremovebtn').setAttribute("style","visibility: hidden");
    }
    if (remove.length < 29) {
      document.getElementById('euraddbtn').setAttribute("style","visibility: visible");
    }
    // CALLING UPDATE COMMA FUNCTION ON EVERY RAW REMOVED
    eurCalSum();
    eurCalBbd();
}

//------------------------------------ EUR IN LOGIC------------------------------------//

// ADDING EVENT LISTENER FOR EACH IN INPUT
let eurInForms = document.querySelectorAll(".eurincal");

inForms.forEach(function () {
  
  let f = '';
  for (let i = 0; i < forms.length; i++) {
     
    f = f + i;
    fi = inForms[i];
    fi = addEventListener('change',eurEditInSheet);
    fi = addEventListener('change',eurCalInSum);
    fi = addEventListener('change',eurCalBbd);
  }
});

// CALCULATING THE TOTAL FOR ALL DENOMINATION
function eurEditInSheet() {
    let tr = document.getElementsByClassName("eurincal");
    // LOOPING THROUGH ALL INPUT TO GET THEIR VALUE AND ADDING THEM
    for (i = 0; i < tr.length; i++) {
      rowTotal = 0;
      for (ii = 0; ii < tr[i].getElementsByClassName("eurinputin").length; ii++) {
        rowTotal = rowTotal + Number(tr[i].getElementsByClassName("eurinputin")[ii].value.replace(/,/g, ''));
        // replace(/,/g, '')) IS TO REMOVE ALL COMMAS WHEN CALCULATING THE VALUES SO AS NOT TO TROW NaN ERROR
      };
      // TOTALING ALL VALUE AND DISPLAYING THEM ON THE TOTAL COLUMN
      let total = tr[i].getElementsByClassName('eurinbfft');
      for (let b = 0; b < total.length; b++) {
      
        total[b].innerHTML = rowTotal.toLocaleString();
      }
    }
}

// CALCULATING THE SUM FOR ALL COLUMNS EXCLUDING THE BBF ROW AND DETAILS AND TOTAL COLUMS
function eurCalInSum() {
    let final = 0;
    let tbody = document.querySelectorAll("table")[17];
    console.log(tbody);
    // ("table")[12] IS TO CHOOSE THE TWELVETH ARRAY OF THE QUERY SELECTOR
    let howManyCols = tbody.rows[2].cells.length;
    // tbody.rows[2] IS TO EXCLUDE THE INSERTNEWROW BOTTON ROW
    let totalRow = document.getElementsByClassName("eurtin")[document.getElementsByClassName("eurtin").length - 1];
    for (let j = 1; j < howManyCols - 1; j++) {
      // j = 1 IS TO EXCLUDE THE DETAILS COLUMN AND howManyCols - 1 IS TO EXCLUDE THE TOTAL COLUMN
      final = eurComputeTableColumnTotalIn(j);
      totalRow.cells[j].innerHTML = final.toLocaleString();
      totalRow.cells[j].setAttribute("style","min-width: 154px");
    }
  
    // TOTALING ALL VALUE AND DISPLAYING THEM ON THE OUT SUM ROW
    function eurComputeTableColumnTotalIn(colNumber) {
  
      let result = 0;
  
      try {
        let tableBody = document.querySelectorAll("table")[17];
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
    let allTotal = document.getElementsByClassName("eurinbfft");
    let sumTotal = 0;
    for (let at = 0; at < allTotal.length; at++) {
      let val = Number(allTotal[at].innerHTML.replace(/,/g, ''));
      sumTotal += val;
    }
    document.querySelector(".eurtotalinSum").textContent = sumTotal.toLocaleString();
}

// ADDIND COMMA TO SEPERATE EACH THOUSAND
function eurUpdateInComma() {
    // ADDING EVENT LISTNER TO ADD COMMA ON KEYUP
    let numInput = document.querySelectorAll(".eurinputin");
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
eurUpdateInComma();

// ADDING ROW ON CLICK OF ADD ROW BUTTON
function eurAddInRow(){
    // COPYING THE TABLE WITH ID 'euraddin' AND APPENDING IT TO THE LAST ROW
    let add = document.getElementById("euraddin");
    let clone = add.cloneNode(true);
    document.getElementById("eurintable").appendChild(clone);
    clone.setAttribute("style","display: ");
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    let remove = document.getElementsByClassName("eurintr");
    if (remove.length >= 11) {
      document.getElementById('eurinremovebtn').setAttribute("style","visibility: visible");
    }
    if (remove.length === 28) {
      document.getElementById('eurinaddbtn').setAttribute("style","visibility: hidden");
    }
    // CALLING UPDATE COMMA FUNCTION ON EVERY RAW ADDED
    eurUpdateInComma();
}

// REMOVING ROW ON CLICK OF REMOVE ROW BUTTON
function eurRemoveInRow(){
    let remove = document.getElementsByClassName("eurintr");
    let last = remove[remove.length-2];
    // [remove.length-2] IS TO EXCLUDE SUM ROW
    last.parentNode.removeChild(last);
    // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
    if (remove.length === 10) {
      document.getElementById('eurinremovebtn').setAttribute("style","visibility: hidden");
    }
    if (remove.length < 28) {
      document.getElementById('eurinaddbtn').setAttribute("style","visibility: visible");
    }
    // CALLING CALCULATE INSUM FUNCTION ON EVERY RAW REMOVED
    eurCalInSum();
    eurCalBbd();
}

// FUNCTION TO CALCULATE BBD
function eurCalBbd() {
    let bbd = 0;
    let bbf = document.querySelector(".eurbbf").getElementsByClassName("eurinput");
    let bbdt = document.querySelector(".eurbbdtr").getElementsByClassName("eurbbd");
    for (let index = 0; index < bbdt.length; index++) {
      bbd  = Number(bbf[index].value.replace(/,/g, '')) - eurComputeTableColumnTotal(index) + eurComputeTableColumnTotalIn(index);
      bbdt[index].innerHTML = bbd.toLocaleString();
        
    }
    // GETTING VALUE FOR VAULT OUTS
    function eurComputeTableColumnTotal(colNumber) {
  
        let result = 0;
    
        try {
          let tableBody = document.querySelectorAll("table")[15];
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
    function eurComputeTableColumnTotalIn(colNumber) {
  
        let result = 0;
    
        try {
          let tableBody = document.querySelectorAll("table")[17];
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
    let allTotalBbd = document.getElementsByClassName("eurbbd");
    let sumTotal = 0;
    for (let at = 0; at < allTotalBbd.length; at++) {
      let val = Number(allTotalBbd[at].innerHTML.replace(/,/g, ''));
      sumTotal += val;
    }
      document.querySelector(".eurtotalbbd").textContent = sumTotal.toLocaleString();
}