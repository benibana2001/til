// import anime from "animejs/lib/anime.es.js";

class PubSub {
  constructor() {
    this.events = [];
  }
  publish(eventName, options = []) {
    this.events.find((event) => event.name === eventName).f(...options);
  }
  subscribe(eventName, f) {
    this.events = [
      ...this.events,
      {
        name: eventName,
        f,
      },
    ];
  }
}

const [btn1, btn2, btn3, btnA, btnB, btnC] =
  document.querySelectorAll("button");

const pubsub = new PubSub();

// publisher
btn1.addEventListener("click", () => {
  pubsub.publish("showMessage", [{ messages: ["ボタン１"] }]);
  pubsub.publish("changeColor", [{ ids: [1] }]);
});

btn2.addEventListener("click", () => {
  pubsub.publish("showMessage", [{ messages: ["ボタン２"] }]);
  pubsub.publish("scaleUp", [{ ids: [2] }]);
});

btn3.addEventListener("click", () => {
  pubsub.publish("showMessage", [{ messages: ["ボタン３"] }]);
  pubsub.publish("rotate", [{ ids: [3] }]);
});

// subscriber
(function () {
  const render = ({ ids }) => {
    ids.forEach((id) =>
      anime({
        easing: "easeInOutQuad",
        direction: "alternate",
        duration: 200,
        targets: `.box${id}`,
        backgroundColor: "#D00",
      })
    );
  };
  pubsub.subscribe("changeColor", render);
})();

(function () {
  const render = ({ ids }) => {
    ids.forEach((id) => {
      anime({
        easing: "easeInOutQuad",
        direction: "alternate",
        duration: 200,
        targets: `.box${id}`,
        width: "150px",
        height: "150px",
      });
    });
  };
  pubsub.subscribe("scaleUp", render);
})();

(function () {
  const render = ({ ids }) => {
    ids.forEach((id) => {
      anime({
        easing: "easeInOutQuad",
        direction: "alternate",
        duration: 200,
        targets: `.box${id}`,
        rotate: "1turn",
      });
    });
  };
  pubsub.subscribe("rotate", render);
})();

(function () {
  pubsub.subscribe("showMessage", ({ messages }) => {
    messages.forEach((message) => console.log(message));
  });
})();
