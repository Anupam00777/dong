let playerPosition = [0, 0];
let pause = false;
class Dong {
  constructor(p1, p2, s1, s2, area, pSpeed) {
    this.speed = 100 / pSpeed;
    this.pMove1 = 0;
    this.pMove2 = 0;
    this.pc1 = p1;
    this.pc2 = p2;
    this.ar = area;
    this.adjust();
    this.s1 = document.getElementsByClassName(s1)[0];
    this.s2 = document.getElementsByClassName(s2)[0];
  }
  adjust() {
    this.p1 = document.getElementsByClassName(this.pc1)[0];
    this.p2 = document.getElementsByClassName(this.pc2)[0];
    this.area = document.getElementsByClassName(this.ar)[0];
    this.width = this.area.offsetWidth;
    this.height = this.area.offsetHeight - this.p1.offsetHeight;
    this.movementLeap = this.height / this.speed;
  }
  update() {
    switch (this.pMove1) {
      case 1:
        if (playerPosition[0] >= 0) {
          playerPosition[0] -= this.movementLeap;
          this.p1.style.transform =
            "translate(0px, " + playerPosition[0] + "px)";
        }
        break;
      case -1:
        if (playerPosition[0] <= this.height) {
          playerPosition[0] += this.movementLeap;
          this.p1.style.transform =
            "translate(0px, " + playerPosition[0] + "px)";
        }
        break;
    }
    switch (this.pMove2) {
      case 1:
        if (playerPosition[1] >= 0) {
          playerPosition[1] -= this.movementLeap;
          this.p2.style.transform =
            "translate(0px, " + playerPosition[1] + "px)";
        }
        break;
      case -1:
        if (playerPosition[1] <= this.height) {
          playerPosition[1] += this.movementLeap;
          this.p2.style.transform =
            "translate(0px, " + playerPosition[1] + "px)";
        }
        break;
    }
  }
}
class Ball {
  constructor(
    p1,
    p2,
    s1,
    s2,
    size,
    ball,
    color,
    num,
    area,
    speed = 1,
    scorePrefix = 1
  ) {
    this.size = size * 10;
    this.ball = document.getElementsByClassName(ball);
    this.s1 = document.getElementsByClassName(s1)[0];
    this.s2 = document.getElementsByClassName(s2)[0];
    this.p1 = p1;
    this.p2 = p2;
    this.ar = area;
    this.color = color;
    this.adjust();
    this.num = num;
    this.scorePrefix = scorePrefix;
    this.speed = speed;
    this.directions = {};
    this.position = {};
    this.no = 0;
    this.score = [0, 0];
    this.create(this.num);
  }
  adjust() {
    this.p1h = document.getElementsByClassName(this.p1)[0].offsetHeight;
    this.p2h = document.getElementsByClassName(this.p2)[0].offsetHeight;
    this.p1w = document.getElementsByClassName(this.p1)[0].offsetWidth;
    this.p2w = document.getElementsByClassName(this.p2)[0].offsetWidth;
    this.area = document.getElementsByClassName(this.ar)[0];
    this.height = this.area.offsetHeight;
    this.width = this.area.offsetWidth;
  }
  create(x) {
    for (let i = this.no; i < this.no + x; i++) {
      let child = document.createElement("div");
      document.getElementsByClassName("playArea")[0].appendChild(child);
      child.className = "ball flex";
      this.ball[i].style.width = this.size + "px";
      this.ball[i].style.height = this.size + "px";
      this.ball[i].style.backgroundColor = this.color;
      this.align(i);
    }
    this.no += x;
  }
  align(x) {
    this.directions[x] = [];
    for (let i = 0; i < 2; i++) {
      let t = (Math.random() / 3.14) * 10;
      t = Math.random() > 0.4 ? -t : t;
      this.directions[x][i] = t;
    }
    this.position[x] = [this.width / 2, this.height / 2];
  }
  collision(i) {
    let playerArea1 = [playerPosition[0], playerPosition[0] + this.p1h];
    let playerArea2 = [playerPosition[1], playerPosition[1] + this.p2h];
    if (
      this.position[i][1] + this.size >= this.height ||
      this.position[i][1] <= 0
    ) {
      this.directions[i][1] = -this.directions[i][1];
    }

    if (
      playerArea1[0] < this.position[i][1] &&
      this.position[i][1] < playerArea1[1] &&
      this.position[i][0] <= this.p1w
    ) {
      this.directions[i][0] = -this.directions[i][0];
      this.speed += 0.15 / this.num;
      return;
    } else if (
      playerArea2[0] < this.position[i][1] &&
      this.position[i][1] < playerArea2[1] &&
      this.position[i][0] + this.size >= this.width - this.p2w
    ) {
      this.directions[i][0] = -this.directions[i][0];
      this.speed += 0.15 / this.num;
      return;
    } else if (this.position[i][0] <= 0) {
      this.directions[i][0] = -this.directions[i][0];
      this.score[0] += this.scorePrefix;
      this.s2.innerHTML = this.score[0];
    } else if (this.position[i][0] + this.size >= this.width) {
      this.directions[i][0] = -this.directions[i][0];
      this.score[1] += this.scorePrefix;
      this.s1.innerHTML = this.score[1];
      return;
    }
  }
  update() {
    for (let i = 0; i < this.no; i++) {
      this.collision(i);
      this.position[i][0] += this.directions[i][0] * this.speed;
      this.position[i][1] += this.directions[i][1] * this.speed;
      this.ball[i].style.transform =
        "translate(" +
        this.position[i][0] +
        "px, " +
        this.position[i][1] +
        "px)";
    }
  }
}
let dong;
let ball;
let plspeed = 2;
let blspeed = 2;
let number = 1;
let size = 3;
let color = "red";
let pBtn = document.getElementById("play");
let sBtn = document.getElementById("setting");
let eBtn = document.getElementById("exit");
let bCol = document.getElementById("bCol");
let mMenu = document.getElementById("mMenu");
let sMenu = document.getElementById("sMenu");
let bNum = document.getElementById("bNum");
let bSize = document.getElementById("bSize");
let bVal = document.getElementById("bVal");
let spVal = document.getElementById("spVal");
let bspeed = document.getElementById("bspeed");
let sVal = document.getElementById("sVal");
let mode = document.getElementById("mode");
let back = document.getElementById("back");
let t1 = document.getElementById("t1");
let t2 = document.getElementById("t2");
let menu = document.getElementsByClassName("menu")[0];

pBtn.addEventListener("click", () => {
  menu.style.display = "none";
  color = bCol.value;
  start();
});
sBtn.addEventListener("click", () => {
  mMenu.style.display = "none";
  sMenu.style.display = "flex";
});
eBtn.addEventListener("click", () => {
  window.close();
});
bNum.addEventListener("change", (v) => {
  number = v.target.value;
  bVal.innerHTML = "<b>" + v.target.value + "</b>";
});
bSize.addEventListener("change", (v) => {
  size = v.target.value;
  sVal.innerHTML = "<b>" + v.target.value + "</b>";
});
bspeed.addEventListener("change", (v) => {
  blspeed = v.target.value;
  spVal.innerHTML = "<b>" + v.target.value + "</b>";
});
back.addEventListener("click", () => {
  sMenu.style.display = "none";
  mMenu.style.display = "flex";
});
mode.addEventListener("click", (e) => {
  switch (e.target.value) {
    case "0":
      break;
    case 1:
      plspeed = 6;
      blspeed = 5;
      break;
    case "2":
      setInterval(() => {
        if (!pause) {
          ball.create(1);
          plspeed += 0.5;
        }
      }, 5000);
      break;
    case "3":
      plspeed = 12;
      blspeed = 10;
      break;
    case "4":
      number = 5;
      blspeed = 5;
      plspeed = 8;
      break;
    case "5":
      plspeed = 2;
      blspeed = 0.25;
      break;
  }
});
let controller = [0, 0];
function start() {
  if (document.documentElement.requestFullscreen()) {
    dong = new Dong("player1", "player2", "p1s", "p2s", "playArea", plspeed);
    ball = new Ball(
      "player1",
      "player2",
      "p1s",
      "p2s",
      size,
      "ball",
      color,
      number,
      "playArea",
      blspeed
    );
    game();
  }
}
function cont(e) {
  switch (e) {
    case 87:
      controller[0] = 1;
      break;
    case 83:
      controller[0] = -1;
      break;
    case 38:
      controller[1] = 1;
      break;
    case 40:
      controller[1] = -1;
      break;
    case 32:
      pause = pause == true ? false : true;
      game();
  }
  control();
}
t1.addEventListener("click", () => {
  controller[0] = controller[0] == 1 ? -1 : 1;
  control();
});
t2.addEventListener("click", () => {
  controller[1] = controller[1] == 1 ? -1 : 1;
  control();
});
document.addEventListener("keydown", (e) => {
  cont(e.keyCode);
});
window.addEventListener("resize", () => {
  if (dong != null && ball != null) {
    dong.adjust();
    ball.adjust();
  }
});
function control() {
  switch (controller[0]) {
    case 1:
      dong.pMove1 = 1;
      break;
    case -1:
      dong.pMove1 = -1;
      break;
  }
  switch (controller[1]) {
    case 1:
      dong.pMove2 = 1;
      break;
    case -1:
      dong.pMove2 = -1;
      break;
  }
}
function game() {
  dong.update();
  ball.update();
  if (!pause) requestAnimationFrame(game);
}
