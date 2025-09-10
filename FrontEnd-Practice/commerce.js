import productCarousel from "./productCarousel.js";

let currentProductIndex = 0;
let currIndex = 0;

// Initialize carousel
function initCarousel() {
  createIndicators();
  showProduct(0);
}

// Create indicator dots
function createIndicators() {
  // Get the container element where the indicator dots will be placed
  const indicatorsContainer = document.getElementById("indicators");

  // Clear any existing indicator dots from previous renders
  indicatorsContainer.innerHTML = "";

  // Loop through each product in the productCarousel array
  productCarousel.forEach((_, index) => {
    // Create a new <span> element to represent an indicator dot
    const indicator = document.createElement("span");

    // Assign the "indicator" class to the span for styling
    indicator.className = "indicator";

    // If this is the first indicator (index 0), mark it as active by adding the "active" class
    if (index === 0) indicator.classList.add("active");

    // Add a click event listener to the indicator
    // When clicked, it will show the product at the corresponding index
    indicator.addEventListener("click", () => showProduct(index));

    // Add the indicator dot to the indicators container in the DOM
    indicatorsContainer.appendChild(indicator);
  });
}

// Show specific product
function showProduct(index) {
  currentProductIndex = index;
  const product = productCarousel[index];

  // Update main display

  document.getElementById("main-product-name").textContent = product.name;
  document.getElementById("main-product-desc").textContent =
    product.description;

  // Update cube images
  document.getElementById("cube-front").src = product.cubeImages.front;
  document.getElementById("cube-right").src = product.cubeImages.right;
  document.getElementById("cube-left").src = product.cubeImages.left;
  document.getElementById("cube-back").src = product.cubeImages.back;

  // Update cube content
  document.getElementById("cube-name").textContent = product.name;
  document.getElementById("cube-category").textContent = product.category;

  // Update side images
  const prevIndex =
    (index - 1 + productCarousel.length) % productCarousel.length;
  const nextIndex = (index + 1) % productCarousel.length;
  document.getElementById("prev-product-image").src =
    productCarousel[prevIndex].mainImage;
  document.getElementById("next-product-image").src =
    productCarousel[nextIndex].mainImage;

  // Reset cube rotation
  const cube = document.querySelector(".cube");
  cube.style.transform = "rotateY(0deg)";
  currIndex = 0;

  // Update indicators
  document.querySelectorAll(".indicator").forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });
}

// Carousel navigation
function nextProduct() {
  currentProductIndex = (currentProductIndex + 1) % productCarousel.length;
  showProduct(currentProductIndex);
}

function prevProduct() {
  currentProductIndex =
    (currentProductIndex - 1 + productCarousel.length) % productCarousel.length;
  showProduct(currentProductIndex);
}

// Cube rotation (your existing code)
function rotateCube(direction) {
  const cube = document.querySelector(".cube");
  currIndex += direction * 90;
  cube.style.transform = `rotateY(${currIndex}deg)`;
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();

  // Carousel controls
  document
    .getElementById("prev-product")
    .addEventListener("click", prevProduct);
  document
    .getElementById("next-product")
    .addEventListener("click", nextProduct);

  // Cube rotation
  document
    .getElementById("left")
    .addEventListener("click", () => rotateCube(1));
  document
    .getElementById("right")
    .addEventListener("click", () => rotateCube(-1));
});
