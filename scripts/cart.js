export let cart = JSON.parse(localStorage.getItem('cart')) || [];

let itemsInCart = Number(JSON.parse(localStorage.getItem('itemsInCart'))) || 0;

// methods to manipulate itemsincart
// since the exported data will be read-only.
let setItemsInCart = (val) => itemsInCart = val;
let getItemsinCart = () => itemsInCart;

document.querySelector('.cart-quantity').innerHTML = itemsInCart;

export {setItemsInCart, getItemsinCart};









