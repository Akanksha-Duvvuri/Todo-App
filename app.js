let add = document.querySelector(".add");
let inp = document.querySelector("input");
let ul = document.querySelector("ul");

function getTodos() {
    return JSON.parse(sessionStorage.getItem("todos")) || [];
}

function saveTodos(todos){
    sessionStorage.setItem("todos", JSON.stringify(todos));
}


// add.addEventListener("click", function() {
//     let item = document.createElement("div");
//     let li = document.createElement("li");
//     let btn = document.createElement("button");
//     let dltBtn = document.createElement("button");

//     item.appendChild(btn);
//     item.appendChild(li);

//     item.appendChild(dltBtn);
//     li.innerText = inp.value;
//     dltBtn.innerText = "x";

//     btn.classList.add("btn");
//     dltBtn.classList.add("delete")
//     item.classList.add("item");

//     ul.appendChild(item);
//     inp.value = "";

//     btn.addEventListener("click", function () {
//         item.classList.toggle("checked");
//     });

//     dltBtn.addEventListener("click", function () {
//         item.remove();
//     });
// });


function renderTodos() {
    ul.innerHTML = "";
    let todos = getTodos();

    for (let todo of todos) {
        let item = document.createElement("div");
        let li = document.createElement("li");
        let btn = document.createElement("button");
        let dltBtn = document.createElement("button");

        item.classList.add("item");
        btn.classList.add("btn");
        dltBtn.classList.add("delete");

        li.innerText = todo.text;
        dltBtn.innerText = "x";

        if (todo.done) item.classList.add("checked");

        btn.addEventListener("click", function () {
            todo.done = !todo.done;
            saveTodos(todos);
            item.classList.toggle("checked");
        });

        dltBtn.addEventListener("click", function () {
            let newTodos = todos.filter(t => t !== todo);
            saveTodos(newTodos);
            item.remove();
        });

        item.appendChild(btn);
        item.appendChild(li);
        item.appendChild(dltBtn);
        ul.appendChild(item);
    }
}


add.addEventListener("click", function () {
    if (inp.value.trim() === "") return;

    let todos = getTodos();
    todos.push({ text: inp.value, done: false });
    saveTodos(todos);

    inp.value = "";
    renderTodos();
});

renderTodos();

