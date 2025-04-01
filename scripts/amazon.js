
import {cart, getItemsinCart, setItemsInCart} from './cart.js';
import {products} from '../data/products.js';

let html = '';
let gridElement = document.querySelector('.products-grid');

products.forEach((item,i) => {
    html += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${item.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(item.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="js-add-to-cart-btn add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`;
});

gridElement.innerHTML = html;

let selectElements = document.querySelectorAll('.js-select-quantity');
let addedMessageElements = document.querySelectorAll('.added-to-cart');

let timeouts = [];

function addToCart(product,selectedQuantity){
    //check if this product is in the cart
    let itemFound = cart.filter(x => x.id == product.id);

    if(itemFound.length > 0){
      // increase the quantity of that item
      itemFound[0].quantity += selectedQuantity;
    }
    else{
      // add the new item
      cart.push({
        id : product.id,
        name : product.name,
        quantity : selectedQuantity
      });
 }

 localStorage.setItem('cart',JSON.stringify(cart));

}

function displayAddedMessage(i){
  let previousTimeout = timeouts.filter(x => x.i === i)[0];
  if(previousTimeout){
    clearTimeout(previousTimeout.messageTimeoutId);
    timeouts = timeouts.filter(x => x.i != i);
  }

  // show the added message
  addedMessageElements[i].style.opacity = 1;
  
  let messageTimeoutId  = setTimeout(() => {
    addedMessageElements[i].style.opacity = 0;
  },2000);

  // to reset the counter if button is clicked multiple times
  
  timeouts.push({
    i,
    messageTimeoutId
  });
}

function updateCartQuantityValue(selectedQuantity){
    let itemsInCart = getItemsinCart();
    itemsInCart += selectedQuantity;
    setItemsInCart(itemsInCart);
    localStorage.setItem('itemsInCart', itemsInCart);
    document.querySelector('.cart-quantity').innerHTML = itemsInCart;
}

// script for updating the cart
document.querySelectorAll('.js-add-to-cart-btn').forEach((item,i) => {
      item.addEventListener('click',()=>{
        // getting the items quantity selected value
        let selectedQuantity = Number(selectElements[i].value);
        let product = products[i];
        addToCart(product,selectedQuantity);
        console.log(cart);
        updateCartQuantityValue(selectedQuantity);
        displayAddedMessage(i);

  });
});

