document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       CHECK CART PAGE
    ========================= */

    const cartItemsContainer =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    const subtotalElement =
        document.getElementById("cartSubtotal");

    const deliveryElement =
        document.getElementById("cartDelivery");

    const totalElement =
        document.getElementById("cartTotal");

    const checkoutButton =
        document.getElementById("checkoutButton");


    // If cart page elements don't exist,
    // stop this script on other pages.

    if (
        !cartItemsContainer ||
        !emptyCart ||
        !subtotalElement ||
        !deliveryElement ||
        !totalElement ||
        !checkoutButton
    ) {
        return;
    }


    /* =========================
       GET CART
    ========================= */

    let cart =
        JSON.parse(localStorage.getItem("nestoraCart")) || [];


    /* =========================
       DISPLAY CART
    ========================= */

    function displayCart() {

        cartItemsContainer.innerHTML = "";


        if (cart.length === 0) {

            emptyCart.style.display = "block";

            subtotalElement.textContent = "Rs. 0";

            deliveryElement.textContent = "Rs. 0";

            totalElement.textContent = "Rs. 0";

            checkoutButton.style.pointerEvents = "none";

            checkoutButton.style.opacity = "0.5";

            updateCartCount();

            return;
        }


        emptyCart.style.display = "none";

        checkoutButton.style.pointerEvents = "auto";

        checkoutButton.style.opacity = "1";


        cart.forEach(function (item, index) {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}">

                </div>

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p class="cart-item-price">
                        Rs. ${Number(item.price).toLocaleString()}
                    </p>

                    <div class="cart-item-bottom">

                        <div class="cart-quantity">

                            <button
                                class="cart-minus"
                                data-index="${index}"
                                type="button">
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                class="cart-plus"
                                data-index="${index}"
                                type="button">
                                +
                            </button>

                        </div>

                        <button
                            class="remove-cart-item"
                            data-index="${index}"
                            type="button">

                            <i class="fa-solid fa-trash"></i>
                            Remove

                        </button>

                    </div>

                </div>
            `;


            cartItemsContainer.appendChild(cartItem);

        });


        calculateTotal();

        updateCartCount();

    }


    /* =========================
       CALCULATE TOTAL
    ========================= */

    function calculateTotal() {

        let subtotal = 0;


        cart.forEach(function (item) {

            subtotal +=
                Number(item.price) *
                Number(item.quantity);

        });


        let delivery = 0;


        if (subtotal > 0) {

            delivery = 200;

        }


        if (subtotal >= 5000) {

            delivery = 0;

        }


        const total =
            subtotal + delivery;


        subtotalElement.textContent =
            "Rs. " + subtotal.toLocaleString();


        deliveryElement.textContent =
            delivery === 0
                ? "Free"
                : "Rs. " + delivery.toLocaleString();


        totalElement.textContent =
            "Rs. " + total.toLocaleString();

    }


    /* =========================
       UPDATE CART COUNT
    ========================= */

    function updateCartCount() {

        let totalItems = 0;


        cart.forEach(function (item) {

            totalItems +=
                Number(item.quantity) || 0;

        });


        document
            .querySelectorAll(".cart-count")
            .forEach(function (count) {

                count.textContent = totalItems;

            });

    }


    /* =========================
       BUTTON ACTIONS
    ========================= */

    cartItemsContainer.addEventListener(
        "click",
        function (event) {


            /* PLUS */

            const plusButton =
                event.target.closest(".cart-plus");


            if (plusButton) {

                const index =
                    Number(plusButton.dataset.index);


                if (cart[index]) {

                    cart[index].quantity =
                        Number(cart[index].quantity) + 1;

                    saveCart();

                    displayCart();

                }

                return;

            }


            /* MINUS */

            const minusButton =
                event.target.closest(".cart-minus");


            if (minusButton) {

                const index =
                    Number(minusButton.dataset.index);


                if (
                    cart[index] &&
                    Number(cart[index].quantity) > 1
                ) {

                    cart[index].quantity--;

                    saveCart();

                    displayCart();

                }

                return;

            }


            /* REMOVE */

            const removeButton =
                event.target.closest(
                    ".remove-cart-item"
                );


            if (removeButton) {

                const index =
                    Number(removeButton.dataset.index);


                if (cart[index]) {

                    cart.splice(index, 1);

                    saveCart();

                    displayCart();

                }

            }

        }
    );


    /* =========================
       SAVE CART
    ========================= */

    function saveCart() {

        localStorage.setItem(
            "nestoraCart",
            JSON.stringify(cart)
        );

    }


    /* =========================
       INITIAL LOAD
    ========================= */

    displayCart();

});