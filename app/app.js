const capabilities = document.querySelectorAll('.capability__content');

for (const capability of capabilities) {
  const h3 = capability.querySelector('h3');
  const p = capability.querySelector('p');

  const height = getComputedStyle(h3).height;
  p.style.marginTop = height;

}

window.addEventListener('resize', () => {
  for (const capability of capabilities) {
    const h3 = capability.querySelector('h3');
    const p = capability.querySelector('p');
  
    const height = getComputedStyle(h3).height;
    p.style.marginTop = height;
  
  }
});