import { mainTable } from "./components.js";
import { renderResult } from "./summaryTable.js";
import { removeAll } from "../utilites.js";


function render(list, mode) {
  removeAll();
  let activeTask = [];
  if (mode === "showActive") {
    activeTask = list.filter((item) => item.active);
  }
  if (mode === "showArchive") {
    activeTask = list.filter((item) => item.active === false);
  }
  mainTable(activeTask)
  renderResult(list);
}

export { render };
