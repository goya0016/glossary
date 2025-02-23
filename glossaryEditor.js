// var row = document.querySelector('.row')

let definitions= new Array();


function showdefinition(ev){
    document.querySelector(".form").textContent="";
   if (definitions[0].glossary) {
     let arr = definitions[0].glossary.sort((a, b) =>
       a.term.localeCompare(b.term)
     );
     definitions = arr;
   }
for (let i = 0; i < definitions.length; i++) {
  //   console.log(i);
var icon = document.createElement('button');
  var row = document.createElement("div");
  var div1 = document.createElement("div");
  var div2 = document.createElement("div");

  var label1 = document.createElement("label");
  var label2 = document.createElement("label");
  var input1 = document.createElement("input");
  var input2 = document.createElement("input");
  
  div1.setAttribute("class", "col term");
  div1.appendChild(label1);
  label1.textContent="Term"
  input1.setAttribute("placeholder", "term");
  input1.setAttribute("type", "text");
  input1.setAttribute("class", "form-control term");
  input1.value = definitions[i].term;
  div1.appendChild(input1);

  div2.setAttribute("class", "col definition");
  div2.appendChild(label2);
  label2.textContent = "Definition";
  input2.setAttribute("type", "text");
  input2.setAttribute("class", "form-control");
  input2.setAttribute("placeholder", "definition");
  input2.value = definitions[i].definition;
  div2.appendChild(input2);

  icon.addEventListener('click',ev => deleteBtn(ev))
  icon.setAttribute('class','deleteBtn')
  icon.setAttribute("data-btn-id", i + 1);
  icon.textContent="Delete"
  row.setAttribute("class", "row");
  row.setAttribute("data-id", i+1);
  row.appendChild(div1);
  row.appendChild(div2);
  row.appendChild(icon);
  document.querySelector(".form").appendChild(row);
}
}
async function fetchFile(ev) {
  await fetch("./merged.json")
    .then((response) => {
      response.json().then((data) => {
        definitions.push(data);
        showdefinition(ev);
        
      });
    })
    .catch((err) => console.error(err));
}
function deleteBtn(ev){
    ev.preventDefault()
    let id = ev.target.attributes["data-btn-id"];
    id= Object.values({id})[0].nodeValue
    let val = document.querySelector(`[data-id="${id}"]`);
    // val= val.closest("div > input")
    val = val.querySelector('input.term')
    // .value()
    val=val.value
    console.log(definitions.filter((e) => e.term !== val));
    definitions = definitions.filter((e)=>e.term !== val)
    console.log(definitions);
    showdefinition()
    
}
window.addEventListener('DOMContentLoaded',(ev)=>{fetchFile(ev)})