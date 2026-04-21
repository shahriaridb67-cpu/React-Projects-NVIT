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
  { bg: 'linear-gradient(135deg,#6C63FF 0%,#43C6AC 100%)', title: 'Summer Sale is Live!', subtitle: 'Up to 50% off on selected items', cta: 'Shop Now', link: '/products?sort=popular', emoji: '🛍️' },
  { bg: 'linear-gradient(135deg,#FF6584 0%,#FF8E53 100%)', title: 'New Arrivals', subtitle: 'Discover the latest trends', cta: 'Explore', link: '/products?sort=newest', emoji: '✨' },
  { bg: 'linear-gradient(135deg,#1a1a2e 0%,#6C63FF 100%)', title: 'Premium Electronics', subtitle: 'Top brands at best prices', cta: 'Browse', link: '/products', emoji: '📱' },
  { bg: 'linear-gradient(135deg,#43C6AC 0%,#3B82F6 100%)', title: 'Free Shipping', subtitle: 'On all orders above BDT 1000', cta: 'Order Now', link: '/products', emoji: '🚚' },
  { bg: 'linear-gradient(135deg,#FF6584 0%,#6C63FF 100%)', title: 'Weekend Deals', subtitle: 'Limited time offers every weekend', cta: 'Grab Deals', link: '/products?sort=popular', emoji: '🔥' },
];

const features: Feature[] = [
  { icon: <FiTruck />, title: 'Free Delivery', desc: 'On orders over BDT 1000', color: '#6C63FF' },
  { icon: <FiShield />, title: 'Secure Payment', desc: '100% secure transactions', color: '#43C6AC' },
  { icon: <FiRefreshCw />, title: 'Easy Returns', desc: '7-day return policy', color: '#FF6584' },
  { icon: <FiHeadphones />, title: '24/7 Support', desc: 'Dedicated support team', color: '#ffc107' },
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
              <div><h2 className="section-title">Trending Products</h2><p className="section-subtitle">Most popular items this week</p></div>
              <Link to="/products?trending=true" className="btn btn-outline">View All <FiArrowRight /></Link>
            </div>
            <div className="grid grid-4">{trendingProducts.map(p => <ProductCard key={p._id} product={p} />)}</div>
          </div>
        </section>
      )}

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-inner">
            <div className="promo-text">
              <h2>Special Offer!</h2>
              <p>Get 20% off your first order with code <strong>WELCOME20</strong></p>
              <Link to="/products" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)' }}>Shop Now <FiArrowRight /></Link>
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
              <div><h2 className="section-title">Featured Products</h2><p className="section-subtitle">Handpicked just for you</p></div>
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
              <div><h2 className="section-title">New Arrivals</h2><p className="section-subtitle">Fresh picks added this week</p></div>
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
