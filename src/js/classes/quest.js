import _ from 'lodash';

class Quest {

  constructor () {
    this.quest = {};
  }

  init (results) {
    // Our entire workout data
    const data = this.fixData(results.data);

    // Set the big 3
    this.quest.bench  = this.getExerciseData(data, 'Bench Press');
    this.quest.squat  = this.getExerciseData(data, 'Squat');
    this.quest.dead   = this.getExerciseData(data, 'Deadlift'); 

    // Total Workouts
    this.quest.totalWorkouts = this.totalWorkouts(data);

    // Total Weight Lifted
    this.quest.totalWeight = this.totalWeight(data);

    // Return our prepared object
    return this.quest;
  }

  // Generates the exercise data
  // array, string -> object
  getExerciseData (data, exercise) {
    let exData = {};
    exData.all = _.filter(data, {'Exercise Name': exercise});
    exData.max = Number(_.maxBy(exData.all, s => Number(s.lb)).lb);
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

  // Loop through all weight, convert to numbers
  // then return that rounded to whole number (string)
  // array -> number
  totalWeight (data) {
    return Number(_.reduce(data, (sum, next, x) => {
      return sum + Number(next.lb);
    }, 0).toFixed());
  }

  // Check by date for all unique ones
  // Return the length of those = total workouts
  // array -> number
  totalWorkouts (data) {
    return _.uniqBy(data, 'Date').length;
  }

}
export default Quest;