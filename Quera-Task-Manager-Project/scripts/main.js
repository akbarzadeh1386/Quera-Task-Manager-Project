// Handling hamburger menu and x mark btn
const hamburgerBtn = document.getElementById("hamburgerMenu");
const sidebarCloseBtn = document.getElementById("closeBtn");
const mobileSidebar = document.getElementById("sideBar");
const overlay = document.getElementById("overlay");

if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", () => {
    mobileSidebar.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
}
if (sidebarCloseBtn) {
  sidebarCloseBtn.addEventListener("click", () => {
    mobileSidebar.classList.add("hidden");
    overlay.classList.add("hidden");
  });
}

function closeSidebar() {
  overlay.classList.add("hidden");
}

// Get automatic date
document.addEventListener("DOMContentLoaded", () => {
  const dateElements = document.querySelectorAll(".today-date");
  const today = new Date();

  const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).formatToParts(today);

  const get = (type) => parts.find((p) => p.type === type)?.value;

  const day = get("day");
  const month = get("month");
  const year = get("year");
  const weekday = get("weekday");

  const finalDate = `امروز ${day} ${month} ${year} ${weekday}`;
  dateElements.forEach((el) => {
    el.textContent = finalDate;
    el.setAttribute("dir", "rtl");
  });
});


const html = document.documentElement;
const lightBtn = document.getElementById("lightBtn");
const darkBtn = document.getElementById("darkBtn");
const switchBg = document.getElementById("switchBg");

function setTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
    if (switchBg) switchBg.style.transform = "translateX(-90%)";
  } else {
    html.classList.remove("dark");
    if (switchBg) switchBg.style.transform = "translateX(0)";
  }
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

if (lightBtn) lightBtn.addEventListener("click", () => setTheme("light"));
if (darkBtn) darkBtn.addEventListener("click", () => setTheme("dark"));


const STORAGE_KEY = "quera_tasks_v2";

const openAddTaskBtn = document.getElementById("openAddTaskBtn");
const addTaskSection = document.getElementById("addTaskSection");
const closeAddTaskBtn = document.getElementById("closeAddTaskBtn");
const addTaskBtn = document.getElementById("addTaskBtn");

const addTitle = document.getElementById("addTitle");
const addDesc = document.getElementById("addDesc");
const addTagsBtn = document.getElementById("addTagsBtn");
const addPriorityPanel = document.getElementById("addPriorityPanel");

const todayList = document.getElementById("todayList");
const doneList = document.getElementById("doneList");
const todayEmpty = document.getElementById("todayEmpty");
const doneCount = document.getElementById("doneCount");

const editTemplate = document.getElementById("editTemplate");

let tasks = loadTasks();
let addPriority = "متوسط";

// --- utils ---
function uid() {
  return String(Date.now()) + "_" + Math.random().toString(16).slice(2);
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function priorityMeta(priority) {
  if (priority === "بالا") {
    return {
      bar: "bg-red-500",
      badge: "bg-red-100 text-red-600",
      label: "بالا",
    };
  }
  if (priority === "پایین") {
    return {
      bar: "bg-green-500",
      badge: "bg-green-100 text-green-600",
      label: "پایین",
    };
  }
  return {
    bar: "bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-600",
    label: "متوسط",
  };
}

function closeAllMenus() {
  document.querySelectorAll("[data-menu]").forEach((m) => m.classList.add("hidden"));
}

function removeAllInlineEdits() {
  document.querySelectorAll("[data-inline-edit]").forEach((el) => el.remove());
}


function seedFromHtmlIfEmpty() {
  if (tasks.length > 0) return;

  const cards = Array.from(document.querySelectorAll("#todayList [data-task-card]"));
  const doneCards = Array.from(document.querySelectorAll("#doneList [data-done-card]"));

  const fromCard = (card, done) => {
    const title = card.querySelector("[data-title]")?.textContent?.trim() || "";
    const desc = card.querySelector("[data-desc]")?.textContent?.trim() || "";
    const pr = card.querySelector("[data-priority-badge]")?.getAttribute("data-priority") || "متوسط";
    return { id: uid(), title, desc, priority: pr, done: !!done, createdAt: Date.now() };
  };

  tasks = [
    ...cards.map((c) => fromCard(c, false)),
    ...doneCards.map((c) => {
      const title = c.querySelector("p")?.textContent?.trim() || "";
     
      return { id: uid(), title, desc: "", priority: "متوسط", done: true, createdAt: Date.now() };
    }),
  ];

  saveTasks();
}

function buildTodayCard(task) {
  const meta = priorityMeta(task.priority);

  const wrapper = document.createElement("div");
  wrapper.className =
    "bg-white p-4 relative rounded-xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.15)] mb-5 dark:bg-[#091120]";
  wrapper.setAttribute("data-task-card", "");
  wrapper.setAttribute("data-task-id", task.id);

  wrapper.innerHTML = `
    <button class="absolute left-3" type="button" data-action="menu">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="size-7 dark:text-white">
        <path fill-rule="evenodd"
          d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
          clip-rule="evenodd" />
      </svg>
    </button>

    <div
      class="absolute hidden flex flex-nowrap items-center gap-2 left-7 bg-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.15)] rounded-md px-1 py-1 mt-6 dark:bg-gray-800 whitespace-nowrap"
      data-menu>
      <button type="button" data-action="delete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="size-5 dark:text-white">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
      <main class="text-[#EBEDEF] dark:text-gray-700">|</main>
      <button type="button" data-action="edit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="size-5 dark:text-white">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </button>
    </div>

    <input type="checkbox" class="w-5 h-5 dark:accent-blue-700" data-action="toggle" ${task.done ? "checked" : ""} />

    <span class="${meta.bar} absolute right-0 h-[80%] w-1 rounded-full" data-priority-bar></span>

    <div class="pr-8 -mt-7">
      <h3 class="text-base dark:text-white" data-title></h3>

      <span class="inline-block mt-2 px-2 py-1 text-sm rounded-md ${meta.badge}"
        data-priority-badge data-priority="${meta.label}">${meta.label}</span>

      <p class="mt-3 text-gray-400" data-desc></p>
    </div>
  `;

  wrapper.querySelector("[data-title]").textContent = task.title;
  wrapper.querySelector("[data-desc]").textContent = task.desc;

  return wrapper;
}

function buildDoneCard(task) {
  const meta = priorityMeta(task.priority);

  const wrapper = document.createElement("div");
  wrapper.className =
    "bg-white p-4 relative rounded-xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.15)] dark:bg-[#091120] mb-5";
  wrapper.setAttribute("data-done-card", "");
  wrapper.setAttribute("data-task-id", task.id);

  wrapper.innerHTML = `
    <button class="absolute left-3" type="button" data-action="menu">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="size-7 dark:text-white">
        <path fill-rule="evenodd"
          d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
          clip-rule="evenodd" />
      </svg>
    </button>

    <input type="checkbox" checked class="w-5 h-5 accent-blue-600 ml-auto" data-action="toggle" />

    <span class="${meta.bar} absolute right-0 h-[70%] w-1 rounded-full"></span>

    <div class="pr-8 -mt-7">
      <p class="flex px-2 text-right text-lg line-through decoration-1 dark:text-white"></p>
    </div>
  `;

  wrapper.querySelector("p").textContent = task.title;
  return wrapper;
}

function render() {
  const order = { "بالا": 0, "متوسط": 1, "پایین": 2 };

  const today = tasks
    .filter((t) => !t.done)
    .sort((a, b) => (order[a.priority] ?? 99) - (order[b.priority] ?? 99));

  const done = tasks.filter((t) => t.done);

  todayList.innerHTML = "";
  doneList.innerHTML = "";

  today.forEach((t) => todayList.appendChild(buildTodayCard(t)));
  done.forEach((t) => doneList.appendChild(buildDoneCard(t)));

  if (todayEmpty) todayEmpty.classList.toggle("hidden", today.length !== 0);
  if (doneCount) doneCount.textContent = `${done.length} تسک انجام شده است.`;
}


function openAddSection() {
  if (!addTaskSection) return;
  addTaskSection.classList.remove("hidden");
}

function closeAddSection() {
  if (!addTaskSection) return;
  addTaskSection.classList.add("hidden");
  if (addPriorityPanel) addPriorityPanel.classList.add("hidden");
  if (addTitle) addTitle.value = "";
  if (addDesc) addDesc.value = "";
  addPriority = "متوسط";
}

if (openAddTaskBtn) openAddTaskBtn.addEventListener("click", openAddSection);
if (closeAddTaskBtn) closeAddTaskBtn.addEventListener("click", closeAddSection);


if (addTagsBtn && addPriorityPanel) {
  addTagsBtn.addEventListener("click", () => {
    addPriorityPanel.classList.toggle("hidden");
  });
}

document.addEventListener("click", (e) => {
  const pBtn = e.target.closest("[data-add-priority]");
  if (!pBtn) return;
  addPriority = pBtn.getAttribute("data-add-priority") || "متوسط";
  addPriorityPanel.classList.add("hidden");
});

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => {
    const title = (addTitle?.value || "").trim();
    const desc = (addDesc?.value || "").trim();
    if (!title) return;

    const newTask = {
      id: uid(),
      title,
      desc,
      priority: addPriority,
      done: false,
      createdAt: Date.now(),
    };

    tasks.unshift(newTask);
    saveTasks();
    render();
    closeAddSection();
  });
}


function openInlineEdit(taskId) {
  if (!editTemplate) return;

  removeAllInlineEdits();

  const card = document.querySelector(`[data-task-id="${taskId}"]`);
  const task = tasks.find((t) => t.id === taskId);
  if (!card || !task) return;

  const clone = editTemplate.cloneNode(true);
  clone.classList.remove("hidden");
  clone.removeAttribute("id");
  clone.setAttribute("data-inline-edit", "");
  clone.setAttribute("data-edit-for", taskId);

  const titleInput = clone.querySelector("#editTitle");
  const descInput = clone.querySelector("#editDesc");
  const priorityLabel = clone.querySelector("#editPriorityLabel");
  const priorityPanel = clone.querySelector("#editPriorityPanel");
  const priorityClose = clone.querySelector("#editPriorityClose");
  const saveBtn = clone.querySelector("#saveEditBtn");

  
  titleInput.value = task.title;
  descInput.value = task.desc;
  priorityLabel.textContent = task.priority;

  
  clone.setAttribute("data-pending-priority", task.priority);

  
  priorityLabel.parentElement.addEventListener("click", () => {
    priorityPanel.classList.toggle("hidden");
  });
  priorityClose.addEventListener("click", () => {
    priorityPanel.classList.add("hidden");
  });

  
  priorityPanel.addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-edit-priority]");
    if (!btn) return;
    const p = btn.getAttribute("data-edit-priority") || "متوسط";
    clone.setAttribute("data-pending-priority", p);
    priorityLabel.textContent = p;
    priorityPanel.classList.add("hidden");
  });

 
  saveBtn.addEventListener("click", () => {
    const newTitle = titleInput.value.trim();
    const newDesc = descInput.value.trim();
    if (!newTitle) return;

    const pendingP = clone.getAttribute("data-pending-priority") || task.priority;

    task.title = newTitle;
    task.desc = newDesc;
    task.priority = pendingP;

    saveTasks();
    render();
  });

 
  card.insertAdjacentElement("afterend", clone);
}


document.addEventListener("click", (e) => {
  const menuBtn = e.target.closest('[data-action="menu"]');
  const editBtn = e.target.closest('[data-action="edit"]');
  const deleteBtn = e.target.closest('[data-action="delete"]');
  const toggle = e.target.closest('[data-action="toggle"]');

  const card = e.target.closest("[data-task-id]");
  const taskId = card?.getAttribute("data-task-id");

  if (menuBtn) {
    const menu = card?.querySelector("[data-menu]");
    if (!menu) return;

    const wasHidden = menu.classList.contains("hidden");
    closeAllMenus();
    if (wasHidden) menu.classList.remove("hidden");
    return;
  }

  if (deleteBtn && taskId) {
    tasks = tasks.filter((t) => t.id !== taskId);
    saveTasks();
    render();
    return;
  }

  if (editBtn && taskId) {
    closeAllMenus();
    openInlineEdit(taskId);
    return;
  }

  if (toggle && taskId) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    task.done = !task.done;
    saveTasks();
    render();
    return;
  }
});


document.addEventListener("click", (e) => {
  const insideMenu = e.target.closest("[data-menu]");
  const menuBtn = e.target.closest('[data-action="menu"]');
  if (!insideMenu && !menuBtn) closeAllMenus();

  const insideEdit = e.target.closest("[data-inline-edit]");
  const editBtn = e.target.closest('[data-action="edit"]');
  if (!insideEdit && !editBtn) removeAllInlineEdits();
});


seedFromHtmlIfEmpty();
render();
