const addEvent = () => {
  const bubbles = document.querySelectorAll(".bubble");
  const clickHandler = (target) => {
    return () => target.setAttribute("data-state", "clicked");
  };
  bubbles.forEach((element) => {
    element.addEventListener("click", clickHandler(element));
  });
};

const startChapter1 = () => {
  const chapter1 = document.querySelector(".chapter-1");
  const chapter1__end = document.querySelector(".chapter-1 .line:last-child");
  chapter1.setAttribute("data-state", "active");

  chapter1__end.addEventListener("animationend", () => {
    chapter1.style.display = 'none';
    startChapter2();
  });
};
const startChapter2 = () => {
  const chapter2 = document.querySelector(".chapter-2");
  chapter2.setAttribute("data-state", "active");
};

export { addEvent, startChapter2};
