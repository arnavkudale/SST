import React from 'react';
import ProductCard from './ProductCard';
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Timeless Skin Foaming Face Wash",
    price: "₹699.00",
    image: "https://sallyssoultherapy.com/wp-content/uploads/2022/07/Timeless-Skin-Foaming-Facewash-3-1024x1024.webp",
    link: "https://sallyssoultherapy.com/index.php/product/timeless-skin-foaming-face-wash/"
  },
  {
    id: 2,
    name: "SunShade SPF 50++ with Vitamin C Sunscreen",
    price: "₹1,500.00",
    image: "https://sallyssoultherapy.com/wp-content/uploads/2024/04/SunShade-SPF-50-Vitamin-C-Sunscreen-1-1024x1024.webp",
    link: "https://sallyssoultherapy.com/index.php/product/sunshade-spf-50-with-vitamin-c-sunscreen/"
  },
  {
    id: 3,
    name: "Acne Arrest Face Serum",
    price: "₹1,750.00",
    image: "https://sallyssoultherapy.com/wp-content/uploads/2024/07/Acne-Arrest-Face-Serum-1024x1024.webp",
    link: "https://sallyssoultherapy.com/index.php/product/acne-arrest-face-serum/"
  },
  {
    id: 4,
    name: "The Secret Glow Night Cream",
    price: "₹2,500.00",
    image: "https://sallyssoultherapy.com/wp-content/uploads/2024/04/The-Secret-Glow-Night-Cream-1024x1024.webp",
    link: "https://sallyssoultherapy.com/index.php/product/the-secret-glow-night-cream/"
  }
];

const ProductsSection = () => {
  return (
    <section id="products" className="relative py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="text-accent-foreground font-medium mb-2">Our Collection</h4>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Bestsellers</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              link={product.link}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <a href="https://sallyssoultherapy.com/index.php/shop/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

