
// ADDING DATE
let html = document.getElementById("date");
let date = new Date().toDateString();
html.textContent = date +".";

// SETTING NGN DISPLAY
function viewNgn() {
  let usd = document.getElementById("usd");
  let eur = document.getElementById("eur");
  let ngn = document.getElementById("ngn");
  let gbp = document.getElementById("gbp");
  ngn.setAttribute("style","display: ");
  eur.setAttribute("style","display: none");
  usd.setAttribute("style","display: none");
  gbp.setAttribute("style","display: none");
  document.getElementById("ngnbtn").setAttribute("style","background-color: white");
  document.getElementById("eurbtn").setAttribute("style","background-color: transparent");
  document.getElementById("usdbtn").setAttribute("style","background-color: transparent");
  document.getElementById("gbpbtn").setAttribute("style","background-color: transparent");
}

//------------------------------------ NGN OUT LOGIC------------------------------------//
// ADDING EVENT LISTENER FOR EACH INPUT
let forms = document.querySelectorAll(".cal");

forms.forEach(function () {
  
  let f = '';
  for (let i = 0; i < forms.length; i++) {
     
    f = f + i;
    fi = forms[i];
    fi = addEventListener('change',editSheet);
    fi = addEventListener('change',calSum)
    fi = addEventListener('change',calBbd);
  }
});

// CALCULATING THE TOTAL FOR ALL OUT DENOMINATION
function editSheet() {
  let tr = document.getElementsByClassName("cal");
  // LOOPING THROUGH ALL INPUT TO GET THEIR VALUE AND ADDING THEM
  for (i = 0; i < tr.length; i++) {
    rowTotal = 0;
    for (ii = 0; ii < tr[i].getElementsByClassName("input").length; ii++) {
      rowTotal = rowTotal + Number(tr[i].getElementsByClassName("input")[ii].value.replace(/,/g, ''));
      // replace(/,/g, '')) IS TO REMOVE ALL COMMAS WHEN CALCULATING THE VALUES SO AS NOT TO TROW NaN ERROR
    };
    // TOTALING ALL VALUE AND DISPLAYING THEM ON THE TOTAL COLUMN
    let total = tr[i].getElementsByClassName('bfft');
    for (let b = 0; b < total.length; b++) {
    
      total[b].innerHTML = rowTotal.toLocaleString();
    }
    
  }
  
}

// CALCULATING THE SUM FOR ALL COLUMNS EXCLUDING THE BBF ROW AND DETAILS AND TOTAL COLUMS
function calSum() {
  let final = 0;
  let tbody = document.querySelector("table");
  let howManyCols = tbody.rows[3].cells.length;
  // tbody.rows[3] IS TO EXCLUDE THE BBF ROW
  let totalRow = document.getElementsByClassName("tot")[document.getElementsByClassName("tot").length - 1];
  for (let j = 1; j < howManyCols - 1; j++) {
    // j = 1 IS TO EXCLUDE THE DETAILS COLUMN AND howManyCols - 1 IS TO EXCLUDE THE TOTAL COLUMN
    final = computeTableColumnTotal(j);
    totalRow.cells[j].innerHTML = final.toLocaleString();
    totalRow.cells[j].setAttribute("style","min-width: 154px");
  }

  // TOTALING ALL VALUE AND DISPLAYING THEM ON THE OUT SUM ROW
  function computeTableColumnTotal(colNumber) {

    let result = 0;

    try {
      let tableBody = document.querySelector("table");
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
  let allTotal = document.getElementsByClassName("bfft");
  let sumTotal = 0;
  for (let at = 1; at < allTotal.length; at++) {
    // at = 1 IS TO EXCLUDE TOTAL OF BBF
    let val = Number(allTotal[at].innerHTML.replace(/,/g, ''));
    sumTotal += val;
  }
    document.querySelector(".totalOutSum").innerHTML = sumTotal.toLocaleString();
}

// ADDIND COMMA TO SEPERATE EACH THOUSAND
function updateComma() {
  // ADDING EVENT LISTNER TO ADD COMMA ON KEYUP
  let numInput = document.querySelectorAll(".input");
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
updateComma();


// ADDING ROW ON CLICK OF ADD ROW BUTTON
function addRow(){
  // COPYING THE TABLE WITH ID 'add' AND APPENDING IT TO THE LAST ROW
  let add = document.getElementById("add");
  let clone = add.cloneNode(true);
  document.getElementById("ngntable").appendChild(clone);
  clone.setAttribute("style","display: ");
  // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
  let remove = document.getElementsByClassName("tr");
  if (remove.length >= 12) {
    document.getElementById('removebtn').setAttribute("style","visibility: visible");
  }
  if (remove.length === 29) {
    document.getElementById('addbtn').setAttribute("style","visibility: hidden");
  }
  // CALLING UPDATE COMMA FUNCTION ON EVERY RAW ADDED
  updateComma();
}

// REMOVING ROW ON CLICK OF REMOVE ROW BUTTON
function removeRow(){
  let remove = document.getElementsByClassName("tr");
  let last = remove[remove.length-2];
  // [remove.length-2] IS TO EXCLUDE SUM ROW
  last.parentNode.removeChild(last);
  // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
  if (remove.length === 11) {
    document.getElementById('removebtn').setAttribute("style","visibility: hidden");
  }
  if (remove.length < 29) {
    document.getElementById('addbtn').setAttribute("style","visibility: visible");
  }
  // CALLING UPDATE COMMA FUNCTION ON EVERY RAW REMOVED
  calSum();
  calBbd();
}

//------------------------------------ NGN IN LOGIC ------------------------------------//

// ADDING EVENT LISTENER FOR EACH IN INPUT
let inForms = document.querySelectorAll(".incal");

inForms.forEach(function () {
  
  let f = '';
  for (let i = 0; i < forms.length; i++) {
     
    f = f + i;
    fi = inForms[i];
    fi = addEventListener('change',editInSheet);
    fi = addEventListener('change',calInSum);
    fi = addEventListener('change',calBbd);
  }
});

// CALCULATING THE TOTAL FOR ALL DENOMINATION
function editInSheet() {
  let tr = document.getElementsByClassName("incal");
  // LOOPING THROUGH ALL INPUT TO GET THEIR VALUE AND ADDING THEM
  for (i = 0; i < tr.length; i++) {
    rowTotal = 0;
    for (ii = 0; ii < tr[i].getElementsByClassName("inputin").length; ii++) {
      rowTotal = rowTotal + Number(tr[i].getElementsByClassName("inputin")[ii].value.replace(/,/g, ''));
      // replace(/,/g, '')) IS TO REMOVE ALL COMMAS WHEN CALCULATING THE VALUES SO AS NOT TO TROW NaN ERROR
    };
    // TOTALING ALL VALUE AND DISPLAYING THEM ON THE TOTAL COLUMN
    let total = tr[i].getElementsByClassName('inbfft');
    for (let b = 0; b < total.length; b++) {
    
      total[b].innerHTML = rowTotal.toLocaleString();
    }
  }
}

// CALCULATING THE SUM FOR ALL COLUMNS EXCLUDING THE BBF ROW AND DETAILS AND TOTAL COLUMS
function calInSum() {
  let final = 0;
  let tbody = document.querySelectorAll("table")[2];
  // ("table")[2] IS TO CHOOSE THE TSECOND ARRAY OF THE QUERY SELECTOR
  let howManyCols = tbody.rows[2].cells.length;
  // tbody.rows[2] IS TO EXCLUDE THE INSERTNEWROW BOTTON ROW
  let totalRow = document.getElementsByClassName("tin")[document.getElementsByClassName("tin").length - 1];
  for (let j = 1; j < howManyCols - 1; j++) {
    // j = 1 IS TO EXCLUDE THE DETAILS COLUMN AND howManyCols - 1 IS TO EXCLUDE THE TOTAL COLUMN
    final = computeTableColumnTotalIn(j);
    totalRow.cells[j].innerHTML = final.toLocaleString();
    totalRow.cells[j].setAttribute("style","min-width: 154px");
  }

  // TOTALING ALL VALUE AND DISPLAYING THEM ON THE OUT SUM ROW
  function computeTableColumnTotalIn(colNumber) {

    let result = 0;

    try {
      let tableBody = document.querySelectorAll("table")[2];
      // ("table")[2] IS TO CHOOSE THE SECOND ARRAY OF THE QUERY SELECTOR
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
  let allTotal = document.getElementsByClassName("inbfft");
  let sumTotal = 0;
  for (let at = 0; at < allTotal.length; at++) {
    let val = Number(allTotal[at].innerHTML.replace(/,/g, ''));
    sumTotal += val;
  }
    document.querySelector(".totalinSum").textContent = sumTotal.toLocaleString();
}

// ADDIND COMMA TO SEPERATE EACH THOUSAND
function updateInComma() {
  // ADDING EVENT LISTNER TO ADD COMMA ON KEYUP
  let numInput = document.querySelectorAll(".inputin");
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
updateInComma();


// ADDING ROW ON CLICK OF ADD ROW BUTTON
function addInRow(){
  // COPYING THE TABLE WITH ID 'addin' AND APPENDING IT TO THE LAST ROW
  let add = document.getElementById("addin");
  let clone = add.cloneNode(true);
  document.getElementById("ngnintable").appendChild(clone);
  clone.setAttribute("style","display: ");
  // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
  let remove = document.getElementsByClassName("intr");
  if (remove.length >= 11) {
    document.getElementById('inremovebtn').setAttribute("style","visibility: visible");
  }
  if (remove.length === 28) {
    document.getElementById('inaddbtn').setAttribute("style","visibility: hidden");
  }
  // CALLING UPDATE COMMA FUNCTION ON EVERY RAW ADDED
  updateInComma();
}

// REMOVING ROW ON CLICK OF REMOVE ROW BUTTON
function removeInRow(){
  let remove = document.getElementsByClassName("intr");
  let last = remove[remove.length-2];
  // [remove.length-2] IS TO EXCLUDE SUM ROW
  last.parentNode.removeChild(last);
  // SETTING THE NUMBER OF ROWS TO MAX OF 25 AND MIN OF 7
  if (remove.length === 10) {
    document.getElementById('inremovebtn').setAttribute("style","visibility: hidden");
  }
  if (remove.length < 28) {
    document.getElementById('inaddbtn').setAttribute("style","visibility: visible");
  }
  // CALLING CALCULATE INSUM FUNCTION ON EVERY RAW REMOVED
  calInSum();
  calBbd();
}

// FUNCTION TO CALCULATE BBD
function calBbd() {
  let bbd = 0;
  let bbf = document.querySelector(".bbf").getElementsByClassName("input");
  let bbdt = document.querySelector(".bbdtr").getElementsByClassName("bbd");
  for (let index = 0; index < bbdt.length; index++) {
    bbd  = Number(bbf[index].value.replace(/,/g, '')) - computeTableColumnTotal(index) + computeTableColumnTotalIn(index);
    bbdt[index].innerHTML = bbd.toLocaleString();
      
  }
  // GETTING VALUE FOR VAULT OUTS
  function computeTableColumnTotal(colNumber) {
  
    let result = 0;
  
    try {
      let tableBody = document.querySelector("table");
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
  function computeTableColumnTotalIn(colNumber) {

    let result = 0;

    try {
      let tableBody = document.querySelectorAll("table")[2];
      // ("table")[2] IS TO CHOOSE THE THIRD ARRAY OF THE QUERY SELECTOR
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
  let allTotalBbd = document.getElementsByClassName("bbd");
  let sumTotal = 0;
  for (let at = 0; at < allTotalBbd.length; at++) {
    let val = Number(allTotalBbd[at].innerHTML.replace(/,/g, ''));
    sumTotal += val;
  }
    document.querySelector(".totalbbd").textContent = sumTotal.toLocaleString();
}
