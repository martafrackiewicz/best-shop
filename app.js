//burger menu
const $button = document.querySelector(".page-menu__burger");
const $menu = document.querySelector(".page-menu__list");

$button.addEventListener("click", function () {
    $menu.classList.toggle("show");
    this.classList.toggle("open");
});

//calculator

const $form = document.querySelector(".calc__form");

const $summary = document.querySelector(".calc__summary");
const $summaryList = $summary.querySelectorAll(".list__item");

const $totalItem = document.querySelector("#total-price");
const $totalPrice = $totalItem.querySelector(".total__price")


//  products input, orders input

const $productsInput = $form.querySelector("#products");
const $ordersInput = $form.querySelector("#orders");

function selectNumber() {
    console.log(this.value);
    return this.value;
}

$productsInput.addEventListener('change', selectNumber);
$ordersInput.addEventListener('change', selectNumber);


//select package dropdown

const $packageInput = $form.querySelector("#package");
const $selectPackageInput = $packageInput.firstElementChild;
const $selectPackageDropdown = $selectPackageInput.nextElementSibling;
const $selectElements = $selectPackageDropdown.children;

function toggleDropdown() {
    $packageInput.classList.toggle('open');
    $selectPackageInput.classList.toggle('open');
    $selectPackageDropdown.classList.toggle('open');
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1); //prototyp do stringa, wielka pierwsza litera
}

$packageInput.addEventListener('click', toggleDropdown); // otwieram dropdown

let elements = Array.from($selectElements);
elements.forEach(function (element) {
    element.addEventListener('click', function() {
        console.log('element', element)
        let option = this.dataset.value; //wyciągam którą opcję kliknięto
        $selectPackageInput.innerText = this.dataset.value.capitalize();
        if (option === 'basic') {
            console.log('hurra');
        } else if (option === 'professional') {
            console.log('hurra2');
        } else {
            console.log('hurra3');
        }
    })
})

// checkboxes

const $accountingCheckbox =$form.querySelector("#accounting");
const $terminalCheckbox =$form.querySelector("#terminal");

$accountingCheckbox.addEventListener('change', function() {
    if (this.checked) {
        console.log('account checked');
    }
})

$terminalCheckbox.addEventListener('change', function() {
    if (this.checked) {
        console.log('terminal checked')
    }
})
