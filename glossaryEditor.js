let definitions= new Array();


function showdefinition(ev){
    document.querySelector(".form").textContent="";
   if (definitions[0].glossary) {
     let arr = definitions[0].glossary.sort((a, b) =>
       a.term.localeCompare(b.term)
     );
     definitions = arr;
   }
const createElement = (tag, attributes = {}, text = "") => {
  const el = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "dataset") {
      Object.entries(value).forEach(
        ([dataKey, dataValue]) => (el.dataset[dataKey] = dataValue)
      );
    } else {
      el[key] = value;
    }
  });
  if (text) el.textContent = text;
  return el;
};

definitions.forEach((definition, i) => {
  const row = createElement("div", { className: "row" });
  row.dataset.id = i + 1;

  const div1 = createElement("div", { className: "col term" });
  const label1 = createElement("label", {}, "Term");
  const input1 = createElement("input", {
    className: "form-control term",
    placeholder: "term",
    type: "text",
    value: definition.term,
  });

  const div2 = createElement("div", { className: "col definition" });
  const label2 = createElement("label", {}, "Definition");
  const input2 = createElement("input", {
    className: "form-control",
    placeholder: "definition",
    type: "text",
    value: definition.definition,
  });

  const icon = createElement("button", { className: "deleteBtn" }, "Delete");
  icon.dataset.btnId = i + 1;
  icon.addEventListener("click", deleteBtn);

  div1.append(label1, input1);
  div2.append(label2, input2);
  row.append(div1, div2, icon);

  document.querySelector(".form").appendChild(row);
});

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
    val = val.querySelector('input.term')
    val=val.value
    console.log(definitions.filter((e) => e.term !== val));
    definitions = definitions.filter((e)=>e.term !== val)
    showdefinition()
}
window.addEventListener('DOMContentLoaded',(ev)=>{fetchFile(ev)})