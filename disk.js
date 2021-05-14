let head = 35;
let data = [2, 57, 199, 174, 20, 124, 6, 79, 61, 67, 119, 32, 175, 120];
let after = 7;
let after_data = [40, 139, 54, 144, 49, 84];
let direction = "GOING IN";
let n = 5;

const fifo = () => {
  let res = [...data, ...after_data];
  return res;
};

const sstf = () => {
  let all = data.length + after_data.length;
  let res = [];
  let temp_after = [...after_data];
  let temp_data = [...data];
  let temp_head = head;
  for (let i = 0; i < all; i++) {
    if (i >= after) {
      temp_data.push(...temp_after);
      temp_after = [];
    }
    let min = Number.MAX_SAFE_INTEGER;
    for (let j of temp_data) {
      if (Math.abs(j - temp_head) < Math.abs(min - temp_head)) {
        min = j;
      }
    }
    temp_data.splice(temp_data.indexOf(min), 1);
    res.push(min);
    temp_head = min;
  }
  return res;
};
const getReport = (data) => {
  let val = [head, ...data];
  let temp = [];
  for (let i in val) {
    if (i > 0) {
      temp.push(Math.abs(val[i] - val[i - 1]));
    }
  }
  let sum = 0;
  for (let i of temp) {
    sum += i;
  }
  console.log("Sum of length", sum);
  console.log("Avg of length", sum / temp.length);
};

const scan = () => {
  let less_than = [];
  let more_than = [];
  let temp_data = [...data];
  let temp_after = [...after_data];
  let temp_head = head;
  let res = [];
  let current_direction = direction;
  for (let i of temp_data) {
    if (i <= temp_head) {
      less_than.push(i);
    } else {
      more_than.push(i);
    }
  }
  less_than.sort((a, b) => b - a);
  more_than.sort((a, b) => a - b);
  for (let i = 0; i < after; i++) {
    if (less_than.length == 0 && current_direction == "GOING IN") {
      current_direction = "GOING OUT";
    }
    if (more_than.length == 0 && current_direction == "GOING OUT") {
      current_direction = "GOING IN";
    }
    if (current_direction == "GOING IN") {
      res.push(less_than[0]);
      temp_head = less_than[0];
      less_than.shift();
    } else {
      res.push(more_than[0]);
      temp_head = more_than[0];
      more_than.shift();
    }
  }
  for (let i of temp_after) {
    if (i <= temp_head) {
      less_than.push(i);
    } else {
      more_than.push(i);
    }
  }
  less_than.sort((a, b) => b - a);
  more_than.sort((a, b) => a - b);
  let amount_left = less_than.length + more_than.length;
  for (let i = 0; i < amount_left; i++) {
    if (less_than.length == 0 && current_direction == "GOING IN") {
      current_direction = "GOING OUT";
    }
    if (more_than.length == 0 && current_direction == "GOING OUT") {
      current_direction = "GOING IN";
    }
    if (current_direction == "GOING IN") {
      res.push(less_than[0]);
      temp_head = less_than[0];
      less_than.shift();
    } else {
      res.push(more_than[0]);
      temp_head = more_than[0];
      more_than.shift();
    }
  }
  return res;
};

const cscan = () => {
  let less_than = [];
  let more_than = [];
  let temp_data = [...data];
  let temp_after = [...after_data];
  let temp_head = head;
  let res = [];
  let current_direction = direction;
  for (let i of temp_data) {
    if (i <= temp_head) {
      less_than.push(i);
    } else {
      more_than.push(i);
    }
  }
  less_than.sort((a, b) => b - a);
  more_than.sort((a, b) => a - b);
  for (let i = 0; i < after; i++) {
    if (less_than.length == 0 && current_direction == "GOING IN") {
      less_than = [...more_than];
      less_than.sort((a, b) => b - a);
      more_than = [];
    }
    if (more_than.length == 0 && current_direction == "GOING OUT") {
      more_than = [...less_than];
      more_than.sort((a, b) => a - b);
      less_than = [];
    }
    if (current_direction == "GOING IN") {
      res.push(less_than[0]);
      temp_head = less_than[0];
      less_than.shift();
    } else {
      res.push(more_than[0]);
      temp_head = more_than[0];
      more_than.shift();
    }
  }
  for (let i of temp_after) {
    if (i <= temp_head) {
      less_than.push(i);
    } else {
      more_than.push(i);
    }
  }
  less_than.sort((a, b) => b - a);
  more_than.sort((a, b) => a - b);
  let amount_left = less_than.length + more_than.length;
  for (let i = 0; i < amount_left; i++) {
    if (less_than.length == 0 && current_direction == "GOING IN") {
      less_than = [...more_than];
      less_than.sort((a, b) => b - a);
      more_than = [];
    }
    if (more_than.length == 0 && current_direction == "GOING OUT") {
      more_than = [...less_than];
      more_than.sort((a, b) => a - b);
      less_than = [];
    }
    if (current_direction == "GOING IN") {
      res.push(less_than[0]);
      temp_head = less_than[0];
      less_than.shift();
    } else {
      res.push(more_than[0]);
      temp_head = more_than[0];
      more_than.shift();
    }
  }
  return res;
};
const nstepScan = (n) => {
  let temp_data = [...data, ...after_data];
  let res = [];
  let current_direction = direction;
  let temp_head = head;
  while (temp_data.length > 0) {
    let nval = [];
    for (let i = 0; i < n; i++) {
      nval.push(temp_data[0]);
      temp_data.shift();
    }
    let less_than = [];
    let more_than = [];
    for (let i of nval) {
      if (i <= temp_head) {
        less_than.push(i);
      } else {
        more_than.push(i);
      }
    }
    less_than.sort((a, b) => b - a);
    more_than.sort((a, b) => a - b);
    for (let i = 0; i < nval.length; i++) {
      if (less_than.length == 0 && current_direction == "GOING IN") {
        current_direction = "GOING OUT";
      }
      if (more_than.length == 0 && current_direction == "GOING OUT") {
        current_direction = "GOING IN";
      }
      if (current_direction == "GOING IN") {
        res.push(less_than[0]);
        temp_head = less_than[0];
        less_than.shift();
      } else {
        res.push(more_than[0]);
        temp_head = more_than[0];
        more_than.shift();
      }
    }
  }
  return res;
};

const fscan = () => {
  let less_than = [];
  let more_than = [];
  let temp_data = [...data];
  let temp_after = [...after_data];
  let temp_head = head;
  let res = [];
  let current_direction = direction;
  for (let i of temp_data) {
    if (i <= temp_head) {
      less_than.push(i);
    } else {
      more_than.push(i);
    }
  }
  less_than.sort((a, b) => b - a);
  more_than.sort((a, b) => a - b);
  for (let i = 0; i < data.length; i++) {
    if (less_than.length == 0 && current_direction == "GOING IN") {
      current_direction = "GOING OUT";
    }
    if (more_than.length == 0 && current_direction == "GOING OUT") {
      current_direction = "GOING IN";
    }
    if (current_direction == "GOING IN") {
      res.push(less_than[0]);
      temp_head = less_than[0];
      less_than.shift();
    } else {
      res.push(more_than[0]);
      temp_head = more_than[0];
      more_than.shift();
    }
  }
  for (let i of temp_after) {
    if (i <= temp_head) {
      less_than.push(i);
    } else {
      more_than.push(i);
    }
  }
  less_than.sort((a, b) => b - a);
  more_than.sort((a, b) => a - b);
  let amount_left = less_than.length + more_than.length;
  for (let i = 0; i < amount_left; i++) {
    if (less_than.length == 0 && current_direction == "GOING IN") {
      current_direction = "GOING OUT";
    }
    if (more_than.length == 0 && current_direction == "GOING OUT") {
      current_direction = "GOING IN";
    }
    if (current_direction == "GOING IN") {
      res.push(less_than[0]);
      temp_head = less_than[0];
      less_than.shift();
    } else {
      res.push(more_than[0]);
      temp_head = more_than[0];
      more_than.shift();
    }
  }
  return res;
};
const main = () => {
  console.log("FIRST IN FIRST OUT");
  console.log(fifo().join(", "));
  getReport(fifo());
  console.log("SHORTEST SERVICE TIME FIRST");
  console.log(sstf().join(", "));
  getReport(sstf());
  console.log("SCAN");
  console.log(scan().join(", "));
  getReport(scan());
  console.log("C-SCAN");
  console.log(cscan().join(", "));
  getReport(cscan());
  console.log("n-step scan n = ", n);
  console.log(nstepScan(n).join(", "));
  getReport(nstepScan(n));
  console.log("F-SCAN");
  console.log(fscan().join(", "));
  getReport(fscan());
};

main();
