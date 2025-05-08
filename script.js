// Theme Switcher
const themeButton = document.querySelector(".theme-button");
const body = document.body;

// Check for saved theme in local storage
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
}

// Toggle theme on button click
themeButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    
    // Save theme preference in local storage
    if (body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

function openLightbox(imgElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = imgElement.src;
    lightbox.style.display = "flex";
  }
  
  function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
  }
  

  const form = document.querySelector("#contactForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
  
    // Clear old error messages
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
    document.querySelector("#country-info").textContent = "";
  
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const message = document.querySelector("#message").value.trim();
  
    let hasError = false;
  
    if (!name) {
      document.getElementById("name-error").textContent = "Name is required.";
      hasError = true;
    }
  
    if (!email) {
      document.getElementById("email-error").textContent = "Email is required.";
      hasError = true;
    }
  
    if (!phone) {
      document.getElementById("phone-error").textContent = "Phone number is required.";
      hasError = true;
    } else if (!/^\+\d+$/.test(phone)) {
      document.getElementById("phone-error").textContent = "Use only numbers with country code (e.g., +639123456789).";
      hasError = true;
    }
  
    if (!message) {
      document.getElementById("message-error").textContent = "Message is required.";
      hasError = true;
    }
  
    if (hasError) return;
  
    try {
      // Email Validation API
      const emailResp = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=e1fdb4ceff404e578faac9701f0641c8&email=${email}`);
      const emailData = await emailResp.json();
  
      if (!emailData.deliverability || emailData.deliverability !== "DELIVERABLE") {
        document.getElementById("email-error").textContent = "Invalid or undeliverable email.";
        return;
      }
  
      // Phone Validation API
      const phoneResp = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=553100c5061f45048f0495ecb0b161f1&phone=${phone}`);
      const phoneData = await phoneResp.json();
  
      if (!phoneData.valid) {
        document.getElementById("phone-error").textContent = "Invalid phone number.";
        return;
      }
  
      // Display detected country
      document.getElementById("country-info").textContent = `📍 Detected Country: ${phoneData.country?.name || "Unknown"}`;
  
      alert("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Validation error:", error);
      alert("Error validating data. Please try again.");
    }
  });

  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
  
  