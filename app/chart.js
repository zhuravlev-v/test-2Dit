const data = {
  labels: [
    'Russia',
    'Kazakhstan',
    'Uzbekistan'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(182, 32, 40)',
      'rgb(237, 159, 32)',
      'rgb(64, 61, 61)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'doughnut',
  data: data,
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);