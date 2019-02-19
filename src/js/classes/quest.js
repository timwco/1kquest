import _ from 'lodash';
import moment from 'moment';

class Quest {

  constructor () {
    this.quest = {};
  }

  init (results) {
    // Our entire workout data
    const fixed = this.fixData(results.data);
    const data = this.newStart(fixed); // Starting 2019

    // Set the big 3
    this.quest.bench  = this.getExerciseData(data, 'Bench Press (Barbell)');
    this.quest.squat  = this.getExerciseData(data, 'Squat (Barbell)');
    this.quest.dead   = this.getExerciseData(data, 'Deadlift');
    this.quest.quest  = this.quest.bench.max + this.quest.squat.max + this.quest.dead.max; 

    // Total Workouts
    this.quest.totalWorkouts = this.totalWorkouts(data);

    // Total Weight Lifted
    this.quest.totalWeight = this.numberWithCommas(this.totalWeight(data));

    // Return our prepared object
    return this.quest;
  }

  // Generates the exercise data
  // array, string -> object
  getExerciseData (data, exercise) {
    let exData = {};
    exData.name = exercise;
    // Get a list of all by the exercise name
    exData.all = _.filter(data, {'Exercise Name': exercise});
    // Build the dataset & labels for the charts
    let byDate = _.uniqBy(exData.all, 'Date');
    exData.dataset = [];
    _.forEach(byDate, d => {
      let days = _.filter(exData.all, {'Date': d.Date});
      exData.dataset.push(_.maxBy(days, s => Number(s.Weight)).Weight);
    });
    exData.dataset.splice(24, 3); // SUPER janky... hate this, but data is screwy, only fix so far.
    exData.labels = _.uniq(_(byDate).map( s => moment(s.Date).format('[Day] DDD \'YY')).value());
    // Get the max weight lifted
    exData.max = Number(_.maxBy(exData.all, s => Number(s.Weight)).Weight);
    return exData;
  }

  // Fixes data that was stored incorrectly initially
  // arran -> array
  fixData (data) {
    return _.map(data, ex => {
      if (ex['Exercise Name'] === 'Romanian Deadlift' || ex['Exercise Name'] === 'Rack Pulls'){
        ex['Exercise Name'] = 'Deadlift';
      } 
      return ex;
    });
  }

  newStart (data) {
    const start = new Date('2019-01-01 00:00:00');
    return _.filter(data, row => {
      const date = new Date(row['Date']);
      return date > start;
    });
  }

  // Loop through all weight, convert to numbers
  // then return that rounded to whole number (string)
  // array -> number
  totalWeight (data) {
    return Number(_.reduce(data, (sum, next) => {
      return sum + Number(next.Weight);
    }, 0).toFixed());
  }

  // Check by date for all unique ones
  // Return the length of those = total workouts
  // array -> number
  totalWorkouts (data) {
    return _.uniqBy(data, 'Date').length;
  }

  // Convert number to commas
  numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
export default Quest;