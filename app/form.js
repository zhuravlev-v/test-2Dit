const form = document.querySelector('#form');

form.addEventListener('submit', submitHandler);

async function submitHandler(e) {
  e.preventDefault();

  let formData = new FormData(form);

  fetch('https://mockend.com/Valeriy-Zhuravlev/mockend-test/users', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => {
      if (response.ok) {
        alert(`Data sent successfully \n${JSON.stringify(Object.fromEntries(formData), null, 2)}`);
      }
    })
    .catch(err => console.log(err))
};