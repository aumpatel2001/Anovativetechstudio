const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const emailJsUserId = "YOUR_USER_ID"; // Replace with your EmailJS user ID
const emailJsServiceId = "YOUR_SERVICE_ID"; // Replace with your EmailJS service ID
const emailJsTemplateId = "YOUR_TEMPLATE_ID"; // Replace with your EmailJS template ID

// Initialize EmailJS
(function() {
  if (emailJsUserId.includes("YOUR_")) {
    console.warn("EmailJS user ID is not configured. Update script.js with your EmailJS user ID.");
  }
  emailjs.init(emailJsUserId);
})();

function sendMessage(event) {
  event.preventDefault();

  if (emailJsUserId.includes("YOUR_") || emailJsServiceId.includes("YOUR_") || emailJsTemplateId.includes("YOUR_")) {
    document.getElementById("formStatus").textContent = "Email service not configured yet. Update EmailJS IDs in script.js.";
    return;
  }

  const templateParams = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value,
    to_email: "aumpatidar18@gmail.com"
  };

  document.getElementById("formStatus").textContent = "Sending...";

  emailjs.send(emailJsServiceId, emailJsTemplateId, templateParams)
    .then(function(response) {
      document.getElementById("formStatus").textContent = "Message sent successfully!";
      document.querySelector(".contact-form").reset();
    }, function(error) {
      document.getElementById("formStatus").textContent = "Failed to send message. Please try again.";
      console.error("EmailJS error:", error);
    });
}
