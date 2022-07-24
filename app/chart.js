// ============================== UTILS

function generateLabels(chart) {
  const dataLength = chart.config.data.datasets[0].data.length;
  const legendId = chart.config.data.datasets[0].label;
  const legendList = document.getElementById(legendId);
    
  if (legendList.children.length === dataLength) return;

  const i = legendList.children.length;
  const point = document.createElement('span');
  const li = document.createElement('li');
  point.classList.add('legend__poin');
  li.classList.add('legend__item');
  li.id = legendId + "-label-" + i;

  point.style.backgroundColor = Chart.defaults.backgroundColor[i];

  li.innerText = '- ' + chart.config.data.labels[i];
  li.prepend(point);
  legendList.append(li);
  return li;
}

function onHoverHandler(e, arr, chart) {
  const legendId = chart.config.data.datasets[0].label
  const legendList = document.getElementById(legendId).children;
  if (arr.length === 0) {
    for (const legendItem of legendList) {
      legendItem.style.opacity = '0.5';
    }
    return;
  };
  const i = arr[0].index;
  for (const legendItem of legendList) {
    legendItem.style.opacity = '0.5';
  }      
  if (e.chart._metasets[0].data[i].active) {
    legendList[i].style.opacity = '1';
  } 
}

function resetCharts() {
  chartQntyCountries.destroy();
  chartQntyCities.destroy();
  chartIncomeCountries.destroy();
  chartIncomeCities.destroy();

  const legends = document.querySelectorAll('.legend__list');

  for (const legend of legends) {
    while (legend.firstChild) {
      legend.removeChild(legend.firstChild);
    }
  }

  renderCharts();
}

function centerText() {
  return {
    id: 'centerText',
    afterDatasetDraw(chart, args, options) {
      const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
      const [title, subtitle] = chart.config.data.title;

      ctx.save();
      const paddingDoubled = chart.config.options.layout.padding * 2;
  
      ctx.font = '600 38px "Commissioner"',
      ctx.fillStyle = '#262424';
      ctx.textAlign = 'center';
      ctx.fillText(title, ((width + paddingDoubled) / 2), ((height + paddingDoubled + 10) / 2));
      ctx.restore();
  
      ctx.font = '400 16px "Commissioner"',
      ctx.fillStyle = '#262424';
      ctx.textAlign = 'center';
      ctx.fillText(subtitle, ((width + paddingDoubled) / 2), ((height + paddingDoubled + 10 + 60) / 2));
      ctx.restore();
    }
  }
}

// ============================== CHART JS

Chart.defaults.font.size = 14;
Chart.defaults.datasets.doughnut.cutout = '80%';
Chart.defaults.datasets.doughnut.rotation = 270;
Chart.defaults.elements.arc.borderWidth = 0;
Chart.defaults.backgroundColor = [
  '#b62028',
  '#ed9f20',
  '#403d3d',
  '#005FA7',
  '#808080',
];

const myData = {
  prev: {
    qntyCountries: {
      data: {
        labels: ['Россия','Казахстан','Узбекистан'],
        title: ['335', 'шт.'],
        datasets: [{
          label: 'legend-quantity-countries',
          data: [167.5, 123.95, 43.55],
          hoverOffset: 10,
        }]
      }
    },
    qntyCities: {
      data: {
        labels: ['Тюмень', 'Нур-Султан', 'Ташкент', 'Петербург', 'Алма-Аты'],
        title: ['1065', 'шт.'],
        datasets: [{
          label: 'legend-quantity-cities',
          data: [30, 123.95, 75, 19, 130],
          hoverOffset: 10,
        }]
      }
    },
    incomeCountries: {
      data: {
        labels: ['Россия','Казахстан','Узбекистан'],
        title: ['$ 130', 'млн.'],
        datasets: [{
          label: 'legend-income-countries',
          data: [65, 48.1, 16.9],
          hoverOffset: 10,
        }]
      }
    },
    incomeCities: {
      data: {
        labels: ['Тюмень', 'Нур-Султан', 'Ташкент', 'Петербург', 'Алма-Аты'],
        title: ['$ 130', 'млн.'],
        datasets: [{
          label: 'legend-income-cities',
          data: [301, 123.95, 75, 19, 130],
          hoverOffset: 10,
        }]
      }
    },
  },
  next: {
    qntyCountries: {
      data: {
        labels: ['Россия','Казахстан','Узбекистан'],
        title: ['380', 'шт.'],
        datasets: [{
          label: 'legend-quantity-countries',
          data: [47, 34, 78],
          hoverOffset: 10,
        }]
      }
    },
    qntyCities: {
      data: {
        labels: ['Тюмень','Нур-Султан','Ташкент', 'Петербург', 'Алма-Аты'],
        title: ['2000', 'шт.'],
        datasets: [{
          label: 'legend-quantity-cities',
          data: [31, 23.95, 150, 33, 50],
          hoverOffset: 10,
        }]
      }
    },
    incomeCountries: {
      data: {
        labels: ['Россия','Казахстан','Узбекистан'],
        title: ['150', 'млн.'],
        datasets: [{
          label: 'legend-income-countries',
          data: [38, 52, 8],
          hoverOffset: 10,
        }]
      }
    },
    incomeCities: {
      data: {
        labels: ['Тюмень','Нур-Султан','Ташкент', 'Петербург', 'Алма-Аты'],
        title: ['170', 'млн.'],
        datasets: [{
          label: 'legend-income-cities',
          data: [80, 20, 15, 17, 56],
          hoverOffset: 10,
        }]
      }
    },
  },
}

let period = 'prev';

const config = {
  type: 'doughnut',
  options: {
    onHover: (e, arr, chart) => {
      onHoverHandler(e, arr, chart);
    },
    plugins: {
      tooltip: { enabled: false },
      legend: {
        labels: {
          generateLabels: function(chart) {
            generateLabels(chart);
          }
        },
      },
    },
    layout: {
      padding: 10,
    },
    interaction: {
      mode: 'nearest'
    }
  },
  plugins: [centerText()],
}

let chartQntyCountries;
let chartQntyCities;
let chartIncomeCountries;
let chartIncomeCities;

function renderCharts() {
  const chartQntyCountriesConfig = {
    ...config,
    data: myData[period].qntyCountries.data,
  }
  
  const chartQntyCitiesConfig = {
    ...config,
    data: myData[period].qntyCities.data,
  }
  
  const chartIncomeCountriesConfig = {
    ...config,
    data: myData[period].incomeCountries.data,
  }
  
  const chartIncomeCitiesConfig = {
    ...config,
    data: myData[period].incomeCities.data,
  }
  
  // ============================== INITIALIZATION
  
  chartQntyCountries = new Chart(
    document.getElementById('chart-quantity-countries'),
    chartQntyCountriesConfig
  );
  
  chartQntyCities = new Chart(
    document.getElementById('chart-quantity-cities'),
    chartQntyCitiesConfig
  );
  
  chartIncomeCountries = new Chart(
    document.getElementById('chart-income-countries'),
    chartIncomeCountriesConfig
  );
  
  chartIncomeCities = new Chart(
    document.getElementById('chart-income-cities'),
    chartIncomeCitiesConfig
  );
  
  chartQntyCities.update();
  chartIncomeCities.update();
}

document.addEventListener("DOMContentLoaded", renderCharts);

// ============================== DOM MANIPULATIONS

const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.onclick= function(e) {
  const toggleBtnThumb = document.querySelector('.toggle-btn-thumb');
  toggleBtnThumb.classList.toggle('active');

  const toggleBtnLabels = document.querySelectorAll('.toggle-btn__label');
  for (const label of toggleBtnLabels) {
    if (label.classList.contains('active')) {
      label.classList.remove('active');
    } else {
      label.classList.add('active');
      period = label.id;     
    }
  }
  resetCharts();
}