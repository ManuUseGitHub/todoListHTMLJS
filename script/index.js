const form = document.getElementById("myForm");
let list = []; // ["Task 1", "task 2"];
handleDelete = (i, cb) => {
	list = list.filter((x, j) => j != i);
	if (cb) cb();
};

function playAnimation(animationName, duration = 50) {
	const app = document.getElementById("app");
	app.classList.add(animationName);
	setTimeout(() => {
		app.classList.remove(animationName);
	}, duration);
}

refresh = () => {
	const myNode = document.getElementById("list");
	myNode.innerHTML = "";

	if (!list.length) {
		document.getElementById("app").classList.add("circled");
	} else {
		document.getElementById("app").classList.remove("circled");
	}

	list.forEach((e, i) => {
		const node = document.createElement("li");

		const textnode = document.createTextNode(e);
		const taskName = document.createElement("div");
		const actions = document.createElement("div");
		const deleteButton = document.createElement("button");
		const buttonText = document.createTextNode("x");

		taskName.className = "task-name col";
		actions.className = "actions";

		deleteButton.className = "btn btn-danger";
		deleteButton.appendChild(buttonText);
		taskName.appendChild(textnode);
		actions.appendChild(deleteButton);
		node.appendChild(taskName);
		node.appendChild(actions);

		deleteButton.addEventListener("click", () => {
			handleDelete(i, () => {
				playAnimation("reverse-tilted");
				refresh();
			});
		});
		document.getElementById("list").appendChild(node);
	});
};

function sendData() {
	// Associate the FormData object with the form element
	const formData = Object.fromEntries(new FormData(form));
	if (formData.element) {
		list.push(formData.element);
		refresh();

		playAnimation("tilted");
		const input = document.querySelectorAll('*[name = "element"]')[0];
		input.value = "";
	}else {
        playAnimation("errored",700);
        playAnimation("rocking",800);
    }
}

function handleForm(event) {
	event.preventDefault();
	sendData();
}
form.addEventListener("submit", handleForm);
refresh();
