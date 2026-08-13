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