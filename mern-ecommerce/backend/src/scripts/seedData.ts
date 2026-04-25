import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Category from '../models/Category';
import Product from '../models/Product';

async function main() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopzone_db');
  
  // Clear existing data
  await Category.deleteMany({});
  await Product.deleteMany({});
  
  // ═══════════════════════════════════════════════════════════════
  // GHORER BAZAR - ORGANIC/AGRO CATEGORIES
  // ═══════════════════════════════════════════════════════════════
  const cats = await Category.insertMany([
    { 
      name: 'Honey & Syrups', 
      description: 'Pure, organic honey and natural syrups from local sources',
      order: 1 
    },
    { 
      name: 'Dairy & Ghee', 
      description: 'Fresh organic dairy products and pure desi ghee',
      order: 2 
    },
    { 
      name: 'Oils & Extracts', 
      description: 'Cold-pressed organic oils and pure extracts',
      order: 3 
    },
    { 
      name: 'Spices & Seasonings', 
      description: 'Handmade and organic spice blends',
      order: 4 
    },
    { 
      name: 'Rice & Grains', 
      description: 'Premium organic rice and grains',
      order: 5 
    },
    { 
      name: 'Vegetables & Produce', 
      description: 'Fresh organic vegetables and farm produce',
      order: 6 
    },
    { 
      name: 'Nuts & Seeds', 
      description: 'Raw organic nuts and seeds',
      order: 7 
    },
    { 
      name: 'Herbal Products', 
      description: 'Organic herbal teas and wellness products',
      order: 8 
    },
  ]);

  // ═══════════════════════════════════════════════════════════════
  // GHORER BAZAR - AUTHENTIC ORGANIC PRODUCTS
  // ═══════════════════════════════════════════════════════════════
  await Product.insertMany([
    {
      name: 'Pure Sundarbans Honey 500g',
      slug: 'pure-sundarbans-honey-500g',
      description: 'Golden, raw honey collected from the dense forests of Sundarbans. Rich in natural enzymes and antioxidants. No heating, no filtering, completely natural.',
      shortDescription: 'Raw forest honey from Sundarbans',
      price: 650,
      discountPrice: 580,
      category: cats[0]._id,
      brand: 'Sundarbans Farm',
      stock: 120,
      sku: 'HONEY-SUNDARBANS-500',
      tags: ['honey', 'organic', 'sundarbans', 'raw', 'natural'],
      ratings: 4.8,
      numReviews: 45,
      isFeatured: true,
      isTrending: true,
      isActive: true,
      weight: 500,
      images: [
        { url: 'https://placehold.co/500x500?text=Sundarbans+Honey', public_id: 'ghorer_honey_1' }
      ],
      // ─── GHORER BAZAR CUSTOM FIELDS ───
      origin: 'Sundarbans, Bangladesh',
      healthBenefits: [
        'Boosts immunity',
        'Natural energy source',
        'Aids digestion',
        'Soothes cough',
        'Rich in antioxidants'
      ],
      expiryDuration: '18 months',
      isOrganicCertified: true,
      offerLabel: '10% OFF'
    },

    {
      name: 'Gawa Ghee 500ml - Pure Desi',
      slug: 'gawa-ghee-500ml-pure-desi',
      description: 'Traditional desi ghee made from the milk of grass-fed cows in Rajshahi region. Slow-cooked using centuries-old methods. Golden color, authentic aroma, and rich nutritional value.',
      shortDescription: 'Traditional desi ghee from Rajshahi',
      price: 850,
      discountPrice: 720,
      category: cats[1]._id,
      brand: 'Rajshahi Dairy Farm',
      stock: 85,
      sku: 'GHEE-GAWA-500',
      tags: ['ghee', 'desi ghee', 'rajshahi', 'dairy', 'organic'],
      ratings: 4.9,
      numReviews: 62,
      isFeatured: true,
      isTrending: true,
      isActive: true,
      weight: 500,
      images: [
        { url: 'https://placehold.co/500x500?text=Gawa+Ghee', public_id: 'ghorer_ghee_1' }
      ],
      // ─── GHORER BAZAR CUSTOM FIELDS ───
      origin: 'Rajshahi, Bangladesh',
      healthBenefits: [
        'Pure source of fat-soluble vitamins',
        'Supports bone health',
        'Improves digestion',
        'Boosts immunity',
        'Good for skin and hair'
      ],
      expiryDuration: '24 months',
      isOrganicCertified: true,
      offerLabel: '15% OFF'
    },

    {
      name: 'Organic Mustard Oil 1L - Cold Pressed',
      slug: 'organic-mustard-oil-1l-cold-pressed',
      description: 'Cold-pressed organic mustard oil extracted from pure mustard seeds. No heat processing preserves all nutrients. Perfect for cooking and massage. Golden, pungent aroma.',
      shortDescription: 'Cold-pressed organic mustard oil',
      price: 520,
      discountPrice: 450,
      category: cats[2]._id,
      brand: 'Village Oil Mills',
      stock: 150,
      sku: 'OIL-MUSTARD-1L',
      tags: ['mustard oil', 'cold pressed', 'organic', 'cooking oil'],
      ratings: 4.6,
      numReviews: 38,
      isFeatured: true,
      isActive: true,
      weight: 1000,
      images: [
        { url: 'https://placehold.co/500x500?text=Mustard+Oil', public_id: 'ghorer_oil_1' }
      ],
      // ─── GHORER BAZAR CUSTOM FIELDS ───
      origin: 'Rural Bangladesh',
      healthBenefits: [
        'High in omega-3 fatty acids',
        'Anti-inflammatory properties',
        'Improves heart health',
        'Boosts metabolism',
        'Natural hair and skin care'
      ],
      expiryDuration: '12 months',
      isOrganicCertified: true,
      offerLabel: '13% OFF'
    },

    {
      name: 'Handmade Spice Blend - Bengali Masala 250g',
      slug: 'handmade-spice-blend-bengali-masala-250g',
      description: 'Authentic Bengali spice blend made fresh daily by local artisans. A perfect mix of cumin, coriander, fenugreek, and more. No additives, no preservatives. Perfect for Bengali curries and everyday cooking.',
      shortDescription: 'Traditional Bengali masala blend',
      price: 380,
      discountPrice: 320,
      category: cats[3]._id,
      brand: 'Artisan Spice Makers',
      stock: 200,
      sku: 'SPICE-BENGALI-250',
      tags: ['spices', 'masala', 'bengali', 'organic', 'handmade'],
      ratings: 4.7,
      numReviews: 51,
      isFeatured: true,
      isActive: true,
      weight: 250,
      images: [
        { url: 'https://placehold.co/500x500?text=Bengali+Masala', public_id: 'ghorer_spice_1' }
      ],
      // ─── GHORER BAZAR CUSTOM FIELDS ───
      origin: 'Dhaka, Bangladesh',
      healthBenefits: [
        'Aids digestion',
        'Anti-inflammatory',
        'Enhances flavor naturally',
        'Rich in minerals',
        'No artificial additives'
      ],
      expiryDuration: '6 months',
      isOrganicCertified: true,
      offerLabel: '16% OFF'
    },

    {
      name: 'Premium Organic Basmati Rice 2kg',
      slug: 'premium-organic-basmati-rice-2kg',
      description: 'Premium grade organic basmati rice cultivated without synthetic pesticides or fertilizers. Long grain, aromatic, and perfect for daily use. Sourced directly from organic farms.',
      shortDescription: 'Organic basmati rice - premium quality',
      price: 680,
      discountPrice: 600,
      category: cats[4]._id,
      brand: 'Organic Farm Co.',
      stock: 110,
      sku: 'RICE-BASMATI-2KG',
      tags: ['rice', 'basmati', 'organic', 'grain'],
      ratings: 4.5,
      numReviews: 29,
      isFeatured: true,
      isActive: true,
      weight: 2000,
      images: [
        { url: 'https://placehold.co/500x500?text=Basmati+Rice', public_id: 'ghorer_rice_1' }
      ],
      // ─── GHORER BAZAR CUSTOM FIELDS ───
      origin: 'Northern Bangladesh',
      healthBenefits: [
        'High in fiber',
        'Good source of carbohydrates',
        'Low glycemic index',
        'Contains essential amino acids',
        'No chemical residue'
      ],
      expiryDuration: '24 months',
      isOrganicCertified: true,
      offerLabel: '12% OFF'
    },

    {
      name: 'Mixed Organic Nuts & Seeds 500g',
      slug: 'mixed-organic-nuts-seeds-500g',
      description: 'A nutritious mix of raw, unsalted almonds, cashews, walnuts, sunflower seeds, and pumpkin seeds. No additives, no roasting. Perfect for snacking and health.',
      shortDescription: 'Raw organic nuts and seeds mix',
      price: 750,
      discountPrice: 650,
      category: cats[6]._id,
      brand: 'Nature\'s Harvest',
      stock: 95,
      sku: 'NUTS-MIX-500',
      tags: ['nuts', 'seeds', 'organic', 'snack', 'healthy'],
      ratings: 4.8,
      numReviews: 44,
      isFeatured: true,
      isActive: true,
      weight: 500,
      images: [
        { url: 'https://placehold.co/500x500?text=Nuts+&+Seeds', public_id: 'ghorer_nuts_1' }
      ],
      // ─── GHORER BAZAR CUSTOM FIELDS ───
      origin: 'Local & Imported Organic',
      healthBenefits: [
        'Rich in protein',
        'Healthy fats (omega-3)',
        'Improves heart health',
        'Brain development',
        'Natural energy boost'
      ],
      expiryDuration: '9 months',
      isOrganicCertified: true,
      offerLabel: '13% OFF'
    }
  ]);

  console.log('✅ Ghorer Bazar seed complete!');
  console.log('   📦 Categories: 8');
  console.log('   🥬 Products: 6 (all organic, all custom fields populated)');
  console.log('   🏷️  All products certified organic with health benefits');
  process.exit(0);
}

main().catch(err => { 
  console.error('❌ Seed error:', err); 
  process.exit(1); 
});
