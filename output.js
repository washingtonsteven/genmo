class Output {
  constructor() {

  }
  msg(m) {
    console.log(m);
  }
  error(m) {
    console.error(m);
  }
  debug(m) {
    console.debug(m);
  }
}

module.exports = new Output();