const allSideMenu = document.querySelector(".nav-links");
const layout = document.querySelector("#app-layout");
const choice = document.querySelector(".choice");
const user = document.querySelector(".user");
const auth = {
  0: document.querySelector("#formA"),
  1: document.querySelector("#formB"),
};
const containers = {
  0: document.querySelector("#container"),
  1: document.querySelector("#container2"),
  2: document.querySelector("#container3"),
};
let container, authContainer;
console.log("hi");
choice.addEventListener("click", (e) => {
  console.log(e.target.closest("a"));
  e.preventDefault();
  const tag = e.target.closest("a");

  choice.querySelectorAll(".active").forEach((val) => {
    val.classList.remove("active");
    console.log("removing is", val.getAttribute("itemid"));
    user.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
      console.log(ele.id + " is deactive");
    });
  });
  if (tag) {
    authContainer = tag.getAttribute("itemid");
    auth[authContainer].classList.add("active");
    console.log(
      auth[authContainer].id + " has " + auth[authContainer].classList
    );
    tag.classList.add("active");
  }
});

allSideMenu.addEventListener("click", (e) => {
  console.log(e.target.closest("li"));
  const li = e.target.closest("li");
  if (li) {
    const tag = li.querySelector("a");
    container = tag ? tag.className : "";
    console.log(container);
  }
  const layout = document.querySelector("#app-layout");
  console.log(layout);

  //   layout.querySelectorAll(".active");
  allSideMenu.querySelectorAll(".active").forEach((li) => {
    li.classList.remove("active");
  });
  layout.querySelectorAll(".active").forEach((val) => {
    val.classList.remove("active");
  });
  if (li || container) {
    li.classList.add("active");
    console.log(containers[container].classList.add("active"));
  }
});
