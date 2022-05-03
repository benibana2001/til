import { parse } from "esprima";
import { traverse } from "estraverse";
import { EventEmitter } from "events";

class RuleContext extends EventEmitter {
  report({ message }) {
    this.emit("report", message);
  }
}

export default class MyLinter {
  constructor() {
    this._emitter = new EventEmitter();
    this._ruleContext = new RuleContext();
  }

  loadRule(rule) {}
}
