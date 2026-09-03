import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// MongoDB Schemas & Models
// ----------------------------------------------------
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  cat: { type: String, required: true },
  price: { type: Number, required: true },
  veg: { type: Boolean, default: true },
  best: { type: Boolean, default: false },
  seasonal: { type: Boolean, default: false },
  tags: [String],
  desc: String,
  cal: Number,
  allergens: [String],
  prep: Number,
  rating: Number,
  img: String
});

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  date: String,
  time: String,
  loc: String,
  desc: String,
  seats: Number,
  price: String,
  img: String
});

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  table: String,
  type: String,
  items: [String],
  total: Number,
  time: { type: Number, default: 0 },
  status: { type: String, default: 'NEW' },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

const reservationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  date: String,
  time: String,
  guests: Number,
  table: String,
  status: { type: String, default: 'Confirmed' }
});

const inventorySchema = new mongoose.Schema({
  item: { type: String, required: true },
  stock: Number,
  unit: String,
  min: Number,
  supplier: String
});

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  points: Number,
  tier: String
});

const Product = mongoose.model('Product', productSchema);
const Event = mongoose.model('Event', eventSchema);
const Order = mongoose.model('Order', orderSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);
const Inventory = mongoose.model('Inventory', inventorySchema);
const Customer = mongoose.model('Customer', customerSchema);

// Initial Data Seed function
const INITIAL_DATA = {
  products: [
    { id:"p1", name:"Ethiopian Pour Over", cat:"Coffee", price:260, veg:true, best:true, tags:["hot","light","fruity"], desc:"Single-origin Yirgacheffe, washed process, notes of jasmine and stone fruit.", cal:15, allergens:[], prep:5, rating:4.8, img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },
    { id:"p2", name:"Barrel Cold Brew", cat:"Coffee", price:280, veg:true, best:true, seasonal:false, tags:["cold","smooth","strong"], desc:"Eighteen-hour steeped cold brew, oak-rested for a rounded, low-acid finish.", cal:20, allergens:[], prep:3, rating:4.9, img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80" },
    { id:"p3", name:"Classic Cortado", cat:"Coffee", price:220, veg:true, best:false, tags:["hot","milk","balanced"], desc:"Equal parts espresso and steamed milk, no foam, quietly strong.", cal:90, allergens:["dairy"], prep:4, rating:4.6, img:"https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80" },
    { id:"p4", name:"Oat Flat White", cat:"Coffee", price:250, veg:true, best:true, tags:["hot","milk","creamy"], desc:"Double ristretto over microfoamed oat milk.", cal:140, allergens:["oat"], prep:4, rating:4.7, img:"https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80" },
    { id:"p5", name:"Iced Spanish Latte", cat:"Cold Drinks", price:290, veg:true, best:true, tags:["cold","sweet","milk"], desc:"Espresso, condensed milk, whole milk over ice.", cal:210, allergens:["dairy"], prep:4, rating:4.8, img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80" },
    { id:"p6", name:"Hojicha Latte", cat:"Tea", price:270, veg:true, best:false, tags:["hot","cold","tea","toasty"], desc:"Roasted green tea, gently smoky, steamed with milk of choice.", cal:130, allergens:["dairy"], prep:5, rating:4.5, img:"https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80" },
    { id:"p7", name:"Jasmine Silver Tip", cat:"Tea", price:230, veg:true, best:false, tags:["hot","light","floral"], desc:"Hand-rolled green tea scented with fresh jasmine blossom.", cal:5, allergens:[], prep:6, rating:4.4, img:"https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80" },
    { id:"p8", name:"Sparkling Yuzu Tonic", cat:"Cold Drinks", price:260, veg:true, best:false, tags:["cold","citrus","refreshing"], desc:"Yuzu, elderflower and soda over ice.", cal:110, allergens:[], prep:3, rating:4.6, img:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80" },
    { id:"p9", name:"Almond Croissant", cat:"Bakery", price:180, veg:true, best:true, tags:["bakery","nutty"], desc:"Twice-baked croissant, almond cream, toasted flakes.", cal:420, allergens:["gluten","nuts","dairy"], prep:2, rating:4.9, img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80" },
    { id:"p10", name:"Sourdough Toast, Whipped Ricotta", cat:"Breakfast", price:320, veg:true, best:false, tags:["breakfast","savory"], desc:"House sourdough, whipped ricotta, chili honey, thyme.", cal:380, allergens:["gluten","dairy"], prep:8, rating:4.7, img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80" },
    { id:"p11", name:"Shakshuka", cat:"Breakfast", price:360, veg:true, best:true, tags:["breakfast","spiced"], desc:"Slow-braised tomato, peppers, baked eggs, feta, flatbread.", cal:460, allergens:["gluten","dairy","egg"], prep:14, rating:4.8, img:"https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=600&q=80" },
    { id:"p12", name:"Roast Vegetable Grain Bowl", cat:"Lunch", price:390, veg:true, best:false, tags:["lunch","healthy"], desc:"Farro, roast squash, kale, tahini, pickled onion.", cal:520, allergens:["gluten","sesame"], prep:10, rating:4.5, img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80" },
    { id:"p13", name:"Slow-Braised Chicken Focaccia", cat:"Lunch", price:420, veg:false, best:true, tags:["lunch","savory"], desc:"Rosemary focaccia, confit chicken, salsa verde.", cal:610, allergens:["gluten"], prep:9, rating:4.7, img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80" },
    { id:"p14", name:"Miso Caramel Tart", cat:"Desserts", price:260, veg:true, best:true, tags:["dessert","sweet"], desc:"Dark chocolate shell, miso caramel, sea salt.", cal:390, allergens:["gluten","dairy","soy"], prep:2, rating:4.9, img:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" },
    { id:"p15", name:"Basque Burnt Cheesecake", cat:"Desserts", price:240, veg:true, best:true, tags:["dessert","creamy"], desc:"Deeply caramelized, molten centre, no crust.", cal:410, allergens:["gluten","dairy","egg"], prep:2, rating:4.9, img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80" },
    { id:"p16", name:"Brown Butter Brownie", cat:"Desserts", price:190, veg:true, best:false, tags:["dessert","chocolate"], desc:"Fudgy, brown butter, toasted walnut.", cal:380, allergens:["gluten","dairy","nuts"], prep:2, rating:4.6, img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80" },
    { id:"p17", name:"Nitro Espresso Tonic", cat:"Signature", price:310, veg:true, best:true, tags:["cold","signature","bittersweet"], desc:"Nitrogen-charged espresso, house tonic, grapefruit oil.", cal:60, allergens:[], prep:5, rating:4.8, img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },
    { id:"p18", name:"Cardamom Rose Cappuccino", cat:"Signature", price:290, veg:true, best:false, tags:["hot","signature","spiced"], desc:"House cardamom syrup, steamed milk, rose dust.", cal:160, allergens:["dairy"], prep:5, rating:4.7, img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80" },
    { id:"p19", name:"Monsoon Chai Cold Foam", cat:"Seasonal", price:270, veg:true, best:false, seasonal:true, tags:["cold","seasonal","spiced"], desc:"Slow-brewed masala chai, iced, cardamom cold foam.", cal:180, allergens:["dairy"], prep:5, rating:4.8, img:"https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80" },
    { id:"p20", name:"Roasted Fig & Honey Cake", cat:"Seasonal", price:250, veg:true, best:false, seasonal:true, tags:["dessert","seasonal"], desc:"Brown butter cake, roasted fig, wild honey.", cal:360, allergens:["gluten","dairy","egg"], prep:2, rating:4.7, img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80" },
    { id:"p21", name:"Turmeric Golden Latte", cat:"Signature", price:260, veg:true, best:false, tags:["hot","cold","spiced","light"], desc:"Turmeric, ginger, black pepper, steamed milk.", cal:120, allergens:["dairy"], prep:5, rating:4.4, img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80" },
    { id:"p22", name:"Butter Croissant", cat:"Bakery", price:140, veg:true, best:true, tags:["bakery"], desc:"Laminated 36 hours, all butter, shatter crust.", cal:280, allergens:["gluten","dairy"], prep:1, rating:4.8, img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80" },
    { id:"p23", name:"Iced Americano", cat:"Cold Drinks", price:180, veg:true, best:false, tags:["cold","strong","light"], desc:"Double espresso, cold water, over ice.", cal:5, allergens:[], prep:2, rating:4.5, img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80" },
    { id:"p24", name:"Chamomile Honey Tisane", cat:"Tea", price:210, veg:true, best:false, tags:["hot","light","caffeine-free"], desc:"Whole chamomile flowers, wild honey on the side.", cal:20, allergens:[], prep:6, rating:4.3, img:"https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80" },
  ],
  events: [
    { id:"e1", title:"Cupping: Autumn Harvest Lots", date:"Sep 14, 2026", time:"10:00 AM", loc:"Vadodara — Tasting Room", desc:"A guided cupping through four new harvest lots with our head roaster.", seats:6, price:"₹600", img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },
    { id:"e2", title:"Live Jazz, Slow Sundays", date:"Sep 21, 2026", time:"7:00 PM", loc:"Vadodara — Courtyard", desc:"An evening of live jazz trio, natural wine, and late plates.", seats:14, price:"₹900", img:"https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80" },
    { id:"e3", title:"Latte Art Workshop", date:"Sep 28, 2026", time:"4:00 PM", loc:"Vadodara — Bar", desc:"Hands-on session with our bar lead — rosettas, tulips, and pours.", seats:8, price:"₹1,200", img:"https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80" },
  ],
  orders: [
    { id:"NB-10501", table:"Table 6", type:"Dine In", items:["Oat Flat White","Almond Croissant"], total:430, time:2, status:"NEW", notes:"" },
    { id:"NB-10502", table:"Pickup", type:"Pickup", items:["Barrel Cold Brew x2"], total:560, time:5, status:"NEW", notes:"Extra ice" },
    { id:"NB-10499", table:"Table 2", type:"Dine In", items:["Shakshuka","Jasmine Silver Tip"], total:590, time:9, status:"PREPARING", notes:"" },
    { id:"NB-10497", table:"Delivery", type:"Delivery", items:["Basque Burnt Cheesecake","Iced Americano"], total:420, time:12, status:"PREPARING", notes:"No cutlery" },
    { id:"NB-10495", table:"Table 11", type:"Dine In", items:["Cardamom Rose Cappuccino"], total:290, time:16, status:"READY", notes:"" },
    { id:"NB-10488", table:"Table 4", type:"Dine In", items:["Roast Vegetable Grain Bowl"], total:390, time:24, status:"COMPLETED", notes:"" },
  ],
  reservations: [
    { id:"RES-2291", name:"Aditi Shah", date:"Sep 10, 2026", time:"7:30 PM", guests:2, table:"Window 4", status:"Confirmed" }
  ],
  inventory: [
    { item:"Ethiopian Green Beans", stock:8, unit:"kg", min:12, supplier:"Blue Tokai Trading" },
    { item:"Whole Milk", stock:34, unit:"L", min:20, supplier:"Amul Dairy" },
    { item:"Oat Milk", stock:6, unit:"L", min:10, supplier:"Urban Platter" },
    { item:"Almond Flour", stock:14, unit:"kg", min:5, supplier:"Local Bakery Co." },
    { item:"Take-away Cups (12oz)", stock:210, unit:"pcs", min:150, supplier:"EcoPack India" },
    { item:"Dark Chocolate 70%", stock:4, unit:"kg", min:6, supplier:"Cocoa Traders" },
  ],
  customers: [
    { name:"Aditi Shah", email:"aditi.shah@email.com", phone:"+91 98250 11223", points:640, tier:"SILVER" },
    { name:"Rohan Kapoor", email:"rohan@email.com", phone:"+91 98250 11224", points:1520, tier:"GOLD" },
    { name:"Naina Patel", email:"naina@email.com", phone:"+91 98250 11225", points:298, tier:"BRONZE" },
    { name:"Devansh Joshi", email:"devansh@email.com", phone:"+91 98250 11226", points:2488, tier:"BLACK" },
    { name:"Ishita Mehta", email:"ishita@email.com", phone:"+91 98250 11227", points:477, tier:"BRONZE" },
  ]
};

async function seedDatabase() {
  try {
    console.log('Refreshing products with real image URLs in MongoDB Atlas...');
    await Product.deleteMany({});
    await Event.deleteMany({});
    await Product.insertMany(INITIAL_DATA.products);
    await Event.insertMany(INITIAL_DATA.events);
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      await Order.insertMany(INITIAL_DATA.orders);
      await Reservation.insertMany(INITIAL_DATA.reservations);
      await Inventory.insertMany(INITIAL_DATA.inventory);
      await Customer.insertMany(INITIAL_DATA.customers);
    }
    console.log('Database updated with real product images!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

// Start HTTP Server
app.listen(PORT, () => {
  console.log(`Noir & Bean backend server running on http://localhost:${PORT}`);
});

// Connect to MongoDB Atlas
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB Atlas successfully');
      seedDatabase();
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
} else {
  console.warn('MONGODB_URI is not defined in environment variables');
}

// REST Endpoints
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}, { _id: 0, __v: 0 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product({ id: `p${Date.now()}`, ...req.body });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({}, { _id: 0, __v: 0 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find({}, { _id: 0, __v: 0 }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order({
      id: `NB-${Math.floor(10000 + Math.random() * 90000)}`,
      time: 0,
      status: 'NEW',
      ...req.body
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Order.findOneAndUpdate({ id }, { status }, { new: true });
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find({}, { _id: 0, __v: 0 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reservations', async (req, res) => {
  try {
    const newReservation = new Reservation({
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Confirmed',
      ...req.body
    });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const inventory = await Inventory.find({}, { _id: 0, __v: 0 });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find({}, { _id: 0, __v: 0 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Noir & Bean backend server running on http://localhost:${PORT}`);
});
