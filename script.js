// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu after clicking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form — submits to Formspree (https://formspree.io) so messages
// land straight in your inbox, without opening the visitor's email app.
// Setup: sign up free at formspree.io, create a form, and paste your
// endpoint into the form's `action` attribute in index.html, replacing
// https://formspree.io/f/YOUR_FORM_ID with your real one.
const chatForm = document.getElementById('chatForm');
const chatStatus = document.getElementById('chatFormStatus');

if (chatForm && chatStatus) {
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = chatForm.name.value.trim();
    const email = chatForm.email.value.trim();
    const message = chatForm.message.value.trim();

    if (!name || !email || !message) {
      chatStatus.textContent = 'Please fill in your name, email, and message.';
      chatStatus.classList.add('is-error');
      return;
    }

    const submitBtn = chatForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    chatStatus.classList.remove('is-error');
    chatStatus.textContent = 'Sending…';

    try {
      const response = await fetch(chatForm.action, {
        method: 'POST',
        body: new FormData(chatForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        chatStatus.textContent = "Thanks! Your message is on its way — we'll get back to you soon.";
        chatForm.reset();
      } else {
        chatStatus.classList.add('is-error');
        chatStatus.textContent = 'Something went wrong sending that. Please try again, or email us directly.';
      }
    } catch (err) {
      chatStatus.classList.add('is-error');
      chatStatus.textContent = 'Something went wrong sending that. Please check your connection and try again.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
