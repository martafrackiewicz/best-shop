//burger menu
const $button = document.querySelector(".page-menu__burger");
const $menu = document.querySelector(".page-menu__list");

$button.addEventListener("click", function () {
    $menu.classList.toggle("show");
    this.classList.toggle("open");
});

//calculator

const $form = document.querySelector(".calc__form");

//  products input, orders input

const $productsInput = $form.querySelector("#products");
const $ordersInput = $form.querySelector("#orders");

const $summary = document.querySelector(".calc__summary");


function displaySummaryValue(quantity, selector, price) {
    const $item = $summary.querySelector(selector);
    if (quantity >= 0 && quantity !== '') {
        const $itemCalc = $item.querySelector('.item__calc');
        const $itemPrice = $item.querySelector('.item__price');
        $itemCalc.innerText = `${quantity} * $${price}`;
        const result = (quantity * price).toFixed(2);
        $itemPrice.innerText = `$${result}`;
        $item.classList.add('open');
    } else {
        $item.classList.remove('open');
    }
}

$productsInput.addEventListener('change', function(e) {
    displaySummaryValue(this.value, '[data-id=products]', 0.5)
});
$ordersInput.addEventListener('change', function(e) {
    displaySummaryValue(e.target.value, '[data-id=orders]', 0.8)
});


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

$packageInput.addEventListener('click', toggleDropdown); // otwieram dropdown

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1); //prototyp do stringa, wielka pierwsza litera
}

function displayPackage() {
    const $item = $summary.querySelector('[data-id=package]');
    $item.classList.add('open');
    const $itemCalc = $item.querySelector('.item__calc');
    const $itemPrice = $item.querySelector('.item__price');
    const option = this.dataset.value.capitalize();
    $selectPackageInput.innerText = option;
    $itemCalc.innerText = option;
    if (option === 'Basic') {
        $itemPrice.innerText = '$0';
    } else if (option === 'Professional') {
        $itemPrice.innerText = '$25';
    } else {
        $itemPrice.innerText = '$60';
    }
}

let elements = Array.from($selectElements);
elements.forEach(function (element) {
    element.addEventListener('click', displayPackage)
})

// checkboxes

const $accountingCheckbox =$form.querySelector("#accounting");
const $terminalCheckbox =$form.querySelector("#terminal");

$accountingCheckbox.addEventListener('change', function() {
    const $item = $summary.querySelector('[data-id=accounting]');
    $item.classList.toggle('open');
})

$terminalCheckbox.addEventListener('change', function() {
    const $item = $summary.querySelector('[data-id=terminal]');
    $item.classList.toggle('open');
})


// total

const $totalItem = document.querySelector("#total-price");
const $totalPrice = $totalItem.querySelector(".total__price")

