import { form, modal, table, tableResult } from "./variables.js";

//CLEAR TABLE//
function removeAll() {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

//CLEAR RES__TABLE//
function removeAllRes() {
  while (tableResult.firstChild) {
    tableResult.removeChild(tableResult.firstChild);
  }
}

//ParseDates//
const parseDates = (content) => {
	let strDates = "";
  let searchValue = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
  let dates = content.match(searchValue);
  switch (true) {
    case dates === null: {
      break;
    }
    case dates.length === 1: {
      strDates = dates[0];
      break;
    }
    case dates.length > 1: {
      strDates = dates.join(", ");
      break;
    }

    default:
      break;
  }
  
  return strDates;
};

//Open modal//
const openModal = () => {
  let modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
  modalInstance.show();
  modal.querySelector(".modal-title").textContent = "Edit note";
};

//Hide modal//
const hideModal = () => {
	let modalInstance = bootstrap.Modal.getInstance(modal);
	modalInstance.hide();
	modal.querySelector(".modal-title").textContent = "Create note";
	form.reset();
};






export { removeAll, removeAllRes, openModal, parseDates, hideModal };
