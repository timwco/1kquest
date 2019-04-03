import Chart from 'chart.js';

class Dashboard {

  displayCalendar(location, days) {
    const calendar = jsCalendar.new(location, "now", {
      "navigatorPosition": "right",
      "monthFormat": "month YYYY",
      "fdotw": "2",
      "firstDayOfTheWeek": "2"
    });
    console.log('DAYS', days);
    calendar.select(days);    
  }

  displayChart (type, location, quest) {
    switch (type) {
    case 'quest':
      this.questChart(location, quest);
      break;
    }
  }

  displayProgress (location, stat) {
    let elem = document.getElementById(location);
    elem.innerHTML = `
      <progress class="progress is-info" value="${stat}" max="1000"></progress>
    `;
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
          backgroundColor: '#8ecc3b',
          borderColor: '#8ecc3b'
        },
        {
          label: quest.squat.name,
          fill: false,
          data: quest.squat.dataset.sort(),
          backgroundColor: '#5C80BC',
          borderColor: '#5C80BC'
        },
        {
          label: quest.dead.name,
          fill: false,
          data: quest.dead.dataset.sort(),
          backgroundColor: '#2C4251',
          borderColor: '#2C4251'
        }
      ]
    };

    new Chart(ctx, { type: 'line', data: data });

  }

}
export default Dashboard;