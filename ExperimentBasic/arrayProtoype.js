const { json } = require("stream/consumers");

const arr = ["a", "b", "c", "d", "e", "f", "g"];
console.log(arr.copyWithin(0, 1, 3));
const values = arr.entries();
console.log(values);
console.log(values.next().value);
const words = ["spray", "elite", "exubersssant", "destruction", "present"];
const result = words.filter((word) => {
  return word.length > 6;
});
console.log(result);
const arr1 = [0, 1, 2, [[[3]], 4]];
console.log(arr1.flat());
console.log(JSON.parse(JSON.stringify(arr1)));
const obj = {
  name: "hey",
  skills: ["cooking", "cooking", "cooking"],
  details: {
    work: "no",
    huamn: "yes",
    depth: {
      the: "no",
    },
  },
};
const shallowCopy = { ...obj };

shallowCopy.details.depth.the = "yes";
console.log(obj);
console.log(shallowCopy);
const deepCopy = JSON.parse(JSON.stringify(obj));
console.log(deepCopy);
deepCopy.details.depth.the = "hoha";
console.log(deepCopy);
//composition is like making a generaic approach of combiing functions into one for multiplw work liek add multiple
function add(a, b) {
  return a + b;
}
function mul(value) {
  return value * value;
}
function sub(value, toSub) {
  return value - toSub;
}
function compose(fn1, fn2, fn3) {
  return function (a, b, toSub) {
    const val = fn2(fn1(a, b));
    return fn3(val, toSub);
  };
}
const composeV2 = (fn1, fn2, fn3) => {
  return (a, b, toSub) => {
    const val = fn2(fn1(a, b));
    return fn3(val, toSub);
  };
};
const task = compose(add, mul, sub);
const taskV2 = composeV2(add, mul, sub);
console.log(task(2, 3, 20));
console.log(taskV2(2, 3, 20));

const atm = function (initialBalance) {
  var balance = initialBalance;
  function withdraw(amt) {
    if (amt > balance) {
      return "Ho ha ha";
    } else {
      balance -= amt;
      return balance;
    }
  }
  return { withdraw };
};
//IIFE // execute immediatrely
//what ever var let we define inside IIFE do not pollute the global , its scope is only inside the IIFE
//we dont have to decare a var outisde a async fn, we can directly use IIFE async
const data = (async () => await fetch())();
//we can make the var private like in bank withdrawing amoubt
const withDraw = ((initialBalance) => {
  let balance = initialBalance;
  function withdraw(amt) {
    if (amt > balance) {
      return "ho ha ha";
    } else {
      balance -= amt;
      return balance;
    }
  }
  return { withdraw };
})(1000);
console.log(withDraw.withdraw(200));
const ritik = atm(1000);
console.log(ritik.withdraw(300));
