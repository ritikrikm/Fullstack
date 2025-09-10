const productCarousel = [
  {
    id: 1,
    name: "Handmade Pottery Set",
    category: "Ceramics",
    description:
      "A beautiful set of handmade pottery, perfect for your kitchen or as a gift.",
    mainImage: "./Frontend/avatar.jpg",
    cubeImages: {
      front: "./Frontend/avatar.jpg", // Mug
      right: "./Frontend/avatar.jpg", // Bowl
      left: "./Frontend/avatar.jpg", // Plate
      back: "./Frontend/avatar.jpg", // Vase
    },
    cubeProducts: [
      {
        name: "Ceramic Mug",
        description: "A hand-thrown mug with a unique glaze.",
      },
      {
        name: "Serving Bowl",
        description: "A deep bowl, ideal for salads or pasta.",
      },
      {
        name: "Dinner Plate",
        description: "A rustic plate for everyday use.",
      },
      {
        name: "Flower Vase",
        description: "A decorative vase for fresh flowers.",
      },
    ],
  },
  {
    id: 2,
    name: "Knitted Winter Collection",
    category: "Textiles",
    description: "Cozy and warm hand-knitted winter essentials.",
    mainImage: "./Frontend/avatar.jpg",
    cubeImages: {
      front: "./Frontend/avatar.jpg", // Scarf
      right: "./Frontend/avatar.jpg", // Beanie
      left: "./Frontend/avatar.jpg", // Mittens
      back: "./Frontend/avatar.jpg", // Socks
    },
    cubeProducts: [
      {
        name: "Wool Scarf",
        description: "Soft, chunky scarf for chilly days.",
      },
      {
        name: "Knitted Beanie",
        description: "A snug beanie to keep your head warm.",
      },
      {
        name: "Mittens",
        description: "Handmade mittens with a cable pattern.",
      },
      {
        name: "Woolen Socks",
        description: "Thick socks for ultimate comfort.",
      },
    ],
  },
  {
    id: 3,
    name: "Handcrafted Wooden Toys",
    category: "Toys",
    description: "Safe and eco-friendly wooden toys for children.",
    mainImage: "./Frontend/avatar.jpg",
    cubeImages: {
      front: "./Frontend/avatar.jpg", // Car
      right: "./Frontend/avatar.jpg", // Train
      left: "./Frontend/avatar.jpg", // Puzzle
      back: "./Frontend/avatar.jpg", // Blocks
    },
    cubeProducts: [
      {
        name: "Wooden Car",
        description: "Smooth-finished car for little hands.",
      },
      {
        name: "Pull-along Train",
        description: "Classic train with string for pulling.",
      },
      {
        name: "Animal Puzzle",
        description: "Chunky puzzle pieces for toddlers.",
      },
      {
        name: "Building Blocks",
        description: "Set of colorful stacking blocks.",
      },
    ],
  },
  {
    id: 4,
    name: "Artisan Scented Candles",
    category: "Home Decor",
    description: "Hand-poured candles with natural fragrances.",
    mainImage: "./Frontend/avatar.jpg",
    cubeImages: {
      front: "./Frontend/avatar.jpg", // Lavender
      right: "./Frontend/avatar.jpg", // Vanilla
      left: "./Frontend/avatar.jpg", // Rose
      back: "./Frontend/avatar.jpg", // Sandalwood
    },
    cubeProducts: [
      {
        name: "Lavender Candle",
        description: "Relaxing lavender scent for calm evenings.",
      },
      {
        name: "Vanilla Bean Candle",
        description: "Warm vanilla aroma for cozy spaces.",
      },
      {
        name: "Rose Petal Candle",
        description: "Romantic rose fragrance for any room.",
      },
      {
        name: "Sandalwood Candle",
        description: "Earthy sandalwood for a soothing ambiance.",
      },
    ],
  },
  {
    id: 5,
    name: "Handwoven Basket Set",
    category: "Baskets",
    description: "Durable and stylish baskets for storage and decor.",
    mainImage: "./Frontend/avatar.jpg",
    cubeImages: {
      front: "./Frontend/avatar.jpg", // Small
      right: "./Frontend/avatar.jpg", // Medium
      left: "./Frontend/avatar.jpg", // Large
      back: "./Frontend/avatar.jpg", // Tray
    },
    cubeProducts: [
      {
        name: "Small Basket",
        description: "Perfect for keys or small items.",
      },
      {
        name: "Medium Basket",
        description: "Great for organizing shelves.",
      },
      {
        name: "Large Basket",
        description: "Ideal for laundry or blankets.",
      },
      {
        name: "Woven Tray",
        description: "Serve snacks or use as a centerpiece.",
      },
    ],
  },
];
export default productCarousel;
