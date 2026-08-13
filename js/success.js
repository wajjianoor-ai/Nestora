document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // GET LAST ORDER
    // =========================

    const order =
        JSON.parse(
            localStorage.getItem("lastOrder")
        );


    // =========================
    // ELEMENTS
    // =========================

    const orderId =
        document.getElementById("orderId");

    const customerName =
        document.getElementById("customerName");

    const paymentMethod =
        document.getElementById("paymentMethod");

    const orderTotal =
        document.getElementById("orderTotal");

    const cartCount =
        document.querySelector(".cart-count");


    // =========================
    // CART COUNT
    // =========================

    if (cartCount) {

        cartCount.textContent = "0";

    }


    // =========================
    // CHECK ORDER
    // =========================

    if (!order) {

        orderId.textContent = "No order found";

        customerName.textContent = "—";

        paymentMethod.textContent = "—";

        orderTotal.textContent = "Rs. 0";

        return;

    }


    // =========================
    // ORDER ID
    // =========================

    orderId.textContent =
        order.orderId || "—";


    // =========================
    // CUSTOMER NAME
    // =========================

    const firstName =
        order.customer?.firstName || "";

    const lastName =
        order.customer?.lastName || "";


    customerName.textContent =
        `${firstName} ${lastName}`.trim() || "—";


    // =========================
    // PAYMENT METHOD
    // =========================

    if (order.paymentMethod === "cod") {

        paymentMethod.textContent =
            "Cash on Delivery";

    } else if (
        order.paymentMethod === "card"
    ) {

        paymentMethod.textContent =
            "Card Payment";

    } else {

        paymentMethod.textContent =
            order.paymentMethod || "—";

    }


    // =========================
    // TOTAL
    // =========================

    orderTotal.textContent =
        order.total || "Rs. 0";

});