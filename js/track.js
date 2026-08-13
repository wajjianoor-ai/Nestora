document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("trackForm");

    const input = document.getElementById("orderId");

    const message = document.getElementById("trackMessage");

    const result = document.getElementById("orderResult");

    const displayOrderId =
        document.getElementById("displayOrderId");

    const customerName =
        document.getElementById("customerName");

    const paymentMethod =
        document.getElementById("paymentMethod");

    const orderTotal =
        document.getElementById("orderTotal");

    const orderStatus =
        document.getElementById("orderStatus");


    form.addEventListener("submit", function (e) {

        e.preventDefault();


        const enteredId =
            input.value.trim();


        const order =
            JSON.parse(
                localStorage.getItem("lastOrder")
            );


        result.style.display = "none";

        message.textContent = "";


        if (!order) {

            message.textContent =
                "No order found. Please place an order first.";

            return;

        }


        if (enteredId !== order.orderId) {

            message.textContent =
                "Order ID not found. Please check your Order ID.";

            return;

        }


        // =========================
        // DISPLAY ORDER
        // =========================

        displayOrderId.textContent =
            order.orderId || "—";


        const firstName =
            order.customer?.firstName || "";

        const lastName =
            order.customer?.lastName || "";


        customerName.textContent =
            `${firstName} ${lastName}`.trim() || "—";


        // =========================
        // PAYMENT
        // =========================

        if (order.paymentMethod === "cod") {

            paymentMethod.textContent =
                "Cash on Delivery";

        } else if (order.paymentMethod === "card") {

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


        // =========================
        // STATUS
        // =========================

        orderStatus.textContent =
            "Processing";


        result.style.display =
            "block";

    });

});