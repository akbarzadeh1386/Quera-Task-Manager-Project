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

