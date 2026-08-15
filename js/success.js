document.addEventListener("DOMContentLoaded", function () {
    const order = JSON.parse(localStorage.getItem("lastOrder"));
    const orderId = document.getElementById("orderId");
    const customerName = document.getElementById("customerName");
    const paymentMethod = document.getElementById("paymentMethod");
    const orderTotal = document.getElementById("orderTotal");
    const cartCount = document.querySelector(".cart-count");

    if (cartCount) {
        cartCount.textContent = "0";
    }

    if (!order) {
        orderId.textContent = "No order found";
        customerName.textContent = "—";
        paymentMethod.textContent = "—";
        orderTotal.textContent = "Rs. 0";
        return;
    }

    orderId.textContent = order.orderId || "—";

    const firstName = order.customer?.firstName || "";
    const lastName = order.customer?.lastName || "";

    customerName.textContent = `${firstName} ${lastName}`.trim() || "—";

    if (order.paymentMethod === "cod") {
        paymentMethod.textContent = "Cash on Delivery";
    } else if (order.paymentMethod === "card") {
        paymentMethod.textContent = "Card Payment";
    } else {
        paymentMethod.textContent = order.paymentMethod || "—";
    }

    orderTotal.textContent = order.total || "Rs. 0";
});