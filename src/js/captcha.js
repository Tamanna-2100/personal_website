// captcha.js — simplified handler to open user's email client with prefilled message
// Submissions are addressed to gaurtamanna20@gmail.com by the readable handler below.

let isCaptchaVisible = false;

function showAlert(message, success = false) {
    const el = document.createElement('div');
    el.textContent = message;
    Object.assign(el.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: success ? '#4CAF5044' : '#f4433644',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: '1000',
        transition: 'opacity 0.5s'
    });
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => document.body.removeChild(el), 500); }, 3000);
}

function validateCaptcha() {
    if (window.hcaptcha && typeof hcaptcha.getResponse === 'function') {
        if (!hcaptcha.getResponse()) {
            showAlert('Please complete the hCaptcha');
            return false;
        }
    }
    return true;
}

function submitForm(e) {
    if (e) e.preventDefault();

    const form = document.getElementById('contact-form');
    if (!form) return;

    if (!validateCaptcha()) return;

    const name = (form.querySelector('#name') && form.querySelector('#name').value) || '';
    const email = (form.querySelector('#email') && form.querySelector('#email').value) || '';
    const message = (form.querySelector('#message') && form.querySelector('#message').value) || '';

    const to = 'gaurtamanna20@gmail.com';
    const subject = encodeURIComponent(`Website contact from ${name || 'Visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    // Open user's email client (user must click send in their mail client to deliver)
    window.location.href = mailto;

    showAlert('Opened your email client — please send the message to complete submission.', true);
    form.reset();
    if (window.hcaptcha && typeof hcaptcha.reset === 'function') hcaptcha.reset();
    toggleCaptchaVisibility(false);
}

function toggleCaptchaVisibility(visible) {
    const el = document.querySelector('.h-captcha');
    if (!el) return;
    isCaptchaVisible = visible;
    el.style.opacity = visible ? '1' : '0';
    if (!visible) setTimeout(() => { if (!isCaptchaVisible) el.style.opacity = '0'; }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const contactForm = document.getElementById('contact-form');
    toggleCaptchaVisibility(false);

    if (emailInput) {
        emailInput.addEventListener('input', () => toggleCaptchaVisibility(emailInput.value.includes('@')));
    }
    if (contactForm) {
        contactForm.addEventListener('submit', submitForm);
    }
});

// NOTE: removed the obfuscated handler that attempted to POST to Google Forms.
// If you want background submission (no email client), see the next steps in the repo README or ask me
// and I can wire Formspree/EmailJS/a serverless function for reliable delivery.