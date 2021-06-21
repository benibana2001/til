const addEvent = () => {
  const bubbles = document.querySelectorAll(".bubble");
  const clickHandler = (target) => {
    return () => target.setAttribute("data-state", "clicked");
  };
  bubbles.forEach((element) => {
    element.addEventListener("click", clickHandler(element));
  });
};
const startChapter2 = () => {
  const chapter2 = document.querySelector(".chapter-2");
  chapter2.setAttribute("data-state", "active");
};

addEvent();
startChapter2();
