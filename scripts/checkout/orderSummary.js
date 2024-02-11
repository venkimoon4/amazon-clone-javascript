import { cart, removeItemFromCart, updateCart, updateDeliveryOption } from "../../data/cart.js";
import { delievryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { formatCurrency } from "../../utils/formatCurrency.js";



export function renderOrderSummary(){

let productsHtml='';

cart.forEach((cartItem)=>{

  let matchingProduct='';

  products.forEach((product)=>{
    if(cartItem.productId===product.productId){
      matchingProduct=product;
    }
  })

let deliveryOption;

delievryOptions.forEach((option)=>{
  if(option.deliveryOptionId===cartItem.deliveryOptionId){
    deliveryOption=option;
  }
})

const today=dayjs();
const now=today.add(deliveryOption.deliveryDays,"days");
const date=now.format("dddd,MMMM,D");

  productsHtml+=`
  <div class="checkout-product" id="js-delete-container-id-${matchingProduct.productId}">

  <div class="checkout-img-container">
    <div class="delivery-option-top">
      <h3>Delievred On: ${date}</h3>
    </div>
    <img src=${matchingProduct.image} class="checkout-img">
  </div>

  <div class="checkout-product-details">

    <div class="checkout-name">
      <h3>${matchingProduct.name}</h3>
    </div>

    <div class="checkout-ratings">
      <img src=${matchingProduct.ratings.stars} class="rating-icon">
      <p>456</p>
    </div>

    <div>
    <p>Quantity: ${cartItem.quantity}</p>
    </div>

    <div class="update-options">
       <span>
       <select class="update-btn-js" data-product-id="${matchingProduct.productId}">
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       </select>
       </span>
       <span class="delete-btn" data-product-id="${matchingProduct.productId}">Delete</span>
    </div>
  
    <div class="checkout-price">
      <h3>₹${formatCurrency(matchingProduct.priceCents)}</h3>
    </div>

  </div>

  <div class="
  delivery-date-details">
  <h3>Select Your Delievry Option</h3>
  ${updateRadioOptions(cartItem,matchingProduct)}
  </div>

</div>`

})

function updateRadioOptions(cartItem,matchingProduct){

  let html=''

  delievryOptions.forEach((deliveryOption)=>{

    const today=dayjs();
    const now=today.add(deliveryOption.deliveryDays,"days");
    const date=now.format("dddd,MMMM,D");

    const price=deliveryOption.priceCents===0 ? 'FREE' : formatCurrency(deliveryOption.priceCents);

    const isChecked=cartItem.deliveryOptionId===deliveryOption.deliveryOptionId ? "checked" : '';

    html+=`
    <div class="product-delievry-details js-radio-btn" data-product-id="${matchingProduct.productId}" data-delivery-option-id="${deliveryOption.deliveryOptionId}">
    <p><input type="radio"  ${isChecked} name="${matchingProduct.productId}">${date}</p>
    <p1>₹${price}</p1>
  </div>`

  })


  return html;

}



document.querySelector('.js-checkout-product-container').innerHTML=productsHtml;


// document.querySelectorAll('.update-btn-js').forEach((update_btn)=>{
//   update_btn.addEventListener('click',()=>{
//     // console.log(update_btn.dataset.productId)
//     const productId=update_btn.dataset.productId;
//     console.log(productId)
//     updateCart(productId)
//     renderOrderSummary();
//     renderPaymentSummary();
//    })
// })

document.querySelectorAll(".update-btn-js").forEach((update_btn)=>{
  update_btn.addEventListener('click',()=>{
    const quantityValue=Number(update_btn.value);
    console.log(quantityValue)
    console.log(update_btn.dataset.productId)
    const productId=update_btn.dataset.productId;
    updateCart(productId,quantityValue);
    
    setTimeout(()=>{
      renderOrderSummary();
      renderPaymentSummary();
    },2000)
  })
  
})

document.querySelectorAll('.delete-btn').forEach((delBtn)=>{
  delBtn.addEventListener('click',()=>{
    let productId=delBtn.dataset.productId;
     removeItemFromCart(productId);
     document.querySelector(`#js-delete-container-id-${productId}`).remove();
     renderPaymentSummary();
  })
})


  document.querySelectorAll('.js-radio-btn').forEach((radioBtn)=>{
    radioBtn.addEventListener('click',()=>{

      const {productId,deliveryOptionId}=radioBtn.dataset;

      console.log(productId+" "+deliveryOptionId)

      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}

    /*
      <span class="update-btn-js" data-product-id="${matchingProduct.productId}">Update</span>*/