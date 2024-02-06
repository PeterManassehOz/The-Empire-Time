let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let body = document.querySelector('body'); // Corrected variable name
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
})

let products = [
  {
    image: 'image/Watch 1.webp',
    name: 'Wristwatch 1',
    price: '74',
    id: 1
  },
  {
    image: 'image/Watch 2.webp',
    name: 'Wristwatch 2',
    price: '68',
    id: 2
  },
  {
    image: 'image/Watch 3.webp',
    name: 'Wristwatch 3',
    price: '56',
    id: 3
  },
  {
    image: 'image/Watch 4.webp',
    name: 'Wristwatch 4',
    price: '60',
    id: 4
  },
  {
    image: 'image/Watch 5.webp',
    name: 'Wristwatch 5',
    price: '72',
    id: 5
  },
  {
    image: 'image/Watch 6.webp',
    name: 'Wristwatch 6',
    price: '60',
    id: 6
  },
  {
    image: 'image/Watch 7.webp',
    name: 'Wristwatch 7',
    price: '82',
    id: 7
  },
  {
    image: 'image/Watch 8.webp',
    name: 'Wristwatch 8',
    price: '65',
    id: 8
  },
];

let productsHTML = '';

products.forEach((product) => {
productsHTML += `
<div class="item">
    <div class="resize-image"><img width="200" height="300" src="${product.image}"></div>
    <div class="details">
    <div class="name">${product.name}</div>
    <div class="amount">$${product.price}</div>
    <div class="product-quantity">
      <select  class="js-quantity-selector-${product.id}">
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
    <button class="cart-add js-cart-add"
    data-product-id="${product.id}">Add to cart</button>
    </div>
</div>
`;
});

document.querySelector('.js-element-shop').innerHTML = productsHTML;

updateCartDisplay();

document.querySelectorAll('.js-cart-add').forEach((button) => {
  button.addEventListener('click', () => {
   const productId = button.dataset.productId;

   const matchingItem = cart.find((item) => item.productId === productId)
;

const quantitySelector = document.querySelector(
  `.js-quantity-selector-${productId}`
);

const quantity = Number(quantitySelector.value);

if (matchingItem) {
  matchingItem.quantity += quantity;
} else {
  cart.push({
    productId: productId,
    quantity: quantity
   });
}
saveCartToLocalStorage();
updateCartDisplay();
  });
});

document.querySelector('.js-list-card').addEventListener('click', (event) => {
  if (event.target.classList.contains('cart-delete-btn')) {
    const productId = event.target.dataset.productId;
    handleDeleteButtonClick(productId);
  }
});

function handleDeleteButtonClick(productId) {
  const itemIndex = cart.findIndex((item) => item.productId === productId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    saveCartToLocalStorage();
    updateCartDisplay();
  }
}



function handleQuantityButtonClick(productId, action) {
  const matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    if (action === 'increment') {
      matchingItem.quantity++;
    } else if (action === 'decrement') {
      if (matchingItem.quantity > 1) {
        matchingItem.quantity--;
      } else {
        // Remove the item from the cart when quantity goes below 1
        const itemIndex = cart.findIndex((item) => item.productId === productId);
        if (itemIndex !== -1) {
          cart.splice(itemIndex, 1);
        }
      }
    }

    saveCartToLocalStorage();
    updateCartDisplay();
  }
}

// Function to update the cart display
function updateCartDisplay() {

let cartQuantity = 0;
let totalAmount = 0;

const listCard = document.querySelector('.js-list-card');
listCard.innerHTML = '';

cart.forEach((item) => {
cartQuantity += item.quantity;

const product = products.find((p) => p.id == item.productId);
totalAmount += item.quantity * Number(product.price);

const listItem = document.createElement('li');
listItem.innerHTML = `
<div class="cart-item">
        <img src="${product.image}" alt="${product.name}" class="cart-item-image" width="100" height="100">
        <div class="cart-item-details">
          <span class="cart-item-name">${product.name}</span>
          <div class="cart-item-info">
            <div class="cart-item-price">Price: $${(item.quantity * Number(product.price)).toFixed(2)}</div>
            <div class="cart-item-quantity">
              <button class="cart-quantity-btn-minus" data-action="decrement" data-product-id="${product.id}">-</button>
              <span>${item.quantity}</span>
              <button class="cart-quantity-btn-add" data-action="increment" data-product-id="${product.id}">+</button>
              <div>
              <button class="cart-delete-btn" data-product-id="${product.id}">Delete</button></div>
            </div>
          </div>
        </div>
      </div>
`;


listCard.appendChild(listItem);
});

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
document.querySelector('.total').innerHTML = `$${totalAmount.toFixed(2)}`;

document.querySelectorAll('.cart-quantity-btn-add').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productId = event.target.dataset.productId;
    const action = 'increment';

    handleQuantityButtonClick(productId, action);
  });
});

document.querySelectorAll('.cart-quantity-btn-minus').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productId = event.target.dataset.productId;
    const action = 'decrement';

    handleQuantityButtonClick(productId, action);
  });
});
}

