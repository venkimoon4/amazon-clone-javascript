import { cart } from "../../data/cart.js"
import { delievryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../../utils/formatCurrency.js";

export function renderPaymentSummary(){


  let items=0;
  let shipping=0;
  

  cart.forEach((cartItem) => {
  let matchingItem;
    products.forEach((product)=>{
      if(cartItem.productId===product.productId){
        matchingItem=product;
      }
      
    })
    

    items+=cartItem.quantity*matchingItem.priceCents;

    let deliveryOption;
    delievryOptions.forEach((option)=>{
      if(cartItem.deliveryOptionId===option.deliveryOptionId){
       deliveryOption=option;
      }
    })

    shipping+=deliveryOption.priceCents;

  });


  let taxBefore=items+shipping;
  let taxAfter=taxBefore*0.1;
  let total=taxBefore+taxAfter;


  let html=`<div class="order-details">
  <h3>Items(${cart.length}):<span class="pay">₹${formatCurrency(items)}</span></h3>
  <h3>Shipping & Handling:<span class="pay">₹${formatCurrency(shipping)}</span></h3>
  <h3>Total Tax Before:<span class="pay">₹${formatCurrency(taxBefore)}</span></h3>
  <h3>Estimated Tax:<span class="pay">₹${formatCurrency(taxAfter)}</span></h3>
  <h3>Order Total:<span class="pay">₹${formatCurrency(total)}</span></h3>
</div>`


document.querySelector('.order').innerHTML=html;

const order=document.querySelector('.order-btn-js')
order.addEventListener('click',()=>{
  order.innerHTML="Order Placed"
})


}

