
// =========================================
// PORTFOLIO JAVASCRIPT
// =========================================


// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});


// Close the mobile menu when a navigation link is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});


// Close mobile navigation with Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


// Reset mobile menu when returning to desktop layout
window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        closeMenu();
    }
});


// Highlight the current navigation section
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const currentId = entry.target.id;

                navLinks.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${currentId}`;

                    link.classList.toggle("active", isActive);
                });
            });
        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


// Update footer year automatically
const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();


// Contact form
// This opens the visitor's email application.
// It does not send an email directly from the website.
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

const portfolioEmail = "srushtibasavaraj13@gmail.com";

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formNote.textContent = "Please complete all the fields.";
        return;
    }

    const subject = encodeURIComponent(
        `Portfolio message from ${name}`
    );

    const body = encodeURIComponent(
        `Hello Srushti,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
    );

    const mailtoLink =
        `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;

    formNote.textContent =
        "Opening your email application. If it does not open, use the email link on this page.";

    window.location.href = mailtoLink;
});

