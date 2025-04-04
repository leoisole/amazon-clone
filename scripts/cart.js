export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export let itemsInCart = Number(JSON.parse(localStorage.getItem('itemsInCart'))) || 0;

/*
// methods to manipulate itemsincart
// since the exported data will be read-only.
let setItemsInCart = (val) => itemsInCart = val;
let getItemsinCart = () => itemsInCart;
*/

function updateCartQuantity()
{
  const cartQuantityElement = document.querySelector('.cart-quantity');
  if(cartQuantityElement)
  {
    cartQuantityElement.innerHTML = itemsInCart != 0 ? itemsInCart : '';
  }
}

updateCartQuantity();


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

    setCartValue();

}

function updateCartQuantityValue(selectedQuantity){
  itemsInCart += selectedQuantity;
  setItemsInCart(itemsInCart);
  updateCartQuantity();
}

function setCartValue(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

function setItemsInCart(val){
  itemsInCart = val;
  localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
}

function deleteItemFromCart(productId){
  let newCart = [];
  let itemRemoved;
  cart.forEach(x => {
    if(productId !== x.id)
    {
      newCart.push(x);
    }
    else{
      itemRemoved = x;
    }
  });
  cart = newCart;
  setCartValue();
  setItemsInCart(itemsInCart - itemRemoved.quantity);
}

export { addToCart, updateCartQuantityValue, deleteItemFromCart};









