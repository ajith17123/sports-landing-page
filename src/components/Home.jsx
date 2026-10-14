import { useState, useEffect } from "react";
import "../assets/style/Home.css";

// Local Sports Kit Assets
import heroBanner from "../assets/images/hero-banner.jpg";
import promoRacket from "../assets/images/promo-racket.jpg";
import promoApparel from "../assets/images/promo-apparel.jpg";
import collectionBanner from "../assets/images/collection-banner.jpg";

import catRackets from "../assets/images/cat-rackets.jpg";
import catShoes from "../assets/images/cat-shoes.jpg";
import catApparel from "../assets/images/cat-apparel.jpg";
import catBags from "../assets/images/cat-bags.jpg";
import catBalls from "../assets/images/cat-balls.jpg";
import catAccessories from "../assets/images/cat-accessories.jpg";
import catGrips from "../assets/images/cat-grips.jpg";
import catLifestyle from "../assets/images/cat-lifestyle.jpg";

import prodRacket from "../assets/images/prod-racket.jpg";
import prodShoes from "../assets/images/prod-shoes.jpg";
import prodBag from "../assets/images/prod-bag.jpg";
import prodBalls from "../assets/images/prod-balls.jpg";
import prodKit from "../assets/images/prod-kit.jpg";
import prodApparel from "../assets/images/prod-apparel.jpg";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><rect width='100%' height='100%' fill='#16352f'/></svg>`
  );

const handleImgError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK;
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: "Rackets", category: "rackets" },
  { label: "Shoes", category: "shoes" },
  { label: "Apparel", category: "apparel" },
  { label: "Bags", category: "bags" },
  { label: "Balls", category: "balls" },
  { label: "Offers", badge: "Hot", href: "#offers" },
];

const CURRENCIES = [
  { code: "INR", symbol: "₹", rate: 1, label: "INR (₹)" },
  { code: "USD", symbol: "$", rate: 0.012, label: "USD ($)" },
  { code: "EUR", symbol: "€", rate: 0.011, label: "EUR (€)" },
];

const LANGUAGES = [
  { code: "EN", name: "English" },
  { code: "ES", name: "Español" },
  { code: "FR", name: "Français" },
  { code: "DE", name: "Deutsch" },
];

const CATEGORY_TABS = [
  { id: "all", label: "All Gear" },
  { id: "rackets", label: "Rackets" },
  { id: "shoes", label: "Tennis Shoes" },
  { id: "apparel", label: "Apparel" },
  { id: "bags", label: "Bags" },
  { id: "balls", label: "Balls" },
  { id: "kits", label: "Match Kits" },
];

const FEATURES = [
  { title: "Free shipping", text: "On all orders over ₹99", icon: "ship" },
  { title: "Secure payments", text: "100% safe & trusted", icon: "shield" },
  { title: "Easy returns", text: "Hassle-free 30-day trial", icon: "return" },
  { title: "24/7 support", text: "Athlete gear advisors", icon: "support" },
];

const CATEGORIES = [
  { name: "Rackets", categoryId: "rackets", image: catRackets },
  { name: "Tennis Shoes", categoryId: "shoes", image: catShoes },
  { name: "Apparel", categoryId: "apparel", image: catApparel },
  { name: "Tennis Bags", categoryId: "bags", image: catBags },
  { name: "Balls", categoryId: "balls", image: catBalls },
  { name: "Accessories", categoryId: "all", image: catAccessories },
  { name: "Grip & Strings", categoryId: "rackets", image: catGrips },
  { name: "Lifestyle", categoryId: "apparel", image: catLifestyle },
];

const PROMOS = [
  {
    kicker: "Rackets",
    title: ["Power", "your game"],
    text: "Precision. Control. Performance.",
    cta: "Shop rackets",
    categoryId: "rackets",
    image: promoRacket,
  },
  {
    kicker: "Apparel",
    title: ["Move", "beyond"],
    text: "Engineered wear designed for court speed.",
    cta: "Shop apparel",
    categoryId: "apparel",
    image: promoApparel,
    tag: ["Play", "your", "way"],
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Velocity Arc Pro Carbon Racket",
    image: prodRacket,
    rating: 5,
    reviews: 128,
    price: 249.99,
    category: "rackets",
    badge: { type: "best", label: "Best Seller" },
    description: "Sleek aerodynamic graphite frame with high-tension neon green strings and vibration-dampening ergonomic grip.",
    specs: ["Weight: 300g (Unstrung)", "Head Size: 100 sq.in", "Balance: 320mm", "String Pattern: 16x19"],
    sizes: ["Grip 2 (4 1/4\")", "Grip 3 (4 3/8\")", "Grip 4 (4 1/2\")"],
  },
  {
    id: 2,
    name: "Court Velocity Pro Tennis Shoes",
    image: prodShoes,
    rating: 4,
    reviews: 94,
    price: 119.99,
    oldPrice: 149.99,
    category: "shoes",
    badge: { type: "sale", label: "-20%" },
    description: "Non-marking herringbone tread with responsive EVA midsole cushioning and enhanced lateral ankle support.",
    specs: ["Outsole: Anti-Abrasion", "Midsole: Dynamic EVA", "Surface: All-Court", "Weight: 360g"],
    sizes: ["US 8.5", "US 9.5", "US 10", "US 10.5", "US 11"],
  },
  {
    id: 3,
    name: "Tour Master Heavy-Duty Tennis Backpack",
    image: prodBag,
    rating: 5,
    reviews: 76,
    price: 89.99,
    category: "bags",
    description: "Dual padded racket sleeves, ventilated footwear tunnel, and heavy-duty weather-resistant ballistic nylon.",
    specs: ["Capacity: 2 Rackets", "Material: 900D Ballistic", "Volume: 32 Liters", "Thermal Compartment"],
    sizes: ["Standard Pro (32L)"],
  },
  {
    id: 4,
    name: "Ace Championship Pro Optic Balls (Can of 4)",
    image: prodBalls,
    rating: 5,
    reviews: 112,
    price: 14.99,
    category: "balls",
    description: "Pressurized tournament-grade 4-ball can with ultra-durable optic yellow felt engineered for all-court performance.",
    specs: ["Approval: ITF & USTA", "Quantity: 4 Balls / Can", "Felt: Extra-Duty Wool", "Core: Tournament Rubber"],
    sizes: ["1 Can (4 Balls)", "3-Can Pack", "Case (24 Cans)"],
  },
  {
    id: 5,
    name: "Grand Slam Head Tour All-in-One Sports Kit",
    image: prodKit,
    rating: 5,
    reviews: 89,
    price: 299.99,
    oldPrice: 349.99,
    category: "kits",
    badge: { type: "sale", label: "Kit Deal" },
    description: "Complete tournament set: 2 carbon rackets, 6-racket Head Tour bag, pressurized ball can, wristbands, overgrips & bottle.",
    specs: ["Includes: 2 Rackets + Bag + Balls", "Skill Level: Tournament / Pro", "Warranty: 1 Year Pro", "Pre-Strung: 55 lbs Tension"],
    sizes: ["Complete Pro Kit"],
  },
  {
    id: 6,
    name: "Aero-Vent Performance Tennis Crew",
    image: prodApparel,
    rating: 5,
    reviews: 64,
    price: 54.99,
    category: "apparel",
    description: "Ultra-lightweight moisture-wicking Dri-Tech breathable fabric with 4-way stretch for rapid court mobility.",
    specs: ["Material: 88% Poly, 12% Spandex", "Fit: Ergonomic Athletic", "Care: Machine Wash", "Feature: Anti-Chafing Seams"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

const TECH_PILLARS = [
  {
    icon: "shield",
    title: "Carbon Matrix Frame",
    spec: "100 sq.in • 300g",
    text: "Aerodynamic graphite reinforced with basalt filaments to maximize sweet-spot stability and dampen unwanted shock.",
  },
  {
    icon: "ship",
    title: "Thermo-Shield Guard",
    spec: "Dual Thermal Bays",
    text: "Heat-reflective silver insulation protects racket frame geometry and string tension against harsh courtside temperatures.",
  },
  {
    icon: "return",
    title: "Rapid-Response Cushion",
    spec: "Zero-Slip Tread",
    text: "High-rebound EVA midsole with anti-torsion TPU midfoot shank delivers instant directional changes with zero slippage.",
  },
  {
    icon: "support",
    title: "Tournament Certified",
    spec: "100% Pro Standard",
    text: "Engineered to strict ITF and tournament standards, pre-strung to precision tension with competition-approved balls.",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Division 1 Collegiate Player",
    rating: 5,
    quote: "The Velocity Arc racket gave me immediate power on serve without sacrificing baseline control. The kit bag is easily the most durable I've used.",
    badge: "Verified Athlete",
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "ITF Junior Tour Finalist",
    rating: 5,
    quote: "Having the full match kit packed with the thermo-shield bag is a game changer for traveling tournaments. Everything stays at optimum tension.",
    badge: "Tournament Competitor",
  },
  {
    id: 3,
    name: "David Chen",
    role: "Academy Head Coach",
    rating: 5,
    quote: "We outfitted our academy team with PROKIT bundles. The durability of the balls and the build quality of the apparel are completely top tier.",
    badge: "Certified Coach",
  },
];

const FOOTER_LINKS = {
  shop: [
    { label: "Tournament Match Kits", href: "#offers" },
    { label: "Carbon Rackets", href: "#rackets" },
    { label: "Court Shoes", href: "#shoes" },
    { label: "Thermo Kit Bags", href: "#bags" },
    { label: "Championship Balls", href: "#balls" },
  ],
  support: [
    { label: "Track Shipment", href: "#track" },
    { label: "String Tension Guide", href: "#tension" },
    { label: "Warranty & 30-Day Returns", href: "#returns" },
    { label: "Tournament Compliance", href: "#itf" },
    { label: "Athlete Support Contact", href: "#support" },
  ],
};

const SOCIALS = ["Instagram", "Facebook", "YouTube", "TikTok", "X"];

const SOCIAL_ICONS = {
  Instagram: "bi bi-instagram",
  Facebook: "bi bi-facebook",
  YouTube: "bi bi-youtube",
  TikTok: "bi bi-tiktok",
  X: "bi bi-twitter-x",
};

/* ------------------------------------------------------------------ */
/*  Small presentational pieces (Bootstrap Icons)                      */
/* ------------------------------------------------------------------ */
const Icon = ({ name, className = "" }) => {
  const iconMap = {
    search: "bi bi-search",
    user: "bi bi-person",
    heart: "bi bi-heart",
    "heart-fill": "bi bi-heart-fill",
    bag: "bi bi-bag",
    mail: "bi bi-envelope",
    ship: "bi bi-truck",
    shield: "bi bi-shield-check",
    return: "bi bi-arrow-counterclockwise",
    support: "bi bi-headset",
    arrow: "bi bi-arrow-right",
    chevron: "bi bi-chevron-down",
    tag: "bi bi-tag-fill",
    clock: "bi bi-clock-history",
    check: "bi bi-check-circle-fill",
    copy: "bi bi-clipboard-check",
    quote: "bi bi-quote",
    "x-lg": "bi bi-x-lg",
    trash: "bi bi-trash3",
    plus: "bi bi-plus-lg",
    dash: "bi bi-dash-lg",
  };
  const iconClass = iconMap[name] || (name.startsWith("bi-") ? `bi ${name}` : `bi bi-${name}`);
  return <i className={`${iconClass} ${className}`.trim()} aria-hidden="true" />;
};

const Stars = ({ value }) => (
  <span className="stars" role="img" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <i
        key={n}
        className={n <= value ? "bi bi-star-fill star star--on" : "bi bi-star star"}
        aria-hidden="true"
      />
    ))}
  </span>
);

const Pill = ({ children, onClick, className = "" }) => (
  <button type="button" className={`pill ${className}`} onClick={onClick}>
    {children}
    <Icon name="arrow" />
  </button>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Home() {
  // Global Shopping & Wishlist State
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Velocity Arc Pro Carbon Racket",
      price: 249.99,
      image: prodRacket,
      quantity: 1,
      size: "Grip 3 (4 3/8\")",
    },
  ]);
  const [wishlist, setWishlist] = useState(() => new Set([2]));

  // Filtering & Search
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Internationalization & Currency
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Modals & Drawers Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountTab, setAccountTab] = useState("profile");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState("");

  // Coupon & Checkout
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  // Notifications & Feedback
  const [toasts, setToasts] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [offerAdded, setOfferAdded] = useState(false);

  // Live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle in-page anchor navigation (e.g. #offers, #best-sellers)
  useEffect(() => {
    const scrollToAnchor = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "").replace("/", "");
        const el = document.getElementById(targetId);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        }
      }
    };

    scrollToAnchor();
    window.addEventListener("hashchange", scrollToAnchor);
    return () => window.removeEventListener("hashchange", scrollToAnchor);
  }, []);

  // Toast System
  const showToast = (title, message, icon = "check") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Price Formatter
  const formatPrice = (val) => {
    if (typeof val !== "number") return val;
    const converted = val * currency.rate;
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  // Cart Calculations
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? cartSubtotal * appliedCoupon.discount : 0;
  const shippingFee = cartSubtotal > 0 ? (cartSubtotal >= 99 ? 0 : 15) : 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const freeShippingTarget = 99;
  const shippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingTarget) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingTarget - cartSubtotal);

  // Cart Actions
  const addToCart = (product, size = null, quantity = 1) => {
    const chosenSize = size || (product.sizes ? product.sizes[0] : "Standard");
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === chosenSize);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === chosenSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.image,
          quantity,
          size: chosenSize,
        },
      ];
    });
    showToast("Added to Cart", `${product.name} (${chosenSize})`, "bag");
  };

  const updateCartQty = (id, size, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
    showToast("Item Removed", "Product removed from cart", "trash");
  };

  // Wishlist Actions
  const toggleWish = (product) => {
    const id = product.id;
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Wishlist Updated", `Removed ${product.name}`, "heart");
      } else {
        next.add(id);
        showToast("Saved to Wishlist", `Added ${product.name}`, "heart-fill");
      }
      return next;
    });
  };

  const moveToCartFromWishlist = (product) => {
    addToCart(product);
    setWishlist((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Coupon Actions
  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (code === "PROKIT35") {
      setAppliedCoupon({ code: "PROKIT35", discount: 0.35, label: "35% Flash Match Deal" });
      setCouponInput("");
      showToast("Coupon Applied!", "35% Discount has been deducted", "tag");
    } else if (code) {
      showToast("Invalid Coupon", "Please use code: PROKIT35", "shield");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon Removed", "Discount has been removed", "tag");
  };

  // Checkout Action
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const orderNum = "PK-" + Math.floor(100000 + Math.random() * 900000);
    setLastOrderDetails({
      orderNum,
      itemCount: totalCartCount,
      total: formatPrice(finalTotal),
    });
    setCartItems([]);
    setAppliedCoupon(null);
    setIsCartOpen(false);
    setIsCheckoutSuccess(true);
    showToast("Order Confirmed!", `Order #${orderNum} placed successfully.`, "check");
  };

  // Category Filtering & Smooth Navigation
  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setSearchQuery("");
    const el = document.getElementById("best-sellers");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Special Offer Actions
  const handleCopyCode = () => {
    navigator.clipboard?.writeText("PROKIT35");
    setCopiedCode(true);
    handleApplyCoupon("PROKIT35");
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const handleClaimOffer = () => {
    const bundleProduct = {
      id: 999,
      name: "Grand Slam Pro All-in-One Tournament Kit",
      price: 229.99,
      oldPrice: 349.99,
      image: prodKit,
      sizes: ["Full Tournament Set (Pre-Strung 55 lbs)"],
      category: "kits",
      description: "Complete tournament set: 2 carbon rackets, 6-racket Head Tour bag, pressurized ball can, wristbands, overgrips & bottle.",
    };
    addToCart(bundleProduct, "Full Tournament Set (Pre-Strung 55 lbs)");
    setOfferAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setOfferAdded(false), 2400);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    showToast("Welcome to Athlete Club!", "You're subscribed for exclusive kit drops.", "mail");
    setEmail("");
  };

  const formatDigit = (num) => String(num).padStart(2, "0");

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.has(p.id));

  return (
    <div className="ace">
      {/* ------------------------------ HERO ------------------------------ */}
      <section className="hero" style={{ backgroundImage: `url(${heroBanner})` }}>
        <div className="hero__shade" />

        <div className="topbar">
          <div className="container topbar__inner">
            <p className="topbar__left">
              <Icon name="ship" /> Free express delivery on tournament kits over {formatPrice(99)}
            </p>
            <a
              className="topbar__center"
              href="#offers"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("offers");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  window.history.pushState(null, "", "#offers");
                }
              }}
            >
              Match-Day Flash Deal: Save 35% on Pro Kits <Icon name="arrow" />
            </a>
            <div className="topbar__right">
              {/* Language & Currency Selector */}
              <div className="topbar__lang-wrap">
                <button
                  type="button"
                  className="topbar__lang"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  aria-expanded={isLangOpen}
                >
                  {lang.code} • {currency.symbol} <Icon name="chevron" />
                </button>

                {isLangOpen && (
                  <div className="topbar__dropdown">
                    <div className="topbar__dropdown-group">
                      <h5>Language</h5>
                      <div className="topbar__dropdown-options">
                        {LANGUAGES.map((l) => (
                          <button
                            key={l.code}
                            type="button"
                            className={`dropdown-chip ${lang.code === l.code ? "dropdown-chip--active" : ""}`}
                            onClick={() => {
                              setLang(l);
                              setIsLangOpen(false);
                              showToast("Language Selected", `Switched to ${l.name}`, "check");
                            }}
                          >
                            {l.code}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="topbar__dropdown-group">
                      <h5>Currency</h5>
                      <div className="topbar__dropdown-options">
                        {CURRENCIES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            className={`dropdown-chip ${currency.code === c.code ? "dropdown-chip--active" : ""}`}
                            onClick={() => {
                              setCurrency(c);
                              setIsLangOpen(false);
                              showToast("Currency Updated", `Prices displayed in ${c.label}`, "tag");
                            }}
                          >
                            {c.code} ({c.symbol})
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Button */}
              <button
                type="button"
                className="icon-btn"
                aria-label="Athlete Account"
                onClick={() => setIsAccountOpen(true)}
              >
                <Icon name="user" />
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                className="icon-btn"
                aria-label={`Wishlist, ${wishlist.size} items`}
                onClick={() => setIsWishlistOpen(true)}
              >
                <Icon name={wishlist.size > 0 ? "heart-fill" : "heart"} />
                {wishlist.size > 0 && <span className="cart-count">{wishlist.size}</span>}
              </button>

              {/* Cart Button */}
              <button
                type="button"
                className="icon-btn icon-btn--cart"
                aria-label={`Cart, ${totalCartCount} items`}
                onClick={() => setIsCartOpen(true)}
              >
                <Icon name="bag" />
                {totalCartCount > 0 && <span className="cart-count">{totalCartCount}</span>}
              </button>
            </div>
          </div>
        </div>

        <header className="nav">
          <div className="container nav__inner">
            <a href="/" className="logo" aria-label="PROKIT Athletics home">
              <span className="logo__word">PROKIT</span>
              <span className="logo__sub">Athletics</span>
            </a>

            <nav className="nav__links" aria-label="Primary">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href || "#best-sellers"}
                  onClick={(e) => {
                    if (l.category) {
                      e.preventDefault();
                      handleCategorySelect(l.category);
                    } else if (l.href === "#offers") {
                      e.preventDefault();
                      const el = document.getElementById("offers");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                        window.history.pushState(null, "", "#offers");
                      }
                    }
                  }}
                >
                  {l.label}
                  {l.badge && <span className="nav-badge">{l.badge}</span>}
                </a>
              ))}
            </nav>

            <form
              className="search"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                handleCategorySelect("all");
              }}
            >
              <Icon name="search" />
              <input
                type="search"
                placeholder="Search sports kits, gear & apparel..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  const el = document.getElementById("best-sellers");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery("")}
                >
                  <Icon name="x-lg" />
                </button>
              )}
            </form>
          </div>
        </header>

        <div className="container hero__content">
          <div className="hero__copy" data-aos="fade-up" data-aos-duration="850">
            <p className="hero__season">New Season • Elite Performance</p>
            <h1 className="hero__title">PROKIT</h1>
            <h2 className="hero__subtitle">Engineered Sports Kits & Gear</h2>
            <p className="hero__text">
              Tournament-grade match equipment, rackets, footwear, and active apparel built for athletes who play to win.
            </p>
            <div className="hero__actions">
              <Pill
                className="pill--light"
                onClick={() => {
                  const el = document.getElementById("offers");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Match Kits
              </Pill>
              <button
                type="button"
                className="hero__sec-btn"
                onClick={() => handleCategorySelect("all")}
              >
                View Best Sellers
              </button>
            </div>
          </div>

          <p className="hero__script" aria-hidden="true" data-aos="zoom-in" data-aos-delay="250">
            <span>Game</span>
            <span>Set</span>
            <span>
              You <Icon name="heart" />
            </span>
          </p>
        </div>

        <div className="container hero__features-wrap">
          <ul className="features">
            {FEATURES.map((f, i) => (
              <li key={f.title} className="features__item" data-aos="fade-up" data-aos-delay={250 + i * 80}>
                <Icon name={f.icon} />
                <div>
                  <strong>{f.title}</strong>
                  <span>{f.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <main>
        {/* --------------------------- CATEGORIES --------------------------- */}
        <section className="section container" aria-labelledby="cat-title">
          <div className="section__head" data-aos="fade-up">
            <div>
              <h2 id="cat-title" className="section__title">Shop by category</h2>
              <p className="section__sub">Explore our comprehensive range of tournament-tested sports kit essentials.</p>
            </div>
            <button
              type="button"
              className="link-all"
              style={{ background: "none", border: 0, cursor: "pointer" }}
              onClick={() => handleCategorySelect("all")}
            >
              View all <Icon name="arrow" />
            </button>
          </div>

          <ul className="categories">
            {CATEGORIES.map((c, i) => (
              <li key={c.name} data-aos="zoom-in" data-aos-delay={i * 50}>
                <button
                  type="button"
                  className="category"
                  style={{ background: "none", border: 0, cursor: "pointer", width: "100%", textAlign: "left" }}
                  onClick={() => handleCategorySelect(c.categoryId)}
                >
                  <span className="category__disc">
                    <img src={c.image} alt={c.name} loading="lazy" onError={handleImgError} />
                  </span>
                  <span className="category__name">{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------- PROMO GRID ---------------------------- */}
        <section className="container promos" aria-label="Featured collections">
          {PROMOS.map((p, i) => (
            <article
              key={p.kicker}
              className="promo"
              data-aos={i === 0 ? "fade-right" : "fade-left"}
              data-aos-delay="100"
            >
              <img className="promo__img" src={p.image} alt="" loading="lazy" onError={handleImgError} />
              <div className="promo__shade" />
              {p.tag && (
                <p className="promo__tag" aria-hidden="true">
                  {p.tag.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </p>
              )}
              <div className="promo__body">
                <p className="promo__kicker">{p.kicker}</p>
                <h3 className="promo__title">
                  {p.title.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </h3>
                <p className="promo__text">{p.text}</p>
                <Pill
                  className="pill--light pill--sm"
                  onClick={() => handleCategorySelect(p.categoryId)}
                >
                  {p.cta}
                </Pill>
              </div>
            </article>
          ))}
        </section>

        {/* ---------------------------- BEST SELLERS ---------------------------- */}
        <section id="best-sellers" className="section container" aria-labelledby="best-title">
          <div className="section__head section__head--stack" data-aos="fade-up">
            <div>
              <h2 id="best-title" className="section__title">Best sellers</h2>
              <p className="section__sub">Our most loved match gear, chosen by athletes worldwide.</p>
            </div>
            <button
              type="button"
              className="link-all"
              style={{ background: "none", border: 0, cursor: "pointer" }}
              onClick={() => handleCategorySelect("all")}
            >
              View all <Icon name="arrow" />
            </button>
          </div>

          {/* Dynamic Category Filter Tabs */}
          <div className="filter-tabs" data-aos="fade-up">
            {CATEGORY_TABS.map((tab) => {
              const count =
                tab.id === "all"
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.category === tab.id).length;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`filter-tab ${activeCategory === tab.id ? "filter-tab--active" : ""}`}
                  onClick={() => handleCategorySelect(tab.id)}
                >
                  <span>{tab.label}</span>
                  <span className="filter-tab__count">{count}</span>
                </button>
              );
            })}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="drawer__empty" style={{ padding: "60px 20px" }}>
              <div className="drawer__empty-icon">
                <Icon name="search" />
              </div>
              <h4>No gear found matching "{searchQuery}"</h4>
              <p>Try searching for rackets, shoes, bags, balls, or reset filters.</p>
              <button
                type="button"
                className="hero__sec-btn"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <ul className="products" style={{ marginTop: "28px" }}>
              {filteredProducts.map((p, idx) => {
                const wished = wishlist.has(p.id);
                return (
                  <li
                    key={p.id}
                    className="product"
                    data-aos="fade-up"
                    data-aos-delay={(idx % 3) * 100}
                  >
                    <div className="product__media">
                      {p.badge && (
                        <span className={`badge badge--${p.badge.type}`}>{p.badge.label}</span>
                      )}
                      <button
                        type="button"
                        className={`wish ${wished ? "wish--on" : ""}`}
                        aria-pressed={wished}
                        aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
                        onClick={() => toggleWish(p)}
                      >
                        <i className={wished ? "bi bi-heart-fill" : "bi bi-heart"} aria-hidden="true" />
                      </button>
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        onError={handleImgError}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setQuickViewProduct(p);
                          setQuickViewSize(p.sizes ? p.sizes[0] : "Standard");
                        }}
                      />
                    </div>

                    <div className="product__content">
                      <h3
                        className="product__name"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setQuickViewProduct(p);
                          setQuickViewSize(p.sizes ? p.sizes[0] : "Standard");
                        }}
                      >
                        {p.name}
                      </h3>
                      {p.description && <p className="product__desc">{p.description}</p>}
                      <div className="product__info">
                        <div>
                          <p className="product__rating">
                            <Stars value={p.rating} />
                            <span className="product__reviews">({p.reviews})</span>
                          </p>
                          <p className="product__price">
                            <span className="price">{formatPrice(p.price)}</span>
                            {p.oldPrice && <s className="price price--old">{formatPrice(p.oldPrice)}</s>}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="add-btn"
                          aria-label={`Add ${p.name} to cart`}
                          onClick={() => addToCart(p)}
                        >
                          <Icon name="bag" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* ------------------------- SPECIAL OFFER SECTION ------------------------- */}
        <section id="offers" className="section container" aria-label="Limited Time Offer">
          <div className="offer-card" data-aos="zoom-in-up" data-aos-duration="850">
            <div className="offer-card__grid">
              <div className="offer-card__media">
                <span className="offer-badge">
                  <Icon name="tag" /> 35% OFF LIMITED DEAL
                </span>
                <img src={prodKit} alt="Grand Slam Tournament Sports Kit Bundle" loading="lazy" />
              </div>

              <div className="offer-card__content">
                <div className="offer-timer">
                  <span className="offer-timer__label">
                    <Icon name="clock" /> Flash Deal Ends In:
                  </span>
                  <div className="offer-timer__digits">
                    <div className="time-box">
                      <span>{formatDigit(timeLeft.hours)}</span>
                      <small>HRS</small>
                    </div>
                    <span className="time-sep">:</span>
                    <div className="time-box">
                      <span>{formatDigit(timeLeft.minutes)}</span>
                      <small>MIN</small>
                    </div>
                    <span className="time-sep">:</span>
                    <div className="time-box time-box--sec">
                      <span>{formatDigit(timeLeft.seconds)}</span>
                      <small>SEC</small>
                    </div>
                  </div>
                </div>

                <h2 className="offer-title">Grand Slam Pro All-in-One Tournament Kit</h2>
                <p className="offer-subtitle">
                  The complete championship-ready kit. Engineered for immediate court dominance with premium protective thermal storage.
                </p>

                <ul className="offer-features">
                  <li>
                    <Icon name="check" /> <strong>2x Velocity Arc Pro</strong> Carbon Rackets (Pre-strung to 55 lbs)
                  </li>
                  <li>
                    <Icon name="check" /> <strong>1x Tour Master 6-Racket</strong> Thermo-Shield kit bag
                  </li>
                  <li>
                    <Icon name="check" /> <strong>1x Can of 4 Ace Championship</strong> pressurized optic balls
                  </li>
                  <li>
                    <Icon name="check" /> <strong>2x Terry Wristbands + 3x Overgrips</strong> + 750ml Hydro Bottle
                  </li>
                </ul>

                <div className="offer-pricing-wrap">
                  <div className="offer-pricing">
                    <span className="offer-price">{formatPrice(229.99)}</span>
                    <span className="offer-old">{formatPrice(349.99)}</span>
                    <span className="offer-savings">You Save {formatPrice(120)}</span>
                  </div>

                  <div className="offer-coupon">
                    <span className="coupon-code">CODE: PROKIT35</span>
                    <button
                      type="button"
                      className="coupon-btn"
                      onClick={handleCopyCode}
                      aria-label="Copy coupon code"
                    >
                      {copiedCode ? "Copied & Applied!" : "Copy & Apply"}
                    </button>
                  </div>
                </div>

                <div className="offer-actions">
                  <button
                    type="button"
                    className="offer-cta"
                    onClick={handleClaimOffer}
                  >
                    {offerAdded ? "✓ Added to Cart!" : "Claim Tournament Bundle"}
                    <Icon name="arrow" />
                  </button>
                  <p className="offer-guarantee">
                    <Icon name="shield" /> 30-Day Match Trial • Free Express Shipping Included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------- PERFORMANCE TECH PILLARS ------------------------- */}
        <section className="section container" aria-labelledby="tech-title">
          <div className="section__head section__head--center" data-aos="fade-up">
            <p className="section__kicker">ENGINEERED ADVANTAGE</p>
            <h2 id="tech-title" className="section__title">Why Athletes Choose PROKIT</h2>
            <p className="section__sub">Precision engineering, tournament-grade materials, and unmatched durability.</p>
          </div>

          <div className="tech-grid">
            {TECH_PILLARS.map((tech, i) => (
              <div
                key={tech.title}
                className="tech-card"
                data-aos="fade-up"
                data-aos-delay={i * 90}
              >
                <div className="tech-card__icon">
                  <Icon name={tech.icon} />
                </div>
                <span className="tech-card__spec">{tech.spec}</span>
                <h3 className="tech-card__title">{tech.title}</h3>
                <p className="tech-card__text">{tech.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------- ATHLETE REVIEWS ------------------------- */}
        <section className="section container" aria-labelledby="reviews-title">
          <div className="section__head" data-aos="fade-up">
            <div>
              <p className="section__kicker">PLAYER TESTIMONIALS</p>
              <h2 id="reviews-title" className="section__title">Trusted on Tournament Courts</h2>
              <p className="section__sub">Feedback from active competitors, collegiate players, and certified coaches.</p>
            </div>
            <div className="review-badge-rating">
              <Stars value={5} />
              <span>4.9 / 5 Overall Score</span>
            </div>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, idx) => (
              <article
                key={t.id}
                className="testimonial-card"
                data-aos="fade-up"
                data-aos-delay={idx * 110}
              >
                <div className="testimonial-card__head">
                  <Stars value={t.rating} />
                  <span className="testimonial-card__badge">{t.badge}</span>
                </div>
                <blockquote className="testimonial-card__quote">
                  "{t.quote}"
                </blockquote>
                <div className="testimonial-card__author">
                  <div className="author-avatar">{t.name[0]}</div>
                  <div>
                    <h4 className="author-name">{t.name}</h4>
                    <p className="author-role">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------- COLLECTION BANNER ------------------------- */}
        <section className="container" aria-label="New collection">
          <article className="collection" style={{ backgroundImage: `url(${collectionBanner})` }} data-aos="fade-up">
            <div className="collection__shade" />
            <p className="collection__script" aria-hidden="true">
              <span>More</span>
              <span>Than</span>
              <span>
                a Game <Icon name="heart" />
              </span>
            </p>
            <div className="collection__body">
              <p className="collection__kicker">New collection</p>
              <h2 className="collection__title">Play in style</h2>
              <p className="collection__text">Performance meets timeless athletic design.</p>
              <Pill
                className="pill--light pill--sm"
                onClick={() => handleCategorySelect("all")}
              >
                Shop the collection
              </Pill>
            </div>
          </article>
        </section>
      </main>

      {/* ------------------------- STREAMLINED FOOTER ------------------------- */}
      <footer className="footer" data-aos="fade-in">
        <div className="container">
          <div className="footer__streamlined">
            {/* Col 1: Brand & Bio */}
            <div className="footer__brand-block">
              <a href="/" className="logo logo--dark" aria-label="PROKIT Athletics home">
                <span className="logo__word">PROKIT</span>
                <span className="logo__sub">Athletics</span>
              </a>
              <p className="footer__tagline">Engineered for peak performance on every court.</p>
              <ul className="socials">
                {SOCIALS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      aria-label={s}
                      className="socials__link"
                      style={{ background: "none", border: 0, cursor: "pointer" }}
                      onClick={() => showToast(s, `Follow PROKIT Athletics on ${s}`, "arrow")}
                    >
                      <i className={SOCIAL_ICONS[s] || "bi bi-link-45deg"} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Shop Links */}
            <nav className="footer__nav-col" aria-label="Shop Links">
              <h4>Gear & Kits</h4>
              <ul>
                {FOOTER_LINKS.shop.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        if (l.label.includes("Rackets")) handleCategorySelect("rackets");
                        else if (l.label.includes("Shoes")) handleCategorySelect("shoes");
                        else if (l.label.includes("Bags")) handleCategorySelect("bags");
                        else if (l.label.includes("Balls")) handleCategorySelect("balls");
                        else {
                          const el = document.getElementById("offers");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 3: Support Links */}
            <nav className="footer__nav-col" aria-label="Support Links">
              <h4>Athlete Support</h4>
              <ul>
                {FOOTER_LINKS.support.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        showToast(l.label, "Athlete 24/7 Concierge: support@prokitathletics.com", "support");
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 4: Compact Newsletter */}
            <div className="footer__news-block">
              <h4>Join PROKIT Athlete Club</h4>
              <p>Exclusive kit drops, stringing guides, and member discounts.</p>
              <form className="footer__compact-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter athlete email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">{subscribed ? "Joined" : "Join"}</button>
              </form>
              <div className="footer__payments-compact">
                <span className="pay-tag">VISA</span>
                <span className="pay-tag">Mastercard</span>
                <span className="pay-tag">PayPal</span>
                <span className="pay-tag">GPay</span>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <p>© 2026 PROKIT Athletics Inc. All rights reserved.</p>
            <div className="footer__legal-links">
              <a href="#privacy" onClick={(e) => { e.preventDefault(); showToast("Privacy Policy", "Athlete data is 100% encrypted & protected.", "shield"); }}>Privacy Policy</a>
              <span>•</span>
              <a href="#terms" onClick={(e) => { e.preventDefault(); showToast("Terms of Service", "Official tournament performance terms.", "shield"); }}>Terms of Service</a>
              <span>•</span>
              <a href="#warranty" onClick={(e) => { e.preventDefault(); showToast("1-Year Pro Warranty", "Full frame and gear replacement coverage.", "shield"); }}>Warranty</a>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE DRAWERS & MODALS BACKDROP
          ===================================================================== */}
      <div
        className={`drawer-overlay ${
          isCartOpen || isWishlistOpen || quickViewProduct || isAccountOpen || isCheckoutSuccess
            ? "drawer-overlay--open"
            : ""
        }`}
        onClick={() => {
          setIsCartOpen(false);
          setIsWishlistOpen(false);
          setQuickViewProduct(null);
          setIsAccountOpen(false);
          setIsCheckoutSuccess(false);
        }}
      />

      {/* =====================================================================
          SLIDE-OVER CART DRAWER
          ===================================================================== */}
      <aside className={`drawer ${isCartOpen ? "drawer--open" : ""}`} aria-label="Shopping Cart">
        <div className="drawer__header">
          <h3 className="drawer__title">
            <Icon name="bag" /> Your Cart ({totalCartCount})
          </h3>
          <button
            type="button"
            className="drawer__close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <Icon name="x-lg" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="drawer__shipping-bar">
          <div className="shipping-bar__text">
            <span>
              {amountToFreeShipping === 0
                ? "🎉 You've unlocked FREE Express Shipping!"
                : `Add ${formatPrice(amountToFreeShipping)} more for FREE Express Shipping`}
            </span>
            <strong>{shippingProgress}%</strong>
          </div>
          <div className="shipping-bar__track">
            <div className="shipping-bar__fill" style={{ width: `${shippingProgress}%` }} />
          </div>
        </div>

        <div className="drawer__body">
          {cartItems.length === 0 ? (
            <div className="drawer__empty">
              <div className="drawer__empty-icon">
                <Icon name="bag" />
              </div>
              <h4>Your bag is currently empty</h4>
              <p>Gear up with tournament-approved carbon rackets, shoes, and match bundles.</p>
              <button
                type="button"
                className="drawer__checkout-btn"
                style={{ width: "auto", padding: "10px 24px" }}
                onClick={() => {
                  setIsCartOpen(false);
                  handleCategorySelect("all");
                }}
              >
                Browse Best Sellers
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="drawer-item">
                <img src={item.image} alt={item.name} className="drawer-item__img" onError={handleImgError} />
                <div className="drawer-item__info">
                  <div>
                    <h4 className="drawer-item__title">{item.name}</h4>
                    <span className="drawer-item__meta">{item.size}</span>
                  </div>
                  <div className="drawer-item__bottom">
                    <span className="drawer-item__price">{formatPrice(item.price * item.quantity)}</span>
                    <div className="qty-stepper">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateCartQty(item.id, item.size, -1)}
                      >
                        <Icon name="dash" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateCartQty(item.id, item.size, 1)}
                      >
                        <Icon name="plus" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="drawer-item__remove"
                      aria-label="Remove item"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      <Icon name="trash" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer__footer">
            {/* Promo Code Input */}
            {appliedCoupon ? (
              <div className="coupon-applied-pill">
                <span>
                  <Icon name="check" /> {appliedCoupon.label} (-35%)
                </span>
                <button type="button" onClick={handleRemoveCoupon} aria-label="Remove coupon">
                  <Icon name="x-lg" />
                </button>
              </div>
            ) : (
              <div className="drawer__coupon-box">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. PROKIT35)"
                  className="drawer__coupon-input"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button
                  type="button"
                  className="drawer__coupon-btn"
                  onClick={() => handleApplyCoupon()}
                >
                  Apply
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="drawer__totals">
              <div className="drawer__totals-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="drawer__totals-row" style={{ color: "var(--brand-volt)" }}>
                  <span>35% Coupon Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="drawer__totals-row">
                <span>Express Shipping</span>
                <span>{shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}</span>
              </div>
              <div className="drawer__totals-row drawer__totals-row--total">
                <span>Estimated Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              className="drawer__checkout-btn"
              onClick={handleCheckout}
            >
              <Icon name="shield" /> Proceed to Checkout ({formatPrice(finalTotal)})
            </button>
          </div>
        )}
      </aside>

      {/* =====================================================================
          SLIDE-OVER WISHLIST DRAWER
          ===================================================================== */}
      <aside className={`drawer ${isWishlistOpen ? "drawer--open" : ""}`} aria-label="Saved Wishlist">
        <div className="drawer__header">
          <h3 className="drawer__title">
            <Icon name="heart-fill" /> Saved Items ({wishlist.size})
          </h3>
          <button
            type="button"
            className="drawer__close"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
          >
            <Icon name="x-lg" />
          </button>
        </div>

        <div className="drawer__body">
          {wishlistedProducts.length === 0 ? (
            <div className="drawer__empty">
              <div className="drawer__empty-icon">
                <Icon name="heart" />
              </div>
              <h4>Your wishlist is empty</h4>
              <p>Tap the heart icon on any match racket or equipment to save it here for later.</p>
              <button
                type="button"
                className="drawer__checkout-btn"
                style={{ width: "auto", padding: "10px 24px" }}
                onClick={() => {
                  setIsWishlistOpen(false);
                  handleCategorySelect("all");
                }}
              >
                Explore Gear
              </button>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div key={p.id} className="drawer-item">
                <img src={p.image} alt={p.name} className="drawer-item__img" onError={handleImgError} />
                <div className="drawer-item__info">
                  <div>
                    <h4 className="drawer-item__title">{p.name}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "2px 0 6px" }}>
                      <Stars value={p.rating} />
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>({p.reviews})</span>
                    </div>
                  </div>
                  <div className="drawer-item__bottom">
                    <span className="drawer-item__price">{formatPrice(p.price)}</span>
                    <button
                      type="button"
                      className="drawer-item__action-btn"
                      onClick={() => moveToCartFromWishlist(p)}
                    >
                      <Icon name="bag" /> Move to Cart
                    </button>
                    <button
                      type="button"
                      className="drawer-item__remove"
                      aria-label="Remove item from wishlist"
                      onClick={() => toggleWish(p)}
                    >
                      <Icon name="trash" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="drawer__footer">
            <button
              type="button"
              className="drawer__checkout-btn"
              onClick={() => {
                wishlistedProducts.forEach((p) => addToCart(p));
                setWishlist(new Set());
                setIsWishlistOpen(false);
                setIsCartOpen(true);
                showToast("All Moved!", "All saved items transferred to cart.", "bag");
              }}
            >
              Move All to Cart
            </button>
          </div>
        )}
      </aside>

      {/* =====================================================================
          QUICK VIEW PRODUCT MODAL
          ===================================================================== */}
      {quickViewProduct && (
        <div className="modal-container">
          <div className="modal-card">
            <button
              type="button"
              className="modal-close"
              aria-label="Close product view"
              onClick={() => setQuickViewProduct(null)}
            >
              <Icon name="x-lg" />
            </button>

            <div className="quickview-grid">
              <div className="quickview-media">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  onError={handleImgError}
                />
              </div>

              <div className="quickview-content">
                <div>
                  <span className="hero__season" style={{ fontSize: "10px", padding: "2px 8px" }}>
                    PROKIT TOURNAMENT SPEC
                  </span>
                  <h3 className="quickview-title">{quickViewProduct.name}</h3>
                </div>

                <div className="quickview-pricing">
                  <span className="quickview-price">{formatPrice(quickViewProduct.price)}</span>
                  {quickViewProduct.oldPrice && (
                    <s className="price price--old">{formatPrice(quickViewProduct.oldPrice)}</s>
                  )}
                  <Stars value={quickViewProduct.rating} />
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    ({quickViewProduct.reviews} reviews)
                  </span>
                </div>

                <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                  {quickViewProduct.description}
                </p>

                {quickViewProduct.specs && (
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                      Engineering Specs:
                    </span>
                    <div className="quickview-specs">
                      {quickViewProduct.specs.map((spec) => (
                        <div key={spec} className="quickview-spec-chip">
                          <Icon name="check" /> {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {quickViewProduct.sizes && (
                  <div className="quickview-sizes">
                    <label>Select Size / Variant:</label>
                    <div className="quickview-size-options">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`size-pill ${quickViewSize === s ? "size-pill--active" : ""}`}
                          onClick={() => setQuickViewSize(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="quickview-actions">
                  <button
                    type="button"
                    className="quickview-btn-cart"
                    onClick={() => {
                      addToCart(quickViewProduct, quickViewSize);
                      setQuickViewProduct(null);
                    }}
                  >
                    <Icon name="bag" /> Add to Cart ({formatPrice(quickViewProduct.price)})
                  </button>

                  <button
                    type="button"
                    className="quickview-btn-wish"
                    aria-label="Save to wishlist"
                    onClick={() => toggleWish(quickViewProduct)}
                  >
                    <Icon name={wishlist.has(quickViewProduct.id) ? "heart-fill" : "heart"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ATHLETE ACCOUNT MODAL
          ===================================================================== */}
      {isAccountOpen && (
        <div className="modal-container">
          <div className="modal-card" style={{ maxWidth: "520px" }}>
            <button
              type="button"
              className="modal-close"
              aria-label="Close account modal"
              onClick={() => setIsAccountOpen(false)}
            >
              <Icon name="x-lg" />
            </button>

            <div className="account-modal">
              <div className="account-tabs">
                <button
                  type="button"
                  className={`account-tab-btn ${accountTab === "profile" ? "account-tab-btn--active" : ""}`}
                  onClick={() => setAccountTab("profile")}
                >
                  Athlete Profile
                </button>
                <button
                  type="button"
                  className={`account-tab-btn ${accountTab === "signin" ? "account-tab-btn--active" : ""}`}
                  onClick={() => setAccountTab("signin")}
                >
                  {isLoggedIn ? "Account Settings" : "Sign In"}
                </button>
              </div>

              {accountTab === "profile" ? (
                <div>
                  <div className="athlete-badge-card">
                    <div>
                      <h4>Alex Morgan</h4>
                      <p>PRO DIVISION ATHLETE • 1,450 PTS</p>
                    </div>
                    <span className="athlete-tier-badge">
                      TIER 1 ELITE
                    </span>
                  </div>

                  <h5 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 10px" }}>
                    Recent Orders & Tournament Passes
                  </h5>

                  <div className="order-history-list">
                    <div className="order-history-item">
                      <div>
                        <strong>#PK-884192</strong>
                        <div style={{ color: "var(--text-muted)", fontSize: "11px" }}>Grand Slam Kit Bundle (2 Rackets)</div>
                      </div>
                      <span style={{ color: "var(--brand-volt)", fontWeight: 700 }}>Delivered</span>
                    </div>

                    <div className="order-history-item">
                      <div>
                        <strong>#PK-772109</strong>
                        <div style={{ color: "var(--text-muted)", fontSize: "11px" }}>Court Velocity Pro Shoes (US 10)</div>
                      </div>
                      <span style={{ color: "var(--text-secondary)" }}>Completed</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="account-btn"
                    style={{ width: "100%", marginTop: "20px" }}
                    onClick={() => {
                      setIsLoggedIn(false);
                      setAccountTab("signin");
                      showToast("Signed Out", "You have signed out of Athlete Club", "user");
                    }}
                  >
                    Sign Out of PROKIT
                  </button>
                </div>
              ) : (
                <form
                  className="account-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoggedIn(true);
                    setAccountTab("profile");
                    showToast("Signed In", "Welcome back, Athlete!", "check");
                  }}
                >
                  <div className="form-group">
                    <label>Athlete Email</label>
                    <input type="email" placeholder="alex.morgan@athlete.com" defaultValue="alex.morgan@athlete.com" required />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="••••••••" defaultValue="password123" required />
                  </div>
                  <button type="submit" className="account-btn">
                    Sign In to Athlete Portal
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          CHECKOUT SIMULATION SUCCESS MODAL
          ===================================================================== */}
      {isCheckoutSuccess && lastOrderDetails && (
        <div className="modal-container">
          <div className="modal-card" style={{ maxWidth: "480px" }}>
            <div className="checkout-modal">
              <div className="checkout-icon-wrap">
                <Icon name="check" />
              </div>

              <h3>Order Confirmed!</h3>
              <p>
                Thank you for gearing up with PROKIT. Your match equipment has been allocated and prepared for express dispatch.
              </p>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  padding: "16px",
                  textAlign: "left",
                  margin: "0 auto 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "13px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Order Reference:</span>
                  <strong>{lastOrderDetails.orderNum}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Total Items:</span>
                  <span>{lastOrderDetails.itemCount} items</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Total Paid:</span>
                  <strong style={{ color: "var(--brand-volt)" }}>{lastOrderDetails.total}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Shipping:</span>
                  <span style={{ color: "var(--brand-volt)" }}>ITF Tournament Express (Free)</span>
                </div>
              </div>

              <button
                type="button"
                className="drawer__checkout-btn"
                onClick={() => setIsCheckoutSuccess(false)}
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          GLOBAL TOAST NOTIFICATIONS CONTAINER
          ===================================================================== */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <Icon name={toast.icon} />
            <div>
              <strong>{toast.title}</strong>
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
