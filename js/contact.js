document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // CONTACT FORM
    // =========================

    const contactForm =
        document.querySelector(".contact-form");


    if (!contactForm) {
        return;
    }


    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // =========================
        // GET VALUES
        // =========================

        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        // =========================
        // VALIDATION
        // =========================

        if (
            !firstName ||
            !lastName ||
            !email ||
            !subject ||
            !message
        ) {

            alert("Please fill in all fields.");

            return;

        }


        // =========================
        // SUCCESS
        // =========================

        alert(
            `Thank you, ${firstName}! Your message has been sent successfully.`
        );


        // =========================
        // RESET FORM
        // =========================

        contactForm.reset();

    });

});