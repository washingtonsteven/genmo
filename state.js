class State {
  constructor() {
    this.stack = [];
  }
  push(obj) {
    this.stack.push(obj);
  }
  peek() {
    return this.get(this.stack.length - 1) //TODO: return copy not reference
  }
  length() {
    return this.stack.length;
  }
  get(index) {
    if (index >= 0 && index < this.stack.length) {
      return Object.assign({}, this.stack[this.stack.length - 1]);
    }
    return null;
  }
  toString() {
    let s = "Genmo State:\n";
    this.stack.forEach((v,i) => {
      s += `\t[${i}]:\n
              \t\taction:"${v.action}",\n
              \t\tvalue:"${v.value}",\n
              \t\topts:${v.opts || 'none'}\n`;
    });
    s += "Genmo State complete";
    return s;
  }
  /*
  State frame references
  Command done
  {
    action:"command",
    value:"look"
  }
  
  Output
  {
    action:"output",
    value:"A bustling burg with an inadequate transit system"
  }
  
  */
}

module.exports = new State();