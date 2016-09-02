import Papa from 'papaparse';
import Chart from 'chart.js';

// Classes
import App from './classes/app';

// Set variables
// Set Elements Id's
const elems = {
  stats : {
    quest: 'stat-quest',
    bench: 'stat-bench',
    squat: 'stat-squat',
    dead:  'stat-dead',
    statLifted: 'stat-lifted',
    statWorkouts: 'stat-workouts'
  },
  charts: {
    chartQuest: 'chart-quest',
    chartWeight: 'chart-weight'
  }
};

// CSV URL
const url = 'https://dl.dropboxusercontent.com/s/xv78m80mxbmnqdc/strong.csv';


// Download our data, parse it to JSON, then initialize the app.
Papa.parse(url, { header: true, download: true, complete: start });


// Create our App
function start (results) { new App(elems, results).init() }