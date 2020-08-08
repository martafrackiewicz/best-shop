const button = document.querySelector(".page-menu__burger");
const menu = document.querySelector(".page-menu__list");

button.addEventListener("click", function () {
    menu.classList.toggle("show");
    this.classList.toggle("open");
});