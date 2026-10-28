(() => {
  const panel = document.getElementById('floating-contact');
  if (!panel) return;
  let shown;
  const update = () => {
    const visible = window.scrollY > 560;
    if (visible === shown) return;
    shown = visible;
    panel.classList.toggle('is-visible', visible);
    panel.setAttribute('aria-hidden', String(!visible));
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('pageshow', update);
})();
