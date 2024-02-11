export let cart=JSON.parse(localStorage.getItem('cart1'))||[{productId:"dshfbmagjfgahijanfiwvhghjz",quantity:1,deliveryOptionId:'1'},{productId:"fhsjgfhjzbfkjafkahkzbvjabvm",quantity:1,deliveryOptionId:'2'}];


function saveToLocalStorage(){
  return localStorage.setItem('cart1',JSON.stringify(cart));
}

export function addItemToCart(productId){


  let matchingProduct='';

  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
       matchingProduct=cartItem;
    }
  })

  if(matchingProduct){
    matchingProduct.quantity++;
  }
  else{
    cart.push({productId:productId,quantity:1,deliveryOptionId:'3'})
  }

  saveToLocalStorage();
  console.log(cart);
}

export function removeItemFromCart(productId){

  const newCart=[];

  cart.forEach((cartItem)=>{
    if(productId!==cartItem.productId){
      newCart.push(cartItem);
    }
})

cart=newCart;
saveToLocalStorage();

}


export function updateDeliveryOption(productId,deliveryOptionId){

  let matchingItem

  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem
    }
  })
  matchingItem.deliveryOptionId=deliveryOptionId;
  saveToLocalStorage();


}


export const updateCart=(productId,quantityValue)=>{

  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem;
    }
  
  })

 matchingItem.quantity=quantityValue;

  saveToLocalStorage();

}