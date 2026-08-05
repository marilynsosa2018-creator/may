/**
 * Gemilaza Landing Page - Custom JavaScript
 * Interactive Functionality: Mobile Menu, Scroll Animations, Form Validation & Submission
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. MOBILE MENU TOGGLE & ACCESSIBILITY
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNavigation = document.getElementById('primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && primaryNavigation) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.contains('open');

      if (isOpen) {
        // Close menu
        menuToggle.classList.remove('open');
        primaryNavigation.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scroll
      } else {
        // Open menu
        menuToggle.classList.add('open');
        primaryNavigation.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (primaryNavigation.classList.contains('open')) {
          menuToggle.classList.remove('open');
          primaryNavigation.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // 2. ACTIVE NAV LINK ON SCROLL & SMOOTH SCROLLING
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // adjust offset for sticky header
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink);

  // 3. SCROLL-ANIMATE (FADE-IN EFFECT FOR SECTIONS)
  const animElements = document.querySelectorAll('.scroll-animate');

  if ('IntersectionObserver' in window) {
    const animObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, {
      threshold: 0.15, // trigger when 15% of section is visible
      rootMargin: '0px 0px -50px 0px'
    });

    animElements.forEach(el => animObserver.observe(el));
  } else {
    // Fallback for browsers that do not support IntersectionObserver
    animElements.forEach(el => el.classList.add('animated'));
  }

  // 4. CONTACT FORM VALIDATION & INTERACTIVE HANDLING (No Backend)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset errors and invalid styles
      let isValid = true;
      const inputs = contactForm.querySelectorAll('.form-control');
      inputs.forEach(input => {
        input.classList.remove('is-invalid');
        // Map form control IDs (e.g., form-name) to error IDs (e.g., name-error)
        const errorId = input.id.replace('form-', '') + '-error';
        const errorSpan = document.getElementById(errorId);
        if (errorSpan) errorSpan.style.display = 'none';
      });

      // Name validation
      const nameInput = document.getElementById('form-name');
      if (nameInput && !nameInput.value.trim()) {
        isValid = false;
        nameInput.classList.add('is-invalid');
        const err = document.getElementById('name-error');
        if (err) err.style.display = 'block';
      }

      // Phone validation (8 digits Guatemalan phone numbers validation)
      const phoneInput = document.getElementById('form-phone');
      const phoneRegex = /^[23456789]\d{7}$/; // Simple Guatemalan regex (Starts with valid digit, 8 numbers total)
      if (phoneInput) {
        const cleanPhone = phoneInput.value.replace(/[-\s]/g, ''); // strip hyphens or spaces
        if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
          isValid = false;
          phoneInput.classList.add('is-invalid');
          const err = document.getElementById('phone-error');
          if (err) err.style.display = 'block';
        }
      }

      // Optional Email validation (if filled)
      const emailInput = document.getElementById('form-email');
      if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          isValid = false;
          emailInput.classList.add('is-invalid');
          const err = document.getElementById('email-error');
          if (err) err.style.display = 'block';
        }
      }

      // Message validation
      const messageInput = document.getElementById('form-message');
      if (messageInput && !messageInput.value.trim()) {
        isValid = false;
        messageInput.classList.add('is-invalid');
        const err = document.getElementById('message-error');
        if (err) err.style.display = 'block';
      }

      // If form is valid, trigger simulated success response
      if (isValid) {
        // Visual feedback during processing
        const originalBtnText = formSubmitBtn.innerHTML;
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = '<span>Enviando mensaje... ⏳</span>';

        setTimeout(() => {
          // Success Feedback
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong>¡Mensaje Enviado con Éxito!</strong><br>
            Gracias, ${nameInput.value.trim()}. Nos comunicaremos contigo al teléfono ${phoneInput.value.trim()} lo antes posible para atender tu solicitud.
          `;

          // Reset form inputs
          contactForm.reset();

          // Reset submit button
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = originalBtnText;

          // Scroll status message into view
          formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          // Clear success message after 10 seconds
          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 10000);
        }, 1500); // 1.5 seconds simulation delay
      } else {
        // If invalid, display overall error status
        formStatus.className = 'form-status error';
        formStatus.innerHTML = '<strong>Error de validación:</strong> Por favor complete los campos requeridos correctamente.';
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});
