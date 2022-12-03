const CELL_SIZE = 3;
const WIDTH = 200;
const HEIGHT = 200;
const THRESH = 0.2;

let ctx = null;

let field = [];
let next_field = [];

let is_working = false;

const clear = () => {
  for (let y = -1; y < HEIGHT + 1; y++) {
    field[y] = [];
    next_field[y] = [];
    for (let x = -1; x < WIDTH + 1; x++) {
      field[y][x] = 0;
      next_field[y][x] = 0;
    }
  }
};

const random = () => {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      field[y][x] = Math.random() < THRESH ? 1 : 0;
    }
  }
};

const step = () => {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let count = 0;
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          count += field[y + j][x + i];
        }
      }
      count -= field[y][x];

      if (!field[y][x]) {
        // 誕生
        if (count === 3) {
          next_field[y][x] = 1;
        } else {
          next_field[y][x] = 0;
        }
      } else {
        // 生存
        if (count === 2 || count === 3) {
          next_field[y][x] = 1;
        }
        // 過疎または過密
        else {
          next_field[y][x] = 0;
        }
      }
    }
  }
  [field, next_field] = [next_field, field];
};

const render = () => {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      ctx.fillStyle = field[y][x] ? "#0f0" : "#000";
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
};

const init = () => {
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = CELL_SIZE * WIDTH;
  canvas.height = CELL_SIZE * HEIGHT;

  document.getElementById("start").onclick = () => {
    is_working = true;
  };
  document.getElementById("stop").onclick = () => {
    is_working = false;
  };
  document.getElementById("random").onclick = () => {
    random();
    render();
  };

  clear();
  random();
  render();
};

window.onload = () => {
  init();
  const tick = () => {
    setTimeout(tick, 100);
    if (is_working) {
      step();
      render();
    }
  };
  tick();
};
