const Genmo = require('./index');

const g = new Genmo({
  ready:() => {
    g.sendCommand('ls');
    g.sendCommand('look');
    
    console.log(g.currentState().toString());
  },
  output:() => {

  }
});