const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const button = form.querySelector("button[type='submit']");
  button.textContent = "Sending...";
  button.disabled = true;
  formStatus.textContent = "Sending your message...";

  try {
    const response = await fetch("https://formsubmit.co/ajax/jjee2577@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: form.elements.name.value,
        email: form.elements.email.value,
        message: form.elements.message.value,
        _subject: "New Portfolio Contact Message",
        _template: "table",
        _captcha: "true"
      })
    });

    const data = await response.json();

    if (!response.ok || data.success !== "true") {
      throw new Error(data.message || "Unable to send the message.");
    }

    formStatus.textContent = "Message sent successfully! I will get back to you soon.";
    form.reset();
  } catch (error) {
    console.error("Contact form error:", error);
    formStatus.textContent = "Could not send the message. Please try again or email me directly at jjee2577@gmail.com.";
  } finally {
    button.textContent = "Send Message";
    button.disabled = false;
  }
});
