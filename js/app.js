/* ==============DATA================== */
let notes = [
  {
    id: 1,
    name: "Shopping list",
    created: "May 05, 2021",
    category: ["Task", "fas fa-shopping-cart"],

    content: "Some Text",
    dates: "3/5/2021 5/05/2021",
    active: true,
  },
  {
    id: 2,
    name: "The theory of evolution",
    created: "May 07, 2021",
    category: ["Random", "fas fa-brain"],
    content: "The theory of evolu...",
    dates: "",
    active: true,
  },
  {
    id: 3,
    name: "New Feature",
    created: "Jun 01, 2021",
    category: ["Idea", "far fa-lightbulb"],
    content: "The theory of evolu...",
    dates: "",
    active: true,
  },
  {
    id: 4,
    name: "Bruce Lee",
    created: "Aprill 01, 1996",
    category: ["Quote", "fas fa-quote-right"],
    content: "Be like water !",
    dates: "",
    active: true,
  },
  {
    id: 5,
    name: "Books",
    created: "Jun 03, 2021",
    category: ["Task", "fas fa-shopping-cart"],
    content: "Buy some about JS",
    dates: "",
    active: true,
  },
  {
    id: 6,
    name: "Archived",
    created: "Jan 01, 2021",
    category: ["Random", "fal fa-lightbulb-exclamation"],
    content: "I haven't no idea :)",
    dates: "",
    active: false,
  },
];

let category = [
  {
    name: "Task",
    icon: "fas fa-shopping-cart",
  },
  {
    name: "Random",
    icon: "fas fa-brain",
  },
  {
    name: "Quote",
    icon: "fas fa-quote-right",
  },
  {
    name: "Idea",
    icon: "far fa-lightbulb",
  },
];

let createNote = document.querySelector("#create__note");
let container = document.querySelector("#container");
let table = document.querySelector("#table__body");
let form = document.querySelector("#noteForm");
let modal = document.querySelector("#modal");
let edit = document.querySelector("#btn__edit");




let activeTask = notes.filter((item) => item.active);
render(activeTask);

//RENDER//
function render(list) {
  removeAll();
  let activeTask = list;
  console.log(activeTask);
  for (key in activeTask) {
    let row = document.createElement("tr");
    row.setAttribute("id", `${activeTask[key].id}`);

    row.insertAdjacentHTML(
      "beforeend",
      `<th class="text-start fs-6" scope="row"><i class="table__ico ${activeTask[key].category[1]}"></i><span>${activeTask[key].name}</span></th><td>${activeTask[key].created}</td>
		<td>${activeTask[key].category[0]}</td>
		<td>${activeTask[key].content}</td>
		<td>${activeTask[key].dates}</td>
		<td>
			<i class="btn__edit fas fa-pencil-alt" id="btn__edit"></i>
			<i class="btn__edit fas fa-archive"></i>
			<i class="btn__delete fas fa-trash-alt" id ="btn__delete"></i>
	
		</td>`
    );

    table.append(row);
  }
}
//RENDER//

//CREAR TABLE//
function removeAll() {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

container.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "create__note": {
      
      break;
    }
    case "btn__edit": {

      console.log(e.target.parentNode.parentNode.id)
      break;
    }
    case "btn__delete": {
      deleteNote(e.target.parentNode.parentNode.id)
      //console.log(e.target.parentNode.parentNode.id)
      break;
    }

    default:
      break;
  }
});

//CREAR TABLE//



/*================= FORM Add NOTES ======================== */
form.addEventListener("submit", addNotes);

function addNotes(e) {
  e.preventDefault();
  const { category, name, content } = Object.fromEntries(
    new FormData(e.target).entries()
  );

  let newTask = {
    id: new Date().toISOString(),
    name,
    created: new Date().toString().split(" ").splice(1, 3).join(" "),
    category: [
      category.split(" ")[0],
      category.split(" ")[1] + " " + category.split(" ")[2],
    ],
    content: content,
    dates: "",
    active: true,
  };

  activeTask.push(newTask);
  
  render(activeTask);
  let modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();
  form.reset();
}
/*================= FORM Add NOTES ======================== */

/*================= Delete NOTE ======================== */
  let deleteNote = (id) => {
    console.log(id)
    let newSet = activeTask.filter((item) => item.id !=id);
    activeTask = newSet;
    
    console.log(activeTask)
    render(activeTask);
  }
/*================= Delete NOTE ======================== */

