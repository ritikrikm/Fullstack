document.addEventListener("DOMContentLoaded", function () {
  var name = document.getElementById("name");
  var button = document.getElementById("clickButton");
  var placeholder = document.getElementById("placeholderInput");
  var clickLocation = document.getElementById("clickLocation");

  button.addEventListener("click", () => {
    const inputValue = placeholder.value;
    console.log(inputValue);
    localStorage.setItem("placeholder", inputValue);
  });
  name.innerText = localStorage.getItem("placeholder");

  clickLocation.addEventListener("click", async () => {
    const value = await navigator.geolocation.getCurrentPosition(
      (ele) => {
        console.log(ele.toJSON());
      },
      (err) => {
        console.log(err);
      }
    );
  });
});
