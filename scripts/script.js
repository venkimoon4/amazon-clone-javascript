
import { addItemToCart,cart} from "../data/cart.js"
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/formatCurrency.js";

let productHTML=''

products.forEach((product)=>{

  productHTML+=`<div class="product">
       
  <div class="product-img-container">
    <img src=${product.image} class="product-img">
  </div>

  <div class="product-name">
    <h3>${product.name}</h3>
  </div>

  <div class="product-ratings">
    <img src=${product.ratings.stars} class="rating-icon">
    <p>${product.ratings.count}</p>
  </div>

  <div class="product-price">
    <h3>₹${formatCurrency(product.priceCents)}</h3>
  </div>

  <button class="add-btn" data-product-id="${product.productId}">Add to Cart</button>

</div>
`

})

document.querySelector('.products-container').innerHTML=productHTML;

function updateCartQauntity(){


let cartQauntity=0;

cart.forEach((cartItem)=>{
cartQauntity+=cartItem.quantity;
})

console.log(cartQauntity)

document.querySelector('.js-cart-count').innerHTML=cartQauntity;

}

document.querySelectorAll('.add-btn').forEach((addBtn)=>{
  addBtn.addEventListener('click',()=>{
    let productId=addBtn.dataset.productId;

    addItemToCart(productId);
    updateCartQauntity();

  })
})

updateCartQauntity();