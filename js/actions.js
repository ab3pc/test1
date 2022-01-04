import { render } from "./components/table.js";
import { hideModal, parseDates } from "./utilites.js";
import { form } from "./variables.js";

/*================= Delete Notes ======================== */
let deleteNote = (id, currentNotes) => {
  let newSet = currentNotes.filter((item) => item.id != id);
  currentNotes = newSet;
  render(currentNotes.filter((item) => item.active), 'showActive');
  return currentNotes;
};

/*================= Edit Notes ======================== */
function editMode(id, currentNotes) {
	let elem = currentNotes.find((item) => item.id == id);
	form.name.value = elem.name;
	form.content.value = elem.content;
	form.id.value = elem.id;
	form.category.value = `${elem.category[0]} ${elem.category[1]}`;
  
	// form.reset();
  }

  /*================= Archive NOTE ======================== */
let archiveNote = (id, list) => {
	let newSet = list.map((item) => {
	  if (item.id == id) {
		item.active = !item.active;
	  }
	  return item;
	});
  
let side = newSet.find((item) => item.id == id);
  
	if (side.active) {
	  render(newSet, 'showArchive');
	} else {
	  render(newSet, 'showActive');
  
	}
	return newSet;
  };
  
/*================= Open Archive NOTE ======================== */
let openArchive = (currentNotes) => {
	render(currentNotes,'showArchive'); }
  
  let openActive = (currentNotes) => {
	render(currentNotes, 'showActive');
  };
  
/*================= Add NOTE ======================== */
  function addNotes(category, name, content, id, currentNotes) {
	  
	let strDates = parseDates(content);
  
	/*if edit mode*/
	if (id) {
	  let editedNotes = currentNotes.map((item) => {
		if (item.id == id) {
		  item.name = name;
		  item.category = [
			category.split(" ")[0],
			category.split(" ")[1] + " " + category.split(" ")[2],
		  ];
		  item.content = content;
		  item.dates = strDates;
		  return item;
		}
  
		return item;
	  });
	  /*if edit mode*/
	  currentNotes = editedNotes;
	} else {
	  let newTask = {
		id: new Date().toISOString(),
		name,
		created: new Date().toString().split(" ").splice(1, 3).join(" "),
		category: [
		  category.split(" ")[0],
		  category.split(" ")[1] + " " + category.split(" ")[2],
		],
		content: content,
		dates: strDates,
		active: true,
	  };
  	  currentNotes.push(newTask);
	}
  	render(currentNotes, 'showActive');
	hideModal();

	return currentNotes;
  
  }




export { deleteNote, editMode, archiveNote, openArchive, openActive, addNotes };


