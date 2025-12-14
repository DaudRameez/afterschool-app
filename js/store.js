var store = {
  cart: []
};

function addToCart(item){
  store.cart.push({...item});
}

function removeFromCart(id){
  store.cart = store.cart.filter(i=>i.id!==id);
}

function clearCart(){
  store.cart=[];
}
