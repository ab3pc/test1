import { category, tableResult, table } from "../variables.js";

const mainTable = (activeTask) => {
	for (let key in activeTask) {
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
}

const resultTable = (active, archive) => {
	for (let i = 0; i < category.length; i++) {
		let row = document.createElement("tr");
			row.insertAdjacentHTML(
		  "beforeend",
		  `<th colspan="2" class="text-start fs-6" scope="row">
		   <i class="${category[i].icon} table__ico"></i>
		   <span>${category[i].name}</span> 
		 </th>
		 <td colspan="2">${active[i]}</td>
		 <td colspan="2">${archive[i]}</td>`
		);
		tableResult.append(row);
	  }
}

export {mainTable, resultTable}