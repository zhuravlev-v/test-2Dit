const form = document.querySelector('.form');

form.addEventListener('submit', async (e) => {
  // e.preventDefault();

  let formData = new FormData(form);
  
  const response = await fetch('sendmail.php', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const result = await response.json();
    alert(result.message);
    form.reset();
  } else {
    alert(`Error. Data has not been sent.
      ${JSON.stringify(Object.fromEntries(formData.entries()))}
    `);
  }

});