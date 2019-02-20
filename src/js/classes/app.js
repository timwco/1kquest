import Dashboard from './dashboard';

class App {

  constructor (elems, results) {
    this.elems = elems;
    this.quest = results;
    this.dash = new Dashboard();
    this.loader = document.querySelector('#initial'); 
    this.appScreen = document.querySelector('.app');
  }

  init () {
    this.loadProgress();
    this.loadStats();
    // Loaded, Hide Spinner
    this.hide(this.loader);
    this.fadeIn(this.appScreen);
    this.loadCharts();
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

  fadeIn(el) {
    el.style.opacity = 0;
    el.style.display = 'block';
    let last = +new Date();
    const tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
      last = +new Date();
      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };
    tick();
  }

  hide(el) { el.style.display = 'none'; }

}
export default App;