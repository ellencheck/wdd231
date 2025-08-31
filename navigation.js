const menuButton = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('.nav a').forEach(a => {
  if (a.getAttribute('href') === './' || a.getAttribute('href') === window.location.pathname.split('/').pop()) {
    a.classList.add('active');
  }
});
