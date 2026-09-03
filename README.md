# NOIR & BEAN

A premium café storefront demo (React + Vite + Tailwind CSS + lucide-react icons).

## Structure

```
src/
  data/demoData.js        Sample products, events, reviews, orders, inventory, etc.
  utils/format.js         Shared helpers (currency formatting)
  styles/
    FontLoader.jsx         Loads Google Fonts (Fraunces + Manrope)
    GlobalStyle.jsx         Global CSS variables & animation classes
  components/
    common.jsx              Badge, Toast, SectionHeading, ProductImg
    ProductCard.jsx
    ProductModal.jsx        Full customization modal (temp/milk/sweetness/extras)
    Nav.jsx
    Footer.jsx
    CartDrawer.jsx
    Nora.jsx                 AI concierge chat widget
    MiniBarChart.jsx         Small bar chart used in Admin
  pages/
    Home.jsx, MenuPage.jsx, Checkout.jsx, OrderTrack.jsx, Reserve.jsx,
    EventsPage.jsx, GalleryPage.jsx, JournalPage.jsx, AboutPage.jsx,
    LocationsPage.jsx, LoginPage.jsx, Account.jsx, Kitchen.jsx, Staff.jsx, Admin.jsx
  App.jsx                   Routes between pages (simple state-based router)
  main.jsx                  React entry point
  index.css                 Tailwind directives
```

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build

```bash
npm run build
```
