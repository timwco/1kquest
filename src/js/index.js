import Papa from 'papaparse';

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

// CSV URL
const url = 'https://dl.dropboxusercontent.com/s/ysbufta2debgs7q/strong.csv';


// Download our data, parse it to JSON, then initialize the app.
Papa.parse(url, { header: true, download: true, complete: start });


// Create our App
function start (results) { 
  // There's a story here, @me if you are curious :D
  const fakeDeadlift = {
    'Date': '2019-01-23 05:20:00',
    'Distance': '0',
    'Exercise Name': 'Deadlift',
    'Notes': '',
    'Reps': '12',
    'Seconds': '0',
    'Set Order': '1',
    'Weight': '225',
    'Workout Name': '',
    'Workout Notes': ''
  };
  results.data.push(fakeDeadlift);
  new App(elems, results).init(); 
}
