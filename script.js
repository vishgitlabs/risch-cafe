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

// Contact form — mailto submission (no backend needed)
// To upgrade to a real inbox-delivered form instead of opening the visitor's
// email app, sign up free at https://formspree.io, then change this form's
// behaviour to POST to your Formspree endpoint instead (see README.md).
const chatForm = document.getElementById('chatForm');
const chatStatus = document.getElementById('chatFormStatus');
const CAFE_EMAIL = 'hello@rischcafe.com'; // <-- replace with your real inbox

if (chatForm && chatStatus) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = chatForm.name.value.trim();
    const email = chatForm.email.value.trim();
    const message = chatForm.message.value.trim();

    if (!name || !email || !message) {
      chatStatus.textContent = 'Please fill in your name, email, and message.';
      chatStatus.classList.add('is-error');
      return;
    }

    const subject = encodeURIComponent(`Message from ${name} via Risch Café website`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    chatStatus.classList.remove('is-error');
    chatStatus.textContent = 'Opening your email app to send this note…';

    window.location.href = `mailto:${CAFE_EMAIL}?subject=${subject}&body=${body}`;
    chatForm.reset();
  });
}
