
// =====================================
// CICLOSAFE - FUNCIONES PRINCIPALES
// =====================================

// MENÚ RESPONSIVE

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    // Cerrar menú al seleccionar una sección

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Abrir menú");

            menuToggle.textContent = "☰";

        });

    });

}

// =====================================
// AÑO AUTOMÁTICO DEL FOOTER
// =====================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// =====================================
// VALIDACIÓN DEL FORMULARIO
// =====================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const servicio = document.getElementById("servicio").value;
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !correo || !servicio || !mensaje) {

            formMessage.textContent =
                "Por favor, completa todos los campos.";

            return;

        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {

            formMessage.textContent =
                "Por favor, ingresa un correo electrónico válido.";

            return;

        }

        // Por ahora no se envía información a un servidor.
        // Más adelante podemos integrar EmailJS.

        formMessage.textContent =
            "¡Gracias, " + nombre +
            "! El formulario funciona correctamente. Pronto habilitaremos el envío de mensajes.";

        contactForm.reset();

    });

}

// =====================================
// ANIMACIÓN SUAVE DE ENTRADA
// =====================================

const animatedElements = document.querySelectorAll(
    ".service-card, .intro-text, .benefits-grid, .contact-form"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    animatedElements.forEach(element => {

        element.classList.add("animate-element");

        observer.observe(element);

    });

}
