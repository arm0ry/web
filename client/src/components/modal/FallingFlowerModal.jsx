import React, {useEffect, useRef} from "react";
import { showModal, cleanModal } from "@context/actions/modalAction";


const width = window.innerWidth;
const height = window.innerHeight;

const imageHeight = 40;
const frameRate = 1000 / 30; // 30 frames per second
// const animationLength = 5000; // 10 seconds
const animationLength = (height / 13) * 30 * 2.5; // 10 seconds

const numMoney = 70;
const speedOffset = 10;
const speedRange = 5;

// let interval = null;

function initAnimation() {
  let fallingMoney = [];
  // let numImages = 6;

  [...Array(numMoney)].forEach(function (index) {
    const isOdd = index % 2 === 1;
    let direction = 0;
    if (isOdd) direction = 1;
    else direction = -1;

    const money = {
      image: new Image(),
      x: Math.random() * width,
      y: -height + Math.random() * (-imageHeight + height),
      angle: Math.random() * 2 * Math.PI,
      speed: speedOffset + Math.random() * speedRange,
      currentFrame: 0,
      direction: direction,
      size: imageHeight + Math.random() * 30
    };
    // money.image.src =
    //   "https://images.vexels.com/media/users/3/144032/isolated/preview/1f5414b9d04b71a4972208c035a7d278-stroke-dollar-bill-by-vexels.png";
    // money.image.src = "https://cdn-icons-png.flaticon.com/512/7096/7096474.png";
    money.image.src = "https://cdn-icons-png.flaticon.com/512/2674/2674697.png";
    // money.image.src = flower;
    fallingMoney.push(money);
  });
  return fallingMoney;
}

const moneymoney = (ctx, fallingMoney, frameCount) => {
  // console.log(fallingMoney[0].y);
  ctx.clearRect(0, 0, width, height);
  fallingMoney.forEach(function (money, index) {
    // const radius = money.direction * (10 + (index % 6));
    // const x =
    //   money.x +
    //   frameCount *
    //     (Math.sin((money.currentFrame + index) / (2 * Math.PI)) * radius);
    // const y = money.y + frameCount * money.speed;
    // const angle = money.angle + frameCount * (money.direction * 0.1);
    ctx.save();
    if (money.image.complete) {
      ctx.translate(money.x, money.y);
      ctx.rotate(money.angle);
      ctx.drawImage(money.image, 0, 0, money.size, money.size);
      // ctx.fillStyle = "#000";
      // ctx.beginPath();
      // ctx.arc(money.x, money.y, 20, 0, 2 * Math.PI);
      // ctx.fill();
    }
    ctx.restore();

    money.currentFrame += 1;
    money.y += money.speed;
    money.angle += money.direction * 0.1;
    const radius = money.direction * (10 + (index % 6));
    money.x += Math.sin((money.currentFrame + index) / (2 * Math.PI)) * radius;
  });
};
const draw = (ctx) => {
  let fallingMoney = initAnimation();
  let intervalId;
  let step = 0;
  intervalId = setInterval(function () {
    moneymoney(ctx, fallingMoney, step);
    step++;
  }, frameRate);
  setTimeout(function () {
    clearInterval(intervalId);
  }, animationLength);
  // moneymoney(ctx, fallingMoney, frameCount);
}; // Example taken from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage


const FallingFlowerModal = () => {

  const canvas = useRef();

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    draw(ctx);

    setTimeout(() => cleanModal(), animationLength);
  }, []);
  return (
    <>
      <div className="py-auto flex flex-col items-center justify-center">
        {/* <div className="flex items-center justify-center mb-2">
        </div> */}
        <div
            className={
              "fixed z-10 overflow-y-auto top-0 left-0 w-screen h-screen"
            }
            id="modal"
          >
            {/* <Canvas draw={draw} height={height} width={width} /> */}
            <canvas className="fixed z-10  top-0 left-0 opacity-70" ref={canvas} height={height} width={width} />
          </div>
      </div>
    </>
  );
};

export default FallingFlowerModal;
