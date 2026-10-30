/**
 * AVATHAR AI ACADEMY — MAIN APPLICATION SCRIPT
 * Navigation, Scroll Effects, Modals, Dynamic WhatsApp Links & Interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Navigation Sticky Effect on Scroll
  const header = document.querySelector('.site-header');
  function handleScroll() {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Highlight Active Navigation Item
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href && href !== '#' && pageName.includes(href)) {
      link.classList.add('active');
    }
  });

  // 4. Scroll-Triggered Animations (IntersectionObserver)
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // If not supported or reduced-motion is requested, show immediately
    document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('is-visible'));
  }

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Dynamic WhatsApp Button Links Setup
  if (typeof AVATHAR_CONFIG !== 'undefined') {
    document.querySelectorAll('[data-whatsapp-btn]').forEach(btn => {
      const customMsg = btn.getAttribute('data-whatsapp-msg');
      btn.setAttribute('href', AVATHAR_CONFIG.getWhatsAppUrl(customMsg));
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });

    // Populate phone numbers and addresses dynamically if placeholders exist
    document.querySelectorAll('[data-brand-phone]').forEach(el => {
      el.textContent = AVATHAR_CONFIG.phoneFormatted;
    });
    document.querySelectorAll('[data-brand-address]').forEach(el => {
      el.textContent = AVATHAR_CONFIG.address;
    });
  }

  // 7. Generic Modal Dialog Logic (if modal container present)
  window.openEnquiryModal = function (courseOrDomainName, type = 'course') {
    const modal = document.getElementById('enquiry-modal');
    if (!modal) {
      // Fallback: navigate directly to contact/internships page with parameter
      if (type === 'internship') {
        window.location.href = `internships.html#apply?domain=${encodeURIComponent(courseOrDomainName || '')}`;
      } else {
        window.location.href = `contact.html?course=${encodeURIComponent(courseOrDomainName || '')}#enquiry`;
      }
      return;
    }

    const titleEl = modal.querySelector('.modal-title');
    const selectEl = modal.querySelector('#modal-course-select');
    if (titleEl) {
      titleEl.textContent = type === 'internship' ? `Apply: ${courseOrDomainName || 'Internship'}` : `Enquire: ${courseOrDomainName || 'Course'}`;
    }
    if (selectEl && courseOrDomainName) {
      selectEl.value = courseOrDomainName;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeEnquiryModal = function () {
    const modal = document.getElementById('enquiry-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modal on click outside
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        window.closeEnquiryModal();
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeEnquiryModal();
    }
  });
});
