const [btn1, btn2, btn3, btnA, btnB, btnC] =
  document.querySelectorAll("button");

// publisher
btn1.addEventListener("click", () => {
  console.log("1の色を変える");
  changeColor(1);
});

btn2.addEventListener("click", () => {
  const boxId = 2;
  console.log("2の色を変えて大きくする");
  changeColor(boxId);
  scaleUp(boxId);
});

btn3.addEventListener("click", () => {
  console.log("3の色を変えて大きくして回転させる");
  const boxId = 3;
  changeColor(boxId);
  scaleUp(boxId);
  rotate(boxId);
});

btnA.addEventListener("click", () => {
    changeColor(1)
    changeColor(3)
    rotate(2)
    changeColor(6)
})

btnB.addEventListener("click", () => {
    changeColor(3)
    scaleUp(1)
    scaleUp(2)
    scaleUp(3)
    scaleUp(6)
    rotate(2)
})
btnC.addEventListener("click", () => {
    rotate(1)
    rotate(2)
    rotate(3)
    rotate(4)
    rotate(5)
    rotate(6)
    changeColor(1)
    changeColor(2)
    changeColor(3)
    changeColor(4)
    changeColor(5)
    changeColor(6)
})

function changeColor(boxId) {
  anime({
    easing: "easeInOutQuad",
    direction: "alternate",
    duration: 200,
    targets: `.box${boxId}`,
    backgroundColor: "#D00",
  });
}
function scaleUp(boxId) {
  anime({
    easing: "easeInOutQuad",
    direction: "alternate",
    duration: 200,
    targets: `.box${boxId}`,
    width: "150px",
    height: "150px",
  });
}
function rotate(boxId) {
  anime({
    easing: "easeInOutQuad",
    direction: "alternate",
    duration: 200,
    targets: `.box${boxId}`,
    rotate: "1turn",
  });
}
