import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "The most advanced iPhone yet with titanium design, A17 Pro chip, and incredible camera system.",
    price: 999,
    originalPrice: 1099,
    category: "electronics",
    subcategory: "smartphones",
    brand: "Apple",
    images: [
      "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 50,
    rating: { average: 4.8, count: 324 },
    features: ["6.1-inch Super Retina XDR display", "A17 Pro chip", "Pro camera system", "Titanium design"],
    isFeatured: true,
    tags: ["smartphone", "apple", "premium", "latest"]
  },
  {
    name: "MacBook Air M2",
    description: "Supercharged by M2 chip. Incredibly capable and versatile laptop with all-day battery life.",
    price: 1199,
    originalPrice: 1299,
    category: "electronics",
    subcategory: "laptops",
    brand: "Apple",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 30,
    rating: { average: 4.7, count: 256 },
    features: ["M2 chip", "13.6-inch Liquid Retina display", "Up to 18 hours battery", "1080p FaceTime HD camera"],
    isFeatured: true,
    tags: ["laptop", "apple", "m2", "portable"]
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Max Air cushioning and breathable mesh upper.",
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
    rating: { average: 4.5, count: 189 },
    features: ["Max Air heel unit", "Mesh upper", "Rubber outsole", "Comfortable fit"],
    isFeatured: false,
    tags: ["shoes", "nike", "running", "comfortable"]
  },
  {
    name: "Samsung 4K Smart TV",
    description: "55-inch 4K UHD Smart TV with HDR and built-in streaming apps.",
    price: 649,
    originalPrice: 799,
    category: "electronics",
    subcategory: "televisions",
    brand: "Samsung",
    images: [
      "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 25,
    rating: { average: 4.6, count: 142 },
    features: ["4K UHD resolution", "HDR support", "Smart TV apps", "Voice control"],
    isFeatured: true,
    tags: ["tv", "samsung", "4k", "smart"]
  },
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
    price: 199,
    originalPrice: 249,
    category: "electronics",
    subcategory: "audio",
    brand: "Sony",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 75,
    rating: { average: 4.4, count: 203 },
    features: ["Active noise cancellation", "30-hour battery", "Wireless charging", "Touch controls"],
    isFeatured: false,
    tags: ["headphones", "wireless", "sony", "noise-cancelling"]
  },
  {
    name: "Coffee Maker Deluxe",
    description: "Programmable coffee maker with built-in grinder and thermal carafe.",
    price: 89,
    originalPrice: 119,
    category: "home",
    subcategory: "kitchen",
    brand: "Cuisinart",
    images: [
      "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    stock: 40,
    rating: { average: 4.3, count: 167 },
    features: ["Built-in grinder", "Programmable", "Thermal carafe", "Auto shut-off"],
    isFeatured: false,
    tags: ["coffee", "kitchen", "appliance", "programmable"]
  }
];

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