import Quest from './quest';
import Dashboard from './dashboard';

class App {

  constructor (elems, results) {
    this.elems = elems;
    this.quest = new Quest().init(results);
    this.dash = new Dashboard();
  }

  init () {
    this.loadProgress();
    this.loadStats();
    this.loadCharts();
    // Loaded, Hide Spinner
    document.querySelector('#loading').style.display = 'none';
  }

  loadProgress () {
    this.dash.displayProgress(this.elems.stats.progress, this.quest.quest);
  }

  loadStats () {
    this.dash.displayStat(this.elems.stats.quest, `${this.quest.quest}lbs`);
    this.dash.displayStat(this.elems.stats.bench, `${this.quest.bench.max}lbs`);
    this.dash.displayStat(this.elems.stats.squat, `${this.quest.squat.max}lbs`);
    this.dash.displayStat(this.elems.stats.dead, `${this.quest.dead.max}lbs`);
    this.dash.displayStat(this.elems.stats.statLifted, `${this.quest.totalWeight}lbs`);
    this.dash.displayStat(this.elems.stats.statWorkouts, this.quest.totalWorkouts);
  }

  loadCharts () {
    this.dash.displayChart('quest', this.elems.charts.chartQuest, this.quest);
  }

}
export default App;