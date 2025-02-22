var btns = document.querySelectorAll(".alphabetBtn");
var returnToTop = document.getElementById("returnToTop");
var definitionDiv = document.querySelector(".definitions");
var currentAlpha;

btns.forEach((i) => {
  i.addEventListener("click", (ev) => {
    showdefinition(ev);
  });
});

let definitions = new Array();
const myRequest = new Request("./merged.json");

function showdefinition(ev) {
  definitionDiv.textContent = "";
  ev.preventDefault();
  var heading = document.querySelector(".heading");

  if (ev.target.textContent === null) {
    heading.textContent = "Definition of Letter A";
    currentAlpha = "A";
  } else {
    currentAlpha = ev.target.textContent;
    heading.textContent = "Definition of Letter " + currentAlpha;
  }

  let wordDef = definitions[0].glossary.filter((term) => {
    if (term.term.substr(0, 1).toLowerCase() === currentAlpha.toLowerCase()) {
      return true;
    }
  });

  for (let i = 0; i < wordDef.length; i++) {

    var div = document.createElement("div");
    var term = document.createElement("h4");
    var explanation = document.createElement("p");

    term.textContent = wordDef[i].term;
    explanation.textContent = wordDef[i].definition;

    div.appendChild(term);
    div.appendChild(explanation);

    definitionDiv.appendChild(div);
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

window.addEventListener("DOMContentLoaded", (ev) => {
  fetchFile(ev);
});
