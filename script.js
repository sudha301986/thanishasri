document.addEventListener("DOMContentLoaded", () => {
    // Update footer year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for internal links (#top, etc.)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId.length > 1) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // Fade-in animation on scroll
    const fadeEls = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => observer.observe(el));

    // Simple contact form validation
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            // Clear previous errors
            const errorFields = ["name", "email", "subject", "message"];
            errorFields.forEach(id => {
                const errorEl = document.getElementById(id + "-error");
                if (errorEl) errorEl.textContent = "";
            });

            let valid = true;

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name.length < 3) {
                document.getElementById("name-error").textContent = "Please enter at least 3 characters.";
                valid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById("email-error").textContent = "Please enter a valid email address.";
                valid = false;
            }

            if (subject.length < 3) {
                document.getElementById("subject-error").textContent = "Subject must be at least 3 characters.";
                valid = false;
            }

            if (message.length < 10) {
                document.getElementById("message-error").textContent = "Message should be at least 10 characters.";
                valid = false;
            }

            const status = document.getElementById("form-status");

            if (!valid) {
                e.preventDefault();
                if (status) {
                    status.style.color = "#b91c1c";
                    status.textContent = "Please fix the errors above and try again.";
                }
            } else {
                // For assignment/demo: prevent actual submission and show success message
                e.preventDefault();
                if (status) {
                    status.style.color = "green";
                    status.textContent = "Thank you! Your message has been (virtually) sent.";
                }
                form.reset();
            }
        });
    }
});
