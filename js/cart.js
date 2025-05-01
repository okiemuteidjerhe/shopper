let theCart = JSON.parse(localStorage.getItem('cart')) || [];

//The total quantity of items in the span next to cart in the header
function updateItemsInCartCount(){
    let total = theCart.reduce((a, item) => {
       return a + item.qty;
}, 0)  
const totalQty = document.querySelector(".total-qty");
if(total !== 0){ 
    totalQty.textContent = total; 
    totalQty.style.display = '';
}else{ 
    totalQty.style.display = 'none';
}
 
}

//When the window loads, display the value
window.addEventListener("load", updateItemsInCartCount)

const itemsContainter = document.querySelector(".items-container");
const cartContainer = document.querySelector(".items");
const subtotal = document.querySelector('#subtotal')
const discountPercent = document.querySelector('.det>p>span')
const discountedAmount = document.querySelector('#discount')
const deliveryFee = document.querySelector('#delivery-fee')
const total = document.querySelector('#total') 
const discountContainter = document.querySelector("#d")


//RENDERING THE LOCAL STORAGE. Function helps use render the content as it changes without us having to refresh the page
    
const renderCartItems = (array) => {
    let cartContainerContent = '';
    for (const element of array) {
        cartContainerContent = cartContainerContent + `
                            <div class="item-card">
                                <div class="item-img">
                                    <img src="${element.img}" alt="${element.name}">
                                </div>
                                <div class="item-texts">
                                    <div class="up">
                                        <div class="up-texts">
                                            <h2>${element.name}</h2>
                                            <p>Size: <span>${element.size}</span></p>
                                            <p>Color: <span>${element.color}</span></p>
                                        </div>
                                        <button onclick="deleteCartItem(${element.id})">
                                            <img src="./icons/bin.svg">
                                        </button>
                                    </div>
                                    <div class="down">
                                        <p>$${element.discountedPrice}</p>
                                        <div class="btns">
                                            <button onclick="decreaseQty(${element.id})">
                                                <img src="./icons/minus.svg">
                                            </button>
                                            <span>${element.qty}</span>
                                            <button onclick = "increaseQty(${element.id})">
                                                <img src="./icons/plus.svg">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    }    
    cartContainer.innerHTML = cartContainerContent;
    updateOrder();

    if(array.length === 0){
        itemsContainter.innerHTML =`<h2 class="no-item">No items in cart. Go to <a href="index.html">Home</a> to shop.</h2>`
    }
}
renderCartItems(theCart);

//HELPER FUNCTIONS

const increaseQty = (id) => {
      let product = theCart.find(item => {
           return item.id === id
        })
        
     product.qty += 1
     
     localStorage.setItem('cart', JSON.stringify(theCart))
     renderCartItems(theCart);
     updateItemsInCartCount();
}

const decreaseQty = (id) => {    
      let product = theCart.find(item => {
           return item.id === id
        })
        
     if (product.qty > 1){
        product.qty -= 1;
     }else{
        product.qty = 1;
     }
     
     localStorage.setItem('cart', JSON.stringify(theCart));
     renderCartItems(theCart);
     updateItemsInCartCount();
}

const deleteCartItem = (id) =>{
    /* let product = theCart.find(item => {
        return item.id === id
    })

    console.log(theCart.splice(product)); */
    
   theCart = theCart.filter(item => {
        return item.id !== id
    })
    
    localStorage.setItem('cart', JSON.stringify(theCart));
    renderCartItems(theCart);
    updateItemsInCartCount();
}


//UPDATING ORDER SUMMARY

function updateOrder (){
    const subtotalCalc = theCart.reduce((a,b)=>{
        originalCost = b.price * b.qty;
        return a + originalCost
    }, 0)


    const discountedAmountCalc = theCart.reduce((a,b)=>{
        discounted = b.qty * (b.price - b.discountedPrice)
        return a + discounted;
    }, 0)

    

    const discountPercentCalc = (discountedAmountCalc/subtotalCalc) * 100;
   

    const deliveryFeeCalc = 20;

    const totalCalc = subtotalCalc + deliveryFeeCalc - discountedAmountCalc

    //Rendering
    subtotal.textContent = `$${subtotalCalc.toFixed(2)}`;
     
    if(discountedAmountCalc === 0 && discountPercentCalc === 0){
        discountContainter.style.display = 'none'
    }else{
        discountPercent.textContent = `(-${discountPercentCalc.toFixed(0)}%)`
        discountedAmount.textContent = `-$${discountedAmountCalc.toFixed(2)}`
        discountContainter.style.display = ''
    }

    deliveryFee.textContent = `$${deliveryFeeCalc.toFixed(2)}`
    total.textContent = `$${totalCalc.toFixed(2)}`
}

    