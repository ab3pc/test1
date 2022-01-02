/* ==============DATA================== */
let notes = [
  {
    id: 1,
    name: "Shopping list",
    created: "May 05, 2021",
    category: ["Task", "fas fa-shopping-cart"],

    content: "Some Text",
    dates: "3/5/2021",
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
    created: "Jun 02, 2021",
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
    category: ["Task", "fas fa-shopping-cart"],
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

//let createNote = document.querySelector("#create__note");
let container = document.querySelector("#container");
let table = document.querySelector("#table__body");
let tableResult = document.querySelector("#table__result");
let form = document.querySelector("#noteForm");
let modal = document.querySelector("#modal");
//let edit = document.querySelector("#btn__edit");




let activeTask = notes.filter((item) => item.active);
//let activeTask = notes.sort((a,b) => a.created > b.created ? 1: -1);


render(activeTask);

//RENDER//
function render(list) {
  removeAll();
  let activeTask = list;
 
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
			<i class="btn__archive fas fa-archive" id ="btn__archive"></i>
			<i class="btn__delete fas fa-trash-alt" id ="btn__delete"></i>
	
		</td>`
    );
    table.append(row);
   
  }
  
  renderResult(list)

}

function renderResult(list) {
  removeAllRes() 

/* Variables for table__result*/
let notesCountActive = [];
let notesCountArc = [];

/* Variables for table__result*/
  let catTask = notes.filter(item => item.category[0] === "Task");
  notesCountActive[0] = catTask.filter(item => item.active).length
  notesCountArc[0] = catTask.filter(item => !item.active).length;

  let catRandom = notes.filter(item => item.category[0] === "Random");
  notesCountActive[1] = catRandom.filter(item => item.active).length
  notesCountArc[1] = catRandom.filter(item => !item.active).length;

  let catQuote = notes.filter(item => item.category[0] === "Quote");
  notesCountActive[2] = catQuote.filter(item => item.active).length
  notesCountArc[2] = catQuote.filter(item => !item.active).length;

  let catIdea = notes.filter(item => item.category[0] === "Idea");
  notesCountActive[3] = catIdea.filter(item => item.active).length
  notesCountArc[3] = catIdea.filter(item => !item.active).length;


   for(let i=0; i < category.length; i++) {
   let row = document.createElement("tr");

   row.insertAdjacentHTML(
     "beforeend",
     `<th colspan="2" class="text-start fs-6" scope="row">
     <i class="${category[i].icon} table__ico"></i>
     <span>${category[i].name}</span> 
   </th>
   <td colspan="2">${notesCountActive[i]}</td>
   <td colspan="2">${notesCountArc[i]}</td>`
   );
   tableResult.append(row);
 }

}


//RENDER//

//CLEAR TABLE//
function removeAll() {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}
//CLEAR TABLE//

//CLEAR RES__TABLE//
function removeAllRes() {
  while (tableResult.firstChild) {
    tableResult.removeChild(tableResult.firstChild);
  }
}
//CLEAR RES__TABLE//




container.addEventListener("click", (e) => {
  switch (e.target.id) {
       case "btn__edit": {

      console.log(e.target.parentNode.parentNode.id)
      break;
    }
    case "btn__delete": {
      deleteNote(e.target.parentNode.parentNode.id)
       break;
    }
    case "btn__archive": {
      archiveNote(e.target.parentNode.parentNode.id)
       break;
    }
    case "openArchive": {
      openArchive();
       break;
    }
    case "showAll": {
      openActive();
       break;
    }

    default:
      break;
  }
});





/*================= FORM Add NOTES ======================== */
form.addEventListener("submit", addNotes);

function addNotes(e) {
  e.preventDefault();
  const { category, name, content } = Object.fromEntries(
    new FormData(e.target).entries()
  );

  /* Parse dates*/
  let strDates = ''
  let searchValue = /(\d{1,2}\/\d{1,2}\/\d{4})/g;

  let dates = content.match(searchValue);

    switch(true) {
      case (dates === null): {
         break;
      }
      case (dates.length === 1): {
        strDates = dates[0];
        break;
      }
      case (dates.length > 1): {
        strDates = dates.join(', ');
        break;
      }

      default: break;
    }
  
   
/*================================= */

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

  notes.push(newTask);
  activeTask = notes.filter((item) => item.active);
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

    render(activeTask);
  }
/*================= Delete NOTE ======================== */




/*================= Archive NOTE ======================== */
let archiveNote = (id) => {

  let newSet = activeTask.map(item => {

    if(item.id == id) {
      item.active = !item.active
        }
    return item

  })
  
  let side = newSet.find(item => item.id == id);

  if(side.active) {
      activeTask = newSet.filter((item) => item.active === false);
      console.log(activeTask)
     render(activeTask);
 
  } else {
    activeTask = newSet.filter((item) => item.active);
    console.log(activeTask)
    render(activeTask);
  }
 
}
/*================= Archive NOTE ======================== */

/*================= Open Archive NOTE ======================== */
let openArchive = () => {
  let acrhiveSet = notes.filter(item => item.active === false);
  activeTask = acrhiveSet;
  render(activeTask)

  
}
let openActive = () => {
  let acrhiveSet = notes.filter(item => item.active);
  activeTask = acrhiveSet;
  render(activeTask)

  
}
/*================= Open NOTE ======================== */
