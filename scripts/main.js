
// Handling hamburger menu and x mark btn 


const hamburgerBtn = document.getElementById("hamburgerMenu");
const sidebarCloseBtn = document.getElementById("closeBtn");
const mobileSidebar = document.getElementById("sideBar");
const overlay = document.getElementById("overlay");

hamburgerBtn.addEventListener("click", () => {
    mobileSidebar.classList.remove("hidden");
    overlay.classList.remove("hidden");

})
sidebarCloseBtn.addEventListener("click", () => {
    mobileSidebar.classList.add("hidden");
    overlay.classList.add("hidden");
})

function closeSidebar() {

    overlay.classList.add("hidden");
}


//   Get automatic date

document.addEventListener("DOMContentLoaded", () => {
    const dateElements = document.querySelectorAll(".today-date");

    const today = new Date();

    const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).formatToParts(today);

    const get = type => parts.find(p => p.type === type)?.value;

    const day = get("day");
    const month = get("month");
    const year = get("year");
    const weekday = get("weekday");

    const finalDate = `امروز ${day} ${month} ${year} ${weekday}`;
    dateElements.forEach(el => {
        el.textContent = finalDate;
        el.setAttribute("dir", "rtl");
    });
});

