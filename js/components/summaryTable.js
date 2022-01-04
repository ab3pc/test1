import { resultTable } from "./components.js";
import { removeAllRes } from "../utilites.js";
import { category } from "../variables.js";

function renderResult(list) {

  removeAllRes();

  /* Variables for table__result*/
  let notesCountActive = [];
  let notesCountArc = [];

  for (let i = 0; i < category.length; i++) {
	let catTask = list.filter((item) => item.category[0] === category[i].name);
	notesCountActive[i] = catTask.filter((item) => item.active).length;
	notesCountArc[i] = catTask.filter((item) => !item.active).length;
  }
  resultTable(notesCountActive,notesCountArc)

}

export { renderResult };
