document.addEventListener("DOMContentLoaded",function(){
    const contactForm=document.querySelector(".contact-form");
    if(!contactForm){
        return;
    }

    contactForm.addEventListener("submit",function(event){
        event.preventDefault();

        const firstName=document.getElementById("firstName").value.trim();
        const lastName=document.getElementById("lastName").value.trim();
        const email=document.getElementById("email").value.trim();
        const subject=document.getElementById("subject").value.trim();
        const message=document.getElementById("message").value.trim();

        if(!firstName||!lastName||!email||!subject||!message){
            alert("Please fill in all fields.");
            return;
        }

        alert(`Thank you, ${firstName}! Your message has been sent successfully.`);
        contactForm.reset();
    });
});