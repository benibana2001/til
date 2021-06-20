const addEvent = () => {
  const bubbles = document.querySelectorAll(".bubble");
  const clickHandler = (target) => {
    return () => target.setAttribute("data-state", "clicked");
  };
  bubbles.forEach((element) => {
    element.addEventListener("click", clickHandler(element));
  });
};

addEvent();
