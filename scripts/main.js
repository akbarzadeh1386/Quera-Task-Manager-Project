const addBtn = document.getElementById("addBtn");
const emptyState = document.querySelector(".emptyState");
const taskForm = document.getElementById("taskForm");
const closeForm = document.getElementById("closeForm");

addBtn.addEventListener("click", () => {
  addBtn.style.display = "none";
  emptyState.style.display = "none";
  taskForm.style.display = "block";
});

closeForm.addEventListener("click", () => {
  addBtn.style.display = "block";
  emptyState.style.display = "block";
  taskForm.style.display = "none";
});

const tagsBox = document.getElementById("tagsBox");
const openTagsBtn = document.getElementById("openTagsBtn");
const chosenTagBox = document.getElementById("chosenTagBox");
const chosenTagText = document.getElementById("chosenTagText");
const deleteTagBtn = document.getElementById("deleteTagBtn");
const arrowUp = document.getElementById("arrowUp");
const arrowDown = document.getElementById("arrowDown");

openTagsBtn.addEventListener("click", () => {
  if (tagsBox.style.display === "block") {
    tagsBox.style.display = "none";
    closeX.classList.add("hidden");
  } else {
    tagsBox.style.display = "block";
    chosenTagBox.style.display = "none";
    closeX.classList.remove("hidden");
  }
});

tagsBox.addEventListener("click", (e) => {
  if (e.target.dataset.level) {
    chosenTagText.innerText = e.target.innerText;
    chosenTagBox.style.backgroundColor = window.getComputedStyle(
      e.target
    ).backgroundColor;
    chosenTagBox.style.color = window.getComputedStyle(e.target).color;
    chosenTagBox.style.display = "inline-flex";
    tagsBox.style.display = "none";
    openTagsBtn.style.display = "none";
  }
});

deleteTagBtn.addEventListener("click", () => {
  chosenTagBox.style.display = "none";
  tagsBox.style.display = "block";
  openTagsBtn.style.display = "block";
  openTagsBtn.style.display = "inline-flex";
});

const taskTitleInput = document.getElementById("taskTitleInput");
const taskDescInput = document.getElementById("taskDescInput");
const submitTaskBtn = document.getElementById("submitTaskBtn");
const taskList = document.getElementById("taskList");

const priorityLowBtn = document.getElementById("priorityLowBtn");
const priorityMidBtn = document.getElementById("priorityMidBtn");
const priorityHighBtn = document.getElementById("priorityHighBtn");

const todos = [];
let priority = "";
let priorityValue = 0;

priorityLowBtn.onclick = () => {
  priority = "پایین";
  checkForm();
  priorityValue = 1;
};

priorityMidBtn.onclick = () => {
  priority = "متوسط";
  checkForm();
  priorityValue = 2;
};

priorityHighBtn.onclick = () => {
  priority = "بالا";
  checkForm();
  priorityValue = 3;
};
submitTaskBtn.onclick = () => {
  todos.push({
    title: taskTitleInput.value,
    desc: taskDescInput.value,
    priority,
    priorityValue,
  });

  todos.sort((a, b) => b.priorityValue - a.priorityValue);

  renderTodos();
};

function checkForm() {
  submitTaskBtn.disabled = !(
    taskTitleInput.value &&
    taskDescInput.value &&
    priority
  );
}

taskTitleInput.oninput = checkForm;
taskDescInput.oninput = checkForm;

submitTaskBtn.onclick = () => {
  todos.unshift({
    title: taskTitleInput.value,
    desc: taskDescInput.value,
    priority,
  });

  renderTodos();

  taskTitleInput.value = "";
  taskDescInput.value = "";
  priority = "";
  checkForm();
};

function renderTodos() {
  taskList.innerHTML = "";

  todos.forEach((todo) => {
    let badgeClass = "";
    let lineClass = "";

    if (todo.priority === "پایین") {
      badgeClass = "bg-green-100 text-green-700";
      lineClass = "bg-green-500";
    }

    if (todo.priority === "متوسط") {
      badgeClass =
        " bg-yellow-100 text-yellow-600 dark:text-[#302F2D] dark:bg-[#FFAF37]";
      lineClass = "bg-yellow-500";
    }

    if (todo.priority === "بالا") {
      badgeClass = "bg-red-100 text-red-600";
      lineClass = "bg-red-500";
    }

    const card = document.createElement("div");
    card.className =
      "relative flex items-start justify-between bg-white rounded-xl p-4 mb-4 border dark:bg-[#091120]";

    const line = document.createElement("div");
    line.className = `absolute right-0 top-5 h-[70%] w-1 rounded-full ${lineClass}`;

    const menu = document.createElement("button");
    menu.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     fill="currentColor"
     class="size-7 dark:text-white">
  <path fill-rule="evenodd"
    d="M10.5 6a1.5 1.5 0 1 1 3 0
       1.5 1.5 0 0 1-3 0z
       m0 6a1.5 1.5 0 1 1 3 0
       1.5 1.5 0 0 1-3 0z
       m0 6a1.5 1.5 0 1 1 3 0
       1.5 1.5 0 0 1-3 0z"
    clip-rule="evenodd"/>
</svg>
`;
    menu.className = "text-black  dark:text-white";

    const content = document.createElement("div");
    content.className = "flex-1";

    const title = document.createElement("h3");
    title.className = "font-bold text-base pr-3 dark:text-white";
    title.innerText = todo.title;

    const badge = document.createElement("span");
    badge.className = `inline-block px-2 py-1 rounded text-sm mt-2 ${badgeClass}`;
    badge.innerText = todo.priority;

    const desc = document.createElement("p");
    desc.className = "text-sm text-gray-400  mt-3";
    desc.innerText = todo.desc;

    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "w-5 h-5 dark:accent-blue-700";

    content.append(title, badge, desc);
    card.append(check, content, menu, line);
    taskList.append(card);
  });
}

submitTaskBtn.onclick = (e) => {
  e.preventDefault();

  todos.push({
    title: taskTitleInput.value,
    desc: taskDescInput.value,
    priority,
    priorityValue,
  });

  todos.sort((a, b) => b.priorityValue - a.priorityValue);

  renderTodos();

  taskTitleInput.value = "";
  taskDescInput.value = "";
  priority = "";
  checkForm();

  taskForm.style.display = "none";
  addBtn.style.display = "block";
  emptyState.style.display = "none";
};
