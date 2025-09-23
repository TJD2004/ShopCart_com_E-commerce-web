import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Comprehensive product catalog with relevant images
const sampleProducts = [
  // Electronics - Smartphones
  {
    name: "iPhone 15 Pro Max",
    description: "The most advanced iPhone yet with titanium design, A17 Pro chip, and incredible camera system with 5x telephoto zoom.",
    price: 1199,
    originalPrice: 1299,
    category: "electronics",
    subcategory: "smartphones",
    brand: "Apple",
    images: [
      "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 50,
    rating: { average: 4.8, count: 324 },
    features: ["6.7-inch Super Retina XDR display", "A17 Pro chip", "Pro camera system", "Titanium design"],
    isFeatured: true,
    tags: ["smartphone", "apple", "premium", "latest"]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android smartphone with S Pen, 200MP camera, and AI-powered features for productivity and creativity.",
    price: 1099,
    originalPrice: 1199,
    category: "electronics",
    subcategory: "smartphones",
    brand: "Samsung",
    images: [
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4666748/pexels-photo-4666748.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 45,
    rating: { average: 4.7, count: 289 },
    features: ["6.8-inch Dynamic AMOLED display", "S Pen included", "200MP camera", "5000mAh battery"],
    isFeatured: true,
    tags: ["smartphone", "samsung", "android", "s-pen"]
  },
  {
    name: "Google Pixel 8 Pro",
    description: "AI-powered smartphone with Magic Eraser, Best Take, and incredible computational photography capabilities.",
    price: 899,
    originalPrice: 999,
    category: "electronics",
    subcategory: "smartphones",
    brand: "Google",
    images: [
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 35,
    rating: { average: 4.6, count: 198 },
    features: ["Google Tensor G3", "AI photography", "7 years of updates", "Magic Eraser"],
    isFeatured: false,
    tags: ["smartphone", "google", "pixel", "ai"]
  },
  
  // Electronics - Laptops
  {
    name: "MacBook Pro 16-inch M3",
    description: "Professional laptop with M3 chip, stunning Liquid Retina XDR display, and all-day battery life for creative professionals.",
    price: 2499,
    originalPrice: 2699,
    category: "electronics",
    subcategory: "laptops",
    brand: "Apple",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 25,
    rating: { average: 4.9, count: 156 },
    features: ["M3 chip", "16-inch Liquid Retina XDR display", "Up to 22 hours battery", "1080p FaceTime HD camera"],
    isFeatured: true,
    tags: ["laptop", "apple", "m3", "professional"]
  },
  {
    name: "Dell XPS 13 Plus",
    description: "Ultra-thin laptop with 13th Gen Intel processors, stunning OLED display, and premium build quality.",
    price: 1299,
    originalPrice: 1499,
    category: "electronics",
    subcategory: "laptops",
    brand: "Dell",
    images: [
      "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 30,
    rating: { average: 4.6, count: 198 },
    features: ["13th Gen Intel Core", "13.4-inch OLED display", "Premium materials", "Thunderbolt 4"],
    isFeatured: false,
    tags: ["laptop", "dell", "ultrabook", "oled"]
  },
  {
    name: "HP Spectre x360",
    description: "Convertible 2-in-1 laptop with 360-degree hinge, Intel Evo platform, and premium design for versatility.",
    price: 1199,
    originalPrice: 1399,
    category: "electronics",
    subcategory: "laptops",
    brand: "HP",
    images: [
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 40,
    rating: { average: 4.5, count: 167 },
    features: ["360-degree hinge", "Intel Evo platform", "Touchscreen", "Pen support"],
    isFeatured: false,
    tags: ["laptop", "hp", "convertible", "2-in-1"]
  },

  // Electronics - Audio
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling headphones with exceptional sound quality and 30-hour battery life.",
    price: 349,
    originalPrice: 399,
    category: "electronics",
    subcategory: "audio",
    brand: "Sony",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 75,
    rating: { average: 4.8, count: 445 },
    features: ["Industry-leading noise canceling", "30-hour battery", "Quick charge", "Multipoint connection"],
    isFeatured: true,
    tags: ["headphones", "wireless", "sony", "noise-cancelling"]
  },
  {
    name: "AirPods Pro (3rd Gen)",
    description: "Apple's premium wireless earbuds with adaptive transparency, spatial audio, and personalized listening experience.",
    price: 249,
    originalPrice: 279,
    category: "electronics",
    subcategory: "audio",
    brand: "Apple",
    images: [
      "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/7148047/pexels-photo-7148047.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 120,
    rating: { average: 4.7, count: 567 },
    features: ["Adaptive transparency", "Spatial audio", "6 hours listening time", "MagSafe charging"],
    isFeatured: true,
    tags: ["earbuds", "apple", "wireless", "premium"]
  },
  {
    name: "Bose QuietComfort 45",
    description: "Wireless noise cancelling headphones with legendary comfort and acclaimed sound quality for all-day listening.",
    price: 279,
    originalPrice: 329,
    category: "electronics",
    subcategory: "audio",
    brand: "Bose",
    images: [
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 65,
    rating: { average: 4.6, count: 234 },
    features: ["Legendary comfort", "Noise cancelling", "24-hour battery", "Clear calls"],
    isFeatured: false,
    tags: ["headphones", "bose", "comfort", "wireless"]
  },

  // Electronics - TVs & Displays
  {
    name: "Samsung 65\" 4K QLED TV",
    description: "Premium 65-inch 4K QLED Smart TV with Quantum HDR, built-in streaming apps, and voice control.",
    price: 1299,
    originalPrice: 1599,
    category: "electronics",
    subcategory: "televisions",
    brand: "Samsung",
    images: [
      "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 20,
    rating: { average: 4.6, count: 178 },
    features: ["65-inch QLED display", "4K UHD resolution", "Quantum HDR", "Smart TV platform"],
    isFeatured: true,
    tags: ["tv", "samsung", "4k", "qled", "smart"]
  },
  {
    name: "LG OLED 55\" C3 Series",
    description: "Self-lit OLED pixels deliver perfect blacks and infinite contrast for the ultimate viewing experience.",
    price: 1399,
    originalPrice: 1699,
    category: "electronics",
    subcategory: "televisions",
    brand: "LG",
    images: [
      "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 15,
    rating: { average: 4.8, count: 145 },
    features: ["OLED technology", "Perfect blacks", "Gaming features", "webOS smart platform"],
    isFeatured: true,
    tags: ["tv", "lg", "oled", "premium"]
  },

  // Electronics - Tablets
  {
    name: "iPad Air (5th Gen)",
    description: "Powerful tablet with M1 chip, 10.9-inch Liquid Retina display, and support for Apple Pencil and Magic Keyboard.",
    price: 599,
    originalPrice: 649,
    category: "electronics",
    subcategory: "tablets",
    brand: "Apple",
    images: [
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 40,
    rating: { average: 4.7, count: 234 },
    features: ["M1 chip", "10.9-inch display", "Apple Pencil support", "All-day battery"],
    isFeatured: true,
    tags: ["tablet", "apple", "ipad", "m1"]
  },
  {
    name: "Samsung Galaxy Tab S9",
    description: "Premium Android tablet with S Pen included, Dynamic AMOLED display, and DeX productivity features.",
    price: 799,
    originalPrice: 899,
    category: "electronics",
    subcategory: "tablets",
    brand: "Samsung",
    images: [
      "https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 30,
    rating: { average: 4.5, count: 189 },
    features: ["S Pen included", "Dynamic AMOLED", "DeX mode", "Water resistant"],
    isFeatured: false,
    tags: ["tablet", "samsung", "android", "s-pen"]
  },

  // Clothing - Shoes
  {
    name: "Nike Air Max 270 React",
    description: "Comfortable running shoes with Max Air cushioning, React foam, and breathable mesh upper for all-day comfort.",
    price: 150,
    originalPrice: 180,
    category: "clothing",
    subcategory: "shoes",
    brand: "Nike",
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 100,
    rating: { average: 4.5, count: 289 },
    features: ["Max Air heel unit", "React foam", "Mesh upper", "Durable rubber outsole"],
    isFeatured: false,
    tags: ["shoes", "nike", "running", "comfortable"]
  },
  {
    name: "Adidas Ultraboost 23",
    description: "Premium running shoes with Boost midsole technology, Primeknit upper, and Continental rubber outsole.",
    price: 190,
    originalPrice: 220,
    category: "clothing",
    subcategory: "shoes",
    brand: "Adidas",
    images: [
      "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1478443/pexels-photo-1478443.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 85,
    rating: { average: 4.6, count: 456 },
    features: ["Boost midsole", "Primeknit upper", "Continental rubber", "Energy return"],
    isFeatured: false,
    tags: ["shoes", "adidas", "running", "boost"]
  },
  {
    name: "Converse Chuck Taylor All Star",
    description: "Classic canvas sneakers with timeless design, comfortable fit, and iconic style for everyday wear.",
    price: 65,
    originalPrice: 75,
    category: "clothing",
    subcategory: "shoes",
    brand: "Converse",
    images: [
      "https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 120,
    rating: { average: 4.3, count: 567 },
    features: ["Canvas upper", "Rubber toe cap", "Classic design", "Versatile style"],
    isFeatured: false,
    tags: ["shoes", "converse", "casual", "classic"]
  },

  // Clothing - Apparel
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight-leg jeans with authentic fit and timeless style. Made from premium denim for durability.",
    price: 89,
    originalPrice: 109,
    category: "clothing",
    subcategory: "jeans",
    brand: "Levi's",
    images: [
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 80,
    rating: { average: 4.4, count: 234 },
    features: ["100% cotton denim", "Classic straight fit", "Button fly", "Authentic styling"],
    isFeatured: false,
    tags: ["jeans", "levis", "denim", "classic"]
  },
  {
    name: "Nike Dri-FIT T-Shirt",
    description: "Moisture-wicking athletic t-shirt with comfortable fit and breathable fabric for workouts and casual wear.",
    price: 25,
    originalPrice: 35,
    category: "clothing",
    subcategory: "shirts",
    brand: "Nike",
    images: [
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/996330/pexels-photo-996330.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 200,
    rating: { average: 4.2, count: 345 },
    features: ["Dri-FIT technology", "Breathable fabric", "Comfortable fit", "Machine washable"],
    isFeatured: false,
    tags: ["shirt", "nike", "athletic", "dri-fit"]
  },

  // Clothing - Accessories
  {
    name: "Ray-Ban Aviator Sunglasses",
    description: "Classic aviator sunglasses with polarized lenses, lightweight metal frame, and 100% UV protection.",
    price: 154,
    originalPrice: 184,
    category: "clothing",
    subcategory: "accessories",
    brand: "Ray-Ban",
    images: [
      "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/701878/pexels-photo-701878.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 70,
    rating: { average: 4.6, count: 456 },
    features: ["Polarized lenses", "Metal frame", "100% UV protection", "Classic design"],
    isFeatured: false,
    tags: ["sunglasses", "rayban", "fashion", "accessories"]
  },
  {
    name: "Apple Watch Series 9",
    description: "Advanced smartwatch with health monitoring, fitness tracking, and seamless iPhone integration.",
    price: 399,
    originalPrice: 449,
    category: "clothing",
    subcategory: "accessories",
    brand: "Apple",
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 90,
    rating: { average: 4.7, count: 678 },
    features: ["Health monitoring", "Fitness tracking", "Always-on display", "Water resistant"],
    isFeatured: true,
    tags: ["smartwatch", "apple", "fitness", "health"]
  },

  // Home & Kitchen
  {
    name: "Instant Pot Duo 7-in-1",
    description: "Multi-functional electric pressure cooker that replaces 7 kitchen appliances. Perfect for quick, healthy meals.",
    price: 99,
    originalPrice: 129,
    category: "home",
    subcategory: "kitchen",
    brand: "Instant Pot",
    images: [
      "https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4226770/pexels-photo-4226770.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 60,
    rating: { average: 4.6, count: 1234 },
    features: ["7-in-1 functionality", "6-quart capacity", "14 smart programs", "Stainless steel pot"],
    isFeatured: true,
    tags: ["kitchen", "pressure-cooker", "appliance", "cooking"]
  },
  {
    name: "Ninja Foodi Air Fryer",
    description: "8-quart air fryer with multiple cooking functions including pressure cook, air fry, and slow cook.",
    price: 179,
    originalPrice: 219,
    category: "home",
    subcategory: "kitchen",
    brand: "Ninja",
    images: [
      "https://images.pexels.com/photos/4226770/pexels-photo-4226770.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 45,
    rating: { average: 4.5, count: 345 },
    features: ["8-quart capacity", "Multiple functions", "Crisping lid", "Easy cleanup"],
    isFeatured: false,
    tags: ["kitchen", "air-fryer", "ninja", "cooking"]
  },
  {
    name: "KitchenAid Stand Mixer",
    description: "Professional 5-quart stand mixer with 10 speeds and multiple attachments for all your baking needs.",
    price: 379,
    originalPrice: 449,
    category: "home",
    subcategory: "kitchen",
    brand: "KitchenAid",
    images: [
      "https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 25,
    rating: { average: 4.8, count: 567 },
    features: ["5-quart capacity", "10 speeds", "Multiple attachments", "Durable construction"],
    isFeatured: false,
    tags: ["kitchen", "mixer", "baking", "kitchenaid"]
  },

  // Home - Cleaning
  {
    name: "Dyson V15 Detect Vacuum",
    description: "Powerful cordless vacuum with laser dust detection, intelligent suction, and up to 60 minutes runtime.",
    price: 649,
    originalPrice: 749,
    category: "home",
    subcategory: "cleaning",
    brand: "Dyson",
    images: [
      "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4239092/pexels-photo-4239092.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 35,
    rating: { average: 4.7, count: 345 },
    features: ["Laser dust detection", "60 minutes runtime", "5-stage filtration", "Lightweight design"],
    isFeatured: true,
    tags: ["vacuum", "dyson", "cordless", "cleaning"]
  },
  {
    name: "Roomba i7+ Robot Vacuum",
    description: "Smart robot vacuum with automatic dirt disposal, mapping technology, and app control for effortless cleaning.",
    price: 599,
    originalPrice: 699,
    category: "home",
    subcategory: "cleaning",
    brand: "iRobot",
    images: [
      "https://images.pexels.com/photos/4239092/pexels-photo-4239092.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 25,
    rating: { average: 4.4, count: 567 },
    features: ["Auto dirt disposal", "Smart mapping", "App control", "Voice commands"],
    isFeatured: true,
    tags: ["robot-vacuum", "smart-home", "cleaning", "irobot"]
  },

  // Home - Smart Home
  {
    name: "Philips Hue Smart Bulbs (4-Pack)",
    description: "Smart LED bulbs with 16 million colors, voice control compatibility, and energy-efficient lighting.",
    price: 199,
    originalPrice: 249,
    category: "home",
    subcategory: "lighting",
    brand: "Philips",
    images: [
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1112599/pexels-photo-1112599.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 55,
    rating: { average: 4.5, count: 234 },
    features: ["16 million colors", "Voice control", "Energy efficient", "App control"],
    isFeatured: false,
    tags: ["smart-home", "lighting", "philips", "led"]
  },
  {
    name: "Amazon Echo Dot (5th Gen)",
    description: "Compact smart speaker with Alexa, improved sound quality, and smart home control capabilities.",
    price: 49,
    originalPrice: 59,
    category: "home",
    subcategory: "smart-home",
    brand: "Amazon",
    images: [
      "https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4790269/pexels-photo-4790269.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 150,
    rating: { average: 4.3, count: 1234 },
    features: ["Alexa built-in", "Improved sound", "Smart home control", "Compact design"],
    isFeatured: false,
    tags: ["smart-speaker", "alexa", "amazon", "voice-control"]
  },

  // Gaming
  {
    name: "PlayStation 5 Console",
    description: "Next-generation gaming console with ultra-high speed SSD, ray tracing, and 3D audio technology.",
    price: 499,
    originalPrice: 549,
    category: "electronics",
    subcategory: "gaming",
    brand: "Sony",
    images: [
      "https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/9072317/pexels-photo-9072317.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 15,
    rating: { average: 4.9, count: 678 },
    features: ["Ultra-high speed SSD", "Ray tracing", "3D audio", "DualSense controller"],
    isFeatured: true,
    tags: ["gaming", "console", "playstation", "sony"]
  },
  {
    name: "Xbox Series X",
    description: "Most powerful Xbox ever with 4K gaming, 120fps, and Quick Resume for instant game switching.",
    price: 499,
    originalPrice: 549,
    category: "electronics",
    subcategory: "gaming",
    brand: "Microsoft",
    images: [
      "https://images.pexels.com/photos/9072317/pexels-photo-9072317.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 20,
    rating: { average: 4.8, count: 456 },
    features: ["4K gaming", "120fps", "Quick Resume", "Game Pass compatible"],
    isFeatured: true,
    tags: ["gaming", "console", "xbox", "microsoft"]
  },
  {
    name: "Nintendo Switch OLED",
    description: "Portable gaming console with vibrant OLED screen, enhanced audio, and versatile play modes.",
    price: 349,
    originalPrice: 379,
    category: "electronics",
    subcategory: "gaming",
    brand: "Nintendo",
    images: [
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 40,
    rating: { average: 4.6, count: 789 },
    features: ["7-inch OLED screen", "Enhanced audio", "Portable design", "Joy-Con controllers"],
    isFeatured: false,
    tags: ["gaming", "nintendo", "portable", "oled"]
  },

  // Sports & Fitness
  {
    name: "Fitbit Charge 6",
    description: "Advanced fitness tracker with built-in GPS, heart rate monitoring, and 7-day battery life.",
    price: 159,
    originalPrice: 199,
    category: "sports",
    subcategory: "fitness",
    brand: "Fitbit",
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 90,
    rating: { average: 4.4, count: 567 },
    features: ["Built-in GPS", "Heart rate monitoring", "7-day battery", "Water resistant"],
    isFeatured: false,
    tags: ["fitness", "tracker", "health", "sports"]
  },
  {
    name: "Yoga Mat Premium",
    description: "High-quality yoga mat with superior grip, cushioning, and eco-friendly materials for comfortable practice.",
    price: 45,
    originalPrice: 59,
    category: "sports",
    subcategory: "fitness",
    brand: "Manduka",
    images: [
      "https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 100,
    rating: { average: 4.5, count: 234 },
    features: ["Superior grip", "Extra cushioning", "Eco-friendly", "Easy to clean"],
    isFeatured: false,
    tags: ["yoga", "fitness", "mat", "exercise"]
  },
  {
    name: "Adjustable Dumbbells Set",
    description: "Space-saving adjustable dumbbells with quick weight changes from 5-50 lbs per dumbbell.",
    price: 299,
    originalPrice: 349,
    category: "sports",
    subcategory: "fitness",
    brand: "Bowflex",
    images: [
      "https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 30,
    rating: { average: 4.6, count: 189 },
    features: ["5-50 lbs range", "Quick weight change", "Space-saving", "Durable construction"],
    isFeatured: false,
    tags: ["dumbbells", "fitness", "strength", "home-gym"]
  },

  // Beauty & Personal Care
  {
    name: "Fenty Beauty Foundation",
    description: "Long-wear, buildable foundation with medium to full coverage in 50 diverse shades for all skin tones.",
    price: 39,
    originalPrice: 45,
    category: "beauty",
    subcategory: "makeup",
    brand: "Fenty Beauty",
    images: [
      "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 150,
    rating: { average: 4.5, count: 789 },
    features: ["50 shades available", "Long-wear formula", "Buildable coverage", "All skin tones"],
    isFeatured: false,
    tags: ["makeup", "foundation", "beauty", "inclusive"]
  },
  {
    name: "The Ordinary Skincare Set",
    description: "Complete skincare routine with niacinamide, hyaluronic acid, and vitamin C for healthy, glowing skin.",
    price: 49,
    originalPrice: 65,
    category: "beauty",
    subcategory: "skincare",
    brand: "The Ordinary",
    images: [
      "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 80,
    rating: { average: 4.4, count: 456 },
    features: ["Complete routine", "Proven ingredients", "Affordable luxury", "Dermatologist tested"],
    isFeatured: false,
    tags: ["skincare", "beauty", "routine", "affordable"]
  },

  // Books
  {
    name: "The Psychology of Money",
    description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel. A bestselling guide to financial wisdom.",
    price: 16,
    originalPrice: 20,
    category: "books",
    subcategory: "finance",
    brand: "Harriman House",
    images: [
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1029142/pexels-photo-1029142.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 200,
    rating: { average: 4.8, count: 1245 },
    features: ["Bestselling author", "Financial wisdom", "Easy to read", "Practical advice"],
    isFeatured: false,
    tags: ["book", "finance", "psychology", "bestseller"]
  },
  {
    name: "Atomic Habits",
    description: "An easy and proven way to build good habits and break bad ones by James Clear. Transform your life one habit at a time.",
    price: 14,
    originalPrice: 18,
    category: "books",
    subcategory: "self-help",
    brand: "Avery",
    images: [
      "https://images.pexels.com/photos/1029142/pexels-photo-1029142.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 180,
    rating: { average: 4.7, count: 2345 },
    features: ["Practical strategies", "Science-backed", "Easy to implement", "Life-changing"],
    isFeatured: true,
    tags: ["book", "habits", "self-help", "productivity"]
  },

  // Toys & Games
  {
    name: "LEGO Creator Expert Set",
    description: "Advanced LEGO building set with detailed architecture and premium building experience for adults and teens.",
    price: 179,
    originalPrice: 199,
    category: "toys",
    subcategory: "building",
    brand: "LEGO",
    images: [
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 40,
    rating: { average: 4.8, count: 234 },
    features: ["Expert level", "Detailed design", "Premium experience", "Display worthy"],
    isFeatured: false,
    tags: ["lego", "building", "toys", "creative"]
  },
  {
    name: "Board Game Collection",
    description: "Premium board game with strategic gameplay, beautiful artwork, and engaging mechanics for family fun.",
    price: 59,
    originalPrice: 69,
    category: "toys",
    subcategory: "board-games",
    brand: "Ravensburger",
    images: [
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 60,
    rating: { average: 4.5, count: 345 },
    features: ["Strategic gameplay", "Beautiful artwork", "Family friendly", "High quality"],
    isFeatured: false,
    tags: ["board-game", "family", "strategy", "fun"]
  },

  // Automotive
  {
    name: "Car Phone Mount",
    description: "Universal car phone mount with 360-degree rotation, strong suction, and one-hand operation.",
    price: 25,
    originalPrice: 35,
    category: "automotive",
    subcategory: "accessories",
    brand: "iOttie",
    images: [
      "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 100,
    rating: { average: 4.3, count: 567 },
    features: ["360-degree rotation", "Strong suction", "One-hand operation", "Universal fit"],
    isFeatured: false,
    tags: ["car", "phone-mount", "accessories", "universal"]
  },
  {
    name: "Car Dash Cam",
    description: "High-definition dash camera with night vision, loop recording, and G-sensor for accident detection.",
    price: 89,
    originalPrice: 119,
    category: "automotive",
    subcategory: "electronics",
    brand: "Garmin",
    images: [
      "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 50,
    rating: { average: 4.4, count: 234 },
    features: ["HD recording", "Night vision", "Loop recording", "G-sensor"],
    isFeatured: false,
    tags: ["dashcam", "car", "safety", "recording"]
  },

  // Additional Electronics
  {
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with iPhone, Samsung, and other Qi-enabled devices.",
    price: 29,
    originalPrice: 39,
    category: "electronics",
    subcategory: "accessories",
    brand: "Anker",
    images: [
      "https://images.pexels.com/photos/4666748/pexels-photo-4666748.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 150,
    rating: { average: 4.2, count: 678 },
    features: ["Fast charging", "Universal compatibility", "LED indicator", "Safe charging"],
    isFeatured: false,
    tags: ["wireless", "charging", "accessories", "convenient"]
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Waterproof portable speaker with 360-degree sound, 24-hour battery, and rugged design for outdoor adventures.",
    price: 79,
    originalPrice: 99,
    category: "electronics",
    subcategory: "audio",
    brand: "JBL",
    images: [
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 85,
    rating: { average: 4.4, count: 456 },
    features: ["Waterproof design", "360-degree sound", "24-hour battery", "Rugged build"],
    isFeatured: false,
    tags: ["speaker", "bluetooth", "portable", "waterproof"]
  },

  // More Home Products
  {
    name: "Espresso Machine",
    description: "Professional espresso machine with built-in grinder, milk frother, and programmable settings for café-quality coffee.",
    price: 449,
    originalPrice: 549,
    category: "home",
    subcategory: "kitchen",
    brand: "Breville",
    images: [
      "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 25,
    rating: { average: 4.7, count: 345 },
    features: ["Built-in grinder", "Milk frother", "Programmable", "Professional quality"],
    isFeatured: false,
    tags: ["coffee", "espresso", "kitchen", "appliance"]
  },
  {
    name: "Air Purifier HEPA",
    description: "Smart air purifier with True HEPA filter, removes 99.97% of allergens, and covers up to 500 sq ft.",
    price: 199,
    originalPrice: 249,
    category: "home",
    subcategory: "appliances",
    brand: "Levoit",
    images: [
      "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 45,
    rating: { average: 4.5, count: 567 },
    features: ["True HEPA filter", "Smart controls", "Quiet operation", "Large coverage"],
    isFeatured: false,
    tags: ["air-purifier", "health", "home", "clean-air"]
  },

  // More Fashion
  {
    name: "Designer Handbag",
    description: "Luxury leather handbag with elegant design, multiple compartments, and premium craftsmanship.",
    price: 299,
    originalPrice: 399,
    category: "clothing",
    subcategory: "accessories",
    brand: "Michael Kors",
    images: [
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1152076/pexels-photo-1152076.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 40,
    rating: { average: 4.6, count: 234 },
    features: ["Genuine leather", "Multiple compartments", "Elegant design", "Premium quality"],
    isFeatured: false,
    tags: ["handbag", "fashion", "luxury", "leather"]
  },
  {
    name: "Winter Jacket",
    description: "Warm winter jacket with down insulation, water-resistant fabric, and stylish design for cold weather.",
    price: 149,
    originalPrice: 199,
    category: "clothing",
    subcategory: "outerwear",
    brand: "North Face",
    images: [
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 60,
    rating: { average: 4.5, count: 345 },
    features: ["Down insulation", "Water-resistant", "Stylish design", "Warm comfort"],
    isFeatured: false,
    tags: ["jacket", "winter", "outerwear", "warm"]
  }
];

// Get all products with filtering and sorting
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      subcategory,
      brand,
      minPrice, 
      maxPrice, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      search,
      featured,
      page = 1,
      limit = 12
    } = req.query;

    const filter = { isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    
    if (brand) {
      filter.brand = new RegExp(brand, 'i');
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total,
        hasNext: skip + Number(limit) < total,
        hasPrev: Number(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;
    
    const products = await Product.find({ 
      category: category,
      isActive: true 
    }).limit(Number(limit));
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get featured products
router.get('/featured/products', async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    
    const products = await Product.find({ 
      isFeatured: true,
      isActive: true 
    }).limit(Number(limit));
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 20 } = req.query;
    
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ],
      isActive: true
    }).limit(Number(limit));
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Seed products (for development)
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const products = await Product.insertMany(sampleProducts);
    res.json({ message: 'Products seeded successfully', count: products.length });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding products', error: error.message });
  }
});

export default router;