import { notes, container, form} from "./variables.js";
import { render } from "./components/table.js";
import { deleteNote, editMode, archiveNote, openArchive, openActive, addNotes } from "./actions.js";
import { openModal } from "./utilites.js";


let currentNotes = notes;
render(currentNotes, 'showActive');

/* ========== addEventListener for buttons ==============*/
container.addEventListener("click", (e) => {

  switch (e.target.id) {
    case "btn__edit": {
      editMode(e.target.parentNode.parentNode.id, currentNotes);
      openModal();

      break;
    }

    case "btn__delete": {
      currentNotes = deleteNote(e.target.parentNode.parentNode.id, currentNotes);
      break;
    }

    case "btn__archive": {
      currentNotes = archiveNote(e.target.parentNode.parentNode.id, currentNotes);
      break;
    }

    case "openArchive": {
      openArchive(currentNotes);
      break;
    }

    case "showAll": {
      openActive(currentNotes);
      break;
    }

    default:
      break;
  }
});

/*=================addEventListener for create notes ======================== */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { category, name, content, id } = Object.fromEntries(
    new FormData(e.target).entries()
  );
  currentNotes = addNotes(category, name, content, id, currentNotes);

});
