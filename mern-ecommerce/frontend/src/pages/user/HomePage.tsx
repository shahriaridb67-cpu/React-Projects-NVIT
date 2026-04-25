import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import ProductCard from '../../components/product/ProductCard';
import { Product, Category } from '../../types';
import API from '../../utils/api';
import './HomePage.css';

interface HeroSlide { bg: string; title: string; subtitle: string; cta: string; link: string; emoji: string; }
interface Feature { icon: React.ReactNode; title: string; desc: string; color: string; }

const heroSlides: HeroSlide[] = [
  { bg: 'linear-gradient(135deg,#2D5A27 0%,#43C6AC 100%)', title: 'Ghorer Bazar - Fresh from Farm', subtitle: '100% Certified Organic Products at Your Doorstep', cta: 'Shop Now', link: '/products?isOrganicCertified=true', emoji: '🌾' },
  { bg: 'linear-gradient(135deg,#8B4513 0%,#D4A574 100%)', title: 'Pure Sundarbans Honey', subtitle: 'Raw, unfiltered, straight from nature', cta: 'Explore', link: '/products?search=honey', emoji: '🍯' },
  { bg: 'linear-gradient(135deg,#F4A460 0%,#DAA520 100%)', title: 'Authentic Desi Ghee', subtitle: 'Slow-cooked using centuries-old methods', cta: 'Browse', link: '/products?search=ghee', emoji: '🧈' },
  { bg: 'linear-gradient(135deg,#6B8E23 0%,#228B22 100%)', title: 'Organic Oils & Extracts', subtitle: 'Cold-pressed for maximum nutrition', cta: 'Order Now', link: '/products?category=oils', emoji: '🌿' },
  { bg: 'linear-gradient(135deg,#2D5A27 0%,#90EE90 100%)', title: 'Handmade Spices & Blends', subtitle: 'Artisan-crafted, no additives, pure flavor', cta: 'Discover', link: '/products?category=spices', emoji: '🌶️' },
];

const features: Feature[] = [
  { icon: <FiTruck />, title: 'Fresh Farm Delivery', desc: 'Harvested fresh, delivered safely', color: '#2D5A27' },
  { icon: <FiShield />, title: 'Certified Organic', desc: '100% verified organic products', color: '#43C6AC' },
  { icon: <FiRefreshCw />, title: 'Quality Guarantee', desc: '30-day satisfaction guarantee', color: '#8B4513' },
  { icon: <FiHeadphones />, title: 'Farm Support 24/7', desc: 'Direct connection with farmers', color: '#DAA520' },
];

const HomePage: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [t, f, c, n] = await Promise.all([
          API.get('/products/trending'),
          API.get('/products?featured=true&limit=8'),
          API.get('/categories'),
          API.get('/products?sort=newest&limit=8'),
        ]);
        setTrendingProducts(t.data.products);
        setFeaturedProducts(f.data.products);
        setCategories(c.data.categories.slice(0, 8));
        setNewArrivals(n.data.products);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const sliderSettings = {
    dots: true, infinite: true, speed: 600, slidesToShow: 1, slidesToScroll: 1,
    autoplay: true, autoplaySpeed: 4500, pauseOnHover: true, arrows: true,
  };

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;

  return (
    <div className="home-page">
      {/* Hero Slider */}
      <section className="hero-section">
        <Slider {...sliderSettings}>
          {heroSlides.map((slide, i) => (
            <div key={i}>
              <div className="hero-slide" style={{ background: slide.bg }}>
                <div className="container">
                  <div className="hero-content">
                    <div className="hero-emoji">{slide.emoji}</div>
                    <h1 className="hero-title">{slide.title}</h1>
                    <p className="hero-subtitle">{slide.subtitle}</p>
                    <Link to={slide.link} className="btn btn-lg hero-btn">{slide.cta} <FiArrowRight /></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon" style={{ background: f.color + '20', color: f.color }}>{f.icon}</div>
                <div><h4>{f.title}</h4><p>{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="section categories-section">
          <div className="container">
            <div className="section-header">
              <div><h2 className="section-title">Shop by Category</h2><p className="section-subtitle">Find exactly what you're looking for</p></div>
              <Link to="/products" className="btn btn-outline">View All <FiArrowRight /></Link>
            </div>
            <div className="categories-grid">
              {categories.map(cat => (
                <Link key={cat._id} to={`/products?category=${cat._id}`} className="category-card">
                  <div className="category-icon">{cat.image ? <img src={cat.image} alt={cat.name} /> : <span></span>}</div>
                  <h4>{cat.name}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending */}
      {trendingProducts.length > 0 && (
        <section className="section products-section trending">
          <div className="container">
            <div className="section-header">
              <div><h2 className="section-title">🔥 Customer Favorites</h2><p className="section-subtitle">Most loved organic products this week</p></div>
              <Link to="/products?trending=true" className="btn btn-outline">View All <FiArrowRight /></Link>
            </div>
            <div className="grid grid-4">{trendingProducts.map(p => <ProductCard key={p._id} product={p} />)}</div>
          </div>
        </section>
      )}

      {/* Promo Banner */}
      <section className="promo-banner" style={{ background: 'linear-gradient(135deg,#2D5A27 0%,#43C6AC 100%)' }}>
        <div className="container">
          <div className="promo-inner">
            <div className="promo-text">
              <h2>🌾 Support Local Farmers</h2>
              <p>Every purchase supports organic farmers. Get 15% off with code <strong>FRESH15</strong></p>
              <Link to="/products?isOrganicCertified=true" className="btn btn-lg" style={{ background: 'white', color: '#2D5A27', fontWeight: 700 }}>Shop Organic <FiArrowRight /></Link>
            </div>
            <div className="promo-emoji"></div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredProducts.length > 0 && (
        <section className="section products-section">
          <div className="container">
            <div className="section-header">
              <div><h2 className="section-title">✓ Our Collection</h2><p className="section-subtitle">Handpicked organic treasures from local farms</p></div>
              <Link to="/products?featured=true" className="btn btn-outline">View All <FiArrowRight /></Link>
            </div>
            <div className="grid grid-4">{featuredProducts.map(p => <ProductCard key={p._id} product={p} />)}</div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="section products-section new-arrivals">
          <div className="container">
            <div className="section-header">
              <div><h2 className="section-title">🌱 Just Arrived</h2><p className="section-subtitle">Fresh farm products added this week</p></div>
              <Link to="/products?sort=newest" className="btn btn-outline">View All <FiArrowRight /></Link>
            </div>
            <div className="grid grid-4">{newArrivals.map(p => <ProductCard key={p._id} product={p} />)}</div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
