export let cart = JSON.parse(localStorage.getItem('cart')) || [];

let itemsInCart = Number(JSON.parse(localStorage.getItem('itemsInCart'))) || 0;

/*
// methods to manipulate itemsincart
// since the exported data will be read-only.
let setItemsInCart = (val) => itemsInCart = val;
let getItemsinCart = () => itemsInCart;
*/
if(document.querySelector('.cart-quantity'))
{
  document.querySelector('.cart-quantity').innerHTML = itemsInCart;
}

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

function updateCartQuantityValue(selectedQuantity){
    itemsInCart += selectedQuantity;
    localStorage.setItem('itemsInCart', itemsInCart);
    document.querySelector('.cart-quantity').innerHTML = itemsInCart;
}

export { addToCart, updateCartQuantityValue};









