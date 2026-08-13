document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // GET CART
    // =========================

    let cart =
        JSON.parse(localStorage.getItem("nestoraCart")) || [];


    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutSubtotal =
        document.getElementById("checkoutSubtotal");

    const checkoutDelivery =
        document.getElementById("checkoutDelivery");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    const cartCount =
        document.querySelector(".cart-count");

    const checkoutForm =
        document.getElementById("checkoutForm");


    // =========================
    // UPDATE CART COUNT
    // =========================

    function updateCartCount() {

        let totalQuantity = 0;

        cart.forEach(function (item) {

            totalQuantity +=
                Number(item.quantity) || 1;

        });

        if (cartCount) {

            cartCount.textContent =
                totalQuantity;

        }

    }


    // =========================
    // DISPLAY CHECKOUT ITEMS
    // =========================

    function displayCheckoutItems() {

        if (!checkoutItems) return;

        checkoutItems.innerHTML = "";


        // EMPTY CART

        if (cart.length === 0) {

            checkoutItems.innerHTML = `
                <p style="font-size:14px;">
                    Your cart is empty.
                </p>
            `;

            checkoutSubtotal.textContent =
                "Rs. 0";

            checkoutDelivery.textContent =
                "Rs. 0";

            checkoutTotal.textContent =
                "Rs. 0";

            return;
        }


        let subtotal = 0;


        // =========================
        // DISPLAY PRODUCTS
        // =========================

        cart.forEach(function (item) {

            const quantity =
                Number(item.quantity) || 1;


            const price =
                Number(item.price) || 0;


            const itemTotal =
                price * quantity;


            subtotal += itemTotal;


            const checkoutItem =
                document.createElement("div");


            checkoutItem.className =
                "checkout-item";


            checkoutItem.innerHTML = `

                <div class="checkout-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="checkout-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Qty: ${quantity}
                    </p>

                </div>


                <span class="checkout-item-price">

                    Rs. ${itemTotal.toLocaleString()}

                </span>

            `;


            checkoutItems.appendChild(
                checkoutItem
            );

        });


        // =========================
        // DELIVERY
        // =========================

        let delivery = 200;


        // Free delivery above Rs. 5000

        if (subtotal >= 5000) {

            delivery = 0;

        }


        // =========================
        // TOTAL
        // =========================

        const total =
            subtotal + delivery;


        checkoutSubtotal.textContent =
            `Rs. ${subtotal.toLocaleString()}`;


        checkoutDelivery.textContent =
            delivery === 0
                ? "Free"
                : `Rs. ${delivery.toLocaleString()}`;


        checkoutTotal.textContent =
            `Rs. ${total.toLocaleString()}`;

    }


    // =========================
    // PLACE ORDER
    // =========================

    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // CHECK CART

                if (cart.length === 0) {

                    alert(
                        "Your cart is empty."
                    );

                    return;

                }


                // PAYMENT METHOD

                const selectedPayment =
                    document.querySelector(
                        'input[name="payment"]:checked'
                    );


                const paymentMethod =
                    selectedPayment
                        ? selectedPayment.value
                        : "cod";
                        // =========================
// CARD PAYMENT
// =========================

if (paymentMethod === "card") {

    const pendingOrder = {

        customer: {
            firstName:
                document.getElementById("firstName").value,

            lastName:
                document.getElementById("lastName").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            address:
                document.getElementById("address").value,

            city:
                document.getElementById("city").value,

            postalCode:
                document.getElementById("postalCode").value
        },

        paymentMethod: "card",

        items: cart,

        subtotal:
            checkoutSubtotal.textContent,

        delivery:
            checkoutDelivery.textContent,

        total:
            checkoutTotal.textContent
    };


    localStorage.setItem(
        "pendingOrder",
        JSON.stringify(pendingOrder)
    );


    window.location.href = "payment.html";

    return;
}


                // =========================
                // CREATE ORDER
                // =========================

                const order = {

                    orderId:
                        "NES-" + Date.now(),


                    customer: {

                        firstName:
                            document.getElementById(
                                "firstName"
                            ).value,

                        lastName:
                            document.getElementById(
                                "lastName"
                            ).value,

                        email:
                            document.getElementById(
                                "email"
                            ).value,

                        phone:
                            document.getElementById(
                                "phone"
                            ).value,

                        address:
                            document.getElementById(
                                "address"
                            ).value,

                        city:
                            document.getElementById(
                                "city"
                            ).value,

                        postalCode:
                            document.getElementById(
                                "postalCode"
                            ).value

                    },


                    paymentMethod:
                        paymentMethod,


                    items:
                        cart,


                    subtotal:
                        checkoutSubtotal.textContent,


                    delivery:
                        checkoutDelivery.textContent,


                    total:
                        checkoutTotal.textContent,


                    date:
                        new Date().toLocaleString()

                };


                // =========================
                // SAVE ORDER
                // =========================

                localStorage.setItem(
                    "lastOrder",
                    JSON.stringify(order)
                );


                // =========================
                // CLEAR CART
                // =========================

                localStorage.removeItem(
                    "nestoraCart"
                );


                // =========================
                // SUCCESS PAGE
                // =========================

                window.location.href =
                    "success.html";

            }
        );

    }


    // =========================
    // INITIAL LOAD
    // =========================

    updateCartCount();

    displayCheckoutItems();

});