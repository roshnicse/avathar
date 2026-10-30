/**
 * AVATHAR AI ACADEMY — FORMS & APPLICATION PROCESSING SCRIPT
 * Handles Course Enquiry & Internship Applications,
 * Real-time field validation, query parameter prefilling,
 * and transparent Formspree / WhatsApp lead dispatch.
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Helper: Validate Phone (10 digits minimum or valid international)
  function isValidPhone(phone) {
    const cleaned = phone.replace(/[\s\-\+\(\)]/g, '');
    return /^[0-9]{10,14}$/.test(cleaned);
  }

  // 2. Helper: Validate Email
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  // 3. Helper: Parse URL Query Parameters
  function getQueryParams() {
    const params = {};
    const search = window.location.search.substring(1);
    if (!search) return params;
    search.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
    return params;
  }

  const queryParams = getQueryParams();

  // 4. Handle Course Enquiry Form
  const courseForm = document.getElementById('course-enquiry-form');
  if (courseForm) {
    const courseSelect = courseForm.querySelector('#course-interest');
    
    // Auto-select course from URL query param if present
    if (queryParams.course && courseSelect) {
      const match = Array.from(courseSelect.options).find(opt => 
        opt.value.toLowerCase() === queryParams.course.toLowerCase() ||
        opt.text.toLowerCase().includes(queryParams.course.toLowerCase())
      );
      if (match) {
        courseSelect.value = match.value;
      }
    }

    courseForm.addEventListener('submit', function (e) {
      e.preventDefault();
      processFormSubmission(courseForm, 'course');
    });
  }

  // 5. Handle Internship Application Form
  const internshipForm = document.getElementById('internship-application-form');
  if (internshipForm) {
    const domainSelect = internshipForm.querySelector('#internship-domain');

    // Auto-select domain from URL query param if present
    if (queryParams.domain && domainSelect) {
      const match = Array.from(domainSelect.options).find(opt => 
        opt.value.toLowerCase() === queryParams.domain.toLowerCase() ||
        opt.text.toLowerCase().includes(queryParams.domain.toLowerCase())
      );
      if (match) {
        domainSelect.value = match.value;
      }
    }

    internshipForm.addEventListener('submit', function (e) {
      e.preventDefault();
      processFormSubmission(internshipForm, 'internship');
    });
  }

  // 6. Generic Form Processing Function
  function processFormSubmission(form, formType) {
    const feedbackBanner = form.querySelector('.form-feedback');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Reset validation states
    let isValid = true;
    form.querySelectorAll('.form-control').forEach(input => {
      input.classList.remove('is-invalid');
    });
    if (feedbackBanner) {
      feedbackBanner.className = 'form-feedback';
      feedbackBanner.style.display = 'none';
      feedbackBanner.innerHTML = '';
    }

    // Validate Required Fields
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      const val = input.value.trim();
      if (!val) {
        input.classList.add('is-invalid');
        isValid = false;
      }
    });

    // Validate Email
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim() && !isValidEmail(emailInput.value)) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    }

    // Validate Phone
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value.trim() && !isValidPhone(phoneInput.value)) {
      phoneInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) {
      showFeedback(feedbackBanner, 'error', 'Please correct the highlighted fields and try again.');
      return;
    }

    // Prepare Form Data
    const formData = new FormData(form);
    const dataObj = {};
    formData.forEach((val, key) => dataObj[key] = val);

    // Set Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" style="width: 18px; height: 18px; animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor" opacity="0.25"></circle>
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75"></path>
      </svg>
      Processing...
    `;

    // Check if Formspree endpoint is configured
    const endpoint = (typeof AVATHAR_CONFIG !== 'undefined' && AVATHAR_CONFIG.formspreeEndpoint) ? AVATHAR_CONFIG.formspreeEndpoint.trim() : "";

    if (endpoint && endpoint.startsWith('http')) {
      // Send to genuine configured backend
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
      })
      .then(response => {
        if (response.ok) {
          showFeedback(feedbackBanner, 'success', 'Thank you! Your submission has been received. Our team will contact you shortly.');
          form.reset();
        } else {
          showFeedback(feedbackBanner, 'error', 'There was an issue sending your submission. Please reach us directly via WhatsApp.');
        }
      })
      .catch(err => {
        showFeedback(feedbackBanner, 'error', 'Network error encountered. Please submit via WhatsApp below.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
    } else {
      // Backend not yet configured. Provide transparent feedback and direct WhatsApp dispatch!
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Construct prefilled WhatsApp message
        let waText = "";
        if (formType === 'internship') {
          waText = `*Internship Application - Avathar AI Academy*\n\n` +
            `*Name:* ${dataObj.fullName || ''}\n` +
            `*Phone:* ${dataObj.mobile || ''}\n` +
            `*Email:* ${dataObj.email || ''}\n` +
            `*Domain:* ${dataObj.domain || ''}\n` +
            `*Institution:* ${dataObj.institution || ''}\n` +
            `*Level:* ${dataObj.educationLevel || ''}\n` +
            `*Preferred Mode:* ${dataObj.mode || ''}\n` +
            `*Skills / Message:* ${dataObj.message || ''}`;
        } else {
          waText = `*Course Enquiry - Avathar AI Academy*\n\n` +
            `*Name:* ${dataObj.fullName || ''}\n` +
            `*Phone:* ${dataObj.mobile || ''}\n` +
            `*Email:* ${dataObj.email || ''}\n` +
            `*Course:* ${dataObj.course || ''}\n` +
            `*Preferred Mode:* ${dataObj.mode || ''}\n` +
            `*Message:* ${dataObj.message || ''}`;
        }

        const waUrl = `https://wa.me/919751205260?text=${encodeURIComponent(waText)}`;

        feedbackBanner.className = 'form-feedback warning';
        feedbackBanner.style.display = 'block';
        feedbackBanner.innerHTML = `
          <div style="font-weight: 700; margin-bottom: 0.35rem;">Form Details Validated!</div>
          <div style="font-size: 0.9rem; margin-bottom: 0.85rem; color: #E0E7FF;">
            To submit your ${formType === 'internship' ? 'internship application' : 'course enquiry'} instantly to our admissions desk, click the button below to send your pre-filled details via WhatsApp:
          </div>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-whatsapp">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.832.88 2.796.88 3.178 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.771zm0-2.172c4.418 0 8 3.582 8 8 0 1.488-.415 2.884-1.137 4.084l1.106 4.04-4.148-1.088c-1.163.682-2.51 1.084-3.821 1.084-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8z"/></svg>
            Send via WhatsApp Directly
          </a>
          <div style="font-size: 0.75rem; color: #94A3B8; margin-top: 0.65rem;">
            <em>Note for Webmaster: To enable direct email form receipt, configure your Formspree endpoint inside <code>assets/js/config.js</code>.</em>
          </div>
        `;
      }, 500);
    }
  }

  function showFeedback(banner, type, message) {
    if (!banner) return;
    banner.className = `form-feedback ${type}`;
    banner.style.display = 'block';
    banner.textContent = message;
    banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Pre-fill links for course cards and domain cards on other pages
  document.querySelectorAll('[data-course-apply]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const courseName = this.getAttribute('data-course-apply');
      if (courseSelect) {
        courseSelect.value = courseName;
        document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
