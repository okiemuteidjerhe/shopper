const productsContainer = document.querySelector('.products-container');

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


//RENDERING IN PRODUCTS CONTAINER

let productsContainerContent = "";

//Display what I have in cart n the browser storage but if there's nothing, create an empty array


for(let item of updatedArray){
    //I want the quanity of the particular item to show when the page is rendered
    const cartItem = theCart.find(c => c.id === item.id);
    cQty = cartItem? cartItem.qty : '';

    productsContainerContent = productsContainerContent + `
                <div class="product-card">
                    <div class="product-img">
                        <img src=${item.img}>
                        <button onclick = 'addToCart(${item.id})'><img src="./icons/cart.svg"></button>

${cQty > 0?     `<span class="qty" id="qty-${item.id}">${cQty}</span>` 
:               `<span class="qty" style="display: none" id="qty-${item.id}">${cQty}</span>`
}                        
                    </div>
                    <div class="product-texts">
                        <h3>${item.name}</h3>
                        <div class="rating-container">
                            <span>Rating</span>
                            <span>${item.rating}</span>
                        </div>
                        <div class="price-container">
                            <h2 class="price">$${item.price}</h2>
                        
${item.discount ? //0 is a falsy value in javascript so if item.discount = 0 then that first part reads false and the empty string is what is rendered but when it's truthy, then the first condition runs. Other falsy values include null, undefined, empty string, NaN, false.
    `<h2 class="dp">$${item.discountedPrice}</h2>
    <p class="discount">${item.discount}%</p>`                    
:   ""
}
                        </div>                    
                    </div>
                </div>`
}

productsContainer.innerHTML = productsContainerContent;



//THE ADD TO CART LOGIC for button and how it updates the span

const addToCart = (id) =>{
    //currentItem refers to an object inside Updated array that has a matching id
    const currentItem = updatedArray.find(item => {
       return item.id === id;
    });


    //Next, I check if there's an object in theCart array that has a matching id
    const isAlreadyInCart = theCart.find(cartItem => {
       return cartItem.id === id;
    });


    //I'll start this explanation from the back. If in the object I'm looking at, there's no id of such nature in the cart when I check above, I create an object with the property of the item being added to cart and add a new property qty:1. But if I find the id, I increase qty by 1
    if(isAlreadyInCart){
        isAlreadyInCart.qty += 1
    }else{
        theCart.push({...currentItem, qty:1})
    }

    //I want this value to persist in the browser storage so I 'update' localstorage
    localStorage.setItem('cart', JSON.stringify(theCart));

    //Now for the span above each button. I want to display the current qty of the item I have in cart.I get what I saved, do the finding, select the span for the particular button and update the textContent
    const upCart = JSON.parse(localStorage.getItem("cart"))
    const updatedItem = upCart.find(cartItem => {
        return cartItem.id === id;
    }) 
    const qtySpan = document.getElementById(`qty-${id}`);
    if(qtySpan && updatedItem){
        qtySpan.textContent = updatedItem.qty
        qtySpan.style.display = ""; //Doing this to only remove the inline style cause there's already display in the external css
    }   

    //We update the span next to cart at the top of the page
    updateItemsInCartCount()
}

