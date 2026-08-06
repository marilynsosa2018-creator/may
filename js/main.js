/**
 * COINSA Landing Page - Custom JavaScript
 * Interactive Functionality: Mobile Menu, Active Scroll Navigation, Scroll Animations
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
});
