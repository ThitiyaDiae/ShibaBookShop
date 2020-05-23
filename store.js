if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("shop-header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function purchaseClicked() {

    var cash = prompt('cash')
    if(cash==total){
        alert('Thank you for your purchase')
    }else{
        var change = cash - total()
        alert('change: '+change+'B'+'\nThank you for your purchase')
    }
    // alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var discount = 0

    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('B', ''))
        var quantity = quantityElement.value

        if(quantity==1){
            discount = discount + 0
            break;
        }else if(quantity==2){
            discount = discount + Math.round((price * 0.1)*quantity) 
            break;
        }else if(quantity==3){
            discount = discount + Math.round((price * 0.11)*quantity) 
            break;
        }else if(quantity==4){
            discount = discount + Math.round((price * 0.12)*quantity) 
            break;
        }else if(quantity==5){
            discount = discount + Math.round((price * 0.13)*quantity) 
            break;
        }else if(quantity==6){
            discount = discount + Math.round((price * 0.14)*quantity) 
            break;
        }else{
            discount = discount + Math.round((price * 0.15)*quantity) 
            break;
        }
    }

    discount = (Math.round(discount*100)/100)
    document.getElementsByClassName('cart-discount-price')[0].innerText = discount+' '+'B' 

    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('B', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }

    total = (Math.round(total * 100) / 100)-discount
    document.getElementsByClassName('cart-total-price')[0].innerText = total+' ' + 'B'
}

function total() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var discount = 0

    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('B', ''))
        var quantity = quantityElement.value

        if(quantity==1){
            discount = discount + 0
            break;
        }else if(quantity==2){
            discount = discount + Math.round((price * 0.1)*quantity) 
            break;
        }else if(quantity==3){
            discount = discount + Math.round((price * 0.11)*quantity) 
            break;
        }else if(quantity==4){
            discount = discount + Math.round((price * 0.12)*quantity) 
            break;
        }else if(quantity==5){
            discount = discount + Math.round((price * 0.13)*quantity) 
            break;
        }else if(quantity==6){
            discount = discount + Math.round((price * 0.14)*quantity) 
            break;
        }else{
            discount = discount + Math.round((price * 0.15)*quantity) 
            break;
        }
    }

    discount = (Math.round(discount*100)/100)

    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('B', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }

    total = (Math.round(total * 100) / 100)-discount

    return total;
}
