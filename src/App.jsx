import { useState, useEffect } from "react";
import FontLoader from "./styles/FontLoader";
import GlobalStyle from "./styles/GlobalStyle";
import { Toast } from "./components/common";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import Nora from "./components/Nora";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import Checkout from "./pages/Checkout";
import OrderTrack from "./pages/OrderTrack";
import Reserve from "./pages/Reserve";
import EventsPage from "./pages/EventsPage";
import GalleryPage from "./pages/GalleryPage";
import JournalPage from "./pages/JournalPage";
import AboutPage from "./pages/AboutPage";
import LocationsPage from "./pages/LocationsPage";
import Account from "./pages/Account";
import Kitchen from "./pages/Kitchen";
import Staff from "./pages/Staff";
import Admin from "./pages/Admin";
import QRScannerModal from "./components/QRScannerModal";
import { fetchProducts } from "./utils/api";
import { DEMO_CUSTOMER, PRODUCTS as FALLBACK_PRODUCTS } from "./data/demoData";
import CafeReelModal from "./components/CafeReelModal";
import CoffeeQuizModal from "./components/CoffeeQuizModal";

export default function App() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [page, setPageRaw] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [reelOpen, setReelOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState(["p2"]);
  const [user, setUser] = useState(DEMO_CUSTOMER);
  const [toast, setToast] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [orderNum, setOrderNum] = useState(null);

  useEffect(() => {
    fetchProducts().then(data => {
      if (data && Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
    });
  }, []);

  const setPage = (p) => { setPageRaw(p); window.scrollTo({top:0, behavior:"instant"}); };

  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showToast = (t) => { setToast(t); setTimeout(()=>setToast(null), 2200); };

  const addToCart = (item) => { setCart(c=>[...c, item]); showToast(`Added ${item.product.name} to cart`); };
  const updateQty = (idx, d) => setCart(c => c.map((it,i)=> i===idx ? {...it, qty: Math.max(1, it.qty+d)} : it));
  const removeItem = (idx) => setCart(c => c.filter((_,i)=>i!==idx));
  const clearCart = () => { setCart([]); setAppliedCoupon(false); setCoupon(""); };
  const toggleFav = (id) => setFavorites(f => f.includes(id) ? f.filter(x=>x!==id) : [...f, id]);
  const applyCoupon = () => { if (coupon.trim().toUpperCase()==="LOYALTY15") { setAppliedCoupon(true); showToast("Coupon applied — 15% off"); } else showToast("Coupon not recognized"); };

  const openProduct = (p) => setProduct(p);

  return (
    <div className="nb-root min-h-screen">
      <FontLoader />
      <GlobalStyle />
      <Toast toast={toast} />
      <Nav page={page} setPage={setPage} cartCount={cart.reduce((s,i)=>s+i.qty,0)} openCart={()=>setCartOpen(true)} user={user} scrolled={scrolled} openScanner={()=>setScannerOpen(true)} openQuiz={()=>setQuizOpen(true)} openReel={()=>setReelOpen(true)} />

      <main>
        {!["home","admin","kitchen","staff"].includes(page) && (
          <div className="hidden md:block fixed top-20 left-8 z-[55]">
            <button
              onClick={() => setPage("home")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold nb-bg-ink nb-text-cream shadow-lg hover:opacity-90 transition-all rounded-full border border-white/20 nb-focus"
            >
              ← Back to Home
            </button>
          </div>
        )}
        {page==="home" && <Home setPage={setPage} openProduct={openProduct} favorites={favorites} toggleFav={toggleFav} addToCart={addToCart} user={user} products={products} />}
        {page==="menu" && <MenuPage openProduct={openProduct} favorites={favorites} toggleFav={toggleFav} products={products} />}
        {page==="checkout" && <Checkout cart={cart} setPage={setPage} clearCart={clearCart} appliedCoupon={appliedCoupon} setOrderNum={setOrderNum} showToast={showToast} user={user} />}
        {page==="track" && <OrderTrack setPage={setPage} />}
        {page==="reserve" && <Reserve setPage={setPage} />}
        {page==="events" && <EventsPage setPage={setPage} />}
        {page==="gallery" && <GalleryPage />}
        {page==="journal" && <JournalPage />}
        {page==="about" && <AboutPage />}
        {page==="locations" && <LocationsPage />}
        {page==="account" && <Account user={user} onLogout={()=>setUser(null)} setPage={(p)=>{ if(p==="account") setUser(user || DEMO_CUSTOMER); else setPage(p); }} favorites={favorites} showToast={showToast} setUser={setUser} />}
        {page==="kitchen" && <Kitchen />}
        {page==="staff" && <Staff />}
        {page==="admin" && <Admin products={products} setProducts={setProducts} showToast={showToast} />}
      </main>

      {!["kitchen","staff","admin"].includes(page) && <Footer setPage={setPage} showToast={showToast} />}

      <ProductModal product={product} onClose={()=>setProduct(null)} onAdd={addToCart} />
      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} cart={cart} updateQty={updateQty} removeItem={removeItem} setPage={setPage}
        coupon={coupon} setCoupon={setCoupon} appliedCoupon={appliedCoupon} applyCoupon={applyCoupon} />
      <QRScannerModal open={scannerOpen} onClose={()=>setScannerOpen(false)} setPage={setPage} />
      <CoffeeQuizModal open={quizOpen} onClose={()=>setQuizOpen(false)} openProduct={openProduct} />
      <CafeReelModal open={reelOpen} onClose={()=>setReelOpen(false)} />
      <Nora setPage={setPage} openProduct={openProduct} />
    </div>
  );
}
