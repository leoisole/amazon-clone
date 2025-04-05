import { cart, deleteItemFromCart, itemsInCart, calculateCartQuanity,  setCartValue } from './cart.js';
import { products } from '../data/products.js';
import { convertToDollar } from './util/cash.js';


function fetchProductById(id){ 
  let productMatched;
    // return does not work inside the foreach, so we need to store the matched 
    // value and then return that.
    products.forEach(x => {
      if(x.id == id)
      {
        productMatched = x;
      }
    });

  return productMatched;
}

function updateItemCountInCheckoutPage(){
  document.querySelector('.js-checkout-item-count').innerHTML = `${itemsInCart} items`;
}

let orderSummaryHtml = '';   

cart.forEach((cartItem,i)=>{

    let id = cartItem.id;
    const product = fetchProductById(id);
    orderSummaryHtml += `
        <div class="js-cart-item-container-${id} cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${convertToDollar(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span >
                    Quantity: <span class="js-quantity-label-${id}">${cartItem.quantity}</span>
                  </span>
                  <input value="${cartItem.quantity}" min="1" class="js-input-quantity-${id} input-quantity hide" type="number">

                  <span data-product-id="${id}" class="js-update-btn update-quantity-link link-primary">
                    Update
                  </span>
                  
                  <span class="js-delete-btn delete-quantity-link link-primary" data-product-id="${cartItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${i}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${i}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${i}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;

});

// attaching this html to order container
document.querySelector('.order-summary').innerHTML = orderSummaryHtml;

updateItemCountInCheckoutPage();

document.querySelectorAll('.js-delete-btn').forEach((item,i)=>{
  // console.log(item);
  item.addEventListener('click',() => {
    const productId = item.dataset.productId;
    deleteItemFromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    updateItemCountInCheckoutPage();
  });
  
});


document.querySelectorAll('.js-update-btn').forEach((item,i) => {
  item.addEventListener('click',()=>{
    let pid = item.dataset.productId;
    console.log(pid);
    let inputElement = document.querySelector(`.js-input-quantity-${pid}`);
    let labelElement = document.querySelector(`.js-quantity-label-${pid}`);
    if(item.innerHTML === 'Save')
    {
      let newQuantity = inputElement.value;
      cart[i].quantity = newQuantity;

      setCartValue();
      calculateCartQuanity();
      updateItemCountInCheckoutPage();

      inputElement.classList.add('hide');
      labelElement.innerHTML = newQuantity;
      labelElement.classList.remove('hide');
      item.innerHTML = 'Update'
    }
    else{
      labelElement.classList.add('hide');
      inputElement.classList.remove('hide');
      item.innerHTML = 'Save';
    }
    
  });
});




