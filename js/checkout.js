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

// DISPLAYING ORDER + PRICE

const itemsCtn = document.querySelector(".items");
const discountCtn = document.querySelector("#d-ctn")
const discountPercentCtn = document.querySelector(".det>p>span");
const discountedAmountCtn = document.querySelector("#discount");
const deliveryFeeCtn = document.querySelector("#delivery-fee");
const totalCtn = document.querySelector("#total");

//Now for the calculations
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

const totalCalc = subtotalCalc + deliveryFeeCalc - discountedAmountCalc;

//The rendering
let itemsCtnContent = "";
for (const item of theCart) {
    itemsCtnContent = itemsCtnContent + `<div class="det">
                                <p>${item.name} (x ${item.qty})</p>
                                <p>$${item.discountedPrice.toFixed(2) * item.qty}</p>
                            </div>`
}
itemsCtn.innerHTML = itemsCtnContent;

if(discountedAmountCalc === 0 && discountPercentCalc === 0){
    discountCtn.style.display = 'none';
}else{
    discountPercentCtn.textContent = `(-${discountPercentCalc.toFixed(0)}%)`;
    discountedAmountCtn.textContent = `-$${discountedAmountCalc.toFixed(2)}`;
    discountCtn.style.display = '';
}

deliveryFeeCtn.textContent = `$${deliveryFeeCalc.toFixed(2)}`;

totalCtn.textContent = `$${totalCalc.toFixed(2)}`;

//HANDLING THE FORM
const formCtn = document.querySelector(".items-container");

formCtn.addEventListener(
    "submit",
    (e)=>{
        e.preventDefault();
       const checkoutData = new FormData(e.currentTarget)
        /* for (let element of checkoutData.entries()){
            console.log(element)
        } */

        const objectFromCheckoutData = Object.fromEntries(checkoutData);
        /* console.log(objectFromCheckoutData) */

        /*
         This is where we send this data to some backend using apis
        */
        formCtn.reset()
        //    window.location.href = ('./index.html')
        localStorage.removeItem('cart');
        window.location.replace('./index.html');
    }
)

