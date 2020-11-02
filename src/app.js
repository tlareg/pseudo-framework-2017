import './app.css';
import { Component } from './framework';

const myBox = new Component({
  selector: "myBox",
  state: {
    title: "My Box Titleeeee",
    subtitle: "My Box Subtitle",
  },
  templateFn: (state) => `
    <div class="my-box">
      <h1>${state.title}</h1>
      <div>${state.subtitle}</div>
    </div>
  `,
});

myBox.reduceState((state) => ({
  title: state.title,
  subtitle: "new subtitlee",
}));

const clock = new Component({
  selector: "clock",
  state: {
    date: new Date(),
  },
  templateFn: (s) => `
    <div class="clock">
      <div>${s.date.getFullYear()}-${
    s.date.getMonth() + 1
  }-${s.date.getDay()}</div>
      <div>${s.date.getHours()}:${s.date.getMinutes()}:${s.date.getSeconds()}</div>
    </div>
  `,
});

setInterval(() => {
  clock.reduceState((s) => ({ date: new Date() }));
}, 1000);

const incrementer = new Component({
  selector: "incrementer",
  state: {
    count: 0,
  },
  increment() {
    this.reduceState((s) => ({ count: s.count + 1 }));
  },
  decrement() {
    this.reduceState((s) => ({ count: s.count - 1 }));
  },
  templateEvents: [
    [".js-increment-btn", "click", "increment"],
    [".js-decrement-btn", "click", "decrement"],
  ],
  templateFn: (s) => `
    <div class="incrementer">
      <div>${s.count}</div>
      <button class="js-increment-btn">+1</button>
      <button class="js-decrement-btn">-1</button>
    </div>
  `,
});

incrementer.reduceState((s) => ({ count: 10 }));

const list = new Component({
  selector: "list",
  state: {
    items: ["foo", "bar", "baz"],
  },
  addItem() {
    this.reduceState((s) => ({ items: [...s.items, "aaa"] }));
  },
  sortItems() {
    this.reduceState((s) => ({ items: s.items.sort() }));
  },
  templateEvents: [
    [".js-add-item-btn", "click", "addItem"],
    [".js-sort-items-btn", "click", "sortItems"],
  ],
  templateFn: (s) => `
    <div>
      <button class="js-add-item-btn">add</button>
      <button class="js-sort-items-btn">sort</button>
      <ul>
        ${s.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `,
});
