import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CategoriesSection from '@/components/CategoriesSection';
import AboutSection from '@/components/AboutSection';
import InstagramSection from '@/components/InstagramSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';

const Index = () => {
  useEffect(() => {
    // Smooth scrolling with offset to account for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        // Adjusted offset for fixed header
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 120,
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Sticky Hero Wrapper */}
        <div className="relative">
          <div className="sticky top-0 z-10 h-screen">
        <HeroSection />
          </div>
          <div id="products" className="relative z-20">
          <ProductsSection />
          </div>
        </div>
        <div id="gallery">
          <GallerySection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <CategoriesSection />
        <div id="about">
          <AboutSection />
        </div>
        <InstagramSection />
        <div id="contact">
          <ContactSection />
        </div>
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
