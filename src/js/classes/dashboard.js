import Chart from 'chart.js';

class Dashboard {

  displayChart (type, location, quest) {
    switch (type) {
      case 'quest':
        this.questChart(location, quest);
      break;
    }
  }

  displayStat (location, stat) {
    const elem = document.getElementById(location);
    elem.innerHTML = stat;
  }

  // Specific Charts
  questChart (location, quest) {
    let ctx = document.getElementById(location);
    let len = quest.bench.dataset.length;
    let labels = new Array(len);
    let data = {
      labels: labels,
      datasets: [
        {
          label: quest.bench.name,
          fill: false,
          data: quest.bench.dataset.sort(),
          backgroundColor: '#51b6c3',
          borderColor: '#51b6c3',
        },
        {
          label: quest.squat.name,
          fill: false,
          data: quest.squat.dataset.sort(),
          backgroundColor: '#fb6080',
          borderColor: '#fb6080',
        },
        {
          label: quest.dead.name,
          fill: false,
          data: quest.dead.dataset.sort(),
          backgroundColor: '#97c475',
          borderColor: '#97c475'
        }
      ]
    };

    new Chart(ctx, { type: 'line', data: data });

  }

}
export default Dashboard;