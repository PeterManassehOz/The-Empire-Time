const cart = JSON.parse(localStorage.getItem('cart')) || [];


function handleQuantityButtonClick(productId, action) {
}

function updateCartDisplay(){
  
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
