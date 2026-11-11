
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

    contactForm.addEventListener("submit", async (event) => {

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

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

        if (!correoValido) {
            formMessage.textContent =
                "Por favor, ingresa un correo válido.";
            return;
        }

        formMessage.textContent = "Enviando mensaje...";

        const parametros = {
            nombre: nombre,
            correo: correo,
            servicio: servicio,
            mensaje: mensaje
        };

        try {

            await emailjs.send(
                "service_8bfnthc",
                "template_rqjnf67",
                parametros
            );

            formMessage.textContent =
                "¡Gracias, " + nombre +
                "! Tu mensaje fue enviado correctamente. 🚴";

            contactForm.reset();

        } catch (error) {

            console.error("Error al enviar:", error);

            formMessage.textContent =
                "No se pudo enviar el mensaje. Inténtalo nuevamente.";

        }

    });

}




// =====================================
// VALIDACIÓN Y ENVÍO CON EMAILJS
// =====================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    emailjs.init({
        publicKey: "EHxnhAuRv95hgy7kM"
    });

    contactForm.addEventListener("submit", async (event) => {

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

        const button = contactForm.querySelector('button[type="submit"]');

        if (button) {
            button.disabled = true;
            button.textContent = "Enviando...";
        }

        formMessage.textContent = "Estamos enviando tu mensaje...";

        try {

            await emailjs.send(
                "service_8bfnthc",
                "template_rqjnf67",
                {
                    user_name: nombre,
                    user_email: correo,
                    service: servicio,
                    message: mensaje
                }
            );

            formMessage.textContent =
                "¡Gracias, " + nombre +
                "! Tu mensaje fue enviado correctamente. Pronto nos comunicaremos contigo.";

            contactForm.reset();

        } catch (error) {

            console.error("Error EmailJS:", error);

            formMessage.textContent =
                "No pudimos enviar tu mensaje. Inténtalo nuevamente.";

        } finally {

            if (button) {
                button.disabled = false;
                button.textContent = "Enviar mensaje →";
            }

        }

    });

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
