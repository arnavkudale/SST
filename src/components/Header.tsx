import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

const SERVICES = [
  'Clean Up',
  'Facial',
  'Peels',
  'Skin Tightening',
  'HIFU Facelift',
  'Wrinkle reduction',
  'Double Chin treatment',
  'Dermaplaning',
  'Microneedling',
  'Under Eye Treatment',
  'Q-Switch Laser Treatment',
  'Laser Hair Removal',
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showMobileServices, setShowMobileServices] = useState(false);
  const { totalItems } = useCart();
  const [search, setSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const mobileSearchInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const header = document.querySelector('header');
      const heroSection = document.querySelector('section');
      
      if (!header || !heroSection) return;
      
      const heroHeight = heroSection.offsetHeight;
      const isInHeroSection = currentScrollY < heroHeight;
      
      // Determine scroll direction
      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
        header.style.transform = 'translateY(0)';
        
        // Only add white background if we're past the hero section
        if (!isInHeroSection) {
          header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        } else {
          header.style.backgroundColor = 'transparent';
          header.style.boxShadow = 'none';
        }
      } else {
        setIsScrollingUp(false);
        // Move header up based on scroll amount with smoother transition
        const scrollDiff = currentScrollY - lastScrollY;
        const currentTransform = parseInt(header.style.transform.replace('translateY(', '').replace('px)', '') || '0');
        const newTransform = Math.min(0, currentTransform - (scrollDiff * 0.5)); // Reduced scroll sensitivity
        header.style.transform = `translateY(${newTransform}px)`;
        
        // Keep transparent in hero section
        if (isInHeroSection) {
          header.style.backgroundColor = 'transparent';
          header.style.boxShadow = 'none';
        }
      }
      
      setLastScrollY(currentScrollY);
      
      // Check which section is currently in view
      const sections = ['home', 'products', 'services', 'contact', 'about'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (showMobileSearch && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [showMobileSearch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`w-full z-30 ${
      isScrollingUp 
        ? 'fixed py-4' 
        : 'absolute py-6'
    }`} style={{ 
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'translateY(0)'
    }}>
      <div className="container mx-auto px-4 flex flex-row items-center justify-between h-20">
        {/* Logo left-aligned */}
        <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105">
          <img 
            src="https://sallyssoultherapy.com/wp-content/uploads/2024/07/cropped-new-edited-logo-1.png" 
            alt="Sally's Soul Therapy Logo" 
            className="h-12 w-auto object-contain"
            style={{ minWidth: '90px', maxWidth: '140px' }}
          />
        </Link>
        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-x-6 mx-auto">
          <Link to="/" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="hover:text-red-500 transition-colors duration-200">Home</Link>
          <a href="https://sallyssoultherapy.com/index.php/our-services-2/" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="hover:text-red-500 transition-colors duration-200" target="_blank" rel="noopener noreferrer">Services</a>
          <a href="https://sallyssoultherapy.com/index.php/shop/" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="hover:text-red-500 transition-colors duration-200" target="_blank" rel="noopener noreferrer">Products</a>
          <a href="#about" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="hover:text-red-500 transition-colors duration-200">About Us</a>
          <a href="#contact" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="hover:text-red-500 transition-colors duration-200">Contact Us</a>
          {isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200">
              <User size={14} className="mr-1" /> Logout
            </button>
          ) : (
            <Link to="/login" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200">
              <User size={14} className="mr-1" /> Login
            </Link>
          )}
          <Link to="/cart" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="flex items-center gap-1 relative hover:text-red-500 transition-colors duration-200">
            <ShoppingCart size={14} className="mr-1" /> Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-foreground text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
        {/* Search and Hamburger (right) */}
        <div className="flex items-center gap-2">
          {/* Search: icon only on mobile, full on desktop */}
          <form
            className="hidden lg:flex items-center border border-black bg-transparent px-4 py-1 min-w-[160px] max-w-[200px] focus-within:border-black rounded-none"
            style={{ height: '32px' }}
            onSubmit={e => {
              e.preventDefault();
              const url = search.trim()
                ? `https://sallyssoultherapy.com/index.php/shop/?s=${encodeURIComponent(search)}`
                : 'https://sallyssoultherapy.com/index.php/shop/';
              window.open(url, '_blank');
            }}
          >
            <Search className="text-black mr-3" size={16} strokeWidth={2.2} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}
              className="bg-transparent border-none outline-none text-black placeholder:text-neutral-400 w-full"
            />
          </form>
          <button className="flex lg:hidden items-center justify-center p-2" aria-label="Search" onClick={() => setShowMobileSearch(true)}>
            <Search className="text-black" size={24} strokeWidth={2.2} />
          </button>
          {/* Mobile Search Overlay */}
          {showMobileSearch && (
            <div className="fixed inset-0 z-50 bg-white/95 flex items-start justify-center pt-24 px-4 transition-opacity duration-300">
              <form
                className="w-full max-w-md flex items-center border border-black bg-transparent px-4 py-2 rounded-lg shadow-lg"
                style={{ height: '44px' }}
                onSubmit={e => {
                  e.preventDefault();
                  const url = search.trim()
                    ? `https://sallyssoultherapy.com/index.php/shop/?s=${encodeURIComponent(search)}`
                    : 'https://sallyssoultherapy.com/index.php/shop/';
                  window.open(url, '_blank');
                  setShowMobileSearch(false);
                }}
              >
                <Search className="text-black mr-3" size={18} strokeWidth={2.2} />
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..."
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}
                  className="bg-transparent border-none outline-none text-black placeholder:text-neutral-400 w-full"
                />
                <button type="button" className="ml-2 text-gray-500 hover:text-black text-xl" aria-label="Close search" onClick={() => setShowMobileSearch(false)}>
                  &times;
                </button>
              </form>
            </div>
          )}
          {/* Hamburger menu for mobile */}
          <button onClick={toggleMenu} className="flex lg:hidden items-center justify-center p-2 focus:outline-none z-20 transition-transform duration-300 hover:scale-110" aria-label="Menu">
            {isMenuOpen ? <X className="h-8 w-8 text-gray-700" /> : <Menu className="h-8 w-8 text-gray-700" />}
          </button>
        </div>
        {/* Mobile Sidebar Drawer */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-transparent lg:hidden">
            <div className="fixed top-0 right-0 h-full w-72 bg-transparent p-6 flex flex-col gap-4 animate-slide-in-right">
              <button onClick={toggleMenu} className="self-end mb-4">
                <X className="h-7 w-7 text-gray-700" />
              </button>
              <Link to="/" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="py-2 hover:text-red-500 transition-colors duration-200" onClick={toggleMenu}>Home</Link>
              <a href="https://sallyssoultherapy.com/index.php/our-services-2/" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="py-2 hover:text-red-500 transition-colors duration-200" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>Services</a>
              <a href="https://sallyssoultherapy.com/index.php/shop/" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="py-2 hover:text-red-500 transition-colors duration-200" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>Products</a>
              <a href="#about" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="py-2 hover:text-red-500 transition-colors duration-200" onClick={toggleMenu}>About Us</a>
              <a href="#contact" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="py-2 hover:text-red-500 transition-colors duration-200" onClick={toggleMenu}>Contact Us</a>
              {isLoggedIn ? (
                <button onClick={() => { setIsLoggedIn(false); toggleMenu(); }} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="flex items-center gap-1 py-2 hover:text-red-500 transition-colors duration-200">
                  <User size={14} className="mr-1" /> Logout
                </button>
              ) : (
                <Link to="/login" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="flex items-center gap-1 py-2 hover:text-red-500 transition-colors duration-200" onClick={toggleMenu}>
                  <User size={14} className="mr-1" /> Login
                </Link>
              )}
              <Link to="/cart" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="flex items-center gap-1 py-2 relative hover:text-red-500 transition-colors duration-200" onClick={toggleMenu}>
                <ShoppingCart size={14} className="mr-1" /> Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-foreground text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
