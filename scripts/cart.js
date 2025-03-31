let cart = JSON.parse(localStorage.getItem('cart')) || [];

let itemsInCart = JSON.parse(localStorage.getItem('itemsInCart')) || 0;
document.querySelector('.cart-quantity').innerHTML = itemsInCart;









