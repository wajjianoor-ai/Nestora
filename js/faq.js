document.addEventListener("DOMContentLoaded", function () {

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const currentItem =
                question.closest(".faq-item");

            const currentAnswer =
                currentItem.querySelector(".faq-answer");


            // Close other FAQ items
            document.querySelectorAll(".faq-item").forEach(function (item) {

                if (item !== currentItem) {

                    item.classList.remove("active");

                    const answer =
                        item.querySelector(".faq-answer");

                    answer.style.maxHeight = null;
                }

            });


            // Toggle current item
            currentItem.classList.toggle("active");


            if (currentItem.classList.contains("active")) {

                currentAnswer.style.maxHeight =
                    currentAnswer.scrollHeight + "px";

            } else {

                currentAnswer.style.maxHeight = null;

            }

        });

    });

});