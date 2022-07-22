const accordions = document.querySelector('.accordion-block');

accordions.addEventListener('click', (e) => {
  if (!e.target.closest('.accordion__heading')) return;
  
  const heading = e.target.closest('.accordion__heading');

  if (!heading.parentElement.classList.contains('accordion')) return;

  const accordion = heading.parentElement;
  const headingInner = accordion.querySelector('.accordion__heading-inner');
  const content = accordion.querySelector('.accordion__content');
  content.classList.toggle('active');
  headingInner.classList.toggle('active');
});
