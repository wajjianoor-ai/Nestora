document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       QUANTITY
    ========================= */

    let quantity = 1;

    const decreaseButton =
        document.querySelector(".quantity-decrease");

    const increaseButton =
        document.querySelector(".quantity-increase");

    const quantityNumber =
        document.querySelector(".quantity-number");


    increaseButton.addEventListener("click", function () {

        quantity++;

        quantityNumber.textContent = quantity;

    });


    decreaseButton.addEventListener("click", function () {

        if (quantity > 1) {

            quantity--;

            quantityNumber.textContent = quantity;

        }

    });


    /* =========================
       CART COUNT
    ========================= */

    function updateCartCount() {

        const cart =
            JSON.parse(localStorage.getItem("nestoraCart")) || [];


        let totalItems = 0;


        cart.forEach(function (item) {

            totalItems += item.quantity;

        });


        document.querySelectorAll(".cart-count")
            .forEach(function (count) {

                count.textContent = totalItems;

            });

    }


    updateCartCount();


    /* =========================
       ADD TO CART
    ========================= */

    const addCartButton =
        document.getElementById("productAddCart");


    addCartButton.addEventListener("click", function () {

        if (!product) {
            return;
        }


        let cart =
            JSON.parse(localStorage.getItem("nestoraCart")) || [];


        const existingProduct =
            cart.find(function (item) {

                return item.id === productId;

            });


        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            cart.push({

                id: productId,

                name: product.name,

                price: product.price,

                image: product.image,

                quantity: quantity

            });

        }


        /* Save cart */

        localStorage.setItem(
            "nestoraCart",
            JSON.stringify(cart)
        );


        /* Update count */

        updateCartCount();


        /* Button feedback */

        addCartButton.innerHTML =
            '<i class="fa-solid fa-check"></i> Added to Cart';


        setTimeout(function () {

            addCartButton.innerHTML =
                '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';

        }, 1500);


        /* Reset quantity */

        quantity = 1;

        quantityNumber.textContent = quantity;

    });

});
const products={
1:{
name:"Ceramic Desk Organizer",
price:2450,
image:"images/ceramic-desk-organizer.jpeg",
description:"Minimal ceramic storage for your everyday desk essentials. Designed to keep your workspace clean, organized and beautiful."
},
2:{
name:"Oak Phone Stand",
price:1350,
image:"images/oak-phone-stand.jpeg",
description:"Natural oak phone stand designed for a clean and organized workspace. Simple, practical and timeless."
},
3:{
name:"Luma Desk Lamp",
price:3850,
image:"images/luma-desk-lamp.jpeg",
description:"Soft ambient lighting designed to create a calm and focused workspace while adding a warm touch to your desk."
},
4:{
name:"Mini Terra Planter",
price:1150,
image:"images/mini-terra-planter.jpeg",
description:"A simple ceramic planter designed for your favorite greenery. A subtle piece for adding nature to your space."
},
5:{
name:"Arc Desk Clock",
price:2950,
image:"images/arc-desk-clock.jpeg",
description:"A minimal desk clock designed for timeless spaces. Functional design with a clean and elegant appearance."
},
6:{
name:"Cove Storage Box",
price:1850,
image:"images/cove-storage-box.jpeg",
description:"Elegant storage for keeping small essentials organized. A practical addition to any beautifully arranged space."
},
7:{
name:"Loop Cable Organizer",
price:750,
image:"images/loop-cable-organizer.jpeg",
description:"A simple cable organizer designed to keep your workspace tidy and your everyday cables neatly arranged."
},
8:{
name:"Luma Mist Diffuser",
price:2650,
image:"images/luma-mist-diffuser.jpeg",
description:"A refined mist diffuser designed to bring a calm and refreshing atmosphere to your everyday space."
}
};
const urlParams=new URLSearchParams(window.location.search);
const productId=urlParams.get("product")||"1";
const product=products[productId];
if(product){
document.getElementById("productImage").src=product.image;
document.getElementById("productImage").alt=product.name;
document.getElementById("productName").textContent=product.name;
document.getElementById("productPrice").textContent="Rs. "+product.price.toLocaleString();
document.getElementById("productDescription").textContent=product.description;
}