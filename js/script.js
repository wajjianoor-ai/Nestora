document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

    let cart = JSON.parse(localStorage.getItem("nestoraCart")) || [];
    const addCartButtons = document.querySelectorAll(".add-cart");

    function updateCartCount() {
        const totalItems = cart.reduce(function (total, item) {
            return total + (Number(item.quantity) || 1);
        }, 0);

        document.querySelectorAll(".cart-count").forEach(function (counter) {
            counter.textContent = totalItems;
        });
    }

    updateCartCount();

    addCartButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const productCard = button.closest(".product-card");
            if (!productCard) return;

            const name = productCard.querySelector("h3")?.textContent.trim();
            const priceText = productCard.querySelector(".price")?.textContent.trim();
            const price = Number(priceText.replace(/[^\d]/g, ""));
            const image = productCard.querySelector("img")?.getAttribute("src");

            if (!name || !price || !image) {
                console.log("Product information missing.");
                return;
            }

            const existingProduct = cart.find(function (item) {
                return item.name === name;
            });

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }

            localStorage.setItem("nestoraCart", JSON.stringify(cart));
            updateCartCount();

            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fa-solid fa-check"></i>';

            setTimeout(function () {
                button.innerHTML = originalHTML;
            }, 1000);
        });
    });

    const decreaseButton = document.querySelector(".quantity-decrease");
    const increaseButton = document.querySelector(".quantity-increase");
    const quantityDisplay = document.querySelector(".quantity-number");

    if (decreaseButton && increaseButton && quantityDisplay) {
        let quantity = 1;

        decreaseButton.addEventListener("click", function () {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });

        increaseButton.addEventListener("click", function () {
            quantity++;
            quantityDisplay.textContent = quantity;
        });
    }

    const newsletterForm = document.querySelector(".footer-newsletter form");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const emailInput = newsletterForm.querySelector("input");

            if (emailInput.value.trim() !== "") {
                alert("Thank you for joining the NESTORA community!");
                emailInput.value = "";
            }
        });
    }

    const searchButton = document.querySelector('.icon-btn[aria-label="Search"]');

    if (searchButton) {
        searchButton.addEventListener("click", function () {
            const searchTerm = prompt("What are you looking for?");

            if (searchTerm && searchTerm.trim() !== "") {
                const query = searchTerm.trim();

                if (window.location.pathname.includes("shop.html")) {
                    filterShopProducts(query);
                } else {
                    window.location.href = "shop.html?search=" + encodeURIComponent(query);
                }
            }
        });
    }

    function filterShopProducts(query) {
        const products = document.querySelectorAll(".shop-product-card");
        const search = query.toLowerCase().trim();
        let foundProducts = 0;

        products.forEach(function (product) {
            const name = product.querySelector("h3")?.textContent.toLowerCase() || "";
            const description = product.querySelector("p")?.textContent.toLowerCase() || "";

            if (name.includes(search) || description.includes(search)) {
                product.style.display = "";
                foundProducts++;
            } else {
                product.style.display = "none";
            }
        });

        const productCount = document.querySelector(".product-count");

        if (productCount) {
            productCount.textContent = foundProducts === 0
                ? "No products found"
                : `Showing ${foundProducts} product${foundProducts > 1 ? "s" : ""}`;
        }

        let noResults = document.getElementById("noSearchResults");

        if (foundProducts === 0) {
            if (!noResults) {
                noResults = document.createElement("p");
                noResults.id = "noSearchResults";
                noResults.textContent = "No products found. Try another search.";
                noResults.style.textAlign = "center";
                noResults.style.margin = "40px 0";
                noResults.style.fontSize = "16px";
                document.querySelector(".shop-products-grid").after(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }

    if (window.location.pathname.includes("shop.html")) {
        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get("search");

        if (searchQuery) {
            filterShopProducts(searchQuery);
        }
    }

    const cartButton = document.querySelector(".cart-btn");

    if (cartButton) {
        cartButton.addEventListener("click", function () {
            const cartCount = cart.reduce(function (total, item) {
                return total + (Number(item.quantity) || 1);
            }, 0);

            if (cartCount === 0) {
                alert("Your cart is currently empty.");
            } else {
                alert(`You have ${cartCount} item(s) in your cart.`);
            }
        });
    }

    const sortSelect = document.querySelector("#sort");
    const productsGrid = document.querySelector(".shop-products-grid");

    if (sortSelect && productsGrid) {
        sortSelect.addEventListener("change", function () {
            const products = Array.from(productsGrid.querySelectorAll(".shop-product-card"));

            if (this.value === "low") {
                products.sort((a, b) => {
                    const priceA = parseInt(a.querySelector(".price").textContent.replace(/[^\d]/g, ""));
                    const priceB = parseInt(b.querySelector(".price").textContent.replace(/[^\d]/g, ""));
                    return priceA - priceB;
                });
            } else if (this.value === "high") {
                products.sort((a, b) => {
                    const priceA = parseInt(a.querySelector(".price").textContent.replace(/[^\d]/g, ""));
                    const priceB = parseInt(b.querySelector(".price").textContent.replace(/[^\d]/g, ""));
                    return priceB - priceA;
                });
            } else if (this.value === "featured") {
                products.sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
            } else if (this.value === "newest") {
                products.sort((a, b) => Number(b.dataset.new) - Number(a.dataset.new));
            }

            products.forEach(function (product) {
                productsGrid.appendChild(product);
            });
        });
    }
});

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const passwordToggle = document.getElementById("passwordToggle");
    const loginMessage = document.getElementById("loginMessage");

    if (passwordToggle) {
        passwordToggle.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                passwordToggle.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
                passwordToggle.setAttribute("aria-label", "Hide password");
            } else {
                passwordInput.type = "password";
                passwordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';
                passwordToggle.setAttribute("aria-label", "Show password");
            }
        });
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        loginMessage.textContent = "";

        if (!email || !password) {
            loginMessage.textContent = "Please enter your email and password.";
            return;
        }

        if (email === "admin@nestora.com" && password === "123456") {
            loginMessage.textContent = "Login successful!";
            loginMessage.style.color = "green";

            localStorage.setItem("nestoraLoggedIn", "true");

            setTimeout(function () {
                window.location.href = "index.html";
            }, 1000);
        } else {
            loginMessage.textContent = "Invalid email or password.";
            loginMessage.style.color = "#b33";
        }
    });
}

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {
    forgotPassword.addEventListener("click", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("loginEmail");
        const loginMessage = document.getElementById("loginMessage");
        const email = emailInput.value.trim();

        if (!email) {
            loginMessage.textContent = "Please enter your email address first.";
            loginMessage.style.color = "#b33";
            emailInput.focus();
            return;
        }

        loginMessage.textContent = "Password reset instructions will be sent to your email.";
        loginMessage.style.color = "green";
    });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    const password = document.getElementById("registerPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const message = document.getElementById("registerMessage");
    const passwordToggle = document.getElementById("registerPasswordToggle");
    const confirmPasswordToggle = document.getElementById("confirmPasswordToggle");

    if (passwordToggle) {
        passwordToggle.addEventListener("click", function () {
            if (password.type === "password") {
                password.type = "text";
                passwordToggle.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
            } else {
                password.type = "password";
                passwordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';
            }
        });
    }

    if (confirmPasswordToggle) {
        confirmPasswordToggle.addEventListener("click", function () {
            if (confirmPassword.type === "password") {
                confirmPassword.type = "text";
                confirmPasswordToggle.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
            } else {
                confirmPassword.type = "password";
                confirmPasswordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';
            }
        });
    }

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const firstName = document.getElementById("registerFirstName").value.trim();
        const lastName = document.getElementById("registerLastName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();

        message.textContent = "";

        if (password.value.length < 6) {
            message.textContent = "Password must be at least 6 characters.";
            message.style.color = "#b33";
            return;
        }

        if (password.value !== confirmPassword.value) {
            message.textContent = "Passwords do not match.";
            message.style.color = "#b33";
            return;
        }

        message.textContent = "Account created successfully!";
        message.style.color = "green";

        localStorage.setItem("nestoraUser", JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email
        }));

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1200);
    });
}

const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {
    const cardNumber = document.getElementById("cardNumber");
    const expiryDate = document.getElementById("expiryDate");
    const cvv = document.getElementById("cvv");
    const paymentMessage = document.getElementById("paymentMessage");

    cardNumber.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        value = value.substring(0, 16);
        value = value.replace(/(.{4})/g, "$1 ").trim();
        this.value = value;
    });

    expiryDate.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        value = value.substring(0, 4);

        if (value.length >= 3) {
            value = value.substring(0, 2) + "/" + value.substring(2);
        }

        this.value = value;
    });

    cvv.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").substring(0, 3);
    });

    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const cardName = document.getElementById("cardName").value.trim();
        const cardNumberValue = cardNumber.value.replace(/\s/g, "");
        const expiryValue = expiryDate.value.trim();
        const cvvValue = cvv.value.trim();

        if (cardNumberValue.length !== 16) {
            paymentMessage.textContent = "Please enter a valid 16-digit card number.";
            return;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryValue)) {
            paymentMessage.textContent = "Please enter a valid expiry date (MM/YY).";
            return;
        }

        if (cvvValue.length !== 3) {
            paymentMessage.textContent = "Please enter a valid 3-digit CVV.";
            return;
        }

        paymentMessage.textContent = "Payment successful!";

        setTimeout(function () {
            window.location.href = "success.html";
        }, 800);
    });
}