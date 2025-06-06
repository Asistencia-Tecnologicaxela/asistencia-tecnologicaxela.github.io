// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Suave para Enlaces de Navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Resaltar enlace de navegación activo al hacer scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // Porcentaje de visibilidad para considerar la sección activa
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Eliminar 'active' de todos los enlaces
                navLinks.forEach(link => link.classList.remove('active'));
                // Añadir 'active' al enlace correspondiente a la sección visible
                const activeLink = document.querySelector(`.main-nav ul li a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. (Opcional) Funcionalidad para un menú de hamburguesa (si lo implementas en el HTML)
    // Asume que tienes un botón con la clase '.menu-toggle' y la navegación con la clase '.main-nav'
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
        });

        // Cierra el menú cuando se hace clic en un enlace (útil en móviles)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('nav-open')) {
                    mainNav.classList.remove('nav-open');
                }
            });
        });
    }

    // 4. Validación básica de formulario (cliente-side)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#mensaje');
            let isValid = true;

            // Simple validación de email
            if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
                alert('Por favor, ingresa un correo electrónico válido.');
                isValid = false;
            }

            // Asegurarse de que el mensaje no esté vacío
            if (messageInput.value.trim() === '') {
                alert('El campo de mensaje no puede estar vacío.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Detener el envío del formulario si no es válido
            } else {
                // Aquí podrías agregar un spinner o un mensaje de "enviando..."
                // console.log('Formulario enviado (simulado). En un entorno real, esto se enviaría a un servidor.');
                // alert('Tu mensaje ha sido enviado con éxito. Te contactaremos pronto.');
                // event.preventDefault(); // Esto es solo para simular, remueve en producción para que el formulario se envíe realmente
            }
        });
    }
});
