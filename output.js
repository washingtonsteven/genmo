class Output {
  constructor(fn) {
    this.fn = fn;
  }
  msg(m) {
    console.log(m);
    this.doCallback(m);
  }
  error(m) {
    console.error(m);
    this.doCallback(m, {err:true});
  }
  debug(m) {
    console.debug(m);
    this.doCallback(m, {debug:true});
  }
  doCallback(m, opts) {
    if (this.fn) this.fn(m, opts);
  }
}

module.exports = new Output();