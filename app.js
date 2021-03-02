
const productPrice = 1;
const orderPrice = 1;
const packagePrice = {
    basic: 0,
    professional: 25,
    premium: 60
}
const accountingPrice = 20;
const terminalPrice = 10;


let totalPrice = 0;
let productsResult = 0;
let ordersResult = 0;
let packageResult = 0;
let accountingResult = 0;
let terminalResult = 0;


//burger menu
const $button = document.querySelector(".page-menu__burger");
const $menu = document.querySelector(".page-menu__list");

$button.addEventListener("click", function () {
    $menu.classList.toggle("show_menu");
    this.classList.toggle("open_menu");
});

//calculator

const $form = document.querySelector(".calc__form");

const $summaryTotal = document.querySelector(".summary__total");
const $totalPrice = $summaryTotal.querySelector(".total__price");

function setCurrency(number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1); //prototyp do stringa, wielka pierwsza litera
}

//total

function openTotal() {
    $totalPrice.innerText = setCurrency(0);
    $summaryTotal.classList.add('open');
}

openTotal();

function updateTotalPrice() {
    totalPrice = productsResult + ordersResult + packageResult + accountingResult + terminalResult;
    $totalPrice.innerText = setCurrency(totalPrice);
}


//  products input, orders input

const $productsInput = $form.querySelector("#products");
const $ordersInput = $form.querySelector("#orders");

const $summary = document.querySelector(".calc__summary");


function calcSummaryResult(quantity, price) {
    return (quantity * price);
}

function displaySummaryResult(selector, result, quantity, price) {
    const $item = $summary.querySelector(selector);
    if (quantity >= 0 && quantity !== '') {
        const $itemCalc = $item.querySelector('.item__calc');
        const $itemPrice = $item.querySelector('.item__price');
        $itemCalc.innerText = `${quantity} * ${setCurrency(price)}`;
        $itemPrice.innerText = setCurrency(result);
        $item.classList.add('open');
    } else {
        $item.classList.remove('open');
    }
}

$productsInput.addEventListener('change', function(e) {
    const result = calcSummaryResult(this.value, productPrice);
    productsResult = result;
    updateTotalPrice();
    displaySummaryResult('[data-id=products]', result, this.value, productPrice);
});


$ordersInput.addEventListener('change', function(e) {
    const result = calcSummaryResult(this.value, orderPrice);
    ordersResult = result;
    updateTotalPrice();
    const input = e.target; // bez zmiennej podkreśla value
    displaySummaryResult( '[data-id=orders]', result, input.value, orderPrice);
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

function displayPackage() {
    const $item = $summary.querySelector('[data-id=package]');
    $item.classList.add('open');
    const $itemCalc = $item.querySelector('.item__calc');
    const $itemPrice = $item.querySelector('.item__price');
    const option = this.dataset.value.capitalize();
    $selectPackageInput.innerText = option;
    $itemCalc.innerText = option;
    $itemPrice.innerText = setCurrency(packagePrice[this.dataset.value]);
}

let elements = Array.from($selectElements);
elements.forEach(function (element) {
    element.addEventListener('click', function () {
        displayPackage.bind(this)();
        packageResult = packagePrice[this.dataset.value];
        updateTotalPrice();
    })
})

// checkboxes

const $accountingCheckbox =$form.querySelector("#accounting");
const $terminalCheckbox =$form.querySelector("#terminal");

$accountingCheckbox.addEventListener('change', function() {
    const $item = $summary.querySelector('[data-id=accounting]');
    const $itemPrice = $item.querySelector('.item__price');
    $itemPrice.innerText = setCurrency(accountingPrice);
    $item.classList.toggle('open');
    if (this.checked) {
        accountingResult = accountingPrice;
    } else {
        accountingResult = 0;
    }
    updateTotalPrice();
})

$terminalCheckbox.addEventListener('change', function() {
    const $item = $summary.querySelector('[data-id=terminal]');
    const $itemPrice = $item.querySelector('.item__price');
    $itemPrice.innerText = setCurrency(terminalPrice);
    $item.classList.toggle('open');
    if (this.checked) {
        terminalResult = terminalPrice;
    } else {
        terminalResult = 0;
    }
    updateTotalPrice();
})

//return to top arrow
const $returnToTop = document.querySelector(".return-to-top");

const scrollFunc = () => {
    let y = window.scrollY;
    console.log(y)
    if (y > 3200) {
        $returnToTop.classList.remove("hide");
        $returnToTop.classList.add("show");
    } else {
        $returnToTop.classList.remove("show");
        $returnToTop.classList.add("hide");
    }
};

window.addEventListener("scroll", scrollFunc);

$returnToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
})
