function SayHello() {
  console.log("enteredHello");
  return function hello() {
    console.log("enteredHe");
    return function hi() {
      console.log("hello");
      return function hi(message) {
        console.log(`I have reached ${message}`);
      };
    };
  };
}
SayHello()()()("reached");
var obj = {
  name: "Ritik",
  age: 20,
  hello: SayHello,
};

function consoling(environment) {
  return function consoled(message) {
    console.log(`Environement is ${environment} and message is ${message}`);
  };
}
var a = consoling("Prod");
a("ho ha ha");

const hello = (name) => {
  console.log(name);
};

const object = {
  name: "RITIK",
  say: function () {
    console.log(this.name);
  },
  arrowSay: () => {
    console.log(this.name);
  },
};
console.log(object.say());
console.log(object.arrowSay());

//callback and HOF

function he(msg1, msg2, callBack) {
  var string = "Hi My first message is " + msg1 + " and second msg is " + msg2;
  return callBack(string);
}
he("RITIK", "Prerna", function (string) {
  console.log(string);
});
var a = function (val) {
  console.log(val);
  return val;
};
console.log(he("ho ha", "ho ha", a));
//hof jaise .map .forEach obj.values()
