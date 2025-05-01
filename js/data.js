const data = [
    {
        id: 1,
        name: "Beige Shoes",
        size: "Large",
        color:"White and beige",
        price: 120,
        discount: 0,
        rating: 4.5,
        img: './images/beige-shoes.png'
    },

    {
        id: 2,
        name: "Brown Sneakers",
        size: "Large",
        color:"Brown",
        price: 240,
        discount: 20,
        rating: 3.5,
        img: './images/brown-sneakers.png'
    },

    {
        id: 3,
        name: "Red Shoes",
        size: "Medium",
        color:"Red",
        price: 180,
        discount: 0,
        rating: 4.5,
        img: './images/red-shoes.png'
    },

    {
        id: 4,
        name: "Orange White Sneakers",
        size: "Medium",
        color:"White and orange",
        price: 160,
        discount: 30,
        rating: 4.5,
        img: './images/orange-white-sneakers.png'
    },

    {
        id: 5,
        name: "Allstar Sneakers",
        size: "Large",
        color:"Black",
        price: 232,
        discount: 20,
        rating: 5,
        img: './images/all-star-sneakers.png'
    },

    {
        id: 6,
        name: "Pink Nike",
        size: "Medium",
        color:"Pink",
        price: 145,
        discount: 0,
        rating: 4,
        img: './images/pink-nike.png'
    },

    {
        id: 7,
        name: "Red Sneakers",
        size: "Large",
        color:"Red",
        price: 80,
        discount: 0,
        rating: 3,
        img: './images/red-sneakers.png'
    },

    {
        id: 8,
        name: "Black Nike",
        size: "Medium",
        color:"Black",
        price: 210,
        discount: 0,
        rating: 4.5,
        img: './images/black-nike.png'
    }
]

const updatedArray = data.map(item=>{

    let discountedPrice = 0;//Just so it won't be undefined for others

    const isZero = item.discount === 0; //Checks that discount is zero

    if(!isZero){//If not zero, then
        discountedPrice = item.price - ((item.discount/100) * item.price);
    }else{
        discountedPrice = item.price
    }

    return {...item, discountedPrice} //we are creating new objects in the new transformed array by using the spread perator to transfer the properties of the former objects and then we add a new property; with key "discountedPrice" and value "the calculated value"
})
/* console.log(updatedArray) */