const axios = require('axios');

// Classes
import App from './classes/app';

// Set variables
// Set Elements Id's
const elems = {
  stats : {
    progress: 'progress',
    quest: 'stat-quest',
    bench: 'stat-bench',
    squat: 'stat-squat',
    dead:  'stat-dead',
    statLifted: 'stat-lifted',
    statWorkouts: 'stat-workouts'
  },
  charts: {
    chartQuest: 'chart-quest'
  }
};

// Data URL
const url = 'https://quest1k.herokuapp.com/data';

// Launch
axios.get(url)
  .then(function (response) {
    const { error } = response.data;
    if (error) return displayErr(error);
    new App(elems, response.data).init();
  })
  .catch(function (error) {
    console.log('ERROR', error);
  })

function displayErr(err) {
  document.write(`Error: ${err}`);
}
