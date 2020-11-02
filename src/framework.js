class App {
  constructor(opts) {
    const { selector } = opts;

    this.opts = opts;
    this.selector = selector;
    this.components = [];
  }

  init() {
    this.el = document.querySelector(this.selector);
  }

  registerComponent(component) {
    this.components.push(component);
  }

  deregisterComponent(component) {
    this.components = this.components.filter((c) => c !== component);
  }
}

export class Component {
  constructor(opts) {
    const { state, selector, templateFn, templateEvents = [] } = opts;

    this.opts = opts;
    this.selector = selector;
    this.templateFn = templateFn;
    this.templateEvents = templateEvents;
    this._eventListenerRemoveFns = [];

    this.el = document.querySelector(this.selector);

    this.reduceState(() => state);
  }

  reduceState(reducerFn) {
    this.state = reducerFn(this.state);
    this.render();
  }

  render() {
    this.unbindTemplateEvents();
    this.el.innerHTML = this.templateFn(this.state);
    this.bindTemplateEvents();
  }

  bindTemplateEvents() {
    this.templateEvents.forEach(([selector, eventName, methodName]) => {
      const eventTargetEl = this.el.querySelector(selector);
      if (eventTargetEl) {
        const eventListener = (e) => this.opts[methodName].call(this, e);
        eventTargetEl.addEventListener(eventName, eventListener);
        this._eventListenerRemoveFns.push(() =>
          eventTargetEl.removeEventListener(eventName, eventListener)
        );
      }
    });
  }

  unbindTemplateEvents() {
    this._eventListenerRemoveFns.forEach((fn) => fn());
  }
}
