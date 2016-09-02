import Quest from './quest';
import Dashboard from './dashboard';

class App {

  constructor (elems, results) {
    this.elems = elems;
    this.quest = new Quest().init(results);
    this.graph = new Dashboard();
  }

  init () {
    
  }

}
export default App;