/* Demo/sample data for the Noir & Bean storefront. Replace with real API data when going live. */
export const CATEGORIES = ["Coffee","Tea","Cold Drinks","Breakfast","Bakery","Lunch","Desserts","Signature","Seasonal"];

export const PRODUCTS = [
  { id:"p1", name:"Ethiopian Pour Over", cat:"Coffee", price:260, veg:true, best:true, tags:["hot","light","fruity"], desc:"Single-origin Yirgacheffe, washed process, notes of jasmine and stone fruit.", cal:15, allergens:[], prep:5, rating:4.8, img:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" },
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
  { id:"p12", name:"Roast Vegetable Grain Bowl", cat:"Lunch", price:390, veg:true, best:false, tags:["lunch","healthy"], desc:"Farro, roast squash, kale, tahini, pickled onion.", cal:520, allergens:["gluten","sesame"], prep:10, rating:4.5, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80" },
  { id:"p13", name:"Slow-Braised Chicken Focaccia", cat:"Lunch", price:420, veg:false, best:true, tags:["lunch","savory"], desc:"Rosemary focaccia, confit chicken, salsa verde.", cal:610, allergens:["gluten"], prep:9, rating:4.7, img:"https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80" },
  { id:"p14", name:"Miso Caramel Tart", cat:"Desserts", price:260, veg:true, best:true, tags:["dessert","sweet"], desc:"Dark chocolate shell, miso caramel, sea salt.", cal:390, allergens:["gluten","dairy","soy"], prep:2, rating:4.9, img:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" },
  { id:"p15", name:"Basque Burnt Cheesecake", cat:"Desserts", price:240, veg:true, best:true, tags:["dessert","creamy"], desc:"Deeply caramelized, molten centre, no crust.", cal:410, allergens:["gluten","dairy","egg"], prep:2, rating:4.9, img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80" },
  { id:"p16", name:"Brown Butter Brownie", cat:"Desserts", price:190, veg:true, best:false, tags:["dessert","chocolate"], desc:"Fudgy, brown butter, toasted walnut.", cal:380, allergens:["gluten","dairy","nuts"], prep:2, rating:4.6, img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80" },
  { id:"p17", name:"Nitro Espresso Tonic", cat:"Signature", price:310, veg:true, best:true, tags:["cold","signature","bittersweet"], desc:"Nitrogen-charged espresso, house tonic, grapefruit oil.", cal:60, allergens:[], prep:5, rating:4.8, img:"https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80" },
  { id:"p18", name:"Cardamom Rose Cappuccino", cat:"Signature", price:290, veg:true, best:false, tags:["hot","signature","spiced"], desc:"House cardamom syrup, steamed milk, rose dust.", cal:160, allergens:["dairy"], prep:5, rating:4.7, img:"https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?auto=format&fit=crop&w=600&q=80" },
  { id:"p19", name:"Monsoon Chai Cold Foam", cat:"Seasonal", price:270, veg:true, best:false, seasonal:true, tags:["cold","seasonal","spiced"], desc:"Slow-brewed masala chai, iced, cardamom cold foam.", cal:180, allergens:["dairy"], prep:5, rating:4.8, img:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80" },
  { id:"p20", name:"Roasted Fig & Honey Cake", cat:"Seasonal", price:250, veg:true, best:false, seasonal:true, tags:["dessert","seasonal"], desc:"Brown butter cake, roasted fig, wild honey.", cal:360, allergens:["gluten","dairy","egg"], prep:2, rating:4.7, img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80" },
  { id:"p21", name:"Turmeric Golden Latte", cat:"Signature", price:260, veg:true, best:false, tags:["hot","cold","spiced","light"], desc:"Turmeric, ginger, black pepper, steamed milk.", cal:120, allergens:["dairy"], prep:5, rating:4.4, img:"https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80" },
  { id:"p22", name:"Butter Croissant", cat:"Bakery", price:140, veg:true, best:true, tags:["bakery"], desc:"Laminated 36 hours, all butter, shatter crust.", cal:280, allergens:["gluten","dairy"], prep:1, rating:4.8, img:"https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&w=600&q=80" },
  { id:"p23", name:"Iced Americano", cat:"Cold Drinks", price:180, veg:true, best:false, tags:["cold","strong","light"], desc:"Double espresso, cold water, over ice.", cal:5, allergens:[], prep:2, rating:4.5, img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80" },
  { id:"p24", name:"Chamomile Honey Tisane", cat:"Tea", price:210, veg:true, best:false, tags:["hot","light","caffeine-free"], desc:"Whole chamomile flowers, wild honey on the side.", cal:20, allergens:[], prep:6, rating:4.3, img:"https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80" },
];

export const EVENTS = [
  { id:"e1", title:"Cupping: Autumn Harvest Lots", date:"Sep 14, 2026", time:"10:00 AM", loc:"Vadodara — Tasting Room", desc:"A guided cupping through four new harvest lots with our head roaster.", seats:6, price:"₹600", img:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" },
  { id:"e2", title:"Live Jazz, Slow Sundays", date:"Sep 21, 2026", time:"7:00 PM", loc:"Vadodara — Courtyard", desc:"An evening of live jazz trio, natural wine, and late plates.", seats:14, price:"₹900", img:"https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80" },
  { id:"e3", title:"Latte Art Workshop", date:"Sep 28, 2026", time:"4:00 PM", loc:"Vadodara — Bar", desc:"Hands-on session with our bar lead — rosettas, tulips, and pours.", seats:8, price:"₹1,200", img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80" },
];

export const ARTICLES = [
  { id:"a1", title:"What Washed Really Means", cat:"Coffee", author:"Meher Shah", date:"Aug 2026", read:"6 min", img:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80", excerpt:"A short guide to processing methods and how they shape what's in your cup." },
  { id:"a2", title:"The Slow Breakfast, Reconsidered", cat:"Culture", author:"Arjun Rao", date:"Jul 2026", read:"4 min", img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80", excerpt:"On why we stopped rushing the first meal of the day, and what changed." },
  { id:"a3", title:"Inside the Roastery", cat:"Behind the Scenes", author:"Meher Shah", date:"Jun 2026", read:"8 min", img:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80", excerpt:"A walk through our roasting week, lot by lot, decision by decision." },
];

export const REVIEWS = [
  { id:"r1", name:"Ishita M.", rating:5, text:"The cold brew is unreasonably good. Also the only café that gets oat milk foam right.", feat:true },
  { id:"r2", name:"Rohan K.", rating:5, text:"Booked a window table for a work call — nobody rushed me once in three hours.", feat:true },
  { id:"r3", name:"Naina P.", rating:4, text:"Shakshuka is worth the fifteen minute wait. Ask for extra flatbread.", feat:true },
  { id:"r4", name:"Devansh J.", rating:5, text:"Their NORA assistant found me the exact drink I described. Slightly unsettling, mostly great.", feat:false },
];

export const GALLERY = [
  { id:"g1", cat:"Interior", img:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" },
  { id:"g2", cat:"Coffee", img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },
  { id:"g3", cat:"Food", img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80" },
  { id:"g4", cat:"People", img:"https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80" },
  { id:"g5", cat:"Events", img:"https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80" },
  { id:"g6", cat:"Interior", img:"https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80" },
  { id:"g7", cat:"Coffee", img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80" },
  { id:"g8", cat:"Food", img:"https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=600&q=80" },
  { id:"g9", cat:"People", img:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80" },
];

export const DEMO_CUSTOMER = {
  name:"Aditi Shah", email:"aditi.shah@email.com", phone:"+91 98250 11223",
  points: 640, tier:"SILVER", nextTier:"GOLD", pointsToNext: 360,
  favorites:["p2","p9","p17"],
  orders:[
    { id:"NB-10422", date:"Sep 2, 2026", items:["Barrel Cold Brew","Almond Croissant"], total:440, status:"Completed" },
    { id:"NB-10388", date:"Aug 26, 2026", items:["Nitro Espresso Tonic"], total:310, status:"Completed" },
    { id:"NB-10301", date:"Aug 14, 2026", items:["Shakshuka","Iced Spanish Latte"], total:650, status:"Completed" },
  ],
  reservations:[ { id:"RES-2291", date:"Sep 10, 2026", time:"7:30 PM", guests:2, table:"Window 4", status:"Confirmed" } ],
  coupons:[ { code:"LOYALTY15", desc:"15% off your next order", exp:"Sep 30, 2026" } ],
};

export const ADMIN_ORDERS = [
  { id:"NB-10501", table:"Table 6", type:"Dine In", items:["Oat Flat White","Almond Croissant"], time:2, status:"NEW", notes:"" },
  { id:"NB-10502", table:"Pickup", type:"Pickup", items:["Barrel Cold Brew x2"], time:5, status:"NEW", notes:"Extra ice" },
  { id:"NB-10499", table:"Table 2", type:"Dine In", items:["Shakshuka","Jasmine Silver Tip"], time:9, status:"PREPARING", notes:"" },
  { id:"NB-10497", table:"Delivery", type:"Delivery", items:["Basque Burnt Cheesecake","Iced Americano"], time:12, status:"PREPARING", notes:"No cutlery" },
  { id:"NB-10495", table:"Table 11", type:"Dine In", items:["Cardamom Rose Cappuccino"], time:16, status:"READY", notes:"" },
  { id:"NB-10488", table:"Table 4", type:"Dine In", items:["Roast Vegetable Grain Bowl"], time:24, status:"COMPLETED", notes:"" },
];

export const ADMIN_CUSTOMERS = [
  { name:"Aditi Shah", orders:14, spend:8420, tier:"SILVER" },
  { name:"Rohan Kapoor", orders:22, spend:15230, tier:"GOLD" },
  { name:"Naina Patel", orders:6, spend:2980, tier:"BRONZE" },
  { name:"Devansh Joshi", orders:31, spend:24880, tier:"BLACK" },
  { name:"Ishita Mehta", orders:9, spend:4770, tier:"BRONZE" },
];

export const INVENTORY = [
  { item:"Ethiopian Green Beans", stock:8, unit:"kg", min:12, supplier:"Blue Tokai Trading" },
  { item:"Whole Milk", stock:34, unit:"L", min:20, supplier:"Amul Dairy" },
  { item:"Oat Milk", stock:6, unit:"L", min:10, supplier:"Urban Platter" },
  { item:"Almond Flour", stock:14, unit:"kg", min:5, supplier:"Local Bakery Co." },
  { item:"Take-away Cups (12oz)", stock:210, unit:"pcs", min:150, supplier:"EcoPack India" },
  { item:"Dark Chocolate 70%", stock:4, unit:"kg", min:6, supplier:"Cocoa Traders" },
];

export const REV_DATA = [
  { d:"Mon", v:38200 },{ d:"Tue", v:41500 },{ d:"Wed", v:39800 },{ d:"Thu", v:44200 },
  { d:"Fri", v:52600 },{ d:"Sat", v:61400 },{ d:"Sun", v:58900 },
];
export const FORECAST = [
  { name:"Barrel Cold Brew", level:"HIGH" },{ name:"Oat Flat White", level:"HIGH" },
  { name:"Almond Croissant", level:"MEDIUM" },{ name:"Brown Butter Brownie", level:"LOW" },
  { name:"Shakshuka", level:"MEDIUM" },
];

