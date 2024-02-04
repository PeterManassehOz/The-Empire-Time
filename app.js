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

document.querySelectorAll('.js-cart-add').forEach((button) => {
  button.addEventListener('click', () => {
   const productId = button.dataset.productId;

   let matchingItem;

cart.forEach((item) => {
if (productId === item.productId) {
matchingItem = item;
}
})

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

let cartQuantity = 0;

cart.forEach((item) => {
cartQuantity += item.quantity;
});

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });
});

